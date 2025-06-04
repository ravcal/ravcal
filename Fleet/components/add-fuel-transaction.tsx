"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, MapPin } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function AddFuelTransaction() {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    vehicleId: "",
    driverId: "",
    location: "",
    fuelType: "",
    quantity: "",
    pricePerLiter: "",
    odometer: "",
    receiptNumber: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", { ...formData, date })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Fuel Transaction</h1>
          <p className="text-gray-600 mt-1">Record a new fuel purchase</p>
        </div>
        <Link href="/fuel">
          <Button variant="outline">Back to Fuel Management</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fuel Transaction Details</CardTitle>
          <CardDescription>Enter the details of the fuel purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle</Label>
                <Select value={formData.vehicleId} onValueChange={(value) => handleInputChange("vehicleId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="V001">ABC-123 - Ford Transit</SelectItem>
                    <SelectItem value="V002">XYZ-789 - Mercedes Sprinter</SelectItem>
                    <SelectItem value="V003">DEF-456 - Volvo FH16</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="driver">Driver</Label>
                <Select value={formData.driverId} onValueChange={(value) => handleInputChange("driverId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="D001">John Smith</SelectItem>
                    <SelectItem value="D002">Sarah Johnson</SelectItem>
                    <SelectItem value="D003">Mike Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select value={formData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="premium">Premium Gasoline</SelectItem>
                    <SelectItem value="electric">Electric Charging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (Liters)</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerLiter">Price per Liter</Label>
                <Input
                  id="pricePerLiter"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.pricePerLiter}
                  onChange={(e) => handleInputChange("pricePerLiter", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="odometer">Odometer Reading</Label>
                <Input
                  id="odometer"
                  type="number"
                  placeholder="Current mileage"
                  value={formData.odometer}
                  onChange={(e) => handleInputChange("odometer", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiptNumber">Receipt Number</Label>
                <Input
                  id="receiptNumber"
                  placeholder="Receipt/Transaction ID"
                  value={formData.receiptNumber}
                  onChange={(e) => handleInputChange("receiptNumber", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Fuel Station Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  placeholder="Station name and address"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about this fuel transaction..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload receipt image (optional)</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link href="/fuel">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Save Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
