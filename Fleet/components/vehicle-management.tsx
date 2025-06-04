"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, MoreHorizontal, Truck, MapPin, Fuel, Wrench, Eye, Edit, Trash2 } from "lucide-react"
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

const mockVehicles = [
  {
    id: "V001",
    plateNumber: "ABC-123",
    model: "Ford Transit",
    year: 2022,
    status: "Active",
    location: "Downtown Depot",
    fuelLevel: 85,
    mileage: 45230,
    lastMaintenance: "2024-01-15",
    driver: "John Smith",
    customerRent: "Available",
  },
  {
    id: "V002",
    plateNumber: "XYZ-789",
    model: "Mercedes Sprinter",
    year: 2021,
    status: "In Transit",
    location: "Route 45",
    fuelLevel: 62,
    mileage: 67890,
    lastMaintenance: "2024-01-10",
    driver: "Sarah Johnson",
    customerRent: "Rented - ABC Corp",
  },
  {
    id: "V003",
    plateNumber: "DEF-456",
    model: "Isuzu NPR",
    year: 2023,
    status: "Maintenance",
    location: "Service Center",
    fuelLevel: 30,
    mileage: 23450,
    lastMaintenance: "2024-01-20",
    driver: "Unassigned",
    customerRent: "Available",
  },
  {
    id: "V004",
    plateNumber: "GHI-321",
    model: "Volvo FH",
    year: 2020,
    status: "Active",
    location: "North Terminal",
    fuelLevel: 78,
    mileage: 89120,
    lastMaintenance: "2024-01-08",
    driver: "Mike Wilson",
    customerRent: "Rented - XYZ Logistics",
  },
]

export function VehicleManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [editingVehicle, setEditingVehicle] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || vehicle.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "in transit":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFuelLevelColor = (level: number) => {
    if (level > 50) return "text-green-600"
    if (level > 25) return "text-yellow-600"
    return "text-red-600"
  }

  const getRentalStatusColor = (status: string) => {
    if (status.startsWith("Rented")) {
      return "bg-purple-100 text-purple-800"
    }
    return "bg-green-100 text-green-800"
  }

  const handleEdit = (vehicle: any) => {
    setEditingVehicle({ ...vehicle })
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = () => {
    // Here you would typically save to your backend
    console.log("Saving vehicle:", editingVehicle)
    setIsEditModalOpen(false)
    setEditingVehicle(null)
    // You could update the mockVehicles array here for demo purposes
  }

  const handleCancelEdit = () => {
    setIsEditModalOpen(false)
    setEditingVehicle(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor your fleet vehicles</p>
        </div>
        <Link href="/vehicles/add">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockVehicles.length}</div>
            <p className="text-xs text-muted-foreground">Fleet size</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <MapPin className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockVehicles.filter((v) => v.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">On the road</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <MapPin className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockVehicles.filter((v) => v.status === "In Transit").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently moving</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockVehicles.filter((v) => v.status === "Maintenance").length}
            </div>
            <p className="text-xs text-muted-foreground">Under service</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rented Out</CardTitle>
            <Truck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {mockVehicles.filter((v) => v.customerRent.startsWith("Rented")).length}
            </div>
            <p className="text-xs text-muted-foreground">To customers</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Fleet</CardTitle>
          <CardDescription>Monitor and manage all vehicles in your fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("in transit")}>In Transit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("maintenance")}>Maintenance</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Vehicle Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Fuel</TableHead>
                  <TableHead>Mileage</TableHead>
                  <TableHead>Last Service</TableHead>
                  <TableHead>Customer Rent</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{vehicle.plateNumber}</div>
                        <div className="text-sm text-gray-500">
                          {vehicle.model} ({vehicle.year})
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {vehicle.location}
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.driver}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Fuel className="h-4 w-4 mr-1 text-gray-400" />
                        <span className={getFuelLevelColor(vehicle.fuelLevel)}>{vehicle.fuelLevel}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.mileage.toLocaleString()} km</TableCell>
                    <TableCell>{vehicle.lastMaintenance}</TableCell>
                    <TableCell>
                      <Badge className={getRentalStatusColor(vehicle.customerRent)}>{vehicle.customerRent}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(vehicle)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Vehicle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MapPin className="h-4 w-4 mr-2" />
                            Track Location
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Vehicle
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Edit Vehicle Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
            <DialogDescription>Update the vehicle information below.</DialogDescription>
          </DialogHeader>
          {editingVehicle && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-plateNumber">Plate Number</Label>
                  <Input
                    id="edit-plateNumber"
                    value={editingVehicle.plateNumber}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, plateNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-model">Model</Label>
                  <Input
                    id="edit-model"
                    value={editingVehicle.model}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, model: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-year">Year</Label>
                  <Input
                    id="edit-year"
                    type="number"
                    value={editingVehicle.year}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, year: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingVehicle.status}
                    onValueChange={(value) => setEditingVehicle({ ...editingVehicle, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="In Transit">In Transit</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-driver">Driver</Label>
                  <Input
                    id="edit-driver"
                    value={editingVehicle.driver}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, driver: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={editingVehicle.location}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-fuelLevel">Fuel Level (%)</Label>
                  <Input
                    id="edit-fuelLevel"
                    type="number"
                    min="0"
                    max="100"
                    value={editingVehicle.fuelLevel}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, fuelLevel: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-customerRent">Customer Rent</Label>
                  <Select
                    value={editingVehicle.customerRent}
                    onValueChange={(value) => setEditingVehicle({ ...editingVehicle, customerRent: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Rented - ABC Corp">Rented - ABC Corp</SelectItem>
                      <SelectItem value="Rented - XYZ Logistics">Rented - XYZ Logistics</SelectItem>
                      <SelectItem value="Rented - DEF Company">Rented - DEF Company</SelectItem>
                    </SelectContent>
                  </Select>
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
