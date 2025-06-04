"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Users, Route, Wrench, AlertTriangle, Fuel, Calendar, CheckCircle, Clock } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Welcome to FleetPro Manager</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Fleet Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">89</div>
                    <p className="text-sm text-gray-600">Total Vehicles</p>
                  </div>
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600">94</div>
                    <p className="text-sm text-gray-600">Active Drivers</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <p className="text-sm text-gray-600">Active Routes</p>
                  </div>
                  <Route className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">5</div>
                    <p className="text-sm text-gray-600">Maintenance Due</p>
                  </div>
                  <Wrench className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts and Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Alerts & Notifications</CardTitle>
              <CardDescription>Recent alerts requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-red-50">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Vehicle Breakdown</h4>
                      <p className="text-sm text-red-700 mt-1">
                        Vehicle FL-002 (Mercedes Sprinter) reported engine failure on Highway 101.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-yellow-50">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Maintenance Due</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        5 vehicles are due for scheduled maintenance in the next 7 days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-start space-x-3">
                    <Fuel className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Fuel Consumption Alert</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Vehicle FL-003 showing 20% higher fuel consumption than average.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Upcoming activities for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Route Departure: Downtown Delivery</h4>
                      <span className="text-sm text-gray-500">08:30 AM</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Driver: John Smith, Vehicle: FL-001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Maintenance Completed: Oil Change</h4>
                      <span className="text-sm text-gray-500">10:15 AM</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Vehicle: FL-005, Technician: Mike Johnson</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Driver Meeting: Safety Training</h4>
                      <span className="text-sm text-gray-500">02:00 PM</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Location: Main Office, Duration: 1 hour</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators for your fleet</CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorBoundary>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Fleet Utilization</span>
                      <span className="text-sm font-bold text-green-600">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                    <p className="text-xs text-gray-500">+5% from last month</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">On-Time Delivery</span>
                      <span className="text-sm font-bold text-blue-600">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                    <p className="text-xs text-gray-500">+2% from last month</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Fuel Efficiency</span>
                      <span className="text-sm font-bold text-orange-600">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <p className="text-xs text-gray-500">-3% from last month</p>
                  </div>
                </div>
              </ErrorBoundary>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Status</CardTitle>
              <CardDescription>Current status of your fleet vehicles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Vehicle status information will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Driver Status</CardTitle>
              <CardDescription>Current status of your drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Driver status information will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Route Status</CardTitle>
              <CardDescription>Current status of your routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Route className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Route status information will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
