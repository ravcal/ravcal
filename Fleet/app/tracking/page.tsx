import { LiveGPSTracking } from "@/components/live-gps-tracking"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ErrorBoundary, GPSErrorFallback } from "@/components/error-boundary"
import { ErrorLogger } from "@/components/error-logger"

export default function TrackingPage() {
  return (
    <ErrorLogger>
      <ErrorBoundary fallback={GPSErrorFallback}>
        <div className="flex h-screen bg-gray-50">
          <Sidebar activeTab="tracking" setActiveTab={() => {}} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
              <LiveGPSTracking />
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </ErrorLogger>
  )
}
