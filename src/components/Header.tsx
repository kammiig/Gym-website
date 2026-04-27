"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/data/site";
import { ButtonLink } from "./ButtonLink";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Planetic Solutions home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={pathname === link.href ? "nav-link active" : "nav-link"}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ButtonLink href={siteConfig.clientAreaUrl} variant="primary" className="header-cta">
            Client Area
          </ButtonLink>
          <button
            className="menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={isOpen ? "mobile-nav open" : "mobile-nav"}>
        <div className="container mobile-nav-inner">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={pathname === link.href ? "mobile-link active" : "mobile-link"}
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href={siteConfig.clientAreaUrl} variant="primary">
            Client Area
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
