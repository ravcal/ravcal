import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ReportBreakdown } from "@/components/report-breakdown"

export default function ReportBreakdownPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab="maintenance" setActiveTab={() => {}} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Report Breakdown</h2>
              <p className="text-gray-600 mt-2">Report a vehicle breakdown or emergency maintenance need</p>
            </div>
            <ReportBreakdown />
          </div>
        </main>
      </div>
    </div>
  )
}
