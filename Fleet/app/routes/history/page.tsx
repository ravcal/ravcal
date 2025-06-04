import { RouteHistory } from "@/components/route-history"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function RouteHistoryPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab="routes" setActiveTab={() => {}} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Route History</h2>
              <p className="text-gray-600 mt-2">View completed routes and performance analytics</p>
            </div>
            <RouteHistory />
          </div>
        </main>
      </div>
    </div>
  )
}
