import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Symptoms } from "@/lib/types";

interface StepSymptomsProps {
  data: Symptoms;
  onChange: (data: Symptoms) => void;
}

export function StepSymptoms({ data, onChange }: StepSymptomsProps) {
  const handleCheckboxChange = (
    field: keyof Omit<Symptoms, "other">,
    checked: boolean
  ) => {
    onChange({ ...data, [field]: checked });
  };

  const handleOtherChange = (value: string) => {
    onChange({ ...data, other: value });
  };

  const symptoms = [
    {
      id: "irregular-periods",
      label: "Irregular or missed periods",
      field: "irregularPeriods" as const,
    },
    { id: "acne", label: "Acne", field: "acne" as const },
    { id: "weight-gain", label: "Weight gain", field: "weightGain" as const },
    { id: "hair-loss", label: "Hair loss (scalp)", field: "hairLoss" as const },
    {
      id: "facial-hair",
      label: "Facial hair growth",
      field: "facialHair" as const,
    },
    {
      id: "mood-changes",
      label: "Mood changes or anxiety",
      field: "moodChanges" as const,
    },
    {
      id: "fatigue",
      label: "Fatigue or low energy",
      field: "fatigue" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {symptoms.map((symptom) => (
          <div key={symptom.id} className="flex items-center space-x-2">
            <Checkbox
              id={symptom.id}
              checked={data[symptom.field]}
              onCheckedChange={(checked) =>
                handleCheckboxChange(symptom.field, checked as boolean)
              }
            />
            <Label htmlFor={symptom.id} className="font-normal cursor-pointer">
              {symptom.label}
            </Label>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="other-symptoms">Other Symptoms</Label>
        <Textarea
          id="other-symptoms"
          placeholder="Describe any other symptoms you're experiencing..."
          value={data.other}
          onChange={(e) => handleOtherChange(e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
}
