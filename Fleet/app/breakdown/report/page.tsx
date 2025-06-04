import { ReportBreakdown } from "@/components/report-breakdown"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function ReportBreakdownPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab="breakdown" setActiveTab={() => {}} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <ReportBreakdown />
        </main>
      </div>
    </div>
  )
}
