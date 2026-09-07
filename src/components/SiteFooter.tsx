import { Link } from "@tanstack/react-router";
import { Instagram, Lock, Mail, Phone } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

const SOCIALS = [
  { icon: Instagram, href: "https://www.instagram.com/westcore.shop/", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@westcore.shop", label: "TikTok" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-extrabold">
              WEST CORE<span className="text-coral">.</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Considered t-shirts, made in small batches from long-staple cotton.
            </p>
          </div>

          <div className="text-sm">
            <p className="font-semibold">Shop</p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex items-center gap-1.5 text-muted-foreground/50">
                Men's Collection <Lock className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link to="/women" className="hover:text-coral">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-coral">
                  Your Bag
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-coral">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="font-semibold">Contact</p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" /> info@westcore.shop
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" /> 078 574 2630
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="press grid h-10 w-10 place-items-center rounded-full bg-card"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} West Core. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-coral">
              About
            </Link>
            <Link to="/privacy" className="hover:text-coral">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-coral">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
