import { Mail, Linkedin, Instagram, Facebook, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/boostnowmarketing", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61585415810749", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/boostnow_marketing/", label: "Instagram" },
];

const footerLinks = [
  { label: "O nas", href: "/about" },
  { label: "Usługi", href: "/services" },
  { label: "Case Studies", href: "/cases" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-5">
            <a href="/" className="flex items-center gap-2 mb-8 group">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-serif text-xl group-hover:rotate-3 transition-transform">
                B
              </div>
              <span className="text-xl font-serif font-bold text-slate-900 tracking-tight">BoostNow</span>
            </a>
            <p className="text-lg text-slate-600 mb-10 max-w-md leading-relaxed">
              Tworzymy systemy, które zamieniają uwagę w zysk. Wykorzystujemy psychologię decyzji, aby Twoja marka stała się pierwszym wyborem klienta.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-200 transition-all shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-8">Nawigacja</h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-8">Kontakt</h4>
            <div className="space-y-6">
              <a href="mailto:kontakt@boostnow.pl" className="block group">
                <span className="text-slate-500 text-sm block mb-1">Napisz do nas</span>
                <span className="text-xl font-serif text-slate-900 group-hover:text-slate-600 transition-colors">kontakt@boostnow.pl</span>
              </a>
              <div className="pt-4">
                <p className="text-sm text-slate-500 mb-2">BoostNow Agencja Marketingowa</p>
                <p className="text-sm text-slate-600">ul. Marii Konopnickiej 11, 11-040 Dobre Miasto</p>
                <p className="text-sm text-slate-600">NIP: 7393776527</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} BoostNow. Wszystkie prawa zastrzeżone.
          </p>
          <div className="flex gap-8">
            <Link href="/regulamin" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Regulamin</Link>
            <Link href="/polityka-prywatnosci" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Prywatność</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
