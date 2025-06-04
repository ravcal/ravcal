"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, MoreHorizontal, Users, Car, Clock, Phone, Mail, Eye, Edit, Trash2 } from "lucide-react"
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

const mockDrivers = [
  {
    id: "D001",
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    licenseNumber: "DL123456789",
    status: "Active",
    currentVehicle: "ABC-123",
    totalTrips: 245,
    rating: 4.8,
    joinDate: "2023-01-15",
    lastActive: "2024-01-22 14:30",
  },
  {
    id: "D002",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 234-5678",
    licenseNumber: "DL987654321",
    status: "On Trip",
    currentVehicle: "XYZ-789",
    totalTrips: 189,
    rating: 4.9,
    joinDate: "2023-03-20",
    lastActive: "2024-01-22 15:45",
  },
  {
    id: "D003",
    name: "Mike Wilson",
    email: "mike.wilson@company.com",
    phone: "+1 (555) 345-6789",
    licenseNumber: "DL456789123",
    status: "Off Duty",
    currentVehicle: "GHI-321",
    totalTrips: 312,
    rating: 4.7,
    joinDate: "2022-11-10",
    lastActive: "2024-01-22 12:00",
  },
  {
    id: "D004",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+1 (555) 456-7890",
    licenseNumber: "DL789123456",
    status: "Active",
    currentVehicle: "Unassigned",
    totalTrips: 156,
    rating: 4.6,
    joinDate: "2023-06-05",
    lastActive: "2024-01-22 16:20",
  },
]

export function DriverManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [editingDriver, setEditingDriver] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const filteredDrivers = mockDrivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || driver.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "on trip":
        return "bg-blue-100 text-blue-800"
      case "off duty":
        return "bg-gray-100 text-gray-800"
      case "unavailable":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-yellow-600"
    return "text-red-600"
  }

  const handleEdit = (driver: any) => {
    setEditingDriver({ ...driver })
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = () => {
    console.log("Saving driver:", editingDriver)
    setIsEditModalOpen(false)
    setEditingDriver(null)
  }

  const handleCancelEdit = () => {
    setIsEditModalOpen(false)
    setEditingDriver(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Driver Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor your fleet drivers</p>
        </div>
        <Link href="/drivers/add">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Driver
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDrivers.length}</div>
            <p className="text-xs text-muted-foreground">Registered drivers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Car className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockDrivers.filter((d) => d.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">Available now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Trip</CardTitle>
            <Car className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockDrivers.filter((d) => d.status === "On Trip").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently driving</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Off Duty</CardTitle>
            <Clock className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {mockDrivers.filter((d) => d.status === "Off Duty").length}
            </div>
            <p className="text-xs text-muted-foreground">Not available</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Fleet</CardTitle>
          <CardDescription>Monitor and manage all drivers in your fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search drivers..."
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
                <DropdownMenuItem onClick={() => setStatusFilter("on trip")}>On Trip</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("off duty")}>Off Duty</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Driver Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Trips</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback>
                            {driver.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{driver.name}</div>
                          <div className="text-sm text-gray-500">{driver.licenseNumber}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(driver.status)}>{driver.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {driver.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {driver.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-1 text-gray-400" />
                        {driver.currentVehicle}
                      </div>
                    </TableCell>
                    <TableCell>{driver.totalTrips}</TableCell>
                    <TableCell>
                      <span className={getRatingColor(driver.rating)}>★ {driver.rating}</span>
                    </TableCell>
                    <TableCell>{driver.lastActive}</TableCell>
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
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(driver)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Driver
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Car className="h-4 w-4 mr-2" />
                            Assign Vehicle
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Driver
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

      {/* Edit Driver Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Driver</DialogTitle>
            <DialogDescription>Update the driver information below.</DialogDescription>
          </DialogHeader>
          {editingDriver && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={editingDriver.name}
                    onChange={(e) => setEditingDriver({ ...editingDriver, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-licenseNumber">License Number</Label>
                  <Input
                    id="edit-licenseNumber"
                    value={editingDriver.licenseNumber}
                    onChange={(e) => setEditingDriver({ ...editingDriver, licenseNumber: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingDriver.email}
                    onChange={(e) => setEditingDriver({ ...editingDriver, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={editingDriver.phone}
                    onChange={(e) => setEditingDriver({ ...editingDriver, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingDriver.status}
                    onValueChange={(value) => setEditingDriver({ ...editingDriver, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Trip">On Trip</SelectItem>
                      <SelectItem value="Off Duty">Off Duty</SelectItem>
                      <SelectItem value="Unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-currentVehicle">Current Vehicle</Label>
                  <Select
                    value={editingDriver.currentVehicle}
                    onValueChange={(value) => setEditingDriver({ ...editingDriver, currentVehicle: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unassigned">Unassigned</SelectItem>
                      <SelectItem value="ABC-123">ABC-123</SelectItem>
                      <SelectItem value="XYZ-789">XYZ-789</SelectItem>
                      <SelectItem value="DEF-456">DEF-456</SelectItem>
                      <SelectItem value="GHI-321">GHI-321</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-rating">Rating</Label>
                  <Input
                    id="edit-rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={editingDriver.rating}
                    onChange={(e) => setEditingDriver({ ...editingDriver, rating: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-totalTrips">Total Trips</Label>
                  <Input
                    id="edit-totalTrips"
                    type="number"
                    value={editingDriver.totalTrips}
                    onChange={(e) =>
                      setEditingDriver({ ...editingDriver, totalTrips: Number.parseInt(e.target.value) })
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
