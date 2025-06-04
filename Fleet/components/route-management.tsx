"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Fuel,
  TrendingUp,
  Navigation,
  MoreHorizontal,
  Zap,
  Clock,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export function RouteManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const routes = [
    {
      id: "R001",
      name: "Downtown Delivery",
      vehicle: "FL-001",
      driver: "John Smith",
      status: "Active",
      startTime: "08:30 AM",
      estimatedEnd: "12:30 PM",
      distance: "45.2 km",
      fuelUsed: "8.5L",
      stops: 12,
      completed: 8,
      efficiency: 92,
      lastOptimized: "2024-03-01",
    },
    {
      id: "R002",
      name: "Airport Shuttle",
      vehicle: "FL-003",
      driver: "Mike Davis",
      status: "Active",
      startTime: "06:00 AM",
      estimatedEnd: "02:00 PM",
      distance: "120.8 km",
      fuelUsed: "22.3L",
      stops: 6,
      completed: 4,
      efficiency: 88,
      lastOptimized: "2024-02-28",
    },
    {
      id: "R003",
      name: "City Center Route",
      vehicle: "FL-005",
      driver: "Lisa Wilson",
      status: "Completed",
      startTime: "09:00 AM",
      estimatedEnd: "01:00 PM",
      distance: "32.1 km",
      fuelUsed: "6.2L",
      stops: 8,
      completed: 8,
      efficiency: 95,
      lastOptimized: "2024-03-05",
    },
    {
      id: "R004",
      name: "Industrial Zone",
      vehicle: "FL-004",
      driver: "Unassigned",
      status: "Scheduled",
      startTime: "02:00 PM",
      estimatedEnd: "06:00 PM",
      distance: "67.5 km",
      fuelUsed: "N/A",
      stops: 15,
      completed: 0,
      efficiency: 85,
      lastOptimized: "2024-02-25",
    },
    {
      id: "R005",
      name: "Suburban Express",
      vehicle: "FL-002",
      driver: "Sarah Johnson",
      status: "Paused",
      startTime: "10:00 AM",
      estimatedEnd: "03:00 PM",
      distance: "78.3 km",
      fuelUsed: "14.2L",
      stops: 10,
      completed: 6,
      efficiency: 78,
      lastOptimized: "2024-02-20",
    },
  ]

  const routeTemplates = [
    {
      id: "T001",
      name: "Standard Delivery Template",
      stops: 8,
      avgDistance: "35 km",
      avgDuration: "4 hours",
      frequency: "Daily",
      vehicles: 3,
    },
    {
      id: "T002",
      name: "Express Route Template",
      stops: 5,
      avgDistance: "25 km",
      avgDuration: "2.5 hours",
      frequency: "Twice Daily",
      vehicles: 2,
    },
    {
      id: "T003",
      name: "Long Haul Template",
      stops: 12,
      avgDistance: "150 km",
      avgDuration: "8 hours",
      frequency: "Weekly",
      vehicles: 1,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Scheduled":
        return "bg-yellow-100 text-yellow-800"
      case "Paused":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600"
    if (efficiency >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? (completed / total) * 100 : 0
  }

  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driver.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Route Management</h2>
          <p className="text-gray-600 mt-2">Plan, optimize, and track your fleet routes</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/routes/history">
              <Clock className="h-4 w-4 mr-2" />
              View History
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/routes/analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/routes/optimize">
              <Zap className="h-4 w-4 mr-2" />
              Optimize Routes
            </Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/routes/add">
              <Plus className="h-4 w-4 mr-2" />
              Create Route
            </Link>
          </Button>
        </div>
      </div>

      {/* Route Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">12</div>
                <p className="text-sm text-gray-600">Active Routes</p>
              </div>
              <Navigation className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">847 km</div>
                <p className="text-sm text-gray-600">Total Distance Today</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">156L</div>
                <p className="text-sm text-gray-600">Fuel Consumed</p>
              </div>
              <Fuel className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">87%</div>
                <p className="text-sm text-gray-600">Avg Efficiency</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="active">Active Routes</TabsTrigger>
          <TabsTrigger value="all">All Routes</TabsTrigger>
          <TabsTrigger value="templates">Route Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search routes..."
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

          {/* Live Route Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Live Route Tracking</CardTitle>
              <CardDescription>Real-time tracking of active routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive map would be displayed here</p>
                  <p className="text-sm text-gray-400">Showing real-time vehicle locations and routes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Routes Table */}
          <Card>
            <CardHeader>
              <CardTitle>Active Routes</CardTitle>
              <CardDescription>Currently running routes and their progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Vehicle & Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes
                    .filter((route) => route.status === "Active")
                    .map((route) => (
                      <TableRow key={route.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{route.name}</div>
                            <div className="text-sm text-gray-500">{route.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{route.vehicle}</div>
                            <div className="text-sm text-gray-500">{route.driver}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(route.status)}>{route.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              {route.completed}/{route.stops} stops
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${getProgressPercentage(route.completed, route.stops)}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={getEfficiencyColor(route.efficiency)}>{route.efficiency}%</span>
                        </TableCell>
                        <TableCell>{route.estimatedEnd}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search all routes..."
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

          {/* All Routes Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Routes</CardTitle>
              <CardDescription>Complete list of all routes in your system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Vehicle & Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Stops</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Last Optimized</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{route.name}</div>
                          <div className="text-sm text-gray-500">{route.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{route.vehicle}</div>
                          <div className="text-sm text-gray-500">{route.driver}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(route.status)}>{route.status}</Badge>
                      </TableCell>
                      <TableCell>{route.distance}</TableCell>
                      <TableCell>{route.stops}</TableCell>
                      <TableCell>
                        <span className={getEfficiencyColor(route.efficiency)}>{route.efficiency}%</span>
                      </TableCell>
                      <TableCell>{route.lastOptimized}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Route Templates</CardTitle>
              <CardDescription>Pre-configured route templates for quick route creation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routeTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Stops:</span>
                          <span className="ml-2 font-medium">{template.stops}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Distance:</span>
                          <span className="ml-2 font-medium">{template.avgDistance}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <span className="ml-2 font-medium">{template.avgDuration}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Frequency:</span>
                          <span className="ml-2 font-medium">{template.frequency}</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center h-full p-6">
                    <Plus className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Create New Template</h3>
                    <p className="text-sm text-gray-500 text-center mb-4">Create a new route template for future use</p>
                    <Button variant="outline" size="sm">
                      Create Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
