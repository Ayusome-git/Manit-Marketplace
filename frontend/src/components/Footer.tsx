import { Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-background border-t py-6 mt-10 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} MANIT Marketplace. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:marketplacemanit@gmail.com"
            className="hover:text-primary transition-colors"
            aria-label="Contact support"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/Ayusome-git/Manit-Marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}