import { UnifiedMaintenance } from "@/components/unified-maintenance"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function MaintenancePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab="maintenance" setActiveTab={() => {}} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <UnifiedMaintenance />
        </main>
      </div>
    </div>
  )
}
