"use client";

import { Shield, Zap, Package, Layers, Image as ImageIcon, Monitor } from 'lucide-react';
import { useDictionary } from "@/components/dictionary-provider";

interface Feature {
  title: string
  description: string
  icon?: string
  key?: string
}

interface Features {
  [key: string]: Omit<Feature, 'key'>
}

interface FeaturesSectionProps {
  features?: Features | Feature[]
}

export default function FeaturesSection({ features = {} }: FeaturesSectionProps) {
  if (!features) return null
  
  // Convert features object to array if needed
  const featureArray = Array.isArray(features) 
    ? features 
    : Object.entries(features).map(([key, value]) => ({
        ...value,
        key
      }));

  if (featureArray.length === 0) return null

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="h-12 w-12 mb-4 text-primary" />;
      case 'Zap': return <Zap className="h-12 w-12 mb-4 text-primary" />;
      case 'Package': return <Package className="h-12 w-12 mb-4 text-primary" />;
      case 'Layers': return <Layers className="h-12 w-12 mb-4 text-primary" />;
      case 'Image': return <ImageIcon className="h-12 w-12 mb-4 text-primary" />;
      case 'Monitor': return <Monitor className="h-12 w-12 mb-4 text-primary" />;
      default: return null;
    }
  };

  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureArray.map((feature, index) => (
          <div key={feature.key || index} className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
            {getIcon(feature.icon)}
            <div className="space-y-2 text-center w-full">
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-base font-normal text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
