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
import ScrollReveal from './components/ScrollReveal';

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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-brand-primary selection:text-white">
      {/* S01: Header */}
      <Header onSelectPackage={handleSelectPackage} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* S02: Hero (Immediate Load) */}
        <Hero onSelectPackage={handleSelectPackage} />

        {/* S03: Audience */}
        <ScrollReveal direction="up" distance="45px" duration={800} threshold={0.12} once={false}>
          <Audience onSelectPackage={handleSelectPackage} />
        </ScrollReveal>

        {/* S04: Problems */}
        <ScrollReveal direction="up" distance="45px" duration={800} threshold={0.12} once={false}>
          <Problems />
        </ScrollReveal>

        {/* S05: Deliverables */}
        <ScrollReveal direction="up" distance="45px" duration={800} threshold={0.12} once={false}>
          <Deliverables />
        </ScrollReveal>

        {/* S06: Pricing & Disclaimers */}
        <ScrollReveal direction="up" distance="45px" duration={800} threshold={0.12} once={false}>
          <Pricing onSelectPackage={handleSelectPackage} />
        </ScrollReveal>

        {/* S07: Case Studies Showcase */}
        <ScrollReveal direction="up" distance="45px" duration={800} threshold={0.12} once={false}>
          <CaseStudies />
        </ScrollReveal>

        {/* S08: Process */}
        <ScrollReveal direction="up" distance="45px" duration={800} threshold={0.12} once={false}>
          <Process />
        </ScrollReveal>

        {/* S09: Fit & Non-fit */}
        <ScrollReveal direction="up" distance="45px" duration={800} threshold={0.12} once={false}>
          <FitSection onSelectPackage={handleSelectPackage} />
        </ScrollReveal>

        {/* S10: FAQ Accordion */}
        <ScrollReveal direction="up" distance="45px" duration={800} threshold={0.12} once={false}>
          <FAQ />
        </ScrollReveal>

        {/* S11: Lead Form */}
        <ScrollReveal direction="up" distance="45px" duration={800} threshold={0.12} once={false}>
          <LeadForm
            selectedPackage={selectedPackage}
            onSelectPackage={handleSelectPackage}
          />
        </ScrollReveal>

        {/* S12: Final CTA */}
        <ScrollReveal direction="up" distance="45px" duration={800} threshold={0.12} once={false}>
          <FinalCTA onSelectPackage={handleSelectPackage} />
        </ScrollReveal>
      </main>

      {/* S13: Footer */}
      <Footer />

      {/* Floating Hotline & Zalo Contact Widgets */}
      <FloatingContactWidgets />
    </div>
  );
}
