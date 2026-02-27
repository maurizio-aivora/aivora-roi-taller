import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  period: string;
  variant?: "default" | "warning" | "danger";
  delay?: number;
}

export const MetricCard = ({
  title,
  value,
  period,
  variant = "default",
  delay = 0,
}: MetricCardProps) => {
  const formattedValue = value.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-6 shadow-card animate-slide-up",
        "bg-card border border-border/50",
        "transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient accent bar */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1",
          variant === "danger" && "gradient-loss",
          variant === "warning" && "gradient-accent",
          variant === "default" && "gradient-primary"
        )}
      />
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
        <p
          className={cn(
            "text-3xl md:text-4xl font-display font-bold tracking-tight",
            variant === "danger" && "text-destructive",
            variant === "warning" && "text-accent",
            variant === "default" && "text-primary"
          )}
        >
          {formattedValue}
        </p>
        <p className="text-sm text-muted-foreground">
          {period}
        </p>
      </div>

      {/* Decorative element */}
      <div
        className={cn(
          "absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-5",
          variant === "danger" && "bg-destructive",
          variant === "warning" && "bg-accent",
          variant === "default" && "bg-primary"
        )}
      />
    </div>
  );
};
