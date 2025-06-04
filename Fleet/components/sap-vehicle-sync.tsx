"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderSyncIcon as Sync, CheckCircle, AlertTriangle, Clock, Upload, RefreshCw, Eye, Edit } from "lucide-react"

interface VehicleSyncData {
  fleetId: string
  sapEquipmentNumber: string
  make: string
  model: string
  year: number
  status: string
  lastSyncDate: string
  syncStatus: "synced" | "pending" | "error" | "conflict"
  conflicts?: string[]
  sapData?: any
  fleetData?: any
}

export function SAPVehicleSync() {
  const [vehicles, setVehicles] = useState<VehicleSyncData[]>([
    {
      fleetId: "FL-001",
      sapEquipmentNumber: "EQ-12345",
      make: "Ford",
      model: "Transit",
      year: 2022,
      status: "Active",
      lastSyncDate: "2024-03-10 14:30:00",
      syncStatus: "synced",
    },
    {
      fleetId: "FL-002",
      sapEquipmentNumber: "EQ-12346",
      make: "Mercedes",
      model: "Sprinter",
      year: 2021,
      status: "Maintenance",
      lastSyncDate: "2024-03-10 14:25:00",
      syncStatus: "pending",
    },
    {
      fleetId: "FL-003",
      sapEquipmentNumber: "EQ-12347",
      make: "Chevrolet",
      model: "Express",
      year: 2023,
      status: "Active",
      lastSyncDate: "2024-03-10 14:20:00",
      syncStatus: "conflict",
      conflicts: ["Status mismatch: Fleet shows Active, SAP shows Maintenance"],
    },
    {
      fleetId: "FL-004",
      sapEquipmentNumber: "",
      make: "Ford",
      model: "E-Series",
      year: 2020,
      status: "Idle",
      lastSyncDate: "Never",
      syncStatus: "error",
    },
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleSyncData | null>(null)

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case "synced":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "conflict":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case "synced":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "conflict":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return <Sync className="h-4 w-4 text-gray-600" />
    }
  }

  const syncVehicle = async (vehicleId: string) => {
    setIsLoading(true)

    try {
      // Simulate sync operation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.fleetId === vehicleId
            ? {
                ...vehicle,
                syncStatus: "synced" as const,
                lastSyncDate: new Date().toLocaleString(),
                conflicts: undefined,
              }
            : vehicle,
        ),
      )
    } catch (error) {
      console.error("Sync failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const syncAllVehicles = async () => {
    setIsLoading(true)

    try {
      // Simulate bulk sync operation
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setVehicles((prev) =>
        prev.map((vehicle) => ({
          ...vehicle,
          syncStatus: "synced" as const,
          lastSyncDate: new Date().toLocaleString(),
          conflicts: undefined,
        })),
      )
    } catch (error) {
      console.error("Bulk sync failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resolveConflict = async (vehicleId: string, resolution: "fleet" | "sap") => {
    setIsLoading(true)

    try {
      // Simulate conflict resolution
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.fleetId === vehicleId
            ? {
                ...vehicle,
                syncStatus: "synced" as const,
                lastSyncDate: new Date().toLocaleString(),
                conflicts: undefined,
              }
            : vehicle,
        ),
      )
    } catch (error) {
      console.error("Conflict resolution failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const syncedCount = vehicles.filter((v) => v.syncStatus === "synced").length
  const pendingCount = vehicles.filter((v) => v.syncStatus === "pending").length
  const errorCount = vehicles.filter((v) => v.syncStatus === "error").length
  const conflictCount = vehicles.filter((v) => v.syncStatus === "conflict").length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Vehicle SAP Synchronization</h2>
          <p className="text-gray-600 mt-2">Manage vehicle data synchronization with SAP ERP</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={syncAllVehicles} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Sync All
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Export to SAP
          </Button>
        </div>
      </div>

      {/* Sync Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{syncedCount}</div>
                <p className="text-sm text-gray-600">Synced</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{conflictCount}</div>
                <p className="text-sm text-gray-600">Conflicts</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                <p className="text-sm text-gray-600">Errors</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conflicts">Conflicts</TabsTrigger>
          <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Synchronization Status</CardTitle>
              <CardDescription>Current sync status for all fleet vehicles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fleet ID</TableHead>
                    <TableHead>SAP Equipment</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sync Status</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.fleetId}>
                      <TableCell className="font-medium">{vehicle.fleetId}</TableCell>
                      <TableCell>{vehicle.sapEquipmentNumber || "Not Mapped"}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {vehicle.make} {vehicle.model}
                          </div>
                          <div className="text-sm text-gray-500">{vehicle.year}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{vehicle.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getSyncStatusIcon(vehicle.syncStatus)}
                          <Badge className={getSyncStatusColor(vehicle.syncStatus)}>{vehicle.syncStatus}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{vehicle.lastSyncDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => syncVehicle(vehicle.fleetId)}
                            disabled={isLoading}
                          >
                            <Sync className="h-3 w-3 mr-1" />
                            Sync
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setSelectedVehicle(vehicle)}>
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conflicts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Conflicts</CardTitle>
              <CardDescription>Resolve conflicts between Fleet and SAP data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles
                  .filter((v) => v.syncStatus === "conflict")
                  .map((vehicle) => (
                    <div key={vehicle.fleetId} className="border rounded-lg p-4 bg-orange-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">
                            {vehicle.fleetId} - {vehicle.make} {vehicle.model}
                          </h3>
                          <p className="text-sm text-gray-600">SAP Equipment: {vehicle.sapEquipmentNumber}</p>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800">Conflict</Badge>
                      </div>

                      {vehicle.conflicts && (
                        <div className="space-y-2 mb-4">
                          <h4 className="text-sm font-medium text-orange-800">Conflicts:</h4>
                          {vehicle.conflicts.map((conflict, index) => (
                            <div key={index} className="text-sm text-orange-700 bg-orange-100 p-2 rounded">
                              {conflict}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => resolveConflict(vehicle.fleetId, "fleet")}
                          disabled={isLoading}
                        >
                          Use Fleet Data
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => resolveConflict(vehicle.fleetId, "sap")}
                          disabled={isLoading}
                        >
                          Use SAP Data
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setSelectedVehicle(vehicle)}>
                          <Edit className="h-3 w-3 mr-1" />
                          Manual Resolve
                        </Button>
                      </div>
                    </div>
                  ))}

                {vehicles.filter((v) => v.syncStatus === "conflict").length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No conflicts found</p>
                    <p className="text-sm">All vehicle data is synchronized</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Field Mapping Configuration</CardTitle>
              <CardDescription>Configure how Fleet data maps to SAP fields</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Fleet System Fields</h3>
                    <div className="space-y-2">
                      <div className="p-2 border rounded bg-blue-50">Vehicle ID</div>
                      <div className="p-2 border rounded bg-blue-50">Make</div>
                      <div className="p-2 border rounded bg-blue-50">Model</div>
                      <div className="p-2 border rounded bg-blue-50">Year</div>
                      <div className="p-2 border rounded bg-blue-50">Status</div>
                      <div className="p-2 border rounded bg-blue-50">Location</div>
                      <div className="p-2 border rounded bg-blue-50">Odometer</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">SAP ERP Fields</h3>
                    <div className="space-y-2">
                      <div className="p-2 border rounded bg-green-50">Equipment Number</div>
                      <div className="p-2 border rounded bg-green-50">Manufacturer</div>
                      <div className="p-2 border rounded bg-green-50">Model Number</div>
                      <div className="p-2 border rounded bg-green-50">Year of Manufacture</div>
                      <div className="p-2 border rounded bg-green-50">System Status</div>
                      <div className="p-2 border rounded bg-green-50">Functional Location</div>
                      <div className="p-2 border rounded bg-green-50">Reading Value</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-3">Transformation Rules</h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded bg-gray-50">
                      <strong>Status Mapping:</strong> Active → OPER, Maintenance → MNTC, Idle → IDLE
                    </div>
                    <div className="p-2 border rounded bg-gray-50">
                      <strong>Date Format:</strong> MM/DD/YYYY → YYYY-MM-DD
                    </div>
                    <div className="p-2 border rounded bg-gray-50">
                      <strong>Cost Center:</strong> Auto-assign based on vehicle type and location
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Vehicle Sync Details - {selectedVehicle.fleetId}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedVehicle(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Fleet Data</h3>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>ID:</strong> {selectedVehicle.fleetId}
                      </div>
                      <div>
                        <strong>Make:</strong> {selectedVehicle.make}
                      </div>
                      <div>
                        <strong>Model:</strong> {selectedVehicle.model}
                      </div>
                      <div>
                        <strong>Year:</strong> {selectedVehicle.year}
                      </div>
                      <div>
                        <strong>Status:</strong> {selectedVehicle.status}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">SAP Data</h3>
                    <div className="space-y-1 text-sm">
                      <div>
                        <strong>Equipment:</strong> {selectedVehicle.sapEquipmentNumber || "Not Mapped"}
                      </div>
                      <div>
                        <strong>Manufacturer:</strong> {selectedVehicle.make}
                      </div>
                      <div>
                        <strong>Model:</strong> {selectedVehicle.model}
                      </div>
                      <div>
                        <strong>Year:</strong> {selectedVehicle.year}
                      </div>
                      <div>
                        <strong>Status:</strong> {selectedVehicle.status}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-2">
                        {getSyncStatusIcon(selectedVehicle.syncStatus)}
                        <Badge className={getSyncStatusColor(selectedVehicle.syncStatus)}>
                          {selectedVehicle.syncStatus}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Last sync: {selectedVehicle.lastSyncDate}</p>
                    </div>
                    <Button onClick={() => syncVehicle(selectedVehicle.fleetId)} disabled={isLoading}>
                      <Sync className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
