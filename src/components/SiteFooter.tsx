import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Phone, Twitter, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-extrabold">
              LUMEN<span className="text-coral">.</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Considered t-shirts, made in small batches from long-staple cotton.
            </p>
          </div>

          <div className="text-sm">
            <p className="font-semibold">Shop</p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>
                <Link to="/men" className="hover:text-coral">
                  Men's Collection
                </Link>
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
            </ul>
          </div>

          <div className="text-sm">
            <p className="font-semibold">Contact</p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" /> hello@lumen.studio
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" /> +1 (415) 555-0134
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="https://instagram.com"
                  aria-label="Social profile"
                  className="press grid h-10 w-10 place-items-center rounded-full bg-card"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">© {new Date().getFullYear()} Lumen Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}
