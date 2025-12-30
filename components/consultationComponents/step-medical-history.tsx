import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { MedicalHistory } from "@/lib/types";

interface StepMedicalHistoryProps {
  data: MedicalHistory;
  onChange: (data: MedicalHistory) => void;
}

export function StepMedicalHistory({
  data,
  onChange,
}: StepMedicalHistoryProps) {
  const handleDiagnosisChange = (value: "pcod" | "pcos" | "not-diagnosed") => {
    onChange({ ...data, diagnosis: value });
  };

  const handleMedicationsChange = (value: string) => {
    onChange({ ...data, medications: value });
  };

  const handleReportsChange = (value: "yes" | "no") => {
    onChange({ ...data, reportsAvailable: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Previous Diagnosis</Label>
        <RadioGroup
          value={data.diagnosis}
          onValueChange={handleDiagnosisChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pcod" id="pcod" />
            <Label htmlFor="pcod" className="font-normal cursor-pointer">
              PCOD (Polycystic Ovarian Disease)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pcos" id="pcos" />
            <Label htmlFor="pcos" className="font-normal cursor-pointer">
              PCOS (Polycystic Ovary Syndrome)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not-diagnosed" id="not-diagnosed" />
            <Label
              htmlFor="not-diagnosed"
              className="font-normal cursor-pointer"
            >
              Not diagnosed yet
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="medications">Current Medications</Label>
        <Textarea
          id="medications"
          placeholder="List any medications you're currently taking..."
          value={data.medications}
          onChange={(e) => handleMedicationsChange(e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Do you have medical reports available?</Label>
        <RadioGroup
          value={data.reportsAvailable}
          onValueChange={handleReportsChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes" className="font-normal cursor-pointer">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no" className="font-normal cursor-pointer">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
