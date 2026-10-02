import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border/50 py-12 mt-10 font-sans">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Link to="/" className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 mb-3">
              MANIT <span className="text-primary font-bold">Marketplace</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Buy. Sell. Connect. On campus.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:marketplacemanit@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors bg-muted/50 p-2 rounded-full"
                aria-label="Contact support"
              >
                <Mail className="size-4" />
              </a>
              <a
                href="https://github.com/Ayusome-git/Manit-Marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors bg-muted/50 p-2 rounded-full"
                aria-label="GitHub"
              >
                <Github className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Marketplace</Link></li>
              <li><Link to="/profile/wishlist" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Wishlist</Link></li>
              <li><Link to="/profile/myads" className="text-muted-foreground hover:text-foreground transition-colors text-sm">My Listings</Link></li>
              <li><Link to="/profile/add-product" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Sell an Item</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-3">
              <li><Link to="/products?category=Electronics" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Electronics</Link></li>
              <li><Link to="/products?category=Study Materials" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Books & Study</Link></li>
              <li><Link to="/products?category=Hostel Essentials" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Hostel Essentials</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} MANIT Marketplace. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}