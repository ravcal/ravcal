import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { DriverManagement } from "@/components/driver-management"

export default function DriversPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab="drivers" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <DriverManagement />
        </main>
      </div>
    </div>
  )
}
