import { RouteManagement } from "@/components/route-management"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function RoutesPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab="routes" setActiveTab={() => {}} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <RouteManagement />
        </main>
      </div>
    </div>
  )
}
