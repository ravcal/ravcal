"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { DashboardOverview } from "@/components/dashboard-overview"
import { VehicleManagement } from "@/components/vehicle-management"
import { DriverManagement } from "@/components/driver-management"
import { UnifiedMaintenance } from "@/components/unified-maintenance"
import { RouteManagement } from "@/components/route-management"
import { FuelManagement } from "@/components/fuel-management"
import { ExpenseManagement } from "@/components/expense-management"
import { Reports } from "@/components/reports"
import { LiveGPSTracking } from "@/components/live-gps-tracking"
import { GPSAlerts } from "@/components/gps-alerts"
import { SAPIntegrationDashboard } from "@/components/sap-integration-dashboard"
import { SAPVehicleSync } from "@/components/sap-vehicle-sync"
import { RouteOptimization } from "@/components/route-optimization"
import { RouteHistory } from "@/components/route-history"
import { RouteAnalytics } from "@/components/route-analytics"
import { ReportBreakdown } from "@/components/report-breakdown"

export function FleetDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />
      case "vehicles":
        return <VehicleManagement />
      case "drivers":
        return <DriverManagement />
      case "maintenance":
        return <UnifiedMaintenance />
      case "maintenance-breakdown":
        return <ReportBreakdown />
      case "routes":
        return <RouteManagement />
      case "routes-optimize":
        return <RouteOptimization />
      case "routes-history":
        return <RouteHistory />
      case "routes-analytics":
        return <RouteAnalytics />
      case "tracking":
        return <LiveGPSTracking />
      case "alerts":
        return <GPSAlerts />
      case "fuel":
        return <FuelManagement />
      case "expenses":
        return <ExpenseManagement />
      case "sap":
        return <SAPIntegrationDashboard />
      case "sap-vehicles":
        return <SAPVehicleSync />
      case "reports":
        return <Reports />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
