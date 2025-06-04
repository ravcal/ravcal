import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ExpenseManagement } from "@/components/expense-management"

export default function ExpensesPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <ExpenseManagement />
        </main>
      </div>
    </div>
  )
}
