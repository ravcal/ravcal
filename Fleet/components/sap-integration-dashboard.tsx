"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Database,
  FolderSyncIcon as Sync,
  CheckCircle,
  AlertTriangle,
  Clock,
  Settings,
  RefreshCw,
  Download,
  Activity,
  TrendingUp,
} from "lucide-react"
import type { SAPConfig } from "@/lib/sap-integration"

interface SyncStatus {
  lastSync: string
  status: "success" | "error" | "pending"
  recordsProcessed: number
  errors: string[]
}

interface SAPConnectionStatus {
  connected: boolean
  lastHealthCheck: string
  responseTime: number
  environment: string
}

export function SAPIntegrationDashboard() {
  const [connectionStatus, setConnectionStatus] = useState<SAPConnectionStatus>({
    connected: false,
    lastHealthCheck: "",
    responseTime: 0,
    environment: "development",
  })

  const [syncStatus, setSyncStatus] = useState<Record<string, SyncStatus>>({
    vehicles: {
      lastSync: "2024-03-10 14:30:00",
      status: "success",
      recordsProcessed: 125,
      errors: [],
    },
    maintenance: {
      lastSync: "2024-03-10 14:25:00",
      status: "success",
      recordsProcessed: 45,
      errors: [],
    },
    costs: {
      lastSync: "2024-03-10 14:20:00",
      status: "error",
      recordsProcessed: 0,
      errors: ["Connection timeout", "Invalid cost center"],
    },
    purchaseOrders: {
      lastSync: "2024-03-10 14:15:00",
      status: "pending",
      recordsProcessed: 12,
      errors: [],
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sapConfig, setSapConfig] = useState<Partial<SAPConfig>>({
    baseUrl: "https://sap-dev.company.com:8000",
    clientId: "FLEET_CLIENT",
    username: "",
    password: "",
    systemId: "DEV",
    environment: "development",
  })

  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: "TXN-001",
      type: "Vehicle Sync",
      timestamp: "2024-03-10 14:30:15",
      status: "success",
      details: "Synced FL-001 vehicle data",
      sapDocument: "EQ-12345",
    },
    {
      id: "TXN-002",
      type: "Maintenance Order",
      timestamp: "2024-03-10 14:28:42",
      status: "success",
      details: "Created maintenance order for FL-003",
      sapDocument: "MO-67890",
    },
    {
      id: "TXN-003",
      type: "Cost Posting",
      timestamp: "2024-03-10 14:25:18",
      status: "error",
      details: "Failed to post fuel costs",
      sapDocument: "N/A",
    },
    {
      id: "TXN-004",
      type: "Purchase Order",
      timestamp: "2024-03-10 14:22:33",
      status: "success",
      details: "Created PO for spare parts",
      sapDocument: "PO-11223",
    },
  ])

  useEffect(() => {
    checkSAPConnection()
  }, [])

  const checkSAPConnection = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const startTime = Date.now()

      // Simulate SAP health check
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const responseTime = Date.now() - startTime

      setConnectionStatus({
        connected: true,
        lastHealthCheck: new Date().toLocaleString(),
        responseTime,
        environment: sapConfig.environment || "development",
      })
    } catch (err) {
      setError("Failed to connect to SAP system")
      setConnectionStatus((prev) => ({ ...prev, connected: false }))
    } finally {
      setIsLoading(false)
    }
  }

  const performSync = async (module: string) => {
    setIsLoading(true)

    try {
      // Simulate sync operation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSyncStatus((prev) => ({
        ...prev,
        [module]: {
          lastSync: new Date().toLocaleString(),
          status: "success",
          recordsProcessed: Math.floor(Math.random() * 100) + 1,
          errors: [],
        },
      }))

      // Add to recent transactions
      const newTransaction = {
        id: `TXN-${Date.now()}`,
        type: `${module} Sync`,
        timestamp: new Date().toLocaleString(),
        status: "success" as const,
        details: `Synced ${module} data successfully`,
        sapDocument: `DOC-${Math.floor(Math.random() * 10000)}`,
      }

      setRecentTransactions((prev) => [newTransaction, ...prev.slice(0, 9)])
    } catch (err) {
      setSyncStatus((prev) => ({
        ...prev,
        [module]: {
          ...prev[module],
          status: "error",
          errors: ["Sync failed: " + (err as Error).message],
        },
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">SAP Integration</h2>
          <p className="text-gray-600 mt-2">Manage SAP ERP integration and data synchronization</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={checkSAPConnection} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Test Connection
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${connectionStatus.connected ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <span className="text-sm font-medium">
                    {connectionStatus.connected ? "Connected" : "Disconnected"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">SAP System Status</p>
              </div>
              <Database className={`h-8 w-8 ${connectionStatus.connected ? "text-green-600" : "text-red-600"}`} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{connectionStatus.responseTime}ms</div>
                <p className="text-sm text-gray-600">Response Time</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Object.values(syncStatus).reduce((acc, status) => acc + status.recordsProcessed, 0)}
                </div>
                <p className="text-sm text-gray-600">Records Synced Today</p>
              </div>
              <Sync className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{connectionStatus.environment.toUpperCase()}</div>
                <p className="text-sm text-gray-600">Environment</p>
              </div>
              <Settings className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sync" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="sync">Data Synchronization</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="sync" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sync Modules */}
            {Object.entries(syncStatus).map(([module, status]) => (
              <Card key={module}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="capitalize">{module} Sync</CardTitle>
                    <Badge className={getStatusColor(status.status)}>{status.status}</Badge>
                  </div>
                  <CardDescription>Last sync: {status.lastSync}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Records Processed</span>
                      <span className="font-medium">{status.recordsProcessed}</span>
                    </div>

                    {status.errors.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-sm text-red-600 font-medium">Errors:</span>
                        {status.errors.map((error, index) => (
                          <div key={index} className="text-xs text-red-600 bg-red-50 p-2 rounded">
                            {error}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => performSync(module)} disabled={isLoading}>
                        <Sync className="h-3 w-3 mr-1" />
                        Sync Now
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent SAP Transactions</CardTitle>
              <CardDescription>Latest data exchanges with SAP system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>SAP Document</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(transaction.status)}
                          <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.details}</TableCell>
                      <TableCell>{transaction.sapDocument}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SAP Connection Configuration</CardTitle>
              <CardDescription>Configure SAP system connection parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="baseUrl">SAP Base URL</Label>
                  <Input
                    id="baseUrl"
                    value={sapConfig.baseUrl}
                    onChange={(e) => setSapConfig((prev) => ({ ...prev, baseUrl: e.target.value }))}
                    placeholder="https://sap.company.com:8000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemId">System ID</Label>
                  <Input
                    id="systemId"
                    value={sapConfig.systemId}
                    onChange={(e) => setSapConfig((prev) => ({ ...prev, systemId: e.target.value }))}
                    placeholder="DEV"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientId">Client ID</Label>
                  <Input
                    id="clientId"
                    value={sapConfig.clientId}
                    onChange={(e) => setSapConfig((prev) => ({ ...prev, clientId: e.target.value }))}
                    placeholder="FLEET_CLIENT"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={sapConfig.username}
                    onChange={(e) => setSapConfig((prev) => ({ ...prev, username: e.target.value }))}
                    placeholder="SAP Username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={sapConfig.password}
                    onChange={(e) => setSapConfig((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="SAP Password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="environment">Environment</Label>
                  <select
                    id="environment"
                    className="w-full p-2 border rounded-md"
                    value={sapConfig.environment}
                    onChange={(e) => setSapConfig((prev) => ({ ...prev, environment: e.target.value as any }))}
                  >
                    <option value="development">Development</option>
                    <option value="staging">Staging</option>
                    <option value="production">Production</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button>Save Configuration</Button>
                <Button variant="outline" onClick={checkSAPConnection}>
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>SAP system performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Connection Status</span>
                    <Badge
                      className={connectionStatus.connected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {connectionStatus.connected ? "Healthy" : "Unhealthy"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Response Time</span>
                    <span className="font-medium">{connectionStatus.responseTime}ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Health Check</span>
                    <span className="font-medium">{connectionStatus.lastHealthCheck || "Never"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Uptime</span>
                    <span className="font-medium">99.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration Statistics</CardTitle>
                <CardDescription>Data synchronization metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Syncs Today</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="font-medium text-green-600">95.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Failed Transactions</span>
                    <span className="font-medium text-red-600">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Data Volume</span>
                    <span className="font-medium">2.4 MB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
