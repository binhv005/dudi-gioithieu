import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Audience from './components/Audience';
import Problems from './components/Problems';
import Deliverables from './components/Deliverables';
import Pricing from './components/Pricing';
import CaseStudies from './components/CaseStudies';
import Process from './components/Process';
import FitSection from './components/FitSection';
import FAQ from './components/FAQ';
import LeadForm from './components/LeadForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingContactWidgets from './components/FloatingContactWidgets';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState('standard');

  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleSelectPackage = (packageId) => {
    setSelectedPackage(packageId);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-brand-primary selection:text-white overflow-x-hidden w-full max-w-[100vw]">
      {/* S01: Header */}
      <Header onSelectPackage={handleSelectPackage} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden w-full">
        {/* S02: Hero */}
        <Hero onSelectPackage={handleSelectPackage} />

        {/* S03: Audience */}
        <Audience onSelectPackage={handleSelectPackage} />

        {/* S04: Problems */}
        <Problems />

        {/* S05: Deliverables */}
        <Deliverables />

        {/* S06: Pricing & Disclaimers */}
        <Pricing onSelectPackage={handleSelectPackage} />

        {/* S07: Case Studies Showcase */}
        <CaseStudies />

        {/* S08: Process */}
        <Process />

        {/* S09: Fit & Non-fit */}
        <FitSection onSelectPackage={handleSelectPackage} />

        {/* S10: FAQ Accordion */}
        <FAQ />

        {/* S11: Lead Form */}
        <LeadForm
          selectedPackage={selectedPackage}
          onSelectPackage={handleSelectPackage}
        />

        {/* S12: Final CTA */}
        <FinalCTA onSelectPackage={handleSelectPackage} />
      </main>

      {/* S13: Footer */}
      <Footer />

      {/* Floating Hotline & Zalo Contact Widgets */}
      <FloatingContactWidgets />
    </div>
  );
}
