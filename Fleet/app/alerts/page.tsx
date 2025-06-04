import { GPSAlerts } from "@/components/gps-alerts"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ErrorBoundary } from "@/components/error-boundary"
import { ErrorLogger } from "@/components/error-logger"

export default function AlertsPage() {
  return (
    <ErrorLogger>
      <ErrorBoundary>
        <div className="flex h-screen bg-gray-50">
          <Sidebar activeTab="alerts" setActiveTab={() => {}} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
              <GPSAlerts />
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </ErrorLogger>
  )
}
