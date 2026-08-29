import { Link, useRouterState } from "@tanstack/react-router";
import { Lock, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();

  const links = [
    { to: "/men", label: "Men", locked: true },
    { to: "/women", label: "Women", locked: false },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link to="/" className="font-display text-xl font-extrabold tracking-tight">
            WEST CORE<span className="text-coral">.</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {links.map((l) =>
              l.locked ? (
                <span
                  key={l.to}
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center gap-1.5 text-muted-foreground/50"
                >
                  {l.label}
                  <Lock className="h-3.5 w-3.5" />
                </span>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "transition-colors hover:text-coral",
                    pathname.startsWith(l.to) ? "text-coral" : "text-muted-foreground",
                  )}
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>
        </div>
        <Link
          to="/cart"
          aria-label="Open bag"
          className="press relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary"
        >
          <ShoppingBag className="h-4.5 w-4.5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[10px] font-bold text-coral-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
