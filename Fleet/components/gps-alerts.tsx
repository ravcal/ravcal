"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, MapPin, Clock, Fuel, Zap, Shield, Bell, Settings, Plus } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface GPSAlert {
  id: string
  type: "geofence" | "speed" | "idle" | "fuel" | "maintenance" | "route_deviation"
  title: string
  description: string
  vehicleId: string
  timestamp: string
  severity: "low" | "medium" | "high" | "critical"
  status: "active" | "acknowledged" | "resolved"
  location?: {
    lat: number
    lng: number
    address: string
  }
}

interface AlertRule {
  id: string
  name: string
  type: string
  enabled: boolean
  conditions: any
  vehicles: string[]
}

export function GPSAlerts() {
  const [alerts, setAlerts] = useState<GPSAlert[]>([
    {
      id: "alert-1",
      type: "speed",
      title: "Speed Limit Exceeded",
      description: "Vehicle FL-005 exceeded speed limit (45 mph in 35 mph zone)",
      vehicleId: "FL-005",
      timestamp: "2 minutes ago",
      severity: "high",
      status: "active",
      location: {
        lat: 40.7614,
        lng: -73.9776,
        address: "789 Industrial Blvd",
      },
    },
    {
      id: "alert-2",
      type: "geofence",
      title: "Geofence Violation",
      description: "Vehicle FL-001 left authorized delivery zone",
      vehicleId: "FL-001",
      timestamp: "5 minutes ago",
      severity: "medium",
      status: "active",
      location: {
        lat: 40.7128,
        lng: -74.006,
        address: "Downtown Area",
      },
    },
    {
      id: "alert-3",
      type: "idle",
      title: "Extended Idle Time",
      description: "Vehicle FL-002 has been idle for 25 minutes",
      vehicleId: "FL-002",
      timestamp: "25 minutes ago",
      severity: "low",
      status: "acknowledged",
    },
    {
      id: "alert-4",
      type: "fuel",
      title: "Low Fuel Alert",
      description: "Vehicle FL-002 fuel level below 15%",
      vehicleId: "FL-002",
      timestamp: "30 minutes ago",
      severity: "medium",
      status: "active",
    },
  ])

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: "rule-1",
      name: "Speed Limit Monitoring",
      type: "speed",
      enabled: true,
      conditions: { maxSpeed: 35, tolerance: 5 },
      vehicles: ["all"],
    },
    {
      id: "rule-2",
      name: "Delivery Zone Geofence",
      type: "geofence",
      enabled: true,
      conditions: { zones: ["downtown", "industrial"] },
      vehicles: ["FL-001", "FL-003", "FL-005"],
    },
    {
      id: "rule-3",
      name: "Idle Time Alert",
      type: "idle",
      enabled: true,
      conditions: { maxIdleTime: 20 },
      vehicles: ["all"],
    },
    {
      id: "rule-4",
      name: "Low Fuel Warning",
      type: "fuel",
      enabled: true,
      conditions: { minFuelLevel: 20 },
      vehicles: ["all"],
    },
  ])

  const [alertError, setAlertError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "speed":
        return <Zap className="h-4 w-4" />
      case "geofence":
        return <Shield className="h-4 w-4" />
      case "idle":
        return <Clock className="h-4 w-4" />
      case "fuel":
        return <Fuel className="h-4 w-4" />
      case "maintenance":
        return <Settings className="h-4 w-4" />
      case "route_deviation":
        return <MapPin className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const acknowledgeAlert = async (alertId: string) => {
    setIsProcessing(true)
    setAlertError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, status: "acknowledged" } : alert)))
    } catch (error) {
      console.error("Failed to acknowledge alert:", error)
      setAlertError("Failed to acknowledge alert. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const resolveAlert = async (alertId: string) => {
    setIsProcessing(true)
    setAlertError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))
    } catch (error) {
      console.error("Failed to resolve alert:", error)
      setAlertError("Failed to resolve alert. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const toggleRule = async (ruleId: string) => {
    setIsProcessing(true)
    setAlertError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      setAlertRules(alertRules.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
    } catch (error) {
      console.error("Failed to toggle alert rule:", error)
      setAlertError("Failed to update alert rule. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const activeAlerts = alerts.filter((alert) => alert.status === "active")
  const acknowledgedAlerts = alerts.filter((alert) => alert.status === "acknowledged")

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">GPS Alerts & Monitoring</h2>
            <p className="text-gray-600 mt-2">Real-time alerts and automated monitoring rules</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Alert Rule
          </Button>
        </div>

        {alertError && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{alertError}</span>
              <Button size="sm" variant="outline" onClick={() => setAlertError(null)}>
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">{activeAlerts.length}</div>
                  <p className="text-sm text-gray-600">Active Alerts</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{acknowledgedAlerts.length}</div>
                  <p className="text-sm text-gray-600">Acknowledged</p>
                </div>
                <Bell className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {alertRules.filter((rule) => rule.enabled).length}
                  </div>
                  <p className="text-sm text-gray-600">Active Rules</p>
                </div>
                <Settings className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <p className="text-sm text-gray-600">Monitoring</p>
                </div>
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Active Alerts</span>
                <Badge variant="destructive">{activeAlerts.length}</Badge>
              </CardTitle>
              <CardDescription>Alerts requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        {getAlertIcon(alert.type)}
                        <h3 className="font-medium">{alert.title}</h3>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{alert.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span>Vehicle: {alert.vehicleId}</span>
                      <span>{alert.timestamp}</span>
                    </div>
                    {alert.location && (
                      <div className="mt-2 text-xs text-gray-600">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {alert.location.address}
                      </div>
                    )}
                    <div className="flex space-x-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => acknowledgeAlert(alert.id)}
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Acknowledge"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => resolveAlert(alert.id)}
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Resolve"}
                      </Button>
                    </div>
                  </div>
                ))}
                {activeAlerts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Shield className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No active alerts</p>
                    <p className="text-sm">All systems operating normally</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Alert Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-blue-600" />
                <span>Alert Rules</span>
              </CardTitle>
              <CardDescription>Configure automated monitoring rules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{rule.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{rule.type} monitoring</p>
                      </div>
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={() => toggleRule(rule.id)}
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      Vehicles: {rule.vehicles.includes("all") ? "All vehicles" : rule.vehicles.join(", ")}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <Badge variant={rule.enabled ? "default" : "secondary"}>
                        {rule.enabled ? "Active" : "Disabled"}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alert Activity</CardTitle>
            <CardDescription>Timeline of recent alerts and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="flex-shrink-0">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-gray-600">{alert.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    <Badge variant={alert.status === "active" ? "destructive" : "secondary"}>{alert.status}</Badge>
                  </div>
                  <div className="text-xs text-gray-500">{alert.timestamp}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  )
}
