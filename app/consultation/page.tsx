"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

type Step = 1 | 2 | 3 | 4

export default function ConsultationPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [submitted, setSubmitted] = useState(false)

  // Form state
  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [menstrualCycle, setMenstrualCycle] = useState<"regular" | "irregular" | "very-irregular">("regular")

  // Symptoms
  const [irregularPeriods, setIrregularPeriods] = useState(false)
  const [acne, setAcne] = useState(false)
  const [weightGain, setWeightGain] = useState(false)
  const [hairLoss, setHairLoss] = useState(false)
  const [facialHair, setFacialHair] = useState(false)
  const [moodChanges, setMoodChanges] = useState(false)
  const [fatigue, setFatigue] = useState(false)
  const [otherSymptoms, setOtherSymptoms] = useState("")

  // Medical History
  const [diagnosis, setDiagnosis] = useState<"pcod" | "pcos" | "not-diagnosed">("not-diagnosed")
  const [medications, setMedications] = useState("")
  const [reportsAvailable, setReportsAvailable] = useState<"yes" | "no">("no")

  // Media uploads (simulated)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadedAudio, setUploadedAudio] = useState<string[]>([])
  const [uploadedVideo, setUploadedVideo] = useState<string[]>([])

  const progress = (step / 4) * 100

  const handleNext = () => {
    if (step < 4) {
      setStep((step + 1) as Step)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step)
    }
  }

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    console.log("[v0] Submitting consultation", {
      basicDetails: { age, height, weight, menstrualCycle },
      symptoms: {
        irregularPeriods,
        acne,
        weightGain,
        hairLoss,
        facialHair,
        moodChanges,
        fatigue,
        other: otherSymptoms,
      },
      medicalHistory: { diagnosis, medications, reportsAvailable },
      media: { images: uploadedImages, audio: uploadedAudio, video: uploadedVideo },
    })
    setSubmitted(true)
  }

  // File upload handler (simulated)
  const handleFileUpload = (type: "image" | "audio" | "video") => {
    const mockFile = `${type}-${Date.now()}.${type === "image" ? "jpg" : type === "audio" ? "mp3" : "mp4"}`
    if (type === "image") {
      setUploadedImages([...uploadedImages, mockFile])
    } else if (type === "audio") {
      setUploadedAudio([...uploadedAudio, mockFile])
    } else {
      setUploadedVideo([...uploadedVideo, mockFile])
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <Card className="text-center">
              <CardContent className="pt-12 pb-12">
                <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">Consultation Submitted Successfully!</h1>
                <p className="text-muted-foreground mb-8">
                  Thank you for submitting your consultation. Our expert doctors will review your information and
                  prepare a personalized treatment plan.
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  You'll receive your prescription and treatment plan within 24-48 hours via your patient dashboard and
                  WhatsApp.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={() => router.push("/")}>
                    Back to Home
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                    onClick={() => router.push("/dashboard/patient")}
                  >
                    View Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Step {step} of 4</span>
              <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Basic Details"}
                {step === 2 && "Symptoms"}
                {step === 3 && "Medical History"}
                {step === 4 && "Upload Reports"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Tell us about your basic health information"}
                {step === 2 && "Select all symptoms you're experiencing"}
                {step === 3 && "Share your medical history with us"}
                {step === 4 && "Upload any relevant medical reports or documents"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Step 1: Basic Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="28"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm) *</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="165"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg) *</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Menstrual Cycle Regularity *</Label>
                    <RadioGroup
                      value={menstrualCycle}
                      onValueChange={(v) => setMenstrualCycle(v as typeof menstrualCycle)}
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
                        <Label htmlFor="very-irregular" className="font-normal cursor-pointer">
                          Very Irregular (unpredictable or absent)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 2: Symptoms */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="irregular-periods"
                        checked={irregularPeriods}
                        onCheckedChange={(checked) => setIrregularPeriods(checked as boolean)}
                      />
                      <Label htmlFor="irregular-periods" className="font-normal cursor-pointer">
                        Irregular or missed periods
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="acne" checked={acne} onCheckedChange={(checked) => setAcne(checked as boolean)} />
                      <Label htmlFor="acne" className="font-normal cursor-pointer">
                        Acne
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="weight-gain"
                        checked={weightGain}
                        onCheckedChange={(checked) => setWeightGain(checked as boolean)}
                      />
                      <Label htmlFor="weight-gain" className="font-normal cursor-pointer">
                        Weight gain
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hair-loss"
                        checked={hairLoss}
                        onCheckedChange={(checked) => setHairLoss(checked as boolean)}
                      />
                      <Label htmlFor="hair-loss" className="font-normal cursor-pointer">
                        Hair loss (scalp)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="facial-hair"
                        checked={facialHair}
                        onCheckedChange={(checked) => setFacialHair(checked as boolean)}
                      />
                      <Label htmlFor="facial-hair" className="font-normal cursor-pointer">
                        Facial hair growth
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mood-changes"
                        checked={moodChanges}
                        onCheckedChange={(checked) => setMoodChanges(checked as boolean)}
                      />
                      <Label htmlFor="mood-changes" className="font-normal cursor-pointer">
                        Mood changes or anxiety
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fatigue"
                        checked={fatigue}
                        onCheckedChange={(checked) => setFatigue(checked as boolean)}
                      />
                      <Label htmlFor="fatigue" className="font-normal cursor-pointer">
                        Fatigue or low energy
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="other-symptoms">Other Symptoms</Label>
                    <Textarea
                      id="other-symptoms"
                      placeholder="Describe any other symptoms you're experiencing..."
                      value={otherSymptoms}
                      onChange={(e) => setOtherSymptoms(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Medical History */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Previous Diagnosis</Label>
                    <RadioGroup value={diagnosis} onValueChange={(v) => setDiagnosis(v as typeof diagnosis)}>
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
                        <Label htmlFor="not-diagnosed" className="font-normal cursor-pointer">
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
                      value={medications}
                      onChange={(e) => setMedications(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Do you have medical reports available?</Label>
                    <RadioGroup
                      value={reportsAvailable}
                      onValueChange={(v) => setReportsAvailable(v as typeof reportsAvailable)}
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
              )}

              {/* Step 4: Upload Reports */}
              {step === 4 && (
                <div className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Upload Images (Reports, Scans)</Label>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-pink-500 transition-colors"
                      onClick={() => handleFileUpload("image")}
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">Click to upload images</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 10MB</p>
                    </div>
                    {uploadedImages.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {uploadedImages.map((file, idx) => (
                          <div key={idx} className="text-sm text-muted-foreground">
                            ✓ {file}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Audio Upload */}
                  <div className="space-y-2">
                    <Label>Upload Audio (Voice Explanation)</Label>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-pink-500 transition-colors"
                      onClick={() => handleFileUpload("audio")}
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">Click to upload audio</p>
                      <p className="text-xs text-muted-foreground">MP3, WAV up to 25MB</p>
                    </div>
                    {uploadedAudio.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {uploadedAudio.map((file, idx) => (
                          <div key={idx} className="text-sm text-muted-foreground">
                            ✓ {file}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Video Upload */}
                  <div className="space-y-2">
                    <Label>Upload Video (Optional)</Label>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-pink-500 transition-colors"
                      onClick={() => handleFileUpload("video")}
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">Click to upload video</p>
                      <p className="text-xs text-muted-foreground">MP4, MOV up to 100MB</p>
                    </div>
                    {uploadedVideo.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {uploadedVideo.map((file, idx) => (
                          <div key={idx} className="text-sm text-muted-foreground">
                            ✓ {file}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Language Support:</strong> You can submit your consultation in any language. Our system
                      will automatically translate it for the doctor.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 && (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                )}
                {step < 4 ? (
                  <Button
                    className="ml-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    className="ml-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                    onClick={handleSubmit}
                  >
                    Submit Consultation
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
