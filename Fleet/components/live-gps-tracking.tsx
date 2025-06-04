"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Navigation,
  Clock,
  Fuel,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Search,
  Filter,
  Maximize2,
  Eye,
  Route,
} from "lucide-react"
import { ErrorBoundary, GPSErrorFallback } from "@/components/error-boundary"
import { GPSConnectionStatus } from "@/components/gps-connection-status"
import { useGPSTracking } from "@/hooks/use-gps-tracking"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface VehicleLocation {
  id: string
  name: string
  driver: string
  lat: number
  lng: number
  speed: number
  heading: number
  status: "moving" | "stopped" | "idle" | "offline"
  lastUpdate: string
  fuelLevel: number
  route?: string
  nextStop?: string
  eta?: string
  odometer: number
  engineStatus: "on" | "off"
  alerts: string[]
}

export function LiveGPSTracking() {
  const [isTracking, setIsTracking] = useState(true)
  const [selectedVehicle, setSelectedVehicle] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [isRetrying, setIsRetrying] = useState(false)

  const {
    isLoading: gpsLoading,
    isConnected: gpsConnected,
    error: gpsError,
    retry: retryGPS,
    clearError,
  } = useGPSTracking({
    updateInterval: 3000,
    maxRetries: 3,
    enableAutoRetry: true,
  })

  // Simulated vehicle data with GPS coordinates
  const [vehicles, setVehicles] = useState<VehicleLocation[]>([
    {
      id: "FL-001",
      name: "Ford Transit",
      driver: "John Smith",
      lat: 40.7128,
      lng: -74.006,
      speed: 35,
      heading: 45,
      status: "moving",
      lastUpdate: "2 seconds ago",
      fuelLevel: 75,
      route: "Downtown Delivery",
      nextStop: "123 Main St",
      eta: "10:45 AM",
      odometer: 45230,
      engineStatus: "on",
      alerts: [],
    },
    {
      id: "FL-002",
      name: "Mercedes Sprinter",
      driver: "Sarah Johnson",
      lat: 40.7589,
      lng: -73.9851,
      speed: 0,
      heading: 180,
      status: "stopped",
      lastUpdate: "1 minute ago",
      fuelLevel: 30,
      route: "City Center Route",
      nextStop: "456 Oak Ave",
      eta: "11:20 AM",
      odometer: 62100,
      engineStatus: "on",
      alerts: ["Low Fuel"],
    },
    {
      id: "FL-003",
      name: "Chevrolet Express",
      driver: "Mike Davis",
      lat: 40.7505,
      lng: -73.9934,
      speed: 28,
      heading: 270,
      status: "moving",
      lastUpdate: "5 seconds ago",
      fuelLevel: 90,
      route: "Airport Shuttle",
      nextStop: "JFK Terminal 4",
      eta: "12:15 PM",
      odometer: 28900,
      engineStatus: "on",
      alerts: [],
    },
    {
      id: "FL-004",
      name: "Ford E-Series",
      driver: "Unassigned",
      lat: 40.7282,
      lng: -74.0776,
      speed: 0,
      heading: 0,
      status: "idle",
      lastUpdate: "15 minutes ago",
      fuelLevel: 45,
      route: "Not Assigned",
      nextStop: "Depot",
      eta: "N/A",
      odometer: 78450,
      engineStatus: "off",
      alerts: [],
    },
    {
      id: "FL-005",
      name: "Isuzu NPR",
      driver: "Lisa Wilson",
      lat: 40.7614,
      lng: -73.9776,
      speed: 42,
      heading: 90,
      status: "moving",
      lastUpdate: "3 seconds ago",
      fuelLevel: 60,
      route: "Industrial Zone",
      nextStop: "789 Industrial Blvd",
      eta: "1:30 PM",
      odometer: 34200,
      engineStatus: "on",
      alerts: ["Speed Alert"],
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    if (!isTracking || gpsError) return

    const interval = setInterval(() => {
      try {
        setVehicles((prevVehicles) =>
          prevVehicles.map((vehicle) => {
            if (vehicle.status === "moving") {
              // Validate coordinates before updating
              const latChange = (Math.random() - 0.5) * 0.001
              const lngChange = (Math.random() - 0.5) * 0.001
              const speedChange = Math.floor(Math.random() * 10) - 5

              const newLat = vehicle.lat + latChange
              const newLng = vehicle.lng + lngChange
              const newSpeed = Math.max(0, Math.min(60, vehicle.speed + speedChange))

              // Validate GPS coordinates
              if (isNaN(newLat) || isNaN(newLng) || Math.abs(newLat) > 90 || Math.abs(newLng) > 180) {
                console.error("Invalid GPS coordinates generated")
                return vehicle
              }

              return {
                ...vehicle,
                lat: newLat,
                lng: newLng,
                speed: newSpeed,
                lastUpdate: "Just now",
              }
            }
            return vehicle
          }),
        )
        setLastUpdate(new Date())
        setConnectionError(null)
      } catch (error) {
        console.error("Error updating vehicle positions:", error)
        setConnectionError("Failed to update vehicle positions")
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isTracking, gpsError])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "moving":
        return "bg-green-100 text-green-800"
      case "stopped":
        return "bg-yellow-100 text-yellow-800"
      case "idle":
        return "bg-gray-100 text-gray-800"
      case "offline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "moving":
        return <Navigation className="h-4 w-4 text-green-600" />
      case "stopped":
        return <Pause className="h-4 w-4 text-yellow-600" />
      case "idle":
        return <Clock className="h-4 w-4 text-gray-600" />
      case "offline":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <MapPin className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || vehicle.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleRetryConnection = async () => {
    setIsRetrying(true)
    setConnectionError(null)

    try {
      await retryGPS()
      clearError()
    } catch (error) {
      console.error("Failed to retry GPS connection:", error)
      setConnectionError("Failed to reconnect to GPS service")
    } finally {
      setIsRetrying(false)
    }
  }

  const handleToggleTracking = () => {
    try {
      if (gpsError && !gpsError.retryable) {
        setConnectionError("Cannot start tracking due to GPS error")
        return
      }
      setIsTracking(!isTracking)
      setConnectionError(null)
    } catch (error) {
      console.error("Error toggling tracking:", error)
      setConnectionError("Failed to toggle tracking")
    }
  }

  return (
    <ErrorBoundary fallback={GPSErrorFallback}>
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Live GPS Tracking</h2>
            <p className="text-gray-600 mt-2">Real-time vehicle location monitoring</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isTracking ? "default" : "secondary"} className="mr-2">
              {isTracking ? "Live" : "Paused"}
            </Badge>
            <Button
              onClick={handleToggleTracking}
              variant={isTracking ? "outline" : "default"}
              size="sm"
              disabled={gpsLoading || isRetrying}
            >
              {isTracking ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isTracking ? "Pause" : "Resume"} Tracking
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* GPS Connection Status */}
        <GPSConnectionStatus onRetry={handleRetryConnection} />

        {/* Connection Error Alert */}
        {connectionError && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{connectionError}</span>
              <Button size="sm" variant="outline" onClick={() => setConnectionError(null)}>
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Tracking Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {vehicles.filter((v) => v.status === "moving").length}
                  </div>
                  <p className="text-sm text-gray-600">Vehicles Moving</p>
                </div>
                <Navigation className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {vehicles.filter((v) => v.status === "stopped").length}
                  </div>
                  <p className="text-sm text-gray-600">Vehicles Stopped</p>
                </div>
                <Pause className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(vehicles.reduce((acc, v) => acc + v.speed, 0) / vehicles.length)}
                  </div>
                  <p className="text-sm text-gray-600">Avg Speed (mph)</p>
                </div>
                <Route className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {vehicles.reduce((acc, v) => acc + v.alerts.length, 0)}
                  </div>
                  <p className="text-sm text-gray-600">Active Alerts</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="map" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="details">Vehicle Details</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search vehicles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="moving">Moving</SelectItem>
                      <SelectItem value="stopped">Stopped</SelectItem>
                      <SelectItem value="idle">Idle</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Live Vehicle Map</CardTitle>
                    <CardDescription>
                      Real-time vehicle positions • Last updated: {lastUpdate.toLocaleTimeString()}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Fullscreen
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg relative overflow-hidden">
                  {/* Map Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" viewBox="0 0 400 300">
                        {/* Street grid pattern */}
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>
                  </div>

                  {/* Vehicle Markers */}
                  {filteredVehicles.map((vehicle, index) => (
                    <div
                      key={vehicle.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{
                        left: `${20 + ((index * 15) % 60)}%`,
                        top: `${20 + ((index * 20) % 60)}%`,
                      }}
                      onClick={() => setSelectedVehicle(vehicle.id)}
                    >
                      {/* Vehicle Icon */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all group-hover:scale-110 ${
                          vehicle.status === "moving"
                            ? "bg-green-500"
                            : vehicle.status === "stopped"
                              ? "bg-yellow-500"
                              : vehicle.status === "idle"
                                ? "bg-gray-500"
                                : "bg-red-500"
                        }`}
                      >
                        <Navigation
                          className="h-4 w-4 text-white"
                          style={{ transform: `rotate(${vehicle.heading}deg)` }}
                        />
                      </div>

                      {/* Vehicle Info Popup */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white rounded-lg shadow-lg p-3 min-w-48 border">
                          <div className="font-medium text-sm">{vehicle.id}</div>
                          <div className="text-xs text-gray-600">{vehicle.driver}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStatusIcon(vehicle.status)}
                            <span className="text-xs">{vehicle.speed} mph</span>
                            <Fuel className="h-3 w-3 text-gray-400" />
                            <span className="text-xs">{vehicle.fuelLevel}%</span>
                          </div>
                          {vehicle.alerts.length > 0 && (
                            <div className="mt-1">
                              <Badge variant="destructive" className="text-xs">
                                {vehicle.alerts[0]}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                    <h4 className="font-medium text-sm mb-2">Vehicle Status</h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs">Moving</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-xs">Stopped</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                        <span className="text-xs">Idle</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-xs">Offline</span>
                      </div>
                    </div>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <Button variant="outline" size="sm" className="bg-white">
                      <MapPin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white">
                      +
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white">
                      -
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle List</CardTitle>
                <CardDescription>Detailed list view of all tracked vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">{getStatusIcon(vehicle.status)}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium">{vehicle.id}</h3>
                              <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                              {vehicle.alerts.length > 0 && (
                                <Badge variant="destructive">
                                  {vehicle.alerts.length} Alert{vehicle.alerts.length > 1 ? "s" : ""}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {vehicle.name} • {vehicle.driver}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                              <div>
                                <p className="text-xs text-gray-500">Speed</p>
                                <p className="text-sm font-medium">{vehicle.speed} mph</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Fuel Level</p>
                                <p className="text-sm font-medium">{vehicle.fuelLevel}%</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Route</p>
                                <p className="text-sm font-medium">{vehicle.route}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Next Stop</p>
                                <p className="text-sm font-medium">{vehicle.nextStop}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <MapPin className="h-4 w-4 mr-2" />
                            Track
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Last Update: {vehicle.lastUpdate}</span>
                          <span>
                            Coordinates: {vehicle.lat.toFixed(4)}, {vehicle.lng.toFixed(4)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Vehicle</CardTitle>
                  <CardDescription>Choose a vehicle to view detailed tracking information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.id} - {vehicle.name} ({vehicle.driver})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {selectedVehicle && (
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Details</CardTitle>
                    <CardDescription>Real-time information for {selectedVehicle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const vehicle = vehicles.find((v) => v.id === selectedVehicle)
                      if (!vehicle) return null

                      return (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Status</p>
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(vehicle.status)}
                                <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Engine</p>
                              <p className="font-medium">{vehicle.engineStatus === "on" ? "Running" : "Off"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Speed</p>
                              <p className="font-medium">{vehicle.speed} mph</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Heading</p>
                              <p className="font-medium">{vehicle.heading}°</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Fuel Level</p>
                              <p className="font-medium">{vehicle.fuelLevel}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Odometer</p>
                              <p className="font-medium">{vehicle.odometer.toLocaleString()} mi</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Current Route</p>
                            <p className="font-medium">{vehicle.route}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Next Stop</p>
                            <p className="font-medium">{vehicle.nextStop}</p>
                            {vehicle.eta && <p className="text-sm text-gray-500">ETA: {vehicle.eta}</p>}
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">GPS Coordinates</p>
                            <p className="font-medium">
                              {vehicle.lat.toFixed(6)}, {vehicle.lng.toFixed(6)}
                            </p>
                          </div>

                          {vehicle.alerts.length > 0 && (
                            <div>
                              <p className="text-sm text-gray-500 mb-2">Active Alerts</p>
                              <div className="space-y-1">
                                {vehicle.alerts.map((alert, index) => (
                                  <Badge key={index} variant="destructive">
                                    {alert}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="pt-4 border-t">
                            <p className="text-xs text-gray-500">Last Update: {vehicle.lastUpdate}</p>
                          </div>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  )
}
