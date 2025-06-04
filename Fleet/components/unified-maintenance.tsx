"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Plus,
  Search,
  Filter,
  CalendarIcon,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  MapPin,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Scheduled maintenance data
const maintenanceRecords = [
  {
    id: "M001",
    vehicleId: "FL-001",
    type: "Oil Change",
    status: "Scheduled",
    scheduledDate: "2024-03-15",
    estimatedCost: 150,
    priority: "Medium",
    description: "Regular oil change and filter replacement",
    maintenanceType: "scheduled",
  },
  {
    id: "M002",
    vehicleId: "FL-002",
    type: "Brake Inspection",
    status: "Overdue",
    scheduledDate: "2024-03-01",
    estimatedCost: 300,
    priority: "High",
    description: "Brake pad inspection and replacement if needed",
    maintenanceType: "scheduled",
  },
  {
    id: "M003",
    vehicleId: "FL-003",
    type: "Tire Rotation",
    status: "Completed",
    scheduledDate: "2024-02-28",
    estimatedCost: 80,
    priority: "Low",
    description: "Tire rotation and pressure check",
    maintenanceType: "scheduled",
  },
  {
    id: "M004",
    vehicleId: "FL-004",
    type: "Engine Diagnostic",
    status: "In Progress",
    scheduledDate: "2024-03-10",
    estimatedCost: 200,
    priority: "High",
    description: "Engine diagnostic and tune-up",
    maintenanceType: "scheduled",
  },
  {
    id: "M005",
    vehicleId: "FL-005",
    type: "AC Service",
    status: "Scheduled",
    scheduledDate: "2024-03-20",
    estimatedCost: 120,
    priority: "Medium",
    description: "Air conditioning system service and refrigerant check",
    maintenanceType: "scheduled",
  },
]

// Breakdown maintenance data
const breakdownIncidents = [
  {
    id: "BRK-001",
    vehicleId: "FL-001",
    vehicleMake: "Ford",
    vehicleModel: "Transit",
    driverId: "DRV-001",
    driverName: "John Smith",
    location: "Highway 101, Mile 45",
    type: "Engine Overheating",
    reportedTime: "2024-03-10 08:30:00",
    description: "Engine overheating, steam coming from radiator",
    severity: "Critical",
    status: "In Progress",
    estimatedCost: 800,
    actualCost: 750,
    technicianName: "Mike Johnson",
    towingRequired: true,
    maintenanceType: "breakdown",
  },
  {
    id: "BRK-002",
    vehicleId: "FL-003",
    vehicleMake: "Chevrolet",
    vehicleModel: "Express",
    driverId: "DRV-003",
    driverName: "Sarah Wilson",
    location: "Downtown Depot",
    type: "Flat Tire",
    reportedTime: "2024-03-10 10:15:00",
    description: "Flat tire on rear left wheel",
    severity: "Medium",
    status: "Resolved",
    estimatedCost: 120,
    actualCost: 95,
    technicianName: "David Brown",
    towingRequired: false,
    maintenanceType: "breakdown",
  },
  {
    id: "BRK-003",
    vehicleId: "FL-005",
    vehicleMake: "Isuzu",
    vehicleModel: "NPR",
    driverId: "DRV-005",
    driverName: "Robert Davis",
    location: "Industrial District, Warehouse 12",
    type: "Transmission Issue",
    reportedTime: "2024-03-10 14:20:00",
    description: "Transmission slipping, unable to shift gears",
    severity: "High",
    status: "Dispatched",
    estimatedCost: 1500,
    technicianName: "Mike Johnson",
    towingRequired: true,
    maintenanceType: "breakdown",
  },
]

// Combined maintenance records
const allMaintenanceRecords = [
  ...maintenanceRecords.map((record) => ({
    ...record,
    date: record.scheduledDate,
    priority: record.priority,
    vehicleName: record.vehicleId,
  })),
  ...breakdownIncidents.map((incident) => ({
    ...incident,
    date: new Date(incident.reportedTime).toISOString().split("T")[0],
    priority: incident.severity,
    vehicleName: `${incident.vehicleId} (${incident.vehicleMake} ${incident.vehicleModel})`,
  })),
]

export function UnifiedMaintenance() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [maintenanceTypeFilter, setMaintenanceTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const [editingRecord, setEditingRecord] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleEdit = (record: any) => {
    setEditingRecord({ ...record })
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = () => {
    console.log("Saving maintenance record:", editingRecord)
    setIsEditModalOpen(false)
    setEditingRecord(null)
  }

  const handleCancelEdit = () => {
    setIsEditModalOpen(false)
    setEditingRecord(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Scheduled":
      case "Dispatched":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
      case "Reported":
        return "bg-red-100 text-red-800"
      case "Cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
      case "Critical":
        return "bg-red-100 text-red-800"
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
      case "Completed":
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "Overdue":
      case "Reported":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "Scheduled":
      case "Dispatched":
        return <CalendarIcon className="h-4 w-4 text-yellow-600" />
      default:
        return <CalendarIcon className="h-4 w-4 text-gray-600" />
    }
  }

  const getMaintenanceTypeIcon = (type: string) => {
    switch (type) {
      case "scheduled":
        return <CalendarIcon className="h-4 w-4 text-blue-600" />
      case "breakdown":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Wrench className="h-4 w-4 text-gray-600" />
    }
  }

  const getMaintenanceTypeLabel = (type: string) => {
    switch (type) {
      case "scheduled":
        return "Scheduled"
      case "breakdown":
        return "Breakdown"
      default:
        return "Unknown"
    }
  }

  const getMaintenanceTypeBadge = (type: string) => {
    switch (type) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "breakdown":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredRecords = allMaintenanceRecords.filter((record) => {
    const matchesSearch =
      record.vehicleId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = maintenanceTypeFilter === "all" || record.maintenanceType === maintenanceTypeFilter
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    const matchesPriority = priorityFilter === "all" || record.priority === priorityFilter

    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const scheduledCount = maintenanceRecords.filter(
    (record) => record.status === "Scheduled" || record.status === "In Progress",
  ).length
  const overdueCount = maintenanceRecords.filter((record) => record.status === "Overdue").length
  const breakdownCount = breakdownIncidents.filter(
    (incident) => incident.status !== "Resolved" && incident.status !== "Cancelled",
  ).length
  const criticalCount = breakdownIncidents.filter((incident) => incident.severity === "Critical").length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Maintenance Management</h2>
          <p className="text-gray-600 mt-2">Unified maintenance system for scheduled and breakdown repairs</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/maintenance/add">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Maintenance
            </Link>
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" asChild>
            <Link href="/maintenance/report-breakdown">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Breakdown
            </Link>
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalCount > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {criticalCount} critical breakdown{criticalCount > 1 ? "s" : ""} requiring immediate attention!
          </AlertDescription>
        </Alert>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{scheduledCount}</div>
                <p className="text-sm text-gray-600">Scheduled Maintenance</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
                <p className="text-sm text-gray-600">Overdue Maintenance</p>
              </div>
              <Clock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{breakdownCount}</div>
                <p className="text-sm text-gray-600">Active Breakdowns</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  $
                  {allMaintenanceRecords
                    .reduce((acc, record) => acc + (record.actualCost || record.estimatedCost), 0)
                    .toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Total Maintenance Costs</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="all">All Maintenance</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="breakdowns">Breakdowns</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search maintenance records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={maintenanceTypeFilter}
                  onChange={(e) => setMaintenanceTypeFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Types</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="breakdown">Breakdown</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Reported">Reported</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Priority</option>
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

          {/* Maintenance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Records</CardTitle>
              <CardDescription>All scheduled and breakdown maintenance activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getMaintenanceTypeIcon(record.maintenanceType)}
                          <Badge className={getMaintenanceTypeBadge(record.maintenanceType)}>
                            {getMaintenanceTypeLabel(record.maintenanceType)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{record.vehicleName}</TableCell>
                      <TableCell>
                        <div className="max-w-48 truncate" title={record.description}>
                          {record.type}: {record.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(record.status)}
                          <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(record.priority)}>{record.priority}</Badge>
                      </TableCell>
                      <TableCell>${record.actualCost || record.estimatedCost}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          {record.status !== "Completed" && record.status !== "Resolved" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleEdit(record)}
                            >
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

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Maintenance</CardTitle>
              <CardDescription>Planned maintenance activities and schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.vehicleId}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.type}</div>
                          <div className="text-sm text-gray-500 truncate max-w-32">{record.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(record.status)}
                          <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{record.scheduledDate}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(record.priority)}>{record.priority}</Badge>
                      </TableCell>
                      <TableCell>${record.estimatedCost}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          {record.status !== "Completed" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleEdit(record)}
                            >
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

        <TabsContent value="breakdowns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {breakdownIncidents.map((incident) => (
              <Card
                key={incident.id}
                className={`border-l-4 ${
                  incident.severity === "Critical"
                    ? "border-l-red-500"
                    : incident.severity === "High"
                      ? "border-l-orange-500"
                      : "border-l-yellow-500"
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{incident.id}</CardTitle>
                      <CardDescription>
                        {incident.vehicleId} - {incident.vehicleMake} {incident.vehicleModel}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getPriorityColor(incident.severity)}>{incident.severity}</Badge>
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
                      <div className="font-medium">${incident.actualCost || incident.estimatedCost}</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-500 text-sm">Issue:</span>
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
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Update Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Maintenance Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Calendar</CardTitle>
                <CardDescription>View scheduled maintenance by date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Events for Selected Date */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  Maintenance for {selectedDate ? selectedDate.toLocaleDateString() : "Selected Date"}
                </CardTitle>
                <CardDescription>Scheduled and breakdown maintenance for this date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allMaintenanceRecords
                    .filter(
                      (record) =>
                        record.date === selectedDate?.toISOString().split("T")[0] ||
                        new Date(record.date).toDateString() === selectedDate?.toDateString(),
                    )
                    .map((record) => (
                      <div
                        key={record.id}
                        className={`p-4 border rounded-md ${
                          record.maintenanceType === "breakdown" ? "bg-red-50" : "bg-blue-50"
                        }`}
                      >
                        <div className="flex justify-between">
                          <div className="font-medium">
                            {record.id} - {record.type}
                          </div>
                          <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                        </div>
                        <div className="text-sm mt-2">
                          <span className="text-gray-600">Vehicle:</span> {record.vehicleName}
                        </div>
                        <div className="text-sm mt-1">
                          <span className="text-gray-600">Description:</span> {record.description}
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                          <div>
                            <span className="text-gray-600">Cost:</span> ${record.actualCost || record.estimatedCost}
                          </div>
                          <div>
                            <Badge className={getMaintenanceTypeBadge(record.maintenanceType)}>
                              {getMaintenanceTypeLabel(record.maintenanceType)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}

                  {allMaintenanceRecords.filter(
                    (record) =>
                      record.date === selectedDate?.toISOString().split("T")[0] ||
                      new Date(record.date).toDateString() === selectedDate?.toDateString(),
                  ).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <p>No maintenance scheduled for this date</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance by Vehicle</CardTitle>
                <CardDescription>Maintenance frequency by vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["FL-001", "FL-003", "FL-005", "FL-002", "FL-004"].map((vehicleId, index) => (
                    <div key={vehicleId} className="flex justify-between items-center">
                      <span className="font-medium">{vehicleId}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${100 - index * 15}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{5 - index} records</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Types</CardTitle>
                <CardDescription>Distribution of maintenance types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: "Oil Change", count: 8, percentage: 30 },
                    { type: "Tire Service", count: 6, percentage: 22 },
                    { type: "Engine Repair", count: 5, percentage: 19 },
                    { type: "Brake Service", count: 4, percentage: 15 },
                    { type: "Electrical", count: 3, percentage: 11 },
                    { type: "Other", count: 1, percentage: 3 },
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
                <CardTitle>Maintenance Costs</CardTitle>
                <CardDescription>Cost breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Scheduled Maintenance</span>
                    <span className="font-bold text-blue-600">
                      ${maintenanceRecords.reduce((acc, record) => acc + record.estimatedCost, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Breakdown Repairs</span>
                    <span className="font-bold text-red-600">
                      $
                      {breakdownIncidents
                        .reduce((acc, incident) => acc + (incident.actualCost || incident.estimatedCost), 0)
                        .toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Parts</span>
                    <span className="font-bold text-purple-600">$4,250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Labor</span>
                    <span className="font-bold text-orange-600">$3,780</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="font-medium">Total Costs</span>
                    <span className="font-bold text-green-600">
                      $
                      {allMaintenanceRecords
                        .reduce((acc, record) => acc + (record.actualCost || record.estimatedCost), 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Repair Time</span>
                    <span className="font-bold text-blue-600">3.2 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Breakdown Rate</span>
                    <span className="font-bold text-red-600">0.8 per vehicle/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Maintenance Compliance</span>
                    <span className="font-bold text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">First-time Fix Rate</span>
                    <span className="font-bold text-purple-600">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Cost per Vehicle</span>
                    <span className="font-bold text-orange-600">$850/month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Maintenance Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Maintenance Record</DialogTitle>
            <DialogDescription>Update the maintenance information below.</DialogDescription>
          </DialogHeader>
          {editingRecord && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Input
                    id="edit-type"
                    value={editingRecord.type}
                    onChange={(e) => setEditingRecord({ ...editingRecord, type: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingRecord.status}
                    onValueChange={(value) => setEditingRecord({ ...editingRecord, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={editingRecord.description}
                  onChange={(e) => setEditingRecord({ ...editingRecord, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select
                    value={editingRecord.priority}
                    onValueChange={(value) => setEditingRecord({ ...editingRecord, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-cost">Cost</Label>
                  <Input
                    id="edit-cost"
                    type="number"
                    value={editingRecord.actualCost || editingRecord.estimatedCost}
                    onChange={(e) =>
                      setEditingRecord({
                        ...editingRecord,
                        actualCost: Number.parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
