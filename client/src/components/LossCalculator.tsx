import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

/* LossCalculator Component
   Design: Human-centric, interactive loss estimation tool
   Based on: Marketing errors analysis (Overload, No Priorities, Effort)
   
   Calculates:
   - Monthly revenue loss from conversion drop
   - Lost opportunities from customer churn
   - Time waste from poor communication
   - Total annual impact
*/

export default function LossCalculator() {
  // Input sliders
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000);
  const [conversionRate, setConversionRate] = useState(2.5);
  const [avgOrderValue, setAvgOrderValue] = useState(150);
  const [customerChurnRate, setCustomerChurnRate] = useState(15);
  const [teamSize, setTeamSize] = useState(5);

  // Calculate losses
  const calculations = useMemo(() => {
    // Loss 1: Conversion drop from overload (average 60% lower conversion)
    const conversionDropPercent = 60;
    const currentMonthlyConversions = (monthlyRevenue / avgOrderValue) * (conversionRate / 100);
    const potentialConversions = currentMonthlyConversions / ((100 - conversionDropPercent) / 100);
    const lostConversions = potentialConversions - currentMonthlyConversions;
    const conversionLossMonthly = lostConversions * avgOrderValue;

    // Loss 2: Customer churn from poor communication
    const monthlyCustomers = (monthlyRevenue / avgOrderValue);
    const churnedCustomers = monthlyCustomers * (customerChurnRate / 100);
    const churnLossMonthly = churnedCustomers * avgOrderValue;

    // Loss 3: Team time waste (30% of time on ineffective communication)
    const avgSalaryMonthly = 4000; // Average salary
    const timeWastePercent = 30;
    const timeWasteMonthly = (teamSize * avgSalaryMonthly) * (timeWastePercent / 100);

    // Total monthly loss
    const totalMonthlyLoss = conversionLossMonthly + churnLossMonthly + timeWasteMonthly;
    const totalAnnualLoss = totalMonthlyLoss * 12;

    // Potential recovery with BoostNow (average 380% conversion increase)
    const recoveryPercent = 380;
    const potentialRecovery = (totalMonthlyLoss * recoveryPercent / 100);

    return {
      conversionLossMonthly: Math.round(conversionLossMonthly),
      churnLossMonthly: Math.round(churnLossMonthly),
      timeWasteMonthly: Math.round(timeWasteMonthly),
      totalMonthlyLoss: Math.round(totalMonthlyLoss),
      totalAnnualLoss: Math.round(totalAnnualLoss),
      potentialRecovery: Math.round(potentialRecovery),
    };
  }, [monthlyRevenue, conversionRate, avgOrderValue, customerChurnRate, teamSize]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/50 to-gray-900/30 border-t border-gray-800">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Kalkulator Strat
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Oszacuj, ile pieniędzy tracisz każdego miesiąca przez błędy marketingowe.
            Wprowadź dane swojej firmy poniżej.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="p-6 bg-gray-900/80 border-gray-800">
              <label className="block mb-4">
                <span className="text-white font-semibold mb-2 block">
                  📊 Przychód miesięczny: {formatCurrency(monthlyRevenue)}
                </span>
                <Slider
                  value={[monthlyRevenue]}
                  onValueChange={(val) => setMonthlyRevenue(val[0])}
                  min={10000}
                  max={500000}
                  step={10000}
                  className="w-full"
                />
                <p className="text-gray-500 text-sm mt-2">10k - 500k PLN</p>
              </label>
            </Card>

            <Card className="p-6 bg-gray-900/80 border-gray-800">
              <label className="block mb-4">
                <span className="text-white font-semibold mb-2 block">
                  📈 Obecna konwersja: {conversionRate.toFixed(1)}%
                </span>
                <Slider
                  value={[conversionRate]}
                  onValueChange={(val) => setConversionRate(val[0])}
                  min={0.5}
                  max={10}
                  step={0.5}
                  className="w-full"
                />
                <p className="text-gray-500 text-sm mt-2">0.5% - 10%</p>
              </label>
            </Card>

            <Card className="p-6 bg-gray-900/80 border-gray-800">
              <label className="block mb-4">
                <span className="text-white font-semibold mb-2 block">
                  💰 Średnia wartość zamówienia: {formatCurrency(avgOrderValue)}
                </span>
                <Slider
                  value={[avgOrderValue]}
                  onValueChange={(val) => setAvgOrderValue(val[0])}
                  min={50}
                  max={5000}
                  step={50}
                  className="w-full"
                />
                <p className="text-gray-500 text-sm mt-2">50 - 5000 PLN</p>
              </label>
            </Card>

            <Card className="p-6 bg-gray-900/80 border-gray-800">
              <label className="block mb-4">
                <span className="text-white font-semibold mb-2 block">
                  ⚠️ Rezygnacja klientów: {customerChurnRate.toFixed(0)}%
                </span>
                <Slider
                  value={[customerChurnRate]}
                  onValueChange={(val) => setCustomerChurnRate(val[0])}
                  min={5}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <p className="text-gray-500 text-sm mt-2">5% - 50%</p>
              </label>
            </Card>

            <Card className="p-6 bg-gray-900/80 border-gray-800">
              <label className="block mb-4">
                <span className="text-white font-semibold mb-2 block">
                  👥 Wielkość zespołu: {teamSize} osób
                </span>
                <Slider
                  value={[teamSize]}
                  onValueChange={(val) => setTeamSize(val[0])}
                  min={1}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <p className="text-gray-500 text-sm mt-2">1 - 50 osób</p>
              </label>
            </Card>
          </motion.div>

          {/* Results Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Loss Breakdown */}
            <Card className="p-6 bg-gradient-to-br from-red-900/40 to-red-900/20 border-red-800/50">
              <h3 className="text-white font-bold text-lg mb-4">📉 Rozbicie Strat</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-red-800/30">
                  <span className="text-gray-300">Utrata konwersji (przeładowanie):</span>
                  <span className="text-red-400 font-bold">
                    {formatCurrency(calculations.conversionLossMonthly)}/msc
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-red-800/30">
                  <span className="text-gray-300">Rezygnacja klientów (brak priorytetów):</span>
                  <span className="text-red-400 font-bold">
                    {formatCurrency(calculations.churnLossMonthly)}/msc
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Strata czasu zespołu (wysiłek):</span>
                  <span className="text-red-400 font-bold">
                    {formatCurrency(calculations.timeWasteMonthly)}/msc
                  </span>
                </div>
              </div>
            </Card>

            {/* Monthly Loss */}
            <Card className="p-6 bg-gradient-to-br from-red-900/60 to-red-900/40 border-red-700">
              <div className="text-center">
                <p className="text-gray-300 text-sm mb-2">💔 Całkowita strata miesięczna</p>
                <p className="text-4xl font-bold text-red-400 mb-2">
                  {formatCurrency(calculations.totalMonthlyLoss)}
                </p>
                <p className="text-gray-400 text-sm">
                  To {Math.round(calculations.totalMonthlyLoss / 30)} PLN dziennie
                </p>
              </div>
            </Card>

            {/* Annual Loss */}
            <Card className="p-6 bg-gradient-to-br from-orange-900/60 to-orange-900/40 border-orange-700">
              <div className="text-center">
                <p className="text-gray-300 text-sm mb-2">📊 Całkowita strata roczna</p>
                <p className="text-4xl font-bold text-orange-400">
                  {formatCurrency(calculations.totalAnnualLoss)}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Równowartość {Math.round(calculations.totalAnnualLoss / 50000)} pełnych miesięcy przychodu
                </p>
              </div>
            </Card>

            {/* Recovery Potential */}
            <Card className="p-6 bg-gradient-to-br from-lime-900/40 to-lime-900/20 border-lime-800/50">
              <div className="text-center">
                <p className="text-gray-300 text-sm mb-2">🚀 Potencjalny zwrot z BoostNow</p>
                <p className="text-3xl font-bold text-lime-400 mb-2">
                  {formatCurrency(calculations.potentialRecovery)}/msc
                </p>
                <p className="text-gray-400 text-sm">
                  Średni wzrost konwersji +380% = {formatCurrency(calculations.potentialRecovery * 12)} rocznie
                </p>
              </div>
            </Card>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-lime-500 hover:bg-lime-600 text-black font-bold rounded-lg transition-colors"
            >
              Zarezerwuj Bezpłatną Konsultację
            </motion.button>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-12"
        >
          * Kalkulator bazuje na średnich branżowych i danych z 47 klientów BoostNow.
          Rzeczywiste straty mogą się różnić w zależności od branży i modelu biznesu.
        </motion.p>
      </div>
    </section>
  );
}
