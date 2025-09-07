import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser, getTodaysAppointments } from "@/lib/server/dashboard";

export default async function DoctorDashboard() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }
  
  if (user.role !== "D") {
    redirect("/dashboard");
  }
  
  const appointments = await getTodaysAppointments(user.user_id);
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Appointments ({appointments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <p className="text-muted-foreground">No appointments scheduled for today.</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={appointment.patient.picture} />
                        <AvatarFallback>{appointment.patient.full_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{appointment.patient.full_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.patient.age} years, {appointment.patient.gender === 'M' ? 'Male' : appointment.patient.gender === 'F' ? 'Female' : 'Other'}
                        </p>
                        <p className="text-sm font-medium">📞 {appointment.patient.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {new Date(appointment.appointment_time).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <Badge variant={appointment.status === 'S' ? 'default' : appointment.status === 'C' ? 'secondary' : 'destructive'}>
                        {appointment.status === 'S' ? 'Scheduled' : appointment.status === 'C' ? 'Completed' : 'Cancelled'}
                      </Badge>
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