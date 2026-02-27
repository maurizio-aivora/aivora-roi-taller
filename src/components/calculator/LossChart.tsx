import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface LossChartProps {
  dailyLoss: number;
  monthlyLoss: number;
  annualLoss: number;
}

export const LossChart = ({ dailyLoss, monthlyLoss, annualLoss }: LossChartProps) => {
  const data = [
    { name: "Diario", value: dailyLoss, color: "hsl(222, 47%, 20%)" },
    { name: "Mensual", value: monthlyLoss, color: "hsl(25, 95%, 53%)" },
    { name: "Anual", value: annualLoss, color: "hsl(0, 84%, 60%)" },
  ];

  const formatCurrency = (value: number) =>
    value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  return (
    <div className="w-full h-[300px] md:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(220, 13%, 91%)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 14, fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), "Pérdida"]}
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(220, 13%, 91%)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{ color: "hsl(222, 47%, 11%)", fontWeight: 600 }}
          />
          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            maxBarSize={80}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
