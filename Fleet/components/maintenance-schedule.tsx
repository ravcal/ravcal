"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, CalendarIcon, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export function MaintenanceSchedule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

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
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Scheduled":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
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
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "Overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <CalendarIcon className="h-4 w-4 text-yellow-600" />
    }
  }

  const filteredRecords = maintenanceRecords.filter(
    (record) =>
      record.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Maintenance Schedule</h2>
          <p className="text-gray-600 mt-2">Track and manage vehicle maintenance activities</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link href="/maintenance/add">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search maintenance records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-sm text-gray-600">Overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">12</div>
            <p className="text-sm text-gray-600">Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <p className="text-sm text-gray-600">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">28</div>
            <p className="text-sm text-gray-600">Completed This Month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Maintenance Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Calendar</CardTitle>
            <CardDescription>View scheduled maintenance by date</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
          </CardContent>
        </Card>

        {/* Maintenance Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Maintenance Records</CardTitle>
            <CardDescription>All maintenance activities and schedules</CardDescription>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
