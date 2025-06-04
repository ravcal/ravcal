"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Check, Loader2, Upload } from "lucide-react"

export function AddDriverForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [birthDate, setBirthDate] = useState<Date>()
  const [hireDate, setHireDate] = useState<Date>()
  const [licenseExpiry, setLicenseExpiry] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      // Show success message or redirect
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Add New Driver</CardTitle>
          <CardDescription>Enter the details of the new driver to add to your fleet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="employment">Employment Details</TabsTrigger>
              <TabsTrigger value="license">License & Certification</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6 pt-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>+</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Upload photo
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {birthDate ? format(birthDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={setBirthDate}
                        initialFocus
                        disabled={(date) => date > new Date() || date < new Date("1940-01-01")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input id="zipCode" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" placeholder="Name and phone number" />
              </div>
            </TabsContent>

            <TabsContent value="employment" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="driverId">Driver ID</Label>
                  <Input id="driverId" placeholder="e.g. D006" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="onLeave">On Leave</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hireDate">Hire Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {hireDate ? format(hireDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={hireDate} onSelect={setHireDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedVehicle">Assigned Vehicle</Label>
                  <Select>
                    <SelectTrigger id="assignedVehicle">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fl-001">FL-001 (Ford Transit)</SelectItem>
                      <SelectItem value="fl-002">FL-002 (Mercedes Sprinter)</SelectItem>
                      <SelectItem value="fl-003">FL-003 (Chevrolet Express)</SelectItem>
                      <SelectItem value="fl-004">FL-004 (Ford E-Series)</SelectItem>
                      <SelectItem value="fl-005">FL-005 (Isuzu NPR)</SelectItem>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Select defaultValue="fullTime">
                    <SelectTrigger id="employmentType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullTime">Full-time</SelectItem>
                      <SelectItem value="partTime">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payRate">Pay Rate ($/hour)</Label>
                  <Input id="payRate" type="number" step="0.01" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Skills & Experience</h3>
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience">Years of Driving Experience</Label>
                  <Input id="yearsExperience" type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Vehicle Types Experience</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="van" className="rounded border-gray-300" />
                      <Label htmlFor="van" className="font-normal">
                        Van
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="truck" className="rounded border-gray-300" />
                      <Label htmlFor="truck" className="font-normal">
                        Truck
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="bus" className="rounded border-gray-300" />
                      <Label htmlFor="bus" className="font-normal">
                        Bus
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="forklift" className="rounded border-gray-300" />
                      <Label htmlFor="forklift" className="font-normal">
                        Forklift
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="hazmat" className="rounded border-gray-300" />
                      <Label htmlFor="hazmat" className="font-normal">
                        Hazmat
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Additional information about this driver" />
              </div>
            </TabsContent>

            <TabsContent value="license" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Driver's License Number</Label>
                  <Input id="licenseNumber" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseState">Issuing State/Province</Label>
                  <Input id="licenseState" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseClass">License Class</Label>
                  <Select>
                    <SelectTrigger id="licenseClass">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">Class A</SelectItem>
                      <SelectItem value="b">Class B</SelectItem>
                      <SelectItem value="c">Class C</SelectItem>
                      <SelectItem value="d">Class D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseExpiry">Expiry Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {licenseExpiry ? format(licenseExpiry, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={licenseExpiry}
                        onSelect={setLicenseExpiry}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Certifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Defensive Driving</p>
                      <p className="text-sm text-gray-500">Completed defensive driving course</p>
                    </div>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Hazardous Materials</p>
                      <p className="text-sm text-gray-500">Certified to transport hazardous materials</p>
                    </div>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">First Aid</p>
                      <p className="text-sm text-gray-500">First aid and CPR certified</p>
                    </div>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Documents</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="border border-dashed rounded-lg p-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                      <Upload className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="text-sm font-medium">Upload Driver Documents</h4>
                    <p className="text-xs text-gray-500 mt-1">Upload license, certifications, and other documents</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Select Files
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Driver
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
