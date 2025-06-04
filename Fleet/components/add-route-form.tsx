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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Check, Loader2, MapPin, Plus, Trash2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface Stop {
  id: string
  address: string
  name: string
  type: "pickup" | "delivery" | "service"
  timeWindow: string
  duration: number
  priority: "high" | "medium" | "low"
  notes: string
}

export function AddRouteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [stops, setStops] = useState<Stop[]>([
    {
      id: "1",
      address: "",
      name: "",
      type: "delivery",
      timeWindow: "",
      duration: 15,
      priority: "medium",
      notes: "",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      // Show success message or redirect
    }, 1500)
  }

  const addStop = () => {
    const newStop: Stop = {
      id: Date.now().toString(),
      address: "",
      name: "",
      type: "delivery",
      timeWindow: "",
      duration: 15,
      priority: "medium",
      notes: "",
    }
    setStops([...stops, newStop])
  }

  const removeStop = (id: string) => {
    setStops(stops.filter((stop) => stop.id !== id))
  }

  const updateStop = (id: string, field: keyof Stop, value: any) => {
    setStops(stops.map((stop) => (stop.id === id ? { ...stop, [field]: value } : stop)))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Create New Route</CardTitle>
          <CardDescription>Plan a new route with multiple stops and optimization settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="stops">Stops & Waypoints</TabsTrigger>
              <TabsTrigger value="settings">Route Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="routeId">Route ID</Label>
                  <Input id="routeId" placeholder="e.g. R006" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routeName">Route Name</Label>
                  <Input id="routeName" placeholder="e.g. Morning Delivery Route" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Assigned Vehicle</Label>
                  <Select required>
                    <SelectTrigger id="vehicle">
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
                  <Label htmlFor="driver">Assigned Driver</Label>
                  <Select>
                    <SelectTrigger id="driver">
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="d001">John Smith (D001)</SelectItem>
                      <SelectItem value="d002">Sarah Johnson (D002)</SelectItem>
                      <SelectItem value="d003">Mike Davis (D003)</SelectItem>
                      <SelectItem value="d004">Lisa Wilson (D004)</SelectItem>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routeType">Route Type</Label>
                  <Select defaultValue="delivery">
                    <SelectTrigger id="routeType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="shuttle">Shuttle</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Select end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input id="startTime" type="time" defaultValue="08:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedDuration">Estimated Duration (hours)</Label>
                  <Input id="estimatedDuration" type="number" step="0.5" placeholder="e.g. 4.5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Route description and special instructions" />
              </div>
            </TabsContent>

            <TabsContent value="stops" className="space-y-6 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Route Stops</h3>
                <Button type="button" onClick={addStop} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stop
                </Button>
              </div>

              <div className="space-y-4">
                {stops.map((stop, index) => (
                  <Card key={stop.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">Stop {index + 1}</CardTitle>
                        {stops.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeStop(stop.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`stop-name-${stop.id}`}>Stop Name</Label>
                          <Input
                            id={`stop-name-${stop.id}`}
                            value={stop.name}
                            onChange={(e) => updateStop(stop.id, "name", e.target.value)}
                            placeholder="e.g. Customer A"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`stop-type-${stop.id}`}>Stop Type</Label>
                          <Select value={stop.type} onValueChange={(value) => updateStop(stop.id, "type", value)}>
                            <SelectTrigger id={`stop-type-${stop.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pickup">Pickup</SelectItem>
                              <SelectItem value="delivery">Delivery</SelectItem>
                              <SelectItem value="service">Service</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`stop-address-${stop.id}`}>Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id={`stop-address-${stop.id}`}
                            value={stop.address}
                            onChange={(e) => updateStop(stop.id, "address", e.target.value)}
                            placeholder="Enter full address"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`stop-time-${stop.id}`}>Time Window</Label>
                          <Input
                            id={`stop-time-${stop.id}`}
                            value={stop.timeWindow}
                            onChange={(e) => updateStop(stop.id, "timeWindow", e.target.value)}
                            placeholder="e.g. 9:00-11:00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`stop-duration-${stop.id}`}>Duration (min)</Label>
                          <Input
                            id={`stop-duration-${stop.id}`}
                            type="number"
                            value={stop.duration}
                            onChange={(e) => updateStop(stop.id, "duration", Number.parseInt(e.target.value))}
                            min="5"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`stop-priority-${stop.id}`}>Priority</Label>
                          <Select
                            value={stop.priority}
                            onValueChange={(value) => updateStop(stop.id, "priority", value)}
                          >
                            <SelectTrigger id={`stop-priority-${stop.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`stop-notes-${stop.id}`}>Notes</Label>
                        <Textarea
                          id={`stop-notes-${stop.id}`}
                          value={stop.notes}
                          onChange={(e) => updateStop(stop.id, "notes", e.target.value)}
                          placeholder="Special instructions for this stop"
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Route Optimization</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-optimize route</p>
                        <p className="text-sm text-gray-500">Automatically optimize stop order for efficiency</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Avoid toll roads</p>
                        <p className="text-sm text-gray-500">Route around toll roads when possible</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Prefer highways</p>
                        <p className="text-sm text-gray-500">Use highways for faster travel times</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Recurring Schedule</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Make this a recurring route</p>
                        <p className="text-sm text-gray-500">Automatically schedule this route to repeat</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="frequency">Frequency</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="frequency">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="repeatUntil">Repeat Until</Label>
                        <Input id="repeatUntil" type="date" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Route start notifications</p>
                        <p className="text-sm text-gray-500">Notify when route begins</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Delay alerts</p>
                        <p className="text-sm text-gray-500">Alert when route is running behind schedule</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Completion notifications</p>
                        <p className="text-sm text-gray-500">Notify when route is completed</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxDuration">Maximum Route Duration (hours)</Label>
                      <Input id="maxDuration" type="number" step="0.5" placeholder="e.g. 8" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxDistance">Maximum Route Distance (km)</Label>
                      <Input id="maxDistance" type="number" placeholder="e.g. 200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
                      <Input id="breakDuration" type="number" defaultValue="30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuelBudget">Fuel Budget ($)</Label>
                      <Input id="fuelBudget" type="number" step="0.01" placeholder="e.g. 150.00" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <div className="flex space-x-2">
            <Button variant="outline" type="button">
              Save as Template
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Route...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Create Route
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
