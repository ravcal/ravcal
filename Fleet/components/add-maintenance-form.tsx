"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Check, Loader2, Upload } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function AddMaintenanceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scheduledDate, setScheduledDate] = useState<Date>()
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState<Date>()

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
          <CardTitle>Schedule Maintenance</CardTitle>
          <CardDescription>Create a new maintenance record for a vehicle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maintenanceId">Maintenance ID</Label>
              <Input id="maintenanceId" placeholder="e.g. M006" required />
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
              <Label htmlFor="maintenanceType">Maintenance Type</Label>
              <Select required>
                <SelectTrigger id="maintenanceType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oil-change">Oil Change</SelectItem>
                  <SelectItem value="tire-rotation">Tire Rotation</SelectItem>
                  <SelectItem value="brake-service">Brake Service</SelectItem>
                  <SelectItem value="engine-diagnostic">Engine Diagnostic</SelectItem>
                  <SelectItem value="transmission">Transmission Service</SelectItem>
                  <SelectItem value="battery">Battery Replacement</SelectItem>
                  <SelectItem value="ac-service">AC Service</SelectItem>
                  <SelectItem value="inspection">General Inspection</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="scheduled">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select>
                <SelectTrigger id="assignedTo">
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech1">Mike Johnson (Internal)</SelectItem>
                  <SelectItem value="tech2">Sarah Williams (Internal)</SelectItem>
                  <SelectItem value="vendor1">City Auto Service (External)</SelectItem>
                  <SelectItem value="vendor2">Quick Fix Mechanics (External)</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={scheduledDate} onSelect={setScheduledDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedCompletionDate">Estimated Completion Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {estimatedCompletionDate ? format(estimatedCompletionDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={estimatedCompletionDate}
                    onSelect={setEstimatedCompletionDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedCost">Estimated Cost ($)</Label>
            <Input id="estimatedCost" type="number" step="0.01" placeholder="e.g. 250.00" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="odometer">Current Odometer Reading</Label>
            <Input id="odometer" type="number" placeholder="e.g. 45000" />
          </div>

          <div className="space-y-4">
            <Label>Maintenance Location</Label>
            <RadioGroup defaultValue="internal">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="internal" id="internal" />
                <Label htmlFor="internal" className="font-normal">
                  Internal (Company Facility)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="external" id="external" />
                <Label htmlFor="external" className="font-normal">
                  External (Service Center)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the maintenance to be performed"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Parts Required</Label>
            <div className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input placeholder="Part name" />
                <Input placeholder="Part number" />
                <Input type="number" placeholder="Quantity" min="1" />
              </div>
              <Button type="button" variant="outline" size="sm">
                + Add Another Part
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Attachments</Label>
            <div className="border border-dashed rounded-lg p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
              <h4 className="text-sm font-medium">Upload Documents</h4>
              <p className="text-xs text-gray-500 mt-1">Upload service manuals, invoices, or other documents</p>
              <Button variant="outline" size="sm" className="mt-4">
                Select Files
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Schedule Maintenance
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
