"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Clock, Fuel, DollarSign, Target } from "lucide-react"

export function RouteAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")

  const performanceMetrics = [
    {
      title: "Route Efficiency",
      value: "87%",
      change: "+5.2%",
      trend: "up",
      target: "90%",
      icon: Target,
      color: "text-green-600",
    },
    {
      title: "On-Time Delivery",
      value: "94%",
      change: "+2.1%",
      trend: "up",
      target: "95%",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      title: "Fuel Efficiency",
      value: "5.3 km/L",
      change: "+0.3",
      trend: "up",
      target: "5.5 km/L",
      icon: Fuel,
      color: "text-purple-600",
    },
    {
      title: "Cost per Route",
      value: "$125.50",
      change: "-$8.20",
      trend: "down",
      target: "$120.00",
      icon: DollarSign,
      color: "text-orange-600",
    },
  ]

  const topRoutes = [
    {
      name: "City Center Route",
      efficiency: 95,
      completions: 28,
      avgTime: "4h 00m",
      savings: "$245",
    },
    {
      name: "Downtown Delivery",
      efficiency: 92,
      completions: 25,
      avgTime: "3h 45m",
      savings: "$198",
    },
    {
      name: "Airport Shuttle",
      efficiency: 88,
      completions: 15,
      avgTime: "8h 30m",
      savings: "$156",
    },
    {
      name: "Suburban Express",
      efficiency: 85,
      completions: 22,
      avgTime: "5h 30m",
      savings: "$134",
    },
  ]

  const driverPerformance = [
    {
      name: "Lisa Wilson",
      routes: 28,
      efficiency: 94,
      onTime: 98,
      fuelScore: 92,
    },
    {
      name: "John Smith",
      routes: 25,
      efficiency: 91,
      onTime: 96,
      fuelScore: 89,
    },
    {
      name: "Mike Davis",
      routes: 22,
      efficiency: 88,
      onTime: 94,
      fuelScore: 87,
    },
    {
      name: "Sarah Johnson",
      routes: 20,
      efficiency: 85,
      onTime: 92,
      fuelScore: 84,
    },
  ]

  const monthlyTrends = [
    { month: "Jan", routes: 120, efficiency: 82, cost: 15200 },
    { month: "Feb", routes: 135, efficiency: 84, cost: 16100 },
    { month: "Mar", routes: 142, efficiency: 87, cost: 16800 },
  ]

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Performance Overview</h3>
          <p className="text-sm text-gray-500">Route analytics and performance insights</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <p
                    className={`text-xs flex items-center ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    <TrendIcon className="h-3 w-3 mr-1" />
                    {metric.change}
                  </p>
                  <p className="text-xs text-gray-500">Target: {metric.target}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="routes" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="routes">Route Performance</TabsTrigger>
          <TabsTrigger value="drivers">Driver Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Routes */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Routes</CardTitle>
                <CardDescription>Routes with highest efficiency scores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topRoutes.map((route, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{route.name}</h4>
                        <Badge variant="outline" className="text-green-600">
                          {route.efficiency}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                        <span>{route.completions} routes</span>
                        <span>{route.avgTime} avg</span>
                        <span>{route.savings} saved</span>
                      </div>
                      <Progress value={route.efficiency} className="h-1 mt-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Route Efficiency Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Distribution</CardTitle>
                <CardDescription>Route performance breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Excellent (90%+)</span>
                    <span className="text-sm font-medium">15 routes</span>
                  </div>
                  <Progress value={75} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Good (80-89%)</span>
                    <span className="text-sm font-medium">28 routes</span>
                  </div>
                  <Progress value={60} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average (70-79%)</span>
                    <span className="text-sm font-medium">12 routes</span>
                  </div>
                  <Progress value={30} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Needs Improvement (&lt;70%)</span>
                    <span className="text-sm font-medium">5 routes</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Driver Performance Leaderboard</CardTitle>
              <CardDescription>Top performing drivers based on route efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {driverPerformance.map((driver, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{driver.name}</h4>
                          <p className="text-sm text-gray-500">{driver.routes} routes completed</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        {driver.efficiency}% efficiency
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">Efficiency</span>
                          <span className="text-xs font-medium">{driver.efficiency}%</span>
                        </div>
                        <Progress value={driver.efficiency} className="h-1" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">On-Time</span>
                          <span className="text-xs font-medium">{driver.onTime}%</span>
                        </div>
                        <Progress value={driver.onTime} className="h-1" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">Fuel Score</span>
                          <span className="text-xs font-medium">{driver.fuelScore}%</span>
                        </div>
                        <Progress value={driver.fuelScore} className="h-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Trends</CardTitle>
                <CardDescription>Route performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyTrends.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{data.month} 2024</span>
                        <span className="text-sm text-gray-500">{data.routes} routes</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Efficiency: {data.efficiency}%</span>
                          <span>Cost: ${data.cost.toLocaleString()}</span>
                        </div>
                        <Progress value={(data.efficiency / 100) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>AI-powered route optimization insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-l-green-500 pl-4">
                  <h4 className="font-medium text-green-800">Efficiency Improvement</h4>
                  <p className="text-sm text-gray-600">
                    Route efficiency has improved by 5.2% this month through optimization
                  </p>
                </div>
                <div className="border-l-4 border-l-blue-500 pl-4">
                  <h4 className="font-medium text-blue-800">Peak Performance Hours</h4>
                  <p className="text-sm text-gray-600">Routes starting between 8-10 AM show 12% better efficiency</p>
                </div>
                <div className="border-l-4 border-l-orange-500 pl-4">
                  <h4 className="font-medium text-orange-800">Cost Optimization</h4>
                  <p className="text-sm text-gray-600">
                    Fuel costs reduced by $1,200 this month through route optimization
                  </p>
                </div>
                <div className="border-l-4 border-l-purple-500 pl-4">
                  <h4 className="font-medium text-purple-800">Driver Training Impact</h4>
                  <p className="text-sm text-gray-600">Drivers who completed training show 8% better fuel efficiency</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
