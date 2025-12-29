"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2, Download, Send } from "lucide-react"
import type { Consultation, Patient } from "@/lib/types"
import Link from "next/link"

interface ConsultationDetailProps {
  consultation: Consultation
  patient: Patient | undefined
  doctorId: string
}

export function ConsultationDetail({ consultation, patient, doctorId }: ConsultationDetailProps) {
  const router = useRouter()
  const [diagnosis, setDiagnosis] = useState("")
  const [lifestyleRecommendations, setLifestyleRecommendations] = useState("")
  const [followUpNotes, setFollowUpNotes] = useState("")
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", duration: "", instructions: "" }])
  const [generating, setGenerating] = useState(false)

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "", instructions: "" }])
  }

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index))
  }

  const updateMedicine = (index: number, field: string, value: string) => {
    const updated = [...medicines]
    updated[index] = { ...updated[index], [field]: value }
    setMedicines(updated)
  }

  const handleGeneratePrescription = () => {
    setGenerating(true)
    // Simulate PDF generation
    setTimeout(() => {
      console.log("[v0] Prescription generated", {
        consultationId: consultation.id,
        patientId: consultation.patientId,
        doctorId,
        diagnosis,
        medicines,
        lifestyleRecommendations,
        followUpNotes,
      })
      setGenerating(false)
      alert("Prescription generated successfully! It will be sent to the patient via dashboard and WhatsApp.")
    }, 1500)
  }

  const symptoms = []
  if (consultation.symptoms.irregularPeriods) symptoms.push("Irregular periods")
  if (consultation.symptoms.acne) symptoms.push("Acne")
  if (consultation.symptoms.weightGain) symptoms.push("Weight gain")
  if (consultation.symptoms.hairLoss) symptoms.push("Hair loss")
  if (consultation.symptoms.facialHair) symptoms.push("Facial hair")
  if (consultation.symptoms.moodChanges) symptoms.push("Mood changes")
  if (consultation.symptoms.fatigue) symptoms.push("Fatigue")

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/doctor">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">Patient Consultation</h1>
              <p className="text-sm text-muted-foreground">{patient?.name}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Patient Information */}
          <div className="space-y-6">
            {/* Basic Details */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="font-medium">{consultation.basicDetails.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Height</p>
                    <p className="font-medium">{consultation.basicDetails.height} cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-medium">{consultation.basicDetails.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">BMI</p>
                    <p className="font-medium">
                      {(consultation.basicDetails.weight / Math.pow(consultation.basicDetails.height / 100, 2)).toFixed(
                        1,
                      )}
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Menstrual Cycle</p>
                  <Badge variant="outline">{consultation.basicDetails.menstrualCycleRegularity}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Symptoms */}
            <Card>
              <CardHeader>
                <CardTitle>Symptoms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {symptoms.map((symptom, idx) => (
                    <Badge key={idx} className="bg-pink-100 text-pink-800 border-pink-300">
                      {symptom}
                    </Badge>
                  ))}
                </div>
                {consultation.symptoms.other && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Additional Notes:</p>
                    <p className="text-sm">{consultation.symptoms.other}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medical History */}
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Previous Diagnosis</p>
                  <Badge variant="outline" className="uppercase">
                    {consultation.medicalHistory.previousDiagnosis}
                  </Badge>
                </div>
                {consultation.medicalHistory.medications && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Medications</p>
                    <p className="text-sm">{consultation.medicalHistory.medications}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Reports Available</p>
                  <p className="text-sm">{consultation.medicalHistory.reportsAvailable ? "Yes" : "No"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Media */}
            {consultation.media && (
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {consultation.media.images && consultation.media.images.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Images</p>
                      <div className="grid grid-cols-2 gap-2">
                        {consultation.media.images.map((image, idx) => (
                          <div key={idx} className="border rounded-lg p-2 text-sm">
                            {image}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {consultation.media.audio && consultation.media.audio.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Audio Files</p>
                      {consultation.media.audio.map((audio, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground">
                          {audio}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column: Prescription Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Prescription</CardTitle>
                <CardDescription>Generate a digital prescription for the patient</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Diagnosis */}
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnosis *</Label>
                  <Textarea
                    id="diagnosis"
                    placeholder="Enter diagnosis..."
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Medicines */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Medicines *</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addMedicine}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Medicine
                    </Button>
                  </div>

                  {medicines.map((medicine, idx) => (
                    <div key={idx} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Medicine {idx + 1}</span>
                        {medicines.length > 1 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeMedicine(idx)}>
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Medicine name"
                          value={medicine.name}
                          onChange={(e) => updateMedicine(idx, "name", e.target.value)}
                        />
                        <Input
                          placeholder="Dosage"
                          value={medicine.dosage}
                          onChange={(e) => updateMedicine(idx, "dosage", e.target.value)}
                        />
                        <Input
                          placeholder="Duration"
                          value={medicine.duration}
                          onChange={(e) => updateMedicine(idx, "duration", e.target.value)}
                        />
                        <Input
                          placeholder="Instructions"
                          value={medicine.instructions}
                          onChange={(e) => updateMedicine(idx, "instructions", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lifestyle Recommendations */}
                <div className="space-y-2">
                  <Label htmlFor="lifestyle">Lifestyle Recommendations *</Label>
                  <Textarea
                    id="lifestyle"
                    placeholder="Diet, exercise, sleep recommendations..."
                    value={lifestyleRecommendations}
                    onChange={(e) => setLifestyleRecommendations(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Follow-up Notes */}
                <div className="space-y-2">
                  <Label htmlFor="followup">Follow-up Notes *</Label>
                  <Textarea
                    id="followup"
                    placeholder="When to follow up, what tests to conduct..."
                    value={followUpNotes}
                    onChange={(e) => setFollowUpNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                    onClick={handleGeneratePrescription}
                    disabled={generating}
                  >
                    {generating ? (
                      "Generating..."
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Generate PDF
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" disabled={generating}>
                    <Send className="w-4 h-4 mr-2" />
                    Send via WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
