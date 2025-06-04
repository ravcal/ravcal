"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Fuel,
  TrendingUp,
  DollarSign,
  Download,
  Plus,
  Search,
  BarChart3,
  Edit,
  Eye,
  Trash2,
  MoreHorizontal,
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FuelTransaction {
  id: string
  vehicleId: string
  vehiclePlate: string
  driverId: string
  driverName: string
  date: string
  time: string
  location: string
  fuelType: string
  quantity: number
  pricePerLiter: number
  totalCost: number
  odometer: number
  fuelEfficiency: number
  receiptNumber: string
  status: "completed" | "pending" | "disputed"
}

interface FuelStats {
  totalSpent: number
  totalLiters: number
  avgEfficiency: number
  avgCostPerLiter: number
  monthlyChange: number
}

export function FuelManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("30")
  const [editingTransaction, setEditingTransaction] = useState<FuelTransaction | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Mock data
  const fuelStats: FuelStats = {
    totalSpent: 45680.5,
    totalLiters: 12450.75,
    avgEfficiency: 8.5,
    avgCostPerLiter: 3.67,
    monthlyChange: 12.5,
  }

  const fuelTransactions: FuelTransaction[] = [
    {
      id: "FT001",
      vehicleId: "V001",
      vehiclePlate: "ABC-123",
      driverId: "D001",
      driverName: "John Smith",
      date: "2024-01-15",
      time: "14:30",
      location: "Shell Station - Main St",
      fuelType: "Diesel",
      quantity: 85.5,
      pricePerLiter: 3.65,
      totalCost: 312.08,
      odometer: 125430,
      fuelEfficiency: 8.2,
      receiptNumber: "SH001234",
      status: "completed",
    },
    {
      id: "FT002",
      vehicleId: "V002",
      vehiclePlate: "XYZ-789",
      driverId: "D002",
      driverName: "Sarah Johnson",
      date: "2024-01-15",
      time: "09:15",
      location: "BP Station - Highway 101",
      fuelType: "Gasoline",
      quantity: 65.2,
      pricePerLiter: 3.45,
      totalCost: 224.94,
      odometer: 89650,
      fuelEfficiency: 9.1,
      receiptNumber: "BP005678",
      status: "completed",
    },
    {
      id: "FT003",
      vehicleId: "V003",
      vehiclePlate: "DEF-456",
      driverId: "D003",
      driverName: "Mike Wilson",
      date: "2024-01-14",
      time: "16:45",
      location: "Texaco Station - Downtown",
      fuelType: "Diesel",
      quantity: 92.8,
      pricePerLiter: 3.72,
      totalCost: 345.22,
      odometer: 156780,
      fuelEfficiency: 7.8,
      receiptNumber: "TX009876",
      status: "pending",
    },
  ]

  const filteredTransactions = fuelTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesVehicle = selectedVehicle === "all" || transaction.vehicleId === selectedVehicle

    return matchesSearch && matchesVehicle
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "disputed":
        return <Badge variant="destructive">Disputed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleEdit = (transaction: FuelTransaction) => {
    setEditingTransaction({ ...transaction })
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = () => {
    console.log("Saving fuel transaction:", editingTransaction)
    setIsEditModalOpen(false)
    setEditingTransaction(null)
  }

  const handleCancelEdit = () => {
    setIsEditModalOpen(false)
    setEditingTransaction(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fuel Management</h1>
          <p className="text-gray-600 mt-1">Monitor fuel consumption, costs, and efficiency</p>
        </div>
        <Link href="/fuel/add">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Fuel Transaction
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fuel Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${fuelStats.totalSpent.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{fuelStats.monthlyChange}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liters</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fuelStats.totalLiters.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all vehicles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fuelStats.avgEfficiency} km/L</div>
            <p className="text-xs text-muted-foreground">Fleet average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Cost/Liter</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${fuelStats.avgCostPerLiter}</div>
            <p className="text-xs text-muted-foreground">Current average</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Fuel Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency Report</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by vehicle, driver, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicles</SelectItem>
                    <SelectItem value="V001">ABC-123</SelectItem>
                    <SelectItem value="V002">XYZ-789</SelectItem>
                    <SelectItem value="V003">DEF-456</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Fuel Transactions</CardTitle>
              <CardDescription>{filteredTransactions.length} transactions found</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Fuel Type</TableHead>
                    <TableHead>Quantity (L)</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="text-sm">
                          <div>{transaction.date}</div>
                          <div className="text-gray-500">{transaction.time}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.vehiclePlate}</TableCell>
                      <TableCell>{transaction.driverName}</TableCell>
                      <TableCell className="max-w-32 truncate">{transaction.location}</TableCell>
                      <TableCell>{transaction.fuelType}</TableCell>
                      <TableCell>{transaction.quantity.toFixed(1)}</TableCell>
                      <TableCell>${transaction.totalCost.toFixed(2)}</TableCell>
                      <TableCell>{transaction.fuelEfficiency} km/L</TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleEdit(transaction)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Transaction
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Transaction
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Fuel Analytics</CardTitle>
              <CardDescription>Detailed fuel consumption and cost analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Fuel analytics charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency">
          <Card>
            <CardHeader>
              <CardTitle>Fuel Efficiency Report</CardTitle>
              <CardDescription>Vehicle fuel efficiency comparison and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Efficiency reports will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Fuel Transaction Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Fuel Transaction</DialogTitle>
            <DialogDescription>Update the fuel transaction information below.</DialogDescription>
          </DialogHeader>
          {editingTransaction && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-vehiclePlate">Vehicle</Label>
                  <Input
                    id="edit-vehiclePlate"
                    value={editingTransaction.vehiclePlate}
                    onChange={(e) => setEditingTransaction({ ...editingTransaction, vehiclePlate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-driverName">Driver</Label>
                  <Input
                    id="edit-driverName"
                    value={editingTransaction.driverName}
                    onChange={(e) => setEditingTransaction({ ...editingTransaction, driverName: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editingTransaction.date}
                    onChange={(e) => setEditingTransaction({ ...editingTransaction, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Time</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={editingTransaction.time}
                    onChange={(e) => setEditingTransaction({ ...editingTransaction, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={editingTransaction.location}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, location: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-fuelType">Fuel Type</Label>
                  <Select
                    value={editingTransaction.fuelType}
                    onValueChange={(value) => setEditingTransaction({ ...editingTransaction, fuelType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Gasoline">Gasoline</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingTransaction.status}
                    onValueChange={(value) => setEditingTransaction({ ...editingTransaction, status: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="disputed">Disputed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-quantity">Quantity (L)</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    step="0.1"
                    value={editingTransaction.quantity}
                    onChange={(e) =>
                      setEditingTransaction({ ...editingTransaction, quantity: Number.parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-pricePerLiter">Price per Liter</Label>
                  <Input
                    id="edit-pricePerLiter"
                    type="number"
                    step="0.01"
                    value={editingTransaction.pricePerLiter}
                    onChange={(e) =>
                      setEditingTransaction({ ...editingTransaction, pricePerLiter: Number.parseFloat(e.target.value) })
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
