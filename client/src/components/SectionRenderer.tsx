import React from 'react';
import HeroSection from './HeroSection';
import ProblemSection from './ProblemSection';
import SolutionSection from './SolutionSection';
import ServicesSection from './ServicesSection';
import ResultsSection from './ResultsSection';
import ProcessSection from './ProcessSection';
import FAQSection from './FAQSection';
import ContactSection from './ContactSection';
import TargetAudienceSection from './TargetAudienceSection';
import { BeautyHero, BeautyServiceCard, BeautyTestimonial, BeautyStats } from './EliteBeautyComponents';

interface Section {
  type: string;
  title: string;
  content: string;
  extraData?: any;
  htmlTag?: string;
  geoCitability?: boolean;
  imageAlt?: string;
  schemaMarkup?: string;
  stats?: string;
  ctaLabel?: string;
  ctaLink?: string;
  price?: string;
  author?: string;
  role?: string;
  items?: any[];
}

interface SectionProps {
  section: Section;
}

const SectionRenderer: React.FC<SectionProps> = ({ section }) => {
  const { 
    type, title, content, extraData, htmlTag, 
    geoCitability, imageAlt, schemaMarkup, stats,
    ctaLabel, ctaLink, price, author, role, items
  } = section;
  
  const renderContent = () => {
    switch (type) {
      // Legacy / Tech Sections (Now updated to Human-Centric)
      case 'Hero':
        return <HeroSection title={title} subtitle={content} />;
      case 'Problem':
        return <ProblemSection title={title} content={content} />;
      case 'Solution':
        return <SolutionSection title={title} content={content} />;
      
      // Elite Beauty Sections (Human-Centric)
      case 'BeautyHero':
        return <BeautyHero title={title} subtitle={content} ctaLabel={ctaLabel} ctaLink={ctaLink} />;
      case 'BeautyService':
        return <BeautyServiceCard name={title} description={content} price={price} stats={stats} />;
      case 'BeautyTestimonial':
        return <BeautyTestimonial quote={content} author={author} role={role} />;
      case 'BeautyStats':
        return <BeautyStats items={items} />;

      // Standard Sections
      case 'Services':
        return <ServicesSection />;
      case 'Results':
        return <ResultsSection />;
      case 'Process':
        return <ProcessSection />;
      case 'FAQ':
        return <FAQSection />;
      case 'Contact':
        return <ContactSection />;
      case 'Target':
        return <TargetAudienceSection title={title} description={content} />;
      
      default:
        return (
          <div className="py-10 text-center border-2 border-dashed border-slate-200 rounded-3xl">
            <p className="text-slate-400 font-medium">Sekcja typu "{type}" nie jest jeszcze obsługiwana.</p>
          </div>
        );
    }
  };

  return (
    <div 
      className={geoCitability ? "geo-citable-block" : ""} 
      data-geo-cite={geoCitability ? "true" : undefined}
    >
      {schemaMarkup && (
        <script type="application/ld+json">
          {schemaMarkup}
        </script>
      )}
      {renderContent()}
    </div>
  );
};

export default SectionRenderer;
