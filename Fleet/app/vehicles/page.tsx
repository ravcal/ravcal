import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { VehicleManagement } from "@/components/vehicle-management"

export default function VehiclesPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab="vehicles" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <VehicleManagement />
        </main>
      </div>
    </div>
  )
}
