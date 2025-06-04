"use client"

import { X, Bell, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface NotificationsPanelProps {
  onClose: () => void
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const notifications = [
    {
      id: 1,
      title: "Vehicle Maintenance Due",
      message: "Vehicle FL-003 is due for maintenance in 2 days.",
      time: "10 minutes ago",
      type: "warning",
    },
    {
      id: 2,
      title: "Route Completed",
      message: "Route R003 has been completed successfully.",
      time: "1 hour ago",
      type: "success",
    },
    {
      id: 3,
      title: "New Driver Added",
      message: "Driver Michael Johnson has been added to the system.",
      time: "3 hours ago",
      type: "info",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className="shadow-lg border-gray-200 w-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Notifications</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No new notifications</div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 border rounded-md hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-between">
        <Button variant="ghost" size="sm">
          Mark all as read
        </Button>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </CardFooter>
    </Card>
  )
}
