"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Phone, User } from "lucide-react";

// Mock data - replace with actual API call
const mockAppointments = [
  {
    id: 1,
    doctorName: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    date: "2024-01-15",
    time: "10:00 AM",
    contactNumber: "+1 (555) 123-4567",
    status: "confirmed"
  },
  {
    id: 2,
    doctorName: "Dr. Michael Chen",
    specialization: "Dermatology",
    date: "2024-01-18",
    time: "2:30 PM",
    contactNumber: "+1 (555) 987-6543",
    status: "pending"
  },
  {
    id: 3,
    doctorName: "Dr. Emily Rodriguez",
    specialization: "General Physician",
    date: "2024-01-22",
    time: "11:15 AM",
    contactNumber: "+1 (555) 456-7890",
    status: "confirmed"
  }
];

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is doctor and redirect
    const userType = localStorage.getItem('userType');
    if (userType === 'doctor') {
      router.push('/doctor-dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockAppointments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No upcoming appointments</p>
            ) : (
              <div className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div className="flex items-center gap-3">
                        <User className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">{appointment.doctorName}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialization}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{appointment.contactNumber}</span>
                        </div>
                        <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}