"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Stethoscope, ArrowLeft, ArrowRight, Upload } from "lucide-react";
import specialities from "@/lib/specialities.json";

type UserType = "doctor" | "patient" | null;

interface DoctorFormData {
  fullName: string;
  age: string;
  gender: string;
  phone: string;
  picture: File | null;
  specialization: string;
  experience: string;
  regNo: string;
  languages: string;
  address: string;
  bio: string;
}

interface PatientFormData {
  fullName: string;
  age: string;
  gender: string;
  phone: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<UserType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [doctorData, setDoctorData] = useState<DoctorFormData>({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    picture: null,
    specialization: "",
    experience: "",
    regNo: "",
    languages: "",
    address: "",
    bio: "",
  });

  const [patientData, setPatientData] = useState<PatientFormData>({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
  });

  const handleDoctorDataChange = (field: keyof DoctorFormData, value: string | File) => {
    setDoctorData(prev => ({ ...prev, [field]: value }));
  };

  const handlePatientDataChange = (field: keyof PatientFormData, value: string) => {
    setPatientData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleDoctorDataChange("picture", file);
    }
  };

  const nextStep = () => {
    if (userType === "doctor" && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (userType === "patient" && currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (userType === "doctor") {
        // Create FormData for file upload
        const formData = new FormData();
        Object.entries(doctorData).forEach(([key, value]) => {
          if (value !== null) {
            formData.append(key, value as string | File);
          }
        });

        const response = await fetch("/api/doctor-profile", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          router.push("/doctor-dashboard");
        } else {
          throw new Error("Failed to submit doctor profile");
        }
      } else if (userType === "patient") {
        const response = await fetch("/api/user-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        });

        if (response.ok) {
          router.push("/dashboard");
        } else {
          throw new Error("Failed to submit patient profile");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRoleSelection = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome to MediMatch</CardTitle>
        <p className="text-muted-foreground">Let's get you set up. Are you a doctor or a patient?</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className={`cursor-pointer transition-all hover:border-primary ${
              userType === "doctor" ? "border-primary bg-accent" : ""
            }`}
            onClick={() => setUserType("doctor")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Stethoscope className="h-12 w-12 mb-4 text-primary" />
              <h3 className="font-semibold text-lg">I'm a Doctor</h3>
              <p className="text-sm text-muted-foreground text-center">
                Join as a healthcare provider
              </p>
            </CardContent>
          </Card>
          
          <Card
            className={`cursor-pointer transition-all hover:border-primary ${
              userType === "patient" ? "border-primary bg-accent" : ""
            }`}
            onClick={() => setUserType("patient")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <User className="h-12 w-12 mb-4 text-primary" />
              <h3 className="font-semibold text-lg">I'm a Patient</h3>
              <p className="text-sm text-muted-foreground text-center">
                Looking for healthcare services
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={nextStep} 
            disabled={!userType}
            className="w-32"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDoctorStep1 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={doctorData.fullName}
              onChange={(e) => handleDoctorDataChange("fullName", e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={doctorData.age}
              onChange={(e) => handleDoctorDataChange("age", e.target.value)}
              placeholder="Enter your age"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <RadioGroup
            value={doctorData.gender}
            onValueChange={(value) => handleDoctorDataChange("gender", value)}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="M" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="F" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="O" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={doctorData.phone}
            onChange={(e) => handleDoctorDataChange("phone", e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="picture">Profile Picture</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("picture")?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              {doctorData.picture ? doctorData.picture.name : "Upload Picture"}
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={nextStep} disabled={!doctorData.fullName || !doctorData.age || !doctorData.gender || !doctorData.phone}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDoctorStep2 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
        <p className="text-muted-foreground">Your medical expertise</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Select
            value={doctorData.specialization}
            onValueChange={(value) => handleDoctorDataChange("specialization", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your specialization" />
            </SelectTrigger>
            <SelectContent>
              {specialities.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              value={doctorData.experience}
              onChange={(e) => handleDoctorDataChange("experience", e.target.value)}
              placeholder="Enter years of experience"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="regNo">Registration Number</Label>
            <Input
              id="regNo"
              value={doctorData.regNo}
              onChange={(e) => handleDoctorDataChange("regNo", e.target.value)}
              placeholder="Enter registration number"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="languages">Known Languages</Label>
          <Input
            id="languages"
            value={doctorData.languages}
            onChange={(e) => handleDoctorDataChange("languages", e.target.value)}
            placeholder="e.g., English, Hindi, Tamil (comma separated)"
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={nextStep} disabled={!doctorData.specialization || !doctorData.experience || !doctorData.regNo}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDoctorStep3 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Practice Information</CardTitle>
        <p className="text-muted-foreground">About your practice</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Clinic Address</Label>
          <Textarea
            id="address"
            value={doctorData.address}
            onChange={(e) => handleDoctorDataChange("address", e.target.value)}
            placeholder="Enter your clinic address"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio (About Me)</Label>
          <Textarea
            id="bio"
            value={doctorData.bio}
            onChange={(e) => handleDoctorDataChange("bio", e.target.value)}
            placeholder="Tell patients about yourself, your approach to medicine, etc."
            rows={4}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!doctorData.address || !doctorData.bio || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Complete Setup"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderPatientStep1 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patientFullName">Full Name</Label>
            <Input
              id="patientFullName"
              value={patientData.fullName}
              onChange={(e) => handlePatientDataChange("fullName", e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patientAge">Age</Label>
            <Input
              id="patientAge"
              type="number"
              value={patientData.age}
              onChange={(e) => handlePatientDataChange("age", e.target.value)}
              placeholder="Enter your age"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <RadioGroup
            value={patientData.gender}
            onValueChange={(value) => handlePatientDataChange("gender", value)}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="M" id="patientMale" />
              <Label htmlFor="patientMale">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="F" id="patientFemale" />
              <Label htmlFor="patientFemale">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="O" id="patientOther" />
              <Label htmlFor="patientOther">Other</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="patientPhone">Phone Number</Label>
          <Input
            id="patientPhone"
            value={patientData.phone}
            onChange={(e) => handlePatientDataChange("phone", e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!patientData.fullName || !patientData.age || !patientData.gender || !patientData.phone || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Complete Setup"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderProgressBar = () => {
    const totalSteps = userType === "doctor" ? 4 : 2;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
      <div className="w-full max-w-2xl mx-auto mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-accent rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto">
        {currentStep > 0 && renderProgressBar()}
        
        {currentStep === 0 && renderRoleSelection()}
        
        {userType === "doctor" && (
          <>
            {currentStep === 1 && renderDoctorStep1()}
            {currentStep === 2 && renderDoctorStep2()}
            {currentStep === 3 && renderDoctorStep3()}
          </>
        )}
        
        {userType === "patient" && currentStep === 1 && renderPatientStep1()}
      </div>
    </div>
  );
}