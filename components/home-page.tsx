"use client";

import HeroSection from './sections/hero-section';
import UploadSection from './sections/upload-section';
import FeaturesSection from './sections/features-section';
import FaqSection from './sections/faq-section';
import AboutSection from './sections/about-section';
import FooterSection from './sections/footer-section';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <HeroSection />
        <UploadSection />
        <FeaturesSection />
        <FaqSection />
        <AboutSection />
      </div>
      <FooterSection />
    </div>
  );
}