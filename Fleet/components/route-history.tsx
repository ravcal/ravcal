"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Search, Filter, Download, Eye, MapPin, Clock, Fuel, TrendingUp } from "lucide-react"

export function RouteHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  const completedRoutes = [
    {
      id: "R001",
      name: "Downtown Delivery",
      date: "2024-03-10",
      vehicle: "FL-001",
      driver: "John Smith",
      startTime: "08:30",
      endTime: "12:15",
      duration: "3h 45m",
      distance: "45.2 km",
      fuelUsed: "8.5L",
      fuelEfficiency: "5.3 km/L",
      stops: 12,
      completedStops: 12,
      onTimeDeliveries: 11,
      efficiency: 92,
      cost: "$85.50",
      status: "Completed",
    },
    {
      id: "R002",
      name: "Airport Shuttle",
      date: "2024-03-10",
      vehicle: "FL-003",
      driver: "Mike Davis",
      startTime: "06:00",
      endTime: "14:30",
      duration: "8h 30m",
      distance: "120.8 km",
      fuelUsed: "22.3L",
      fuelEfficiency: "5.4 km/L",
      stops: 6,
      completedStops: 6,
      onTimeDeliveries: 5,
      efficiency: 88,
      cost: "$195.75",
      status: "Completed",
    },
    {
      id: "R003",
      name: "City Center Route",
      date: "2024-03-09",
      vehicle: "FL-005",
      driver: "Lisa Wilson",
      startTime: "09:00",
      endTime: "13:00",
      duration: "4h 00m",
      distance: "32.1 km",
      fuelUsed: "6.2L",
      fuelEfficiency: "5.2 km/L",
      stops: 8,
      completedStops: 8,
      onTimeDeliveries: 8,
      efficiency: 95,
      cost: "$62.40",
      status: "Completed",
    },
    {
      id: "R004",
      name: "Industrial Zone",
      date: "2024-03-09",
      vehicle: "FL-004",
      driver: "Sarah Johnson",
      startTime: "14:00",
      endTime: "18:45",
      duration: "4h 45m",
      distance: "67.5 km",
      fuelUsed: "13.2L",
      fuelEfficiency: "5.1 km/L",
      stops: 15,
      completedStops: 14,
      onTimeDeliveries: 12,
      efficiency: 78,
      cost: "$125.80",
      status: "Completed with Issues",
    },
    {
      id: "R005",
      name: "Suburban Express",
      date: "2024-03-08",
      vehicle: "FL-002",
      driver: "Robert Brown",
      startTime: "10:00",
      endTime: "15:30",
      duration: "5h 30m",
      distance: "78.3 km",
      fuelUsed: "14.8L",
      fuelEfficiency: "5.3 km/L",
      stops: 10,
      completedStops: 10,
      onTimeDeliveries: 9,
      efficiency: 85,
      cost: "$142.20",
      status: "Completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Completed with Issues":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600"
    if (efficiency >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredRoutes = completedRoutes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driver.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">156</div>
                <p className="text-sm text-gray-600">Total Routes Completed</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">87%</div>
                <p className="text-sm text-gray-600">Avg Efficiency</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">4.2h</div>
                <p className="text-sm text-gray-600">Avg Duration</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">5.3</div>
                <p className="text-sm text-gray-600">Avg Fuel Efficiency (km/L)</p>
              </div>
              <Fuel className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "PPP") : "From date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "PPP") : "To date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
              </PopoverContent>
            </Popover>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Routes</CardTitle>
          <CardDescription>Historical data for all completed routes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Vehicle & Driver</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
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
                      <div className="font-medium">{route.date}</div>
                      <div className="text-sm text-gray-500">
                        {route.startTime} - {route.endTime}
                      </div>
                      <div className="text-sm text-gray-500">{route.duration}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{route.vehicle}</div>
                      <div className="text-sm text-gray-500">{route.driver}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">{route.distance}</span> • {route.fuelUsed}
                      </div>
                      <div className="text-sm text-gray-500">
                        {route.completedStops}/{route.stops} stops
                      </div>
                      <div className="text-sm text-gray-500">
                        {route.onTimeDeliveries}/{route.stops} on-time
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className={`font-medium ${getEfficiencyColor(route.efficiency)}`}>{route.efficiency}%</span>
                      <div className="text-sm text-gray-500">{route.fuelEfficiency}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{route.cost}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(route.status)}>{route.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
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
