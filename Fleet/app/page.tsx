import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { DashboardOverview } from "@/components/dashboard-overview"

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab="dashboard" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <DashboardOverview />
        </main>
      </div>
    </div>
  )
}
