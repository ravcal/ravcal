"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DollarSign,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  Calendar,
  Fuel,
  Wrench,
  FileText,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

interface Expense {
  id: string
  date: string
  category: string
  description: string
  amount: number
  vehicle: string
  vendor: string
  status: "Paid" | "Pending" | "Overdue"
  paymentMethod: string
  receiptNumber?: string
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    date: "2024-01-15",
    category: "Fuel",
    description: "Fuel refill at Shell Station",
    amount: 85.5,
    vehicle: "ABC-123",
    vendor: "Shell",
    status: "Paid",
    paymentMethod: "Credit Card",
    receiptNumber: "SH-2024-001",
  },
  {
    id: "2",
    date: "2024-01-14",
    category: "Maintenance",
    description: "Oil change and filter replacement",
    amount: 120.0,
    vehicle: "XYZ-789",
    vendor: "AutoCare Plus",
    status: "Paid",
    paymentMethod: "Cash",
    receiptNumber: "AC-2024-045",
  },
  {
    id: "3",
    date: "2024-01-13",
    category: "Insurance",
    description: "Monthly insurance premium",
    amount: 450.0,
    vehicle: "All Vehicles",
    vendor: "SafeDrive Insurance",
    status: "Pending",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "4",
    date: "2024-01-12",
    category: "Registration",
    description: "Vehicle registration renewal",
    amount: 75.0,
    vehicle: "DEF-456",
    vendor: "DMV",
    status: "Paid",
    paymentMethod: "Credit Card",
    receiptNumber: "DMV-2024-789",
  },
  {
    id: "5",
    date: "2024-01-10",
    category: "Repairs",
    description: "Brake pad replacement",
    amount: 280.0,
    vehicle: "GHI-321",
    vendor: "Quick Fix Auto",
    status: "Overdue",
    paymentMethod: "Credit Card",
  },
]

export function ExpenseManagement() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || expense.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const monthlyExpenses = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date)
      const currentMonth = new Date().getMonth()
      return expenseDate.getMonth() === currentMonth
    })
    .reduce((sum, expense) => sum + expense.amount, 0)

  const paidExpenses = expenses.filter((expense) => expense.status === "Paid").length
  const pendingExpenses = expenses.filter((expense) => expense.status === "Pending").length
  const overdueExpenses = expenses.filter((expense) => expense.status === "Overdue").length

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
    setIsEditModalOpen(true)
  }

  const handleSaveExpense = () => {
    if (editingExpense) {
      setExpenses(expenses.map((expense) => (expense.id === editingExpense.id ? editingExpense : expense)))
      setIsEditModalOpen(false)
      setEditingExpense(null)
    }
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "fuel":
        return <Fuel className="h-4 w-4" />
      case "maintenance":
      case "repairs":
        return <Wrench className="h-4 w-4" />
      case "insurance":
      case "registration":
        return <FileText className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Expense Management</h1>
          <p className="text-gray-600">Track and manage all fleet expenses</p>
        </div>
        <Link href="/expenses/add">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 inline mr-1" />
              -5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <div className="h-4 w-4 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidExpenses}</div>
            <p className="text-xs text-muted-foreground">Completed payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending/Overdue</CardTitle>
            <div className="h-4 w-4 bg-yellow-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingExpenses + overdueExpenses}</div>
            <p className="text-xs text-muted-foreground">
              {pendingExpenses} pending, {overdueExpenses} overdue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fuel">Fuel</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="repairs">Repairs</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="registration">Registration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(expense.category)}
                      {expense.category}
                    </div>
                  </TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.vehicle}</TableCell>
                  <TableCell>{expense.vendor}</TableCell>
                  <TableCell className="font-medium">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditExpense(expense)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Expense
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteExpense(expense.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Expense
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>
          {editingExpense && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editingExpense.date}
                  onChange={(e) => setEditingExpense({ ...editingExpense, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingExpense.category}
                  onValueChange={(value) => setEditingExpense({ ...editingExpense, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fuel">Fuel</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Repairs">Repairs</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="Registration">Registration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingExpense.description}
                  onChange={(e) => setEditingExpense({ ...editingExpense, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-amount">Amount</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  step="0.01"
                  value={editingExpense.amount}
                  onChange={(e) => setEditingExpense({ ...editingExpense, amount: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="edit-vehicle">Vehicle</Label>
                <Input
                  id="edit-vehicle"
                  value={editingExpense.vehicle}
                  onChange={(e) => setEditingExpense({ ...editingExpense, vehicle: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-vendor">Vendor</Label>
                <Input
                  id="edit-vendor"
                  value={editingExpense.vendor}
                  onChange={(e) => setEditingExpense({ ...editingExpense, vendor: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editingExpense.status}
                  onValueChange={(value: "Paid" | "Pending" | "Overdue") =>
                    setEditingExpense({ ...editingExpense, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveExpense}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
