import { useState, useMemo } from "react";
import { Phone, TrendingDown, Euro, Calendar, AlertTriangle, Receipt } from "lucide-react";
import { ParameterInput } from "./ParameterInput";
import { MetricCard } from "./MetricCard";
import { LossChart } from "./LossChart";
import { SummaryTable } from "./SummaryTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import aivoraLogo from "@/assets/logo-aivora-negativo.png";

const WORKING_DAYS_MONTH = 22;
const WORKING_DAYS_YEAR = 250;

export const ROICalculator = () => {
  // Parámetros del taller (valores por defecto del caso de estudio)
  const [dailyCalls, setDailyCalls] = useState(100);
  const [conversionRate, setConversionRate] = useState(50);
  const [averageTicket, setAverageTicket] = useState(200);
  const [marginPercentage, setMarginPercentage] = useState(40);
  const [lostCallsPercentage, setLostCallsPercentage] = useState(15);

  // Calcular margen neto basado en ticket medio y % margen
  const netMargin = useMemo(() => {
    return averageTicket * (marginPercentage / 100);
  }, [averageTicket, marginPercentage]);

  // Cálculos
  const calculations = useMemo(() => {
    const lostCallsDaily = dailyCalls * (lostCallsPercentage / 100);
    const lostAppointmentsDaily = lostCallsDaily * (conversionRate / 100);
    const dailyLoss = lostAppointmentsDaily * netMargin;
    const monthlyLoss = dailyLoss * WORKING_DAYS_MONTH;
    const annualLoss = dailyLoss * WORKING_DAYS_YEAR;

    return {
      lostCallsDaily,
      lostAppointmentsDaily,
      dailyLoss,
      monthlyLoss,
      annualLoss,
    };
  }, [dailyCalls, conversionRate, netMargin, lostCallsPercentage]);

  const getVariant = (loss: number, threshold1: number, threshold2: number) => {
    if (loss >= threshold2) return "danger";
    if (loss >= threshold1) return "warning";
    return "default";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground py-12 md:py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  Calculadora de Impacto Económico
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80 mt-2">
                  Descubre cuánto dinero pierde tu taller por llamadas no atendidas
                </p>
              </div>
            </div>
            <img 
              src={aivoraLogo} 
              alt="Aivora" 
              className="h-12 md:h-16 lg:h-20 w-auto object-contain"
            />
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Panel de Parámetros */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-display flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-accent" />
                  Parámetros del Taller
                </CardTitle>
                <CardDescription>
                  Ajusta los valores según tu situación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ParameterInput
                  label="Llamadas Diarias"
                  description="Media de llamadas entrantes al día"
                  value={dailyCalls}
                  onChange={setDailyCalls}
                  min={10}
                  max={500}
                  step={10}
                  icon={<Phone className="w-4 h-4" />}
                />

                <Separator />

                <ParameterInput
                  label="Tasa de Conversión"
                  description="% de llamadas que se convierten en cita"
                  value={conversionRate}
                  onChange={setConversionRate}
                  min={10}
                  max={100}
                  step={5}
                  type="percentage"
                  icon={<Calendar className="w-4 h-4" />}
                />

                <Separator />

                <ParameterInput
                  label="Ticket Medio"
                  description="Importe medio de cada intervención"
                  value={averageTicket}
                  onChange={setAverageTicket}
                  min={50}
                  max={1000}
                  step={10}
                  suffix="€"
                  icon={<Receipt className="w-4 h-4" />}
                />

                <Separator />

                <ParameterInput
                  label="Margen de Beneficio"
                  description="% de margen neto sobre el ticket"
                  value={marginPercentage}
                  onChange={setMarginPercentage}
                  min={10}
                  max={80}
                  step={5}
                  type="percentage"
                  icon={<Euro className="w-4 h-4" />}
                />

                {/* Margen calculado */}
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Margen por intervención</span>
                    <span className="text-lg font-semibold text-foreground">
                      {netMargin.toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-accent uppercase tracking-wide">
                      Escenario a Simular
                    </span>
                  </div>
                  <ParameterInput
                    label="Llamadas Perdidas"
                    description="% de llamadas que no se atienden"
                    value={lostCallsPercentage}
                    onChange={setLostCallsPercentage}
                    min={0}
                    max={60}
                    step={1}
                    type="percentage"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel de Resultados */}
          <div className="lg:col-span-2 space-y-8">
            {/* Métricas principales */}
            <section>
              <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                Impacto Económico con {lostCallsPercentage}% de pérdida
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <MetricCard
                  title="Pérdida Diaria"
                  value={calculations.dailyLoss}
                  period="cada día laborable"
                  variant={getVariant(calculations.dailyLoss, 500, 1000)}
                  delay={0}
                />
                <MetricCard
                  title="Pérdida Mensual"
                  value={calculations.monthlyLoss}
                  period="22 días laborables"
                  variant={getVariant(calculations.monthlyLoss, 10000, 25000)}
                  delay={100}
                />
                <MetricCard
                  title="Pérdida Anual"
                  value={calculations.annualLoss}
                  period="250 días laborables"
                  variant="danger"
                  delay={200}
                />
              </div>
            </section>

            {/* Gráfico */}
            <section>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg font-display">
                    Proyección de Pérdidas
                  </CardTitle>
                  <CardDescription>
                    Visualización del impacto económico por periodo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LossChart
                    dailyLoss={calculations.dailyLoss}
                    monthlyLoss={calculations.monthlyLoss}
                    annualLoss={calculations.annualLoss}
                  />
                </CardContent>
              </Card>
            </section>

            {/* Tabla resumen */}
            <section>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg font-display">
                    Resumen del Escenario
                  </CardTitle>
                  <CardDescription>
                    Desglose detallado de las métricas calculadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SummaryTable
                    lostAppointmentsDaily={calculations.lostAppointmentsDaily}
                    dailyLoss={calculations.dailyLoss}
                    monthlyLoss={calculations.monthlyLoss}
                    annualLoss={calculations.annualLoss}
                    averageTicket={averageTicket}
                    netMargin={netMargin}
                  />
                </CardContent>
              </Card>
            </section>

            {/* Nota informativa */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Nota:</strong> Los cálculos se basan en{" "}
                <span className="font-medium">{WORKING_DAYS_MONTH} días laborables al mes</span> y{" "}
                <span className="font-medium">{WORKING_DAYS_YEAR} días al año</span>. Los valores 
                reales pueden variar según la operativa de cada taller.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <div className="container max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Calculadora de impacto económico para talleres de automoción
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Powered by</span>
            <img 
              src={aivoraLogo} 
              alt="Aivora" 
              className="h-6 w-auto object-contain brightness-0 opacity-60"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};
