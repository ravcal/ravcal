"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertTriangle,
  Clock,
  MapPin,
  Phone,
  Wrench,
  Truck,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Timer,
  DollarSign,
  Calendar,
  User,
} from "lucide-react"
import Link from "next/link"

interface BreakdownIncident {
  id: string
  vehicleId: string
  vehicleMake: string
  vehicleModel: string
  driverId: string
  driverName: string
  location: string
  coordinates: { lat: number; lng: number }
  reportedTime: string
  description: string
  severity: "Critical" | "High" | "Medium" | "Low"
  status: "Reported" | "Dispatched" | "In Progress" | "Resolved" | "Cancelled"
  estimatedCost: number
  actualCost?: number
  technicianId?: string
  technicianName?: string
  estimatedRepairTime: number
  actualRepairTime?: number
  towingRequired: boolean
  towingCost?: number
  partsRequired: string[]
  images: string[]
  notes: string[]
  resolvedTime?: string
  priority: number
}

export function BreakdownMaintenance() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")

  const breakdownIncidents: BreakdownIncident[] = [
    {
      id: "BRK-001",
      vehicleId: "FL-001",
      vehicleMake: "Ford",
      vehicleModel: "Transit",
      driverId: "DRV-001",
      driverName: "John Smith",
      location: "Highway 101, Mile 45",
      coordinates: { lat: 37.7749, lng: -122.4194 },
      reportedTime: "2024-03-10 08:30:00",
      description: "Engine overheating, steam coming from radiator",
      severity: "Critical",
      status: "In Progress",
      estimatedCost: 800,
      actualCost: 750,
      technicianId: "TECH-001",
      technicianName: "Mike Johnson",
      estimatedRepairTime: 180,
      actualRepairTime: 165,
      towingRequired: true,
      towingCost: 150,
      partsRequired: ["Radiator", "Coolant", "Thermostat"],
      images: ["/api/placeholder/300/200"],
      notes: ["Driver reported sudden temperature spike", "Coolant leak detected"],
      priority: 1,
    },
    {
      id: "BRK-002",
      vehicleId: "FL-003",
      vehicleMake: "Chevrolet",
      vehicleModel: "Express",
      driverId: "DRV-003",
      driverName: "Sarah Wilson",
      location: "Downtown Depot",
      coordinates: { lat: 37.7849, lng: -122.4094 },
      reportedTime: "2024-03-10 10:15:00",
      description: "Flat tire on rear left wheel",
      severity: "Medium",
      status: "Resolved",
      estimatedCost: 120,
      actualCost: 95,
      technicianId: "TECH-002",
      technicianName: "David Brown",
      estimatedRepairTime: 45,
      actualRepairTime: 30,
      towingRequired: false,
      partsRequired: ["Tire", "Valve stem"],
      images: ["/api/placeholder/300/200"],
      notes: ["Road debris caused puncture", "Tire replaced on-site"],
      resolvedTime: "2024-03-10 11:00:00",
      priority: 3,
    },
    {
      id: "BRK-003",
      vehicleId: "FL-005",
      vehicleMake: "Isuzu",
      vehicleModel: "NPR",
      driverId: "DRV-005",
      driverName: "Robert Davis",
      location: "Industrial District, Warehouse 12",
      coordinates: { lat: 37.7649, lng: -122.3994 },
      reportedTime: "2024-03-10 14:20:00",
      description: "Transmission slipping, unable to shift gears",
      severity: "High",
      status: "Dispatched",
      estimatedCost: 1500,
      technicianId: "TECH-001",
      technicianName: "Mike Johnson",
      estimatedRepairTime: 240,
      towingRequired: true,
      partsRequired: ["Transmission fluid", "Filter", "Solenoid"],
      images: [],
      notes: ["Driver reports grinding noise", "Vehicle immobilized"],
      priority: 2,
    },
    {
      id: "BRK-004",
      vehicleId: "FL-002",
      vehicleMake: "Mercedes",
      vehicleModel: "Sprinter",
      driverId: "DRV-002",
      driverName: "Emily Johnson",
      location: "Customer Site - 123 Main St",
      coordinates: { lat: 37.7549, lng: -122.3894 },
      reportedTime: "2024-03-10 16:45:00",
      description: "Battery dead, vehicle won't start",
      severity: "Medium",
      status: "Reported",
      estimatedCost: 200,
      estimatedRepairTime: 60,
      towingRequired: false,
      partsRequired: ["Battery", "Battery terminals"],
      images: [],
      notes: ["Driver left lights on overnight"],
      priority: 4,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Dispatched":
        return "bg-yellow-100 text-yellow-800"
      case "Reported":
        return "bg-red-100 text-red-800"
      case "Cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "In Progress":
        return <Wrench className="h-4 w-4 text-blue-600" />
      case "Dispatched":
        return <Truck className="h-4 w-4 text-yellow-600" />
      case "Reported":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "Cancelled":
        return <XCircle className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredIncidents = breakdownIncidents.filter((incident) => {
    const matchesSearch =
      incident.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || incident.status === statusFilter
    const matchesSeverity = severityFilter === "all" || incident.severity === severityFilter

    return matchesSearch && matchesStatus && matchesSeverity
  })

  const activeIncidents = breakdownIncidents.filter(
    (incident) => incident.status !== "Resolved" && incident.status !== "Cancelled",
  )

  const criticalIncidents = breakdownIncidents.filter((incident) => incident.severity === "Critical")

  const avgRepairTime =
    breakdownIncidents
      .filter((incident) => incident.actualRepairTime)
      .reduce((acc, incident) => acc + (incident.actualRepairTime || 0), 0) /
    breakdownIncidents.filter((incident) => incident.actualRepairTime).length

  const totalCosts = breakdownIncidents.reduce(
    (acc, incident) => acc + (incident.actualCost || incident.estimatedCost),
    0,
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Breakdown Maintenance</h2>
          <p className="text-gray-600 mt-2">Emergency repairs and unplanned maintenance incidents</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700" asChild>
          <Link href="/breakdown/report">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Breakdown
          </Link>
        </Button>
      </div>

      {/* Critical Alerts */}
      {criticalIncidents.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {criticalIncidents.length} critical breakdown{criticalIncidents.length > 1 ? "s" : ""} requiring immediate
            attention!
          </AlertDescription>
        </Alert>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{activeIncidents.length}</div>
                <p className="text-sm text-gray-600">Active Incidents</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{criticalIncidents.length}</div>
                <p className="text-sm text-gray-600">Critical Severity</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{Math.round(avgRepairTime)}min</div>
                <p className="text-sm text-gray-600">Avg Repair Time</p>
              </div>
              <Timer className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">${totalCosts.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Total Costs</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="incidents" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="incidents">All Incidents</TabsTrigger>
          <TabsTrigger value="active">Active ({activeIncidents.length})</TabsTrigger>
          <TabsTrigger value="critical">Critical ({criticalIncidents.length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search incidents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="Reported">Reported</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Severity</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Incidents Table */}
          <Card>
            <CardHeader>
              <CardTitle>Breakdown Incidents</CardTitle>
              <CardDescription>All reported breakdown and emergency maintenance incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Incident ID</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reported</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-medium">{incident.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{incident.vehicleId}</div>
                          <div className="text-sm text-gray-500">
                            {incident.vehicleMake} {incident.vehicleModel}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>{incident.driverName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="truncate max-w-32">{incident.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-48 truncate" title={incident.description}>
                          {incident.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(incident.status)}
                          <Badge className={getStatusColor(incident.status)}>{incident.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{new Date(incident.reportedTime).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">${incident.actualCost || incident.estimatedCost}</div>
                          {incident.towingCost && <div className="text-gray-500">+${incident.towingCost} towing</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          {incident.status !== "Resolved" && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Update
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeIncidents.map((incident) => (
              <Card key={incident.id} className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{incident.id}</CardTitle>
                      <CardDescription>
                        {incident.vehicleId} - {incident.vehicleMake} {incident.vehicleModel}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
                      <Badge className={getStatusColor(incident.status)}>{incident.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Driver:</span>
                      <div className="font-medium">{incident.driverName}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Location:</span>
                      <div className="font-medium">{incident.location}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Reported:</span>
                      <div className="font-medium">{new Date(incident.reportedTime).toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Est. Cost:</span>
                      <div className="font-medium">${incident.estimatedCost}</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-500 text-sm">Description:</span>
                    <p className="mt-1">{incident.description}</p>
                  </div>

                  {incident.technicianName && (
                    <div>
                      <span className="text-gray-500 text-sm">Assigned Technician:</span>
                      <div className="font-medium">{incident.technicianName}</div>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <MapPin className="h-3 w-3 mr-1" />
                      View Location
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-3 w-3 mr-1" />
                      Contact Driver
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Update Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="critical" className="space-y-6">
          {criticalIncidents.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Critical Incidents</h3>
                <p className="text-gray-600">All critical breakdown incidents have been resolved.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {criticalIncidents.map((incident) => (
                <Card key={incident.id} className="border-l-4 border-l-red-600 bg-red-50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-red-900">{incident.id} - CRITICAL</CardTitle>
                        <CardDescription className="text-red-700">
                          {incident.vehicleId} - {incident.location}
                        </CardDescription>
                      </div>
                      <Badge className="bg-red-600 text-white">URGENT</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-red-900">{incident.description}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-red-600">Driver:</span>
                          <div className="font-medium text-red-900">{incident.driverName}</div>
                        </div>
                        <div>
                          <span className="text-red-600">Reported:</span>
                          <div className="font-medium text-red-900">
                            {new Date(incident.reportedTime).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-red-600">Status:</span>
                          <div className="font-medium text-red-900">{incident.status}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Dispatch Emergency
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3 mr-1" />
                          Call Driver
                        </Button>
                        <Button size="sm" variant="outline">
                          <MapPin className="h-3 w-3 mr-1" />
                          Track Location
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Breakdown Frequency by Vehicle</CardTitle>
                <CardDescription>Most breakdown-prone vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["FL-001", "FL-003", "FL-005", "FL-002"].map((vehicleId, index) => (
                    <div key={vehicleId} className="flex justify-between items-center">
                      <span className="font-medium">{vehicleId}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: `${100 - index * 20}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{4 - index} incidents</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Breakdown Types</CardTitle>
                <CardDescription>Most frequent breakdown categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: "Engine Issues", count: 8, percentage: 40 },
                    { type: "Tire Problems", count: 5, percentage: 25 },
                    { type: "Transmission", count: 4, percentage: 20 },
                    { type: "Electrical", count: 3, percentage: 15 },
                  ].map((item) => (
                    <div key={item.type} className="flex justify-between items-center">
                      <span className="font-medium">{item.type}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time Metrics</CardTitle>
                <CardDescription>Average response and resolution times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Response Time</span>
                    <span className="font-bold text-blue-600">18 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Resolution Time</span>
                    <span className="font-bold text-green-600">2.5 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">First-time Fix Rate</span>
                    <span className="font-bold text-purple-600">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Towing Required</span>
                    <span className="font-bold text-orange-600">35%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Breakdown maintenance costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total This Month</span>
                    <span className="font-bold text-red-600">${totalCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Cost per Incident</span>
                    <span className="font-bold text-blue-600">
                      ${Math.round(totalCosts / breakdownIncidents.length).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Towing Costs</span>
                    <span className="font-bold text-orange-600">
                      $
                      {breakdownIncidents
                        .reduce((acc, incident) => acc + (incident.towingCost || 0), 0)
                        .toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Parts & Labor</span>
                    <span className="font-bold text-green-600">
                      $
                      {(
                        totalCosts - breakdownIncidents.reduce((acc, incident) => acc + (incident.towingCost || 0), 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
