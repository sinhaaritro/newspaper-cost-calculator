import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputRowProps {
  label: string;
  id: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export function InputRow({
  label,
  id,
  value,
  onChange,
  placeholder,
}: InputRowProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        min={0}
        maxLength={3}
        className="w-24"
      />
    </div>
  );
}
