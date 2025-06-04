import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { AddExpenseForm } from "@/components/add-expense-form"

export default function AddExpensePage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Add New Expense</h1>
              <p className="text-gray-600">Record a new fleet expense</p>
            </div>
            <AddExpenseForm />
          </div>
        </main>
      </div>
    </div>
  )
}
