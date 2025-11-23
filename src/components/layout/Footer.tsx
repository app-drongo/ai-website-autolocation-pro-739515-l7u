'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  brandName: 'AutoRent Pro',
  brandDescription: 'Votre partenaire de confiance pour tous vos besoins de mobilité',

  // Company Section
  companyTitle: 'Entreprise',
  companyLinks: [
    { label: 'À propos', href: '/about' },
    { label: 'Notre flotte', href: '/fleet' },
  ],

  // Legal Section
  legalTitle: 'Légal',
  legalLinks: [
    { label: 'Conditions générales', href: '/terms' },
    { label: 'Politique de confidentialité', href: '/privacy' },
  ],

  // Contact Section
  contactTitle: 'Contact',
  contactInfo: [
    { icon: 'phone', text: '+33 1 23 45 67 89', href: 'tel:+33123456789' },
    { icon: 'mail', text: 'contact@autorent.fr', href: 'mailto:contact@autorent.fr' },
  ],

  // Social Section
  socialTitle: 'Suivez-nous',
  socialLinks: [
    { platform: 'Facebook', href: 'https://facebook.com/autorent', icon: 'facebook' },
    { platform: 'Instagram', href: 'https://instagram.com/autorent', icon: 'instagram' },
  ],

  // Footer Bottom
  copyrightText: '© 2024 AutoRent Pro. Tous droits réservés.',
  addressText: '123 Avenue des Champs-Élysées, 75008 Paris, France',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'mail':
        return <Mail className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      window.open(href, href.startsWith('http') ? '_blank' : '_self');
    } else {
      navigate(href);
    }
  };

  return (
    <footer id="footer" className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                <span data-editable="brandName">{config.brandName}</span>
              </h3>
            </div>
            <p className="text-sm leading-relaxed">
              <span data-editable="brandDescription">{config.brandDescription}</span>
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              <span data-editable="companyTitle">{config.companyTitle}</span>
            </h4>
            <ul className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`companyLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              <span data-editable="legalTitle">{config.legalTitle}</span>
            </h4>
            <ul className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`legalLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              <span data-editable="contactTitle">{config.contactTitle}</span>
            </h4>
            <ul className="space-y-3 mb-6">
              {config.contactInfo.map((contact, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start gap-2"
                    onClick={() => handleLinkClick(contact.href)}
                    data-editable-href={`contactInfo[${idx}].href`}
                    data-href={contact.href}
                  >
                    {getIcon(contact.icon)}
                    <span data-editable={`contactInfo[${idx}].text`}>{contact.text}</span>
                  </Button>
                </li>
              ))}
            </ul>

            <h5 className="font-medium text-foreground mb-3">
              <span data-editable="socialTitle">{config.socialTitle}</span>
            </h5>
            <div className="flex gap-2">
              {config.socialLinks.map((social, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0"
                  onClick={() => handleLinkClick(social.href)}
                  data-editable-href={`socialLinks[${idx}].href`}
                  data-href={social.href}
                  aria-label={social.platform}
                >
                  {getIcon(social.icon)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span data-editable="addressText">{config.addressText}</span>
          </div>
          <p className="text-sm">
            <span data-editable="copyrightText">{config.copyrightText}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
