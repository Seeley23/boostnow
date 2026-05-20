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
}

interface SectionProps {
  section: Section;
}

const SectionRenderer: React.FC<SectionProps> = ({ section }) => {
  const { type, title, content, extraData, htmlTag, geoCitability, imageAlt, schemaMarkup, stats } = section;
  const Tag = (htmlTag || 'section').toLowerCase() as any;
  
  const renderContent = () => {
    switch (type) {
      case 'Hero':
        return <HeroSection title={title} subtitle={content} />;
      case 'Problem':
        return <ProblemSection title={title} content={content} />;
      case 'Solution':
        return <SolutionSection title={title} content={content} />;
      case 'Services':
        return <ServicesSection title={title} description={content} />;
      case 'Results':
        return <ResultsSection title={title} description={content} />;
      case 'Process':
        return <ProcessSection title={title} description={content} />;
      case 'FAQ':
        return <FAQSection title={title} description={content} />;
      case 'Contact':
        return <ContactSection title={title} description={content} />;
      case 'Target':
        return <TargetAudienceSection title={title} description={content} />;
      default:
        return (
          <div className="py-10 text-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Sekcja typu "{type}" nie jest jeszcze obsługiwana.</p>
          </div>
        );
    }
  };

  return (
    <Tag 
      className={geoCitability ? "geo-citable-block" : ""} 
      data-geo-cite={geoCitability ? "true" : undefined}
      data-stats={stats}
    >
      {schemaMarkup && (
        <script type="application/ld+json">
          {schemaMarkup}
        </script>
      )}
      {renderContent()}
    </Tag>
  );
};

export default SectionRenderer;
