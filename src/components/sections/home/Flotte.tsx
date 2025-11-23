'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Users, Fuel, Settings, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FLOTTE = {
  title: 'Notre Flotte de Véhicules',
  subtitle: 'Découvrez notre gamme complète de véhicules de location adaptés à tous vos besoins',
  ctaText: 'Réserver Maintenant',
  ctaHref: '/reservation',
  vehicles: [
    {
      id: '1',
      name: 'Citroën C3',
      category: 'Économique',
      image: 'https://images.unsplash.com/photo-1549399736-8e3c0b8c4e0e?w=800&h=600&fit=crop',
      pricePerDay: 35,
      passengers: 5,
      transmission: 'Manuelle',
      fuel: 'Essence',
      rating: 4.8,
      features: ['Climatisation', 'Bluetooth', 'GPS'],
    },
    {
      id: '2',
      name: 'Peugeot 3008',
      category: 'SUV',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      pricePerDay: 65,
      passengers: 5,
      transmission: 'Automatique',
      fuel: 'Diesel',
      rating: 4.9,
      features: ['Climatisation', 'GPS', 'Caméra de recul'],
    },
    {
      id: '3',
      name: 'Mercedes Classe E',
      category: 'Premium',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
      pricePerDay: 120,
      passengers: 5,
      transmission: 'Automatique',
      fuel: 'Hybride',
      rating: 5.0,
      features: ['Cuir', 'GPS Premium', 'Assistance parking'],
    },
  ],
} as const;

type FlotteProps = Partial<typeof DEFAULT_FLOTTE>;

export default function Flotte(props: FlotteProps) {
  const config = { ...DEFAULT_FLOTTE, ...props };
  const navigate = useSmartNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(config.vehicles.map(v => v.category)));

  const filteredVehicles = selectedCategory
    ? config.vehicles.filter(v => v.category === selectedCategory)
    : config.vehicles;

  const handleReservation = (vehicleId: string) => {
    navigate(`${config.ctaHref}?vehicle=${vehicleId}`);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <section id="flotte" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(null)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Tous les véhicules
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => handleCategoryFilter(category)}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle, idx) => (
            <Card
              key={vehicle.id}
              className="bg-card text-card-foreground overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  data-editable-src={`vehicles[${idx}].image`}
                  width={800}
                  height={600}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  <span data-editable={`vehicles[${idx}].category`}>{vehicle.category}</span>
                </Badge>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 text-foreground px-2 py-1 rounded-md">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium" data-editable={`vehicles[${idx}].rating`}>
                    {vehicle.rating}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">
                    <span data-editable={`vehicles[${idx}].name`}>{vehicle.name}</span>
                  </h3>
                  <div className="text-2xl font-bold text-primary">
                    <span data-editable={`vehicles[${idx}].pricePerDay`}>
                      {vehicle.pricePerDay}
                    </span>
                    €<span className="text-sm font-normal text-muted-foreground">/jour</span>
                  </div>
                </div>

                {/* Vehicle Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span data-editable={`vehicles[${idx}].passengers`}>
                      {vehicle.passengers}
                    </span>{' '}
                    places
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Settings className="w-4 h-4" />
                    <span data-editable={`vehicles[${idx}].transmission`}>
                      {vehicle.transmission}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Fuel className="w-4 h-4" />
                    <span data-editable={`vehicles[${idx}].fuel`}>{vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Car className="w-4 h-4" />
                    Disponible
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, featureIdx) => (
                      <Badge key={featureIdx} variant="outline" className="text-xs">
                        <span data-editable={`vehicles[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleReservation(vehicle.id)}
                  data-editable-href="ctaHref"
                  data-href={config.ctaHref}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group"
                >
                  <span data-editable="ctaText">{config.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-muted text-muted-foreground p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Besoin d'aide pour choisir ?</h3>
            <p className="mb-6">
              Notre équipe d'experts est là pour vous conseiller et vous aider à trouver le véhicule
              parfait.
            </p>
            <Button
              onClick={() => navigate('/contact')}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Nous Contacter
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
