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
import { CalendarIcon, Check, Loader2, Upload } from "lucide-react"

export function AddVehicleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [purchaseDate, setPurchaseDate] = useState<Date>()
  const [registrationDate, setRegistrationDate] = useState<Date>()
  const [insuranceExpiry, setInsuranceExpiry] = useState<Date>()

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
          <CardTitle>Add New Vehicle</CardTitle>
          <CardDescription>Enter the details of the new vehicle to add to your fleet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="technical">Technical Details</TabsTrigger>
              <TabsTrigger value="documents">Documents & Insurance</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vehicleId">Vehicle ID</Label>
                  <Input id="vehicleId" placeholder="e.g. FL-006" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="idle">Idle</SelectItem>
                      <SelectItem value="outOfService">Out of Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input id="make" placeholder="e.g. Ford" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" placeholder="e.g. Transit" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" type="number" placeholder="e.g. 2023" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="e.g. White" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input id="licensePlate" placeholder="e.g. ABC-1234" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vin">VIN</Label>
                  <Input id="vin" placeholder="Vehicle Identification Number" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional information about this vehicle" />
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Select defaultValue="diesel">
                    <SelectTrigger id="fuelType">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="gasoline">Gasoline</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="cng">CNG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tankCapacity">Fuel Tank Capacity (L)</Label>
                  <Input id="tankCapacity" type="number" placeholder="e.g. 80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="odometerReading">Current Odometer Reading</Label>
                  <Input id="odometerReading" type="number" placeholder="e.g. 5000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engineSize">Engine Size (L)</Label>
                  <Input id="engineSize" placeholder="e.g. 2.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select defaultValue="automatic">
                    <SelectTrigger id="transmission">
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="cvt">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoad">Maximum Load Capacity (kg)</Label>
                  <Input id="maxLoad" type="number" placeholder="e.g. 1500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Features & Equipment</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="gps" className="rounded border-gray-300" />
                    <Label htmlFor="gps" className="font-normal">
                      GPS Tracking
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="camera" className="rounded border-gray-300" />
                    <Label htmlFor="camera" className="font-normal">
                      Dash Camera
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="refrigeration" className="rounded border-gray-300" />
                    <Label htmlFor="refrigeration" className="font-normal">
                      Refrigeration
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="liftgate" className="rounded border-gray-300" />
                    <Label htmlFor="liftgate" className="font-normal">
                      Lift Gate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="telematics" className="rounded border-gray-300" />
                    <Label htmlFor="telematics" className="font-normal">
                      Telematics
                    </Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {purchaseDate ? format(purchaseDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={purchaseDate} onSelect={setPurchaseDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchasePrice">Purchase Price</Label>
                  <Input id="purchasePrice" type="number" placeholder="e.g. 35000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationDate">Registration Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {registrationDate ? format(registrationDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={registrationDate} onSelect={setRegistrationDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input id="registrationNumber" placeholder="e.g. REG12345" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Insurance Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    <Input id="insuranceProvider" placeholder="e.g. ABC Insurance" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policyNumber">Policy Number</Label>
                    <Input id="policyNumber" placeholder="e.g. POL-12345" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceExpiry">Expiry Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {insuranceExpiry ? format(insuranceExpiry, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={insuranceExpiry} onSelect={setInsuranceExpiry} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverageAmount">Coverage Amount</Label>
                    <Input id="coverageAmount" placeholder="e.g. 1000000" />
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
                    <h4 className="text-sm font-medium">Upload Vehicle Documents</h4>
                    <p className="text-xs text-gray-500 mt-1">Upload registration, insurance, and other documents</p>
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
                Save Vehicle
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
