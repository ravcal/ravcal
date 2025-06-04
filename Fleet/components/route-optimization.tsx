"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Clock, Fuel, MapPin, Route, BarChart3 } from "lucide-react"

export function RouteOptimization() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState("")

  const routes = [
    {
      id: "R001",
      name: "Downtown Delivery",
      currentEfficiency: 78,
      optimizedEfficiency: 92,
      timeSaved: "45 min",
      fuelSaved: "12%",
      distanceReduced: "8.5 km",
      status: "needs-optimization",
    },
    {
      id: "R002",
      name: "Airport Shuttle",
      currentEfficiency: 88,
      optimizedEfficiency: 94,
      timeSaved: "22 min",
      fuelSaved: "7%",
      distanceReduced: "5.2 km",
      status: "good",
    },
    {
      id: "R003",
      name: "City Center Route",
      currentEfficiency: 95,
      optimizedEfficiency: 96,
      timeSaved: "8 min",
      fuelSaved: "2%",
      distanceReduced: "1.1 km",
      status: "optimized",
    },
    {
      id: "R004",
      name: "Industrial Zone",
      currentEfficiency: 65,
      optimizedEfficiency: 85,
      timeSaved: "67 min",
      fuelSaved: "18%",
      distanceReduced: "15.3 km",
      status: "critical",
    },
  ]

  const optimizationSuggestions = [
    {
      type: "reorder",
      title: "Reorder Stops",
      description: "Optimize stop sequence to reduce travel time",
      impact: "High",
      savings: "25% time reduction",
    },
    {
      type: "consolidate",
      title: "Consolidate Routes",
      description: "Combine nearby routes for better efficiency",
      impact: "Medium",
      savings: "15% fuel savings",
    },
    {
      type: "timing",
      title: "Adjust Timing",
      description: "Modify departure times to avoid traffic",
      impact: "Medium",
      savings: "20% faster delivery",
    },
    {
      type: "vehicle",
      title: "Vehicle Reassignment",
      description: "Use more fuel-efficient vehicles for long routes",
      impact: "Low",
      savings: "8% cost reduction",
    },
  ]

  const handleOptimize = () => {
    setIsOptimizing(true)
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false)
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "needs-optimization":
        return "bg-orange-100 text-orange-800"
      case "good":
        return "bg-yellow-100 text-yellow-800"
      case "optimized":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-orange-600"
      case "Low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Optimization Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">4</div>
                <p className="text-sm text-gray-600">Routes to Optimize</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">23%</div>
                <p className="text-sm text-gray-600">Potential Fuel Savings</p>
              </div>
              <Fuel className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">2.5h</div>
                <p className="text-sm text-gray-600">Time Savings/Day</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">30km</div>
                <p className="text-sm text-gray-600">Distance Reduction</p>
              </div>
              <Route className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="analysis">Route Analysis</TabsTrigger>
          <TabsTrigger value="suggestions">Optimization Suggestions</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Route Efficiency Analysis</CardTitle>
              <CardDescription>Current vs optimized performance for all routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {routes.map((route) => (
                  <div key={route.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{route.name}</h3>
                        <p className="text-sm text-gray-500">{route.id}</p>
                      </div>
                      <Badge className={getStatusColor(route.status)}>
                        {route.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Current Efficiency</span>
                            <span className="text-sm text-gray-600">{route.currentEfficiency}%</span>
                          </div>
                          <Progress value={route.currentEfficiency} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Optimized Efficiency</span>
                            <span className="text-sm text-green-600">{route.optimizedEfficiency}%</span>
                          </div>
                          <Progress value={route.optimizedEfficiency} className="h-2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Clock className="h-4 w-4 text-blue-600 mr-1" />
                            <span className="text-sm font-medium">Time Saved</span>
                          </div>
                          <p className="text-lg font-bold text-blue-600">{route.timeSaved}</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Fuel className="h-4 w-4 text-green-600 mr-1" />
                            <span className="text-sm font-medium">Fuel Saved</span>
                          </div>
                          <p className="text-lg font-bold text-green-600">{route.fuelSaved}</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <MapPin className="h-4 w-4 text-purple-600 mr-1" />
                            <span className="text-sm font-medium">Distance</span>
                          </div>
                          <p className="text-lg font-bold text-purple-600">-{route.distanceReduced}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Zap className="h-4 w-4 mr-2" />
                        Optimize Route
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Suggestions</CardTitle>
              <CardDescription>AI-powered recommendations to improve route efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizationSuggestions.map((suggestion, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{suggestion.title}</h3>
                          <Badge variant="outline" className={getImpactColor(suggestion.impact)}>
                            {suggestion.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                        <p className="text-sm font-medium text-green-600">{suggestion.savings}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Route Optimization</CardTitle>
              <CardDescription>Optimize multiple routes simultaneously for maximum efficiency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Optimization Scope</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Routes</SelectItem>
                        <SelectItem value="active">Active Routes Only</SelectItem>
                        <SelectItem value="inefficient">Inefficient Routes (&lt;80%)</SelectItem>
                        <SelectItem value="custom">Custom Selection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Optimization Priority</label>
                    <Select defaultValue="balanced">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="time">Minimize Time</SelectItem>
                        <SelectItem value="fuel">Minimize Fuel</SelectItem>
                        <SelectItem value="distance">Minimize Distance</SelectItem>
                        <SelectItem value="balanced">Balanced Optimization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Expected Results</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Routes to optimize:</span>
                        <span className="text-sm font-medium">4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Estimated time savings:</span>
                        <span className="text-sm font-medium text-green-600">2.5 hours/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Estimated fuel savings:</span>
                        <span className="text-sm font-medium text-green-600">23%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Processing time:</span>
                        <span className="text-sm font-medium">~3 minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleOptimize}
                  disabled={isOptimizing}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isOptimizing ? (
                    <>
                      <BarChart3 className="mr-2 h-5 w-5 animate-pulse" />
                      Optimizing Routes...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Start Bulk Optimization
                    </>
                  )}
                </Button>
              </div>

              {isOptimizing && (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Optimization in progress...</p>
                    <Progress value={66} className="w-full" />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-blue-600 animate-pulse" />
                      <span className="text-sm font-medium text-blue-800">
                        Analyzing route patterns and traffic data...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
