"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, MapPin, Phone, Clock } from "lucide-react";
import specialities from "@/lib/specialities.json";

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    experience: 12,
    fee: 150,
    rating: 4.8,
    languages: ["English", "Spanish"],
    location: "New York, NY",
    phone: "+1 (555) 123-4567",
    availableTimings: "9:00 AM - 5:00 PM",
    photo: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Dermatology",
    experience: 8,
    fee: 120,
    rating: 4.6,
    languages: ["English", "Mandarin"],
    location: "Los Angeles, CA",
    phone: "+1 (555) 987-6543",
    availableTimings: "10:00 AM - 6:00 PM",
    photo: "/api/placeholder/100/100"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "General Physician",
    experience: 15,
    fee: 100,
    rating: 4.9,
    languages: ["English", "Spanish", "Portuguese"],
    location: "Miami, FL",
    phone: "+1 (555) 456-7890",
    availableTimings: "8:00 AM - 4:00 PM",
    photo: "/api/placeholder/100/100"
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({
    speciality: "",
    minFee: "",
    maxFee: "",
    language: "",
    experience: "",
    timing: ""
  });

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleSpecialityClick = (speciality: string) => {
    setSearchQuery(speciality);
    setFilters(prev => ({ ...prev, speciality }));
    setHasSearched(true);
  };

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesQuery = !searchQuery || 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpeciality = !filters.speciality || doctor.specialization === filters.speciality;
    const matchesFee = (!filters.minFee || doctor.fee >= parseInt(filters.minFee)) &&
                      (!filters.maxFee || doctor.fee <= parseInt(filters.maxFee));
    const matchesLanguage = !filters.language || doctor.languages.includes(filters.language);
    const matchesExperience = !filters.experience || doctor.experience >= parseInt(filters.experience);

    return matchesQuery && matchesSpeciality && matchesFee && matchesLanguage && matchesExperience;
  });

  if (!hasSearched) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Find Your Doctor</h1>
            <p className="text-muted-foreground mb-8">Search by name or speciality</p>
            
            <div className="max-w-2xl mx-auto flex gap-2">
              <Input
                placeholder="Search doctors or specialities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-lg py-6"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} size="lg" className="px-8">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">Browse by Speciality</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {specialities.map((speciality) => (
                <Card 
                  key={speciality} 
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleSpecialityClick(speciality)}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium text-sm">{speciality}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Search doctors or specialities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Left Panel - Filters */}
          <div className="w-80 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Speciality</label>
                  <Select value={filters.speciality} onValueChange={(value) => setFilters(prev => ({ ...prev, speciality: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialities.map((speciality) => (
                        <SelectItem key={speciality} value={speciality}>{speciality}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Fee Range</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Min"
                      type="number"
                      value={filters.minFee}
                      onChange={(e) => setFilters(prev => ({ ...prev, minFee: e.target.value }))}
                    />
                    <Input
                      placeholder="Max"
                      type="number"
                      value={filters.maxFee}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxFee: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select value={filters.language} onValueChange={(value) => setFilters(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="Mandarin">Mandarin</SelectItem>
                      <SelectItem value="Portuguese">Portuguese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Min Experience (years)</label>
                  <Input
                    placeholder="Years"
                    type="number"
                    value={filters.experience}
                    onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
                  />
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setFilters({ speciality: "", minFee: "", maxFee: "", language: "", experience: "", timing: "" })}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Search Results */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-muted-foreground">{filteredDoctors.length} doctors found</p>
            </div>

            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-accent rounded-lg flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold text-lg">
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{doctor.name}</h3>
                            <p className="text-muted-foreground">{doctor.specialization}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">${doctor.fee}</p>
                            <p className="text-sm text-muted-foreground">per consultation</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{doctor.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{doctor.experience} years experience</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{doctor.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{doctor.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{doctor.availableTimings}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex gap-1">
                            {doctor.languages.map((lang) => (
                              <Badge key={lang} variant="secondary" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                          <Button>Book Appointment</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}