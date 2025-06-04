import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { FuelManagement } from "@/components/fuel-management"

export default function FuelPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab="fuel" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <FuelManagement />
        </main>
      </div>
    </div>
  )
}
