'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Car } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'AutoLoc Pro',
  brandTagline: 'Votre partenaire de confiance pour tous vos besoins de mobilité',
  menuItems: [
    { label: 'Accueil', href: '#hero' },
    { label: 'Notre Flotte', href: '#flotte' },
  ],
  ctaText: 'Réserver Maintenant',
  ctaHref: '#flotte',
  phoneNumber: '+33 1 23 45 67 89',
  phoneDisplay: '01 23 45 67 89',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
    setIsOpen(false);
  };

  return (
    <nav
      id="navigation"
      className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Car className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span
                className="text-lg font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleNavClick('#hero')}
                data-editable="brandName"
              >
                {config.brandName}
              </span>
              <span
                className="text-xs text-muted-foreground hidden sm:block"
                data-editable="brandTagline"
              >
                {config.brandTagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              {config.menuItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                    data-editable-href={`menuItems[${idx}].href`}
                    data-href={item.href}
                  >
                    <span data-editable={`menuItems[${idx}].label`}>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span data-editable="phoneDisplay">{config.phoneDisplay}</span>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleCtaClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border hover:bg-accent hover:text-accent-foreground"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background text-foreground border-border w-80"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                        <Car className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-foreground" data-editable="brandName">
                        {config.brandName}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 py-6">
                    <ul className="space-y-4">
                      {config.menuItems.map((item, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => handleNavClick(item.href)}
                            className="w-full text-left py-3 px-4 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors font-medium"
                            data-editable-href={`menuItems[${idx}].href`}
                            data-href={item.href}
                          >
                            <span data-editable={`menuItems[${idx}].label`}>{item.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Mobile Contact */}
                    <div className="mt-8 p-4 bg-muted text-muted-foreground rounded-lg">
                      <p className="text-sm font-medium mb-2">Contactez-nous</p>
                      <p className="text-lg font-bold text-foreground" data-editable="phoneDisplay">
                        {config.phoneDisplay}
                      </p>
                    </div>
                  </div>

                  {/* Mobile CTA */}
                  <div className="pt-6 border-t border-border">
                    <Button
                      onClick={handleCtaClick}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                    >
                      <span data-editable="ctaText">{config.ctaText}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
