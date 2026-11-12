import { useEffect, type RefObject } from "react";

/**
 * Keeps aria-invalid / aria-describedby in step with the browser's :user-invalid
 * state for every field in a form, and announces an error that appears on blur
 * through one polite live region.
 *
 * Each field points at its error message with data-error="<error element id>".
 * The error is only listed in aria-describedby while the field is invalid:
 * text referenced by aria-describedby is read out even when it is hidden.
 */
export function useFieldErrorSync(formRef: RefObject<HTMLFormElement | null>) {
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const isField = (el: EventTarget | null): el is Field =>
      el instanceof HTMLElement && el.matches("input, select, textarea");

    const announcer = document.createElement("div");
    announcer.setAttribute("aria-live", "polite");
    announcer.className = "sr-only";
    document.body.append(announcer);
    let announceTimer: ReturnType<typeof setTimeout> | undefined;
    let announcedField: Field | undefined;

    const spokenText = (node: Element) => {
      const copy = node.cloneNode(true) as Element;
      copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
      return (copy.textContent || "").replace(/\s+/g, " ").trim();
    };

    const linkError = (el: Field, shown: boolean) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
      else el.removeAttribute("aria-describedby");
    };

    const announceError = (el: Field) => {
      const error = el.dataset.error ? document.getElementById(el.dataset.error) : null;
      if (!error) return;
      const label = el.labels?.[0] ? `${spokenText(el.labels[0])}: ` : "";
      clearTimeout(announceTimer);
      announcer.textContent = "";
      announcedField = el;
      // Wait until the screen reader has announced the field that takes focus next.
      announceTimer = setTimeout(() => {
        announcer.textContent = label + spokenText(error);
      }, 500);
    };

    const flagged = new WeakSet<Field>();
    const announced = new WeakSet<Field>();

    const syncAria = (target: EventTarget | null, announce = false) => {
      if (!isField(target)) return;
      const el = target;
      if (el.matches(":user-invalid")) {
        if (announce && !announced.has(el)) {
          announceError(el);
          announced.add(el);
        }
        el.setAttribute("aria-invalid", "true");
        linkError(el, true);
        flagged.add(el);
      } else if (flagged.has(el) || el.getAttribute("aria-invalid") !== "true") {
        // "false" rather than unset: Firefox and Safari expose an empty required
        // field as invalid from page load.
        el.setAttribute("aria-invalid", "false");
        linkError(el, false);
        flagged.delete(el);
        announced.delete(el);
        if (announcedField === el) {
          clearTimeout(announceTimer);
          announcer.textContent = "";
        }
      }
    };

    form.querySelectorAll("input, select, textarea").forEach((el) => syncAria(el));

    const onBlur = (e: Event) => syncAria(e.target, true);
    const onInput = (e: Event) => {
      if (isField(e.target) && e.target.hasAttribute("aria-invalid")) syncAria(e.target);
    };
    const onChange = (e: Event) => syncAria(e.target, true);
    // A failed submit fires 'invalid' on every failing field. Focus moving to the
    // first one announces its error, so these are not announced separately.
    const onInvalid = (e: Event) => {
      if (isField(e.target)) announced.add(e.target);
      syncAria(e.target);
    };
    const onReset = () => {
      setTimeout(() => Array.from(form.elements).forEach((el) => syncAria(el)));
    };

    form.addEventListener("blur", onBlur, true);
    form.addEventListener("input", onInput);
    form.addEventListener("change", onChange, true);
    form.addEventListener("invalid", onInvalid, true);
    form.addEventListener("reset", onReset, true);

    return () => {
      form.removeEventListener("blur", onBlur, true);
      form.removeEventListener("input", onInput);
      form.removeEventListener("change", onChange, true);
      form.removeEventListener("invalid", onInvalid, true);
      form.removeEventListener("reset", onReset, true);
      clearTimeout(announceTimer);
      announcer.remove();
    };
  }, [formRef]);
}
