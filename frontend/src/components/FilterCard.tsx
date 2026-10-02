import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type FilterCardProps = {
  value: string;
  onChange: (val: string) => void;
};

export function FilterCard({ value, onChange }: FilterCardProps) {
  const categories = [
    { id: "all", label: "All Products" },
    { id: "electronics", label: "Electronics" },
    { id: "study materials", label: "Study Materials" },
    { id: "hostel essentials", label: "Hostel Essentials" },
    { id: "clothing", label: "Clothing" },
    { id: "sports", label: "Sports" },
    { id: "vehicles", label: "Vehicles" },
    { id: "miscellaneous", label: "Miscellaneous" },
  ];

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground mb-4">Categories</h3>
        <RadioGroup value={value} onValueChange={onChange} className="flex flex-col gap-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-3">
              <RadioGroupItem 
                value={cat.id} 
                id={cat.id} 
                className="text-primary border-muted-foreground/30 data-[state=checked]:border-primary"
              />
              <Label 
                htmlFor={cat.id} 
                className={`text-sm cursor-pointer transition-colors hover:text-foreground ${value === cat.id ? 'text-foreground font-medium' : 'text-muted-foreground font-light'}`}
              >
                {cat.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="border-t border-border/50 pt-6">
        <h3 className="text-lg font-semibold tracking-tight text-foreground mb-4">Condition</h3>
        <div className="text-sm text-muted-foreground font-light italic">
          Coming soon
        </div>
      </div>
    </div>
  );
}
