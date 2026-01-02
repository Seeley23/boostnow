import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/analytics";

/**
 * ScrollDepthTracker Component
 * 
 * Tracks scroll depth and sends events to GTM at 25%, 50%, 75%, and 100%.
 * Only tracks each depth once per page load.
 */
export default function ScrollDepthTracker() {
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track at 25%, 50%, 75%, and 100%
      const depths = [25, 50, 75, 100];
      
      depths.forEach((depth) => {
        if (scrollPercent >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth);
          trackScrollDepth(depth);
        }
      });
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
