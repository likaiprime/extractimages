"use client";

import { Shield, Zap, Package, Layers, Image as ImageIcon, Monitor } from 'lucide-react';
import { useDictionary } from "@/components/dictionary-provider";

export default function FeaturesSection() {
  const dictionary = useDictionary();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
        <Shield className="h-12 w-12 mb-4 text-primary" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {dictionary.home.features.privacy.title}
          </h3>
          <p className="text-base font-normal text-muted-foreground">
            {dictionary.home.features.privacy.description}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
        <Zap className="h-12 w-12 mb-4 text-primary" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {dictionary.home.features.speed.title}
          </h3>
          <p className="text-base font-normal text-muted-foreground">
            {dictionary.home.features.speed.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
        <Package className="h-12 w-12 mb-4 text-primary" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {dictionary.home.features.formats.title}
          </h3>
          <p className="text-base font-normal text-muted-foreground">
            {dictionary.home.features.formats.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
        <Layers className="h-12 w-12 mb-4 text-primary" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {dictionary.home.features.batch.title}
          </h3>
          <p className="text-base font-normal text-muted-foreground">
            {dictionary.home.features.batch.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
        <ImageIcon className="h-12 w-12 mb-4 text-primary" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {dictionary.home.features.quality.title}
          </h3>
          <p className="text-base font-normal text-muted-foreground">
            {dictionary.home.features.quality.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
        <Monitor className="h-12 w-12 mb-4 text-primary" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {dictionary.home.features.noInstall.title}
          </h3>
          <p className="text-base font-normal text-muted-foreground">
            {dictionary.home.features.noInstall.description}
          </p>
        </div>
      </div>
    </div>
  );
}
