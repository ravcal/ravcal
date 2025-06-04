"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Loader2, MapPin, Upload } from "lucide-react"

export function ReportBreakdown() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [locationInput, setLocationInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      // Show success message or redirect
    }, 1500)
  }

  const detectLocation = () => {
    setIsDetectingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setLocation(newLocation)
          setLocationInput(`Lat: ${newLocation.lat.toFixed(6)}, Lng: ${newLocation.lng.toFixed(6)}`)
          setIsDetectingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsDetectingLocation(false)
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
      setIsDetectingLocation(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Report Vehicle Breakdown</CardTitle>
          <CardDescription>Submit details about the vehicle breakdown or emergency maintenance need</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="breakdownId">Breakdown ID</Label>
              <Input id="breakdownId" placeholder="Auto-generated" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleId">Vehicle</Label>
              <Select required>
                <SelectTrigger id="vehicleId">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fl-001">FL-001 (Ford Transit)</SelectItem>
                  <SelectItem value="fl-002">FL-002 (Mercedes Sprinter)</SelectItem>
                  <SelectItem value="fl-003">FL-003 (Chevrolet Express)</SelectItem>
                  <SelectItem value="fl-004">FL-004 (Ford E-Series)</SelectItem>
                  <SelectItem value="fl-005">FL-005 (Isuzu NPR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="driverId">Driver</Label>
              <Select required>
                <SelectTrigger id="driverId">
                  <SelectValue placeholder="Select driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drv-001">John Smith</SelectItem>
                  <SelectItem value="drv-002">Emily Johnson</SelectItem>
                  <SelectItem value="drv-003">Sarah Wilson</SelectItem>
                  <SelectItem value="drv-004">Michael Brown</SelectItem>
                  <SelectItem value="drv-005">Robert Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select required defaultValue="medium">
                <SelectTrigger id="severity">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical - Vehicle Immobilized</SelectItem>
                  <SelectItem value="high">High - Limited Mobility</SelectItem>
                  <SelectItem value="medium">Medium - Operational but Needs Repair</SelectItem>
                  <SelectItem value="low">Low - Minor Issue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="breakdownType">Breakdown Type</Label>
            <Select required>
              <SelectTrigger id="breakdownType">
                <SelectValue placeholder="Select breakdown type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engine">Engine Problem</SelectItem>
                <SelectItem value="transmission">Transmission Issue</SelectItem>
                <SelectItem value="electrical">Electrical System</SelectItem>
                <SelectItem value="tire">Tire/Wheel Issue</SelectItem>
                <SelectItem value="brake">Brake System</SelectItem>
                <SelectItem value="fuel">Fuel System</SelectItem>
                <SelectItem value="cooling">Cooling System</SelectItem>
                <SelectItem value="accident">Accident Damage</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description of Issue</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the breakdown or issue"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex space-x-2">
              <Input
                id="location"
                placeholder="Current location or address"
                className="flex-1"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                required
              />
              <Button type="button" variant="outline" onClick={detectLocation} disabled={isDetectingLocation}>
                {isDetectingLocation ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <MapPin className="h-4 w-4 mr-2" />
                )}
                Detect
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Safety Status</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="safetyTraffic" />
                <Label htmlFor="safetyTraffic" className="font-normal">
                  Vehicle is blocking traffic
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="safetyHazard" />
                <Label htmlFor="safetyHazard" className="font-normal">
                  Vehicle presents a safety hazard
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="safetyInjury" />
                <Label htmlFor="safetyInjury" className="font-normal">
                  Injury has occurred
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Towing Required?</Label>
            <RadioGroup defaultValue="no">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="towingYes" />
                <Label htmlFor="towingYes" className="font-normal">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="towingNo" />
                <Label htmlFor="towingNo" className="font-normal">
                  No
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unknown" id="towingUnknown" />
                <Label htmlFor="towingUnknown" className="font-normal">
                  Unknown
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Photos</Label>
            <div className="border border-dashed rounded-lg p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
              <h4 className="text-sm font-medium">Upload Photos</h4>
              <p className="text-xs text-gray-500 mt-1">Upload photos of the breakdown or damage</p>
              <Button variant="outline" size="sm" className="mt-4">
                Select Files
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any additional information that might be helpful"
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Breakdown
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
