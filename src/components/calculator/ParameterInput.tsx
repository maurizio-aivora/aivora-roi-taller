import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ParameterInputProps {
  label: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  type?: "number" | "slider" | "percentage";
  suffix?: string;
  icon?: React.ReactNode;
}

export const ParameterInput = ({
  label,
  description,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  type = "number",
  suffix = "",
  icon,
}: ParameterInputProps) => {
  const isSlider = type === "slider" || type === "percentage";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-muted-foreground">{icon}</span>
          )}
          <Label className="text-sm font-medium text-foreground">{label}</Label>
        </div>
        <span className="text-sm font-semibold text-primary tabular-nums">
          {type === "percentage" 
            ? `${value}%` 
            : value.toLocaleString('es-ES')}{suffix && ` ${suffix}`}
        </span>
      </div>
      
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {isSlider ? (
        <div className="pt-2">
          <Slider
            value={[value]}
            onValueChange={(values) => onChange(values[0])}
            min={min}
            max={max}
            step={step}
            className={cn(
              "w-full",
              type === "percentage" && value > 25 && "slider-warning"
            )}
          />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{min}{type === "percentage" ? "%" : ""}</span>
            <span>{max}{type === "percentage" ? "%" : ""}</span>
          </div>
        </div>
      ) : (
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="h-11 text-base font-medium"
        />
      )}
    </div>
  );
};
