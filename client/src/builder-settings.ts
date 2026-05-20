import { builder } from '@builder.io/react';

// Replace with your Public API Key
builder.init('4bdd48d7dfbc402892928c362c2fdbec');

import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import IndustriesSection from './components/IndustriesSection';
import FAQSection from './components/FAQSection';
import { BeautyHero, BeautyServiceCard, BeautyTestimonial, BeautyStats } from './components/EliteBeautyComponents';

// Register your components for use in the visual editor
builder.registerComponent(HeroSection, {
  name: 'Hero Section',
  inputs: [
    { name: 'title', type: 'string', defaultValue: 'Zdominuj Wyniki Wyszukiwania AI' },
    { name: 'content', type: 'longText', defaultValue: 'Twoja marka jako główne źródło informacji dla ChatGPT i Perplexity.' },
  ],
});

builder.registerComponent(ProblemSection, {
  name: 'Problem Section',
  inputs: [
    { name: 'title', type: 'string', defaultValue: 'Twój marketing jest zbyt skomplikowany.' },
    { name: 'content', type: 'longText', defaultValue: 'Większość firm płaci za treści, których nikt nie czyta.' },
  ],
});

builder.registerComponent(SolutionSection, {
  name: 'Solution Section',
  inputs: [
    { name: 'title', type: 'string', defaultValue: 'Nasze Rozwiązanie' },
    { name: 'content', type: 'longText', defaultValue: 'Elite GEO to przyszłość widoczności w sieci.' },
  ],
});

builder.registerComponent(IndustriesSection, {
  name: 'Industries Section',
});

builder.registerComponent(FAQSection, {
  name: 'FAQ Section',
});

// Elite Beauty Components Registration
builder.registerComponent(BeautyHero, {
  name: 'Beauty: Hero',
  inputs: [
    { name: 'title', type: 'string' },
    { name: 'subtitle', type: 'string' },
    { name: 'ctaLabel', type: 'string' },
    { name: 'ctaLink', type: 'string' },
  ],
});

builder.registerComponent(BeautyServiceCard, {
  name: 'Beauty: Service Card',
  inputs: [
    { name: 'name', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'price', type: 'string' },
    { name: 'stats', type: 'string' },
  ],
});

builder.registerComponent(BeautyTestimonial, {
  name: 'Beauty: Testimonial',
  inputs: [
    { name: 'quote', type: 'string' },
    { name: 'author', type: 'string' },
    { name: 'role', type: 'string' },
  ],
});

builder.registerComponent(BeautyStats, {
  name: 'Beauty: Stats',
  inputs: [
    { 
      name: 'items', 
      type: 'list',
      subFields: [
        { name: 'label', type: 'string' },
        { name: 'value', type: 'string' }
      ]
    },
  ],
});
