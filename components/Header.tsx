'use client';

import { useState } from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-forest-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="font-bold text-lg text-charcoal hidden sm:inline">
              Imobiliare Strășeni
            </span>
            <span className="font-bold text-lg text-charcoal sm:hidden">IMS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/proprietati"
              className="text-text-muted hover:text-forest-green transition-colors"
            >
              Proprietăți
            </Link>
            <Link
              href="/localitati"
              className="text-text-muted hover:text-forest-green transition-colors"
            >
              Localități
            </Link>
            <Link
              href="/servicii"
              className="text-text-muted hover:text-forest-green transition-colors"
            >
              Servicii
            </Link>
            <Link
              href="/blog"
              className="text-text-muted hover:text-forest-green transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/despre"
              className="text-text-muted hover:text-forest-green transition-colors"
            >
              Despre
            </Link>
            <Link
              href="/contact"
              className="text-text-muted hover:text-forest-green transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button, Language Switcher and Mobile Menu */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/vinde-proprietate"
              className="hidden sm:block px-6 py-2 border border-forest-green text-forest-green rounded-lg hover:bg-light-gray transition-colors font-medium text-sm"
            >
              Vinde
            </Link>
            <Link
              href="/adauga-proprietate"
              className="hidden sm:block bg-forest-green text-white px-6 py-2 rounded-lg hover:bg-forest-green-light transition-colors font-medium"
            >
              Caută
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-light-gray transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-light-gray pt-4">
            <Link
              href="/proprietati"
              className="block px-4 py-2 text-text-muted hover:bg-light-gray rounded-lg"
            >
              Proprietăți
            </Link>
            <Link
              href="/localitati"
              className="block px-4 py-2 text-text-muted hover:bg-light-gray rounded-lg"
            >
              Localități
            </Link>
            <Link
              href="/servicii"
              className="block px-4 py-2 text-text-muted hover:bg-light-gray rounded-lg"
            >
              Servicii
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2 text-text-muted hover:bg-light-gray rounded-lg"
            >
              Blog
            </Link>
            <Link
              href="/despre"
              className="block px-4 py-2 text-text-muted hover:bg-light-gray rounded-lg"
            >
              Despre
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-text-muted hover:bg-light-gray rounded-lg"
            >
              Contact
            </Link>
            <div className="flex gap-2">
              <Link
                href="/vinde-proprietate"
                className="flex-1 px-4 py-2 border border-forest-green text-forest-green rounded-lg hover:bg-light-gray text-center font-medium"
              >
                Vinde
              </Link>
              <Link
                href="/adauga-proprietate"
                className="flex-1 px-4 py-2 bg-forest-green text-white rounded-lg hover:bg-forest-green-light text-center font-medium"
              >
                Caută
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
