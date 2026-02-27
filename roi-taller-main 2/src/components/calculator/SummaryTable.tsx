import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SummaryTableProps {
  lostAppointmentsDaily: number;
  dailyLoss: number;
  monthlyLoss: number;
  annualLoss: number;
  averageTicket?: number;
  netMargin?: number;
}

export const SummaryTable = ({
  lostAppointmentsDaily,
  dailyLoss,
  monthlyLoss,
  annualLoss,
  averageTicket,
  netMargin,
}: SummaryTableProps) => {
  const formatCurrency = (value: number) =>
    value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const data = [
    ...(averageTicket ? [{ metric: "Ticket Medio", value: formatCurrency(averageTicket) }] : []),
    ...(netMargin ? [{ metric: "Margen por Intervención", value: formatCurrency(netMargin) }] : []),
    { metric: "Citas Perdidas Diarias", value: lostAppointmentsDaily.toFixed(1) },
    { metric: "Pérdida Diaria", value: formatCurrency(dailyLoss) },
    { metric: "Pérdida Mensual", value: formatCurrency(monthlyLoss) },
    { metric: "Pérdida Anual", value: formatCurrency(annualLoss) },
  ];

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold text-foreground">Métrica</TableHead>
            <TableHead className="text-right font-semibold text-foreground">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.metric}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TableCell className="font-medium text-muted-foreground">
                {row.metric}
              </TableCell>
              <TableCell className="text-right font-semibold text-foreground tabular-nums">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
