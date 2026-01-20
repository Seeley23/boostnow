import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import industries from '@/data/industries.json';

export default function IndustriesSection() {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);

  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center">
            Personalizowanie w zależności od <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">branży</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Psychologia decyzji + mierzalne wyniki
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            Każda branża ma unikalne wyzwania. Dlatego personalizujemy naszą strategię do Twoich konkretnych potrzeb, celów i rynku.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedIndustry.id === industry.id
                  ? 'bg-lime-400 text-black'
                  : 'bg-card text-foreground hover:bg-card/80 border border-border'
              }`}
            >
              {industry.icon} {industry.name}
            </button>
          ))}
        </div>

        {/* Selected Industry Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Problem & Solutions */}
          <div>
            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {selectedIndustry.name}
              </h3>
              <p className="text-muted-foreground mb-6">
                {selectedIndustry.description}
              </p>

              {/* Problem */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3 text-foreground">
                  Problem
                </h4>
                <p className="text-muted-foreground">
                  {selectedIndustry.problem}
                </p>
              </div>

              {/* Solutions */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-foreground">
                  Nasze Rozwiązanie
                </h4>
                <div className="space-y-4">
                  {selectedIndustry.solutions.map((solution, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-lime-400 mt-2 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-foreground">
                          {solution.title}
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="mt-8 p-4 bg-lime-400/10 rounded-lg border border-lime-400/20">
                <p className="text-sm text-muted-foreground mb-2">Wynik</p>
                <p className="text-lg font-bold text-lime-400">
                  {selectedIndustry.result}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Case Study */}
          <div>
            <div className="bg-card rounded-xl p-8 border border-border h-full">
              <h4 className="text-2xl font-bold mb-2 text-foreground">
                Case Study
              </h4>
              <p className="text-muted-foreground mb-6">
                {selectedIndustry.caseStudy.title}
              </p>

              {/* Challenge */}
              <div className="mb-6">
                <h5 className="font-semibold text-foreground mb-2">Wyzwanie</h5>
                <p className="text-sm text-muted-foreground">
                  {selectedIndustry.caseStudy.challenge}
                </p>
              </div>

              {/* Strategy */}
              <div className="mb-6">
                <h5 className="font-semibold text-foreground mb-2">Strategia</h5>
                <p className="text-sm text-muted-foreground">
                  {selectedIndustry.caseStudy.strategy}
                </p>
              </div>

              {/* Results */}
              <div className="mb-6">
                <h5 className="font-semibold text-foreground mb-4">Wyniki</h5>
                <div className="space-y-3">
                  {selectedIndustry.caseStudy.results.map((result, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {result.metric}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {result.detail}
                        </p>
                      </div>
                      <p className="text-xl font-bold text-lime-400">
                        {result.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="p-4 bg-lime-400/10 rounded-lg border border-lime-400/20">
                <p className="text-sm text-muted-foreground mb-1">Czas realizacji</p>
                <p className="text-lg font-bold text-lime-400">
                  {selectedIndustry.caseStudy.timeline}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-500 transition-colors">
            Omów swoją sytuację
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-muted-foreground mt-4">
            Nie znalazłeś swojej branży? Skontaktuj się z nami - mamy rozwiązanie dla każdego biznesu.
          </p>
        </div>
      </div>
    </section>
  );
}
