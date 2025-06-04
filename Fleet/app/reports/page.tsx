import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Reports } from "@/components/reports"

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab="reports" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Reports />
        </main>
      </div>
    </div>
  )
}
