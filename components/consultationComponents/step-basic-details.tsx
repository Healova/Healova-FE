import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BasicDetails } from "@/lib/types";

interface StepBasicDetailsProps {
  data: BasicDetails;
  onChange: (data: BasicDetails) => void;
}

export function StepBasicDetails({ data, onChange }: StepBasicDetailsProps) {
  const handleInputChange = (
    field: keyof BasicDetails,
    value: string | number
  ) => {
    // For numeric fields, convert to number (or 0 if blank)
    if (field === "age" || field === "height" || field === "weight") {
      const numValue = value === "" ? 0 : Number(value);
      onChange({ ...data, [field]: numValue });
    }
  };

  const handleMenstrualCycleChange = (
    value: "regular" | "irregular" | "very-irregular"
  ) => {
    onChange({ ...data, menstrualCycle: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            placeholder="28"
            value={data.age || ""}
            onChange={(e) => handleInputChange("age", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm) *</Label>
          <Input
            id="height"
            type="number"
            placeholder="165"
            value={data.height || ""}
            onChange={(e) => handleInputChange("height", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg) *</Label>
          <Input
            id="weight"
            type="number"
            placeholder="70"
            value={data.weight || ""}
            onChange={(e) => handleInputChange("weight", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Menstrual Cycle Regularity *</Label>
        <RadioGroup
          value={data.menstrualCycle}
          onValueChange={handleMenstrualCycleChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="regular" id="regular" />
            <Label htmlFor="regular" className="font-normal cursor-pointer">
              Regular (cycle within 21-35 days)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="irregular" id="irregular" />
            <Label htmlFor="irregular" className="font-normal cursor-pointer">
              Irregular (varies by a few days)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="very-irregular" id="very-irregular" />
            <Label
              htmlFor="very-irregular"
              className="font-normal cursor-pointer"
            >
              Very Irregular (unpredictable or absent)
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
