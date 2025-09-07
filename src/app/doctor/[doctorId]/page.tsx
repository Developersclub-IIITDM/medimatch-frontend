"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Phone, Clock, GraduationCap, Award, Calendar as CalendarIcon } from "lucide-react";

// Mock doctor data - replace with API call using params.doctorId
const mockDoctor = {
  id: 1,
  name: "Dr. Sarah Johnson",
  specialization: "Cardiology",
  experience: 12,
  fee: 150,
  rating: 4.8,
  reviewCount: 245,
  languages: ["English", "Spanish", "French"],
  location: "New York, NY",
  phone: "+1 (555) 123-4567",
  email: "sarah.johnson@medimatch.com",
  availableTimings: "9:00 AM - 5:00 PM",
  photo: "/api/placeholder/200/200",
  education: [
    "MD - Harvard Medical School (2010)",
    "Residency - Johns Hopkins Hospital (2014)",
    "Fellowship - Mayo Clinic (2016)"
  ],
  certifications: [
    "Board Certified Cardiologist",
    "Advanced Cardiac Life Support (ACLS)",
    "Interventional Cardiology Certification"
  ],
  bio: "Dr. Sarah Johnson is a highly experienced cardiologist with over 12 years of practice. She specializes in interventional cardiology and has performed over 2,000 cardiac procedures. Dr. Johnson is committed to providing personalized care and staying current with the latest advances in cardiovascular medicine.",
  clinicAddress: "123 Medical Center Drive, Suite 400, New York, NY 10001",
  availableSlots: {
    "2024-01-15": ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
    "2024-01-16": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2024-01-17": ["10:00 AM", "2:30 PM", "4:00 PM"],
    "2024-01-18": ["9:30 AM", "11:30 AM", "3:00 PM", "4:30 PM"]
  } as Record<string, string[]>
};

// export default function DoctorProfilePage({ params }: { params: { doctorId: string } }) {
export default function DoctorProfilePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getAvailableSlots = () => {
    if (!selectedDate) return [];
    const dateStr = formatDate(selectedDate);
    return mockDoctor.availableSlots[dateStr] || [];
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) return;
    
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Appointment booked for ${formatDate(selectedDate)} at ${selectedTime}`);
      setIsBooking(false);
      setSelectedTime("");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Profile - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-32 h-32 bg-accent rounded-lg flex items-center justify-center">
                    <div className="w-28 h-28 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-3xl">
                        {mockDoctor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{mockDoctor.name}</h1>
                    <p className="text-xl text-muted-foreground mb-4">{mockDoctor.specialization}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{mockDoctor.rating}</span>
                        <span className="text-muted-foreground">({mockDoctor.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                        <span>{mockDoctor.experience} years experience</span>
                      </div>
                    </div>

                    <div className="text-3xl font-bold text-primary mb-4">
                      ${mockDoctor.fee} <span className="text-base font-normal text-muted-foreground">per consultation</span>
                    </div>

                    <div className="flex gap-2">
                      {mockDoctor.languages.map((lang) => (
                        <Badge key={lang} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Location */}
            <Card>
              <CardHeader>
                <CardTitle>Contact & Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{mockDoctor.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{mockDoctor.clinicAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{mockDoctor.availableTimings}</span>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About Dr. {mockDoctor.name.split(' ')[1]}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{mockDoctor.bio}</p>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockDoctor.education.map((edu, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockDoctor.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Award className="h-4 w-4 text-primary" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Appointment Booking - Right Column */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Book Appointment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                    className="rounded-md border"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Available Times</label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableSlots().map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {getAvailableSlots().length === 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        No available slots for this date
                      </p>
                    )}
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="p-4 bg-accent rounded-lg">
                    <h4 className="font-semibold mb-2">Appointment Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      Date: {selectedDate.toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Time: {selectedTime}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Fee: ${mockDoctor.fee}
                    </p>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  onClick={handleBookAppointment}
                  disabled={!selectedDate || !selectedTime || isBooking}
                >
                  {isBooking ? "Booking..." : "Book Appointment"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}