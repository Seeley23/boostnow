/**
 * GEO content pattern components based on ai-seo skill (Corey Haines).
 * Used to inject citable blocks into articles.
 */

import React from 'react';

interface StatBlockProps {
  value: string;
  label: string;
  source?: string;
  date?: string;
}

export const StatBlock: React.FC<StatBlockProps> = ({ value, label, source, date }) => (
  <div className="my-6 p-4 rounded-lg bg-[#c7ff4e]/5 border border-[#c7ff4e]/20">
    <div className="text-3xl font-black text-[#c7ff4e]">{value}</div>
    <div className="text-white text-sm mt-1">{label}</div>
    {source && (
      <div className="text-[#9aa0b3] text-xs mt-2">
        Źródło: {source}{date ? ` (${date})` : ''}
      </div>
    )}
  </div>
);

interface QuoteBlockProps {
  quote: string;
  author: string;
  title?: string;
  organization?: string;
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ quote, author, title, organization }) => (
  <blockquote className="my-6 border-l-4 border-[#c7ff4e] pl-4 py-2">
    <p className="text-white italic text-lg leading-relaxed">„{quote}”</p>
    <footer className="mt-2 text-[#9aa0b3] text-sm">
      — {author}{title ? `, ${title}` : ''}{organization ? ` (${organization})` : ''}
    </footer>
  </blockquote>
);

interface DefinitionBlockProps {
  term: string;
  definition: string;
}

export const DefinitionBlock: React.FC<DefinitionBlockProps> = ({ term, definition }) => (
  <div className="my-6 p-4 rounded-lg bg-[#141829] border border-[#2a2f3e]">
    <dt className="font-bold text-white text-lg">{term}</dt>
    <dd className="text-[#9aa0b3] mt-1 leading-relaxed">{definition}</dd>
  </div>
);

interface ComparisonRow {
  feature: string;
  seo: string;
  geo: string;
}

interface ComparisonTableProps {
  title: string;
  rows: ComparisonRow[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ title, rows }) => (
  <div className="my-6 overflow-x-auto">
    <h4 className="text-lg font-bold text-white mb-3">{title}</h4>
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-[#2a2f3e]">
          <th className="text-left py-2 text-[#9aa0b3] font-medium">Cecha</th>
          <th className="text-left py-2 text-[#9aa0b3] font-medium">SEO</th>
          <th className="text-left py-2 text-[#c7ff4e] font-medium">GEO</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-[#2a2f3e]">
            <td className="py-2 text-white">{row.feature}</td>
            <td className="py-2 text-[#9aa0b3]">{row.seo}</td>
            <td className="py-2 text-white">{row.geo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <div className="border-b border-[#2a2f3e] py-4">
    <h4 className="font-semibold text-white text-base">{question}</h4>
    <p className="text-[#9aa0b3] text-sm mt-1 leading-relaxed">{answer}</p>
  </div>
);

export const FAQSection: React.FC<{ items: FAQItemProps[] }> = ({ items }) => (
  <section className="my-8">
    <h3 className="text-2xl font-bold text-white mb-4">Najczęściej zadawane pytania</h3>
    <div>
      {items.map((item, i) => (
        <FAQItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  </section>
);
