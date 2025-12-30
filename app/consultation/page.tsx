"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  StepBasicDetails,
  StepSymptoms,
  StepMedicalHistory,
  StepMediaUpload,
} from "@/components/consultationComponents";
import {
  ConsultationStep,
  ConsultationFormData,
  BasicDetails,
  Symptoms,
  MedicalHistory,
  MediaFile,
} from "@/lib/types";
import { useUser } from "@/lib/user-context";
import { consultationsAPI, uploadAPI } from "@/lib/api";

export default function ConsultationPage() {
  const router = useRouter();
  const { currentUser, isLoading } = useUser();
  const [step, setStep] = useState<ConsultationStep>(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>("");

  // Form state
  const [formData, setFormData] = useState<ConsultationFormData>({
    basicDetails: {
      age: 0,
      height: 0,
      weight: 0,
      menstrualCycle: "regular",
    },
    symptoms: {
      irregularPeriods: false,
      acne: false,
      weightGain: false,
      hairLoss: false,
      facialHair: false,
      moodChanges: false,
      fatigue: false,
      other: "",
    },
    medicalHistory: {
      diagnosis: "not-diagnosed",
      medications: "",
      reportsAvailable: "no",
    },
    media: [],
  });

  // All hooks must be called before any conditional returns
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      formData.media.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [formData.media]);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/sign-in");
    }
    if (!isLoading && currentUser && currentUser.role !== "patient") {
      router.push("/dashboard/doctor");
    }
  }, [currentUser, isLoading, router]);

  const progress = (step / 4) * 100;

  const handleNext = () => {
    // Clear previous errors
    setError("");

    // Validate step 1: Basic Details
    if (step === 1) {
      if (
        !formData.basicDetails.age ||
        !formData.basicDetails.height ||
        !formData.basicDetails.weight
      ) {
        setError("Please fill in all basic details: Age, Height, and Weight");
        return;
      }
    }

    if (step < 4) {
      setStep((step + 1) as ConsultationStep);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as ConsultationStep);
    }
  };

  const handleBasicDetailsChange = (data: BasicDetails) => {
    setFormData((prev) => ({
      ...prev,
      basicDetails: data,
    }));
  };

  const handleSymptomsChange = (data: Symptoms) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: data,
    }));
  };

  const handleMedicalHistoryChange = (data: MedicalHistory) => {
    setFormData((prev) => ({
      ...prev,
      medicalHistory: data,
    }));
  };

  const handleMediaChange = (files: MediaFile[]) => {
    setFormData((prev) => ({
      ...prev,
      media: files,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validation
      if (
        !formData.basicDetails.age ||
        !formData.basicDetails.height ||
        !formData.basicDetails.weight
      ) {
        alert("Please fill in all basic details (Age, Height, Weight)");
        return;
      }

      setError("");
      setSubmitted(false);

      // Check if user is authenticated
      if (!currentUser || currentUser.role !== "patient") {
        throw new Error("You must be logged in as a patient to submit a consultation");
      }

      const mediaUrls = {
        images: [] as string[],
        audio: [] as string[],
        video: [] as string[],
      };

      if (formData.media.length > 0) {
        // Upload each file using the API client
        for (const mediaFile of formData.media) {
          try {
            const uploadData = await uploadAPI.uploadFile(mediaFile.file);
            
            if (uploadData.success) {
              if (uploadData.type === "images") {
                mediaUrls.images.push(uploadData.url);
              } else if (uploadData.type === "audio") {
                mediaUrls.audio.push(uploadData.url);
              } else if (uploadData.type === "video") {
                mediaUrls.video.push(uploadData.url);
              }
            } else {
              throw new Error(uploadData.message || `Failed to upload ${mediaFile.name}`);
            }
          } catch (uploadError: any) {
            throw new Error(`Failed to upload ${mediaFile.name}: ${uploadError.message}`);
          }
        }
      }

      // Prepare data for backend
      const submitData = {
        basicDetails: {
          age: formData.basicDetails.age,
          height: formData.basicDetails.height,
          weight: formData.basicDetails.weight,
          menstrualCycleRegularity: formData.basicDetails.menstrualCycle,
        },
        symptoms: {
          irregularPeriods: formData.symptoms.irregularPeriods,
          acne: formData.symptoms.acne,
          weightGain: formData.symptoms.weightGain,
          hairLoss: formData.symptoms.hairLoss,
          facialHair: formData.symptoms.facialHair,
          moodChanges: formData.symptoms.moodChanges,
          fatigue: formData.symptoms.fatigue,
          other: formData.symptoms.other || undefined,
        },
        medicalHistory: {
          previousDiagnosis: formData.medicalHistory.diagnosis,
          medications: formData.medicalHistory.medications || undefined,
          reportsAvailable: formData.medicalHistory.reportsAvailable === "yes",
        },
        media: mediaUrls,
        language: "English",
      };

      // Submit consultation using the API client
      const response = await consultationsAPI.create(submitData);
      
      if (!response.success) {
        throw new Error(response.message || "Failed to submit consultation");
      }

      setSubmitted(true);
      // Redirect to dashboard after successful submission
      setTimeout(() => {
        router.push("/dashboard/patient");
      }, 2000);
    } catch (error: any) {
      console.error("Error submitting consultation:", error);
      setError(error.message || "Error submitting consultation. Please try again.");
      alert(error.message || "Error submitting consultation. Please try again.");
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!currentUser || currentUser.role !== "patient") {
    return null;
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
                <h1 className="text-3xl font-bold mb-4">
                  Consultation Submitted Successfully!
                </h1>
                <p className="text-muted-foreground mb-8">
                  Thank you for submitting your consultation. Our expert doctors
                  will review your information and prepare a personalized
                  treatment plan.
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  You'll receive your prescription and treatment plan within
                  24-48 hours via your patient dashboard and WhatsApp.
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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Step {step} of 4
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(progress)}%
              </span>
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
                {step === 4 &&
                  "Upload any relevant medical reports or documents"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Step 1: Basic Details */}
              {step === 1 && (
                <StepBasicDetails
                  data={formData.basicDetails}
                  onChange={handleBasicDetailsChange}
                />
              )}

              {/* Step 2: Symptoms */}
              {step === 2 && (
                <StepSymptoms
                  data={formData.symptoms}
                  onChange={handleSymptomsChange}
                />
              )}

              {/* Step 3: Medical History */}
              {step === 3 && (
                <StepMedicalHistory
                  data={formData.medicalHistory}
                  onChange={handleMedicalHistoryChange}
                />
              )}

              {/* Step 4: Media Upload */}
              {step === 4 && (
                <StepMediaUpload
                  uploadedFiles={formData.media}
                  onFilesChange={handleMediaChange}
                />
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
  );
}
