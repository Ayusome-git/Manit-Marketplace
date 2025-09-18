import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type FilterCardProps = {
  value: string;
  onChange: (val: string) => void;
};

export function FilterCard({ value, onChange }: FilterCardProps) {
  return (
    <Card className="h-fit">
      <CardContent>
        <div className="mb-2">Category</div>
        <RadioGroup value={value} onValueChange={onChange}>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="all" id="r1" />
            <Label htmlFor="r1">All</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="electronics" id="r2" />
            <Label htmlFor="r2">Electronics & Gadgets</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="stationary" id="r3" />
            <Label htmlFor="r3">Books & Stationary</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="cycle" id="r4" />
            <Label htmlFor="r4">Cycle</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="furniture" id="r5" />
            <Label htmlFor="r5">Furniture</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="health" id="r6" />
            <Label htmlFor="r6">Health & Beauty</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="sports" id="r7" />
            <Label htmlFor="r7">Sports & Fitness</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="kitchen" id="r8" />
            <Label htmlFor="r8">Kitchen & Dining</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
