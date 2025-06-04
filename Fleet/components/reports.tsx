"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Calendar, Truck, Users, Fuel, Wrench, BarChart3, PieChart, Search } from "lucide-react"

const reportTypes = [
  { id: "vehicle", name: "Vehicle Reports", icon: Truck, description: "Vehicle performance and utilization" },
  { id: "driver", name: "Driver Reports", icon: Users, description: "Driver performance and activity" },
  { id: "fuel", name: "Fuel Reports", icon: Fuel, description: "Fuel consumption and costs" },
  { id: "maintenance", name: "Maintenance Reports", icon: Wrench, description: "Maintenance schedules and costs" },
  { id: "route", name: "Route Reports", icon: BarChart3, description: "Route efficiency and analytics" },
  { id: "financial", name: "Financial Reports", icon: PieChart, description: "Cost analysis and budgets" },
]

const mockReports = [
  {
    id: "R001",
    name: "Monthly Vehicle Utilization",
    type: "Vehicle",
    period: "January 2024",
    status: "Generated",
    createdDate: "2024-01-31",
    size: "2.3 MB",
    format: "PDF",
  },
  {
    id: "R002",
    name: "Driver Performance Summary",
    type: "Driver",
    period: "Q4 2023",
    status: "Generating",
    createdDate: "2024-01-30",
    size: "1.8 MB",
    format: "Excel",
  },
  {
    id: "R003",
    name: "Fuel Consumption Analysis",
    type: "Fuel",
    period: "December 2023",
    status: "Generated",
    createdDate: "2024-01-29",
    size: "3.1 MB",
    format: "PDF",
  },
  {
    id: "R004",
    name: "Maintenance Cost Report",
    type: "Maintenance",
    period: "2023 Annual",
    status: "Generated",
    createdDate: "2024-01-28",
    size: "4.2 MB",
    format: "Excel",
  },
]

export function Reports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || report.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || report.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "generated":
        return "bg-green-100 text-green-800"
      case "generating":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate and manage fleet reports</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((type) => {
          const Icon = type.icon
          return (
            <Card key={type.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Generate {type.name}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>View and download previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vehicle">Vehicle</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="fuel">Fuel</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="generated">Generated</SelectItem>
                <SelectItem value="generating">Generating</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-gray-500">{report.format}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {report.period}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                    </TableCell>
                    <TableCell>{report.createdDate}</TableCell>
                    <TableCell>{report.size}</TableCell>
                    <TableCell className="text-right">
                      {report.status === "Generated" && (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.length}</div>
            <p className="text-xs text-muted-foreground">Generated this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehicle Reports</CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockReports.filter((r) => r.type === "Vehicle").length}
            </div>
            <p className="text-xs text-muted-foreground">Vehicle analytics</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Driver Reports</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockReports.filter((r) => r.type === "Driver").length}
            </div>
            <p className="text-xs text-muted-foreground">Driver performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Reports</CardTitle>
            <Fuel className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockReports.filter((r) => r.type === "Fuel").length}
            </div>
            <p className="text-xs text-muted-foreground">Fuel analysis</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
