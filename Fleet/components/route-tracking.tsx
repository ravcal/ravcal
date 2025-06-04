import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MapPin, Clock, Fuel, TrendingUp, Navigation, Plus } from "lucide-react"

export function RouteTracking() {
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
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? (completed / total) * 100 : 0
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Route Tracking</h2>
          <p className="text-gray-600 mt-2">Monitor active routes and optimize delivery schedules</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Route
        </Button>
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
                <div className="text-2xl font-bold text-orange-600">94%</div>
                <p className="text-sm text-gray-600">On-Time Delivery</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Route Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Live Route Map</CardTitle>
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

      {/* Route Table */}
      <Card>
        <CardHeader>
          <CardTitle>Route Details</CardTitle>
          <CardDescription>Current and scheduled routes for all vehicles</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Vehicle & Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Fuel Used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
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
                    <div className="flex items-center text-sm">
                      <Clock className="h-3 w-3 mr-1 text-gray-400" />
                      <div>
                        <div>
                          {route.startTime} - {route.estimatedEnd}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{route.distance}</TableCell>
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
                    <div className="flex items-center">
                      <Fuel className="h-3 w-3 mr-1 text-gray-400" />
                      {route.fuelUsed}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
