"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wifi, WifiOff, AlertTriangle, CheckCircle, Clock, RefreshCw, Info } from "lucide-react"
import { useGPSTracking } from "@/hooks/use-gps-tracking"

interface GPSConnectionStatusProps {
  onRetry?: () => void
  showDetails?: boolean
}

export function GPSConnectionStatus({ onRetry, showDetails = true }: GPSConnectionStatusProps) {
  const { isLoading, isConnected, error, lastUpdate, retryCount, retry, clearError } = useGPSTracking({
    updateInterval: 5000,
    maxRetries: 5,
    enableAutoRetry: true,
  })

  const [showErrorDetails, setShowErrorDetails] = useState(false)

  const getStatusIcon = () => {
    if (isLoading) {
      return <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
    }
    if (error) {
      return <WifiOff className="h-4 w-4 text-red-600" />
    }
    if (isConnected) {
      return <Wifi className="h-4 w-4 text-green-600" />
    }
    return <Clock className="h-4 w-4 text-gray-600" />
  }

  const getStatusText = () => {
    if (isLoading) {
      return "Connecting to GPS..."
    }
    if (error) {
      return "GPS Connection Failed"
    }
    if (isConnected) {
      return "GPS Connected"
    }
    return "GPS Disconnected"
  }

  const getStatusColor = () => {
    if (isLoading) {
      return "bg-blue-100 text-blue-800"
    }
    if (error) {
      return "bg-red-100 text-red-800"
    }
    if (isConnected) {
      return "bg-green-100 text-green-800"
    }
    return "bg-gray-100 text-gray-800"
  }

  const handleRetry = () => {
    clearError()
    retry()
    onRetry?.()
  }

  const getErrorSeverity = () => {
    if (!error) return "info"

    switch (error.code) {
      case "PERMISSION":
        return "destructive"
      case "MAX_RETRIES":
        return "destructive"
      case "TIMEOUT":
      case "NETWORK":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-4">
      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm font-medium">{getStatusText()}</span>
          <Badge className={getStatusColor()}>{isConnected ? "Online" : error ? "Error" : "Offline"}</Badge>
        </div>

        {error && (
          <div className="flex items-center space-x-2">
            {retryCount > 0 && (
              <Badge variant="outline" className="text-xs">
                Retry {retryCount}/5
              </Badge>
            )}
            <Button size="sm" variant="outline" onClick={handleRetry} disabled={isLoading}>
              <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? "animate-spin" : ""}`} />
              Retry
            </Button>
          </div>
        )}
      </div>

      {/* Last Update */}
      {lastUpdate && <div className="text-xs text-gray-500">Last updated: {lastUpdate.toLocaleTimeString()}</div>}

      {/* Error Alert */}
      {error && (
        <Alert variant={getErrorSeverity()}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error.message}</span>
            {showDetails && (
              <Button variant="ghost" size="sm" onClick={() => setShowErrorDetails(!showErrorDetails)} className="ml-2">
                <Info className="h-3 w-3" />
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Error Details */}
      {error && showErrorDetails && showDetails && (
        <Card>
          <CardContent className="pt-4">
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-medium">Error Code:</span>
                  <span className="ml-2 font-mono">{error.code}</span>
                </div>
                <div>
                  <span className="font-medium">Timestamp:</span>
                  <span className="ml-2">{error.timestamp.toLocaleTimeString()}</span>
                </div>
                <div>
                  <span className="font-medium">Retryable:</span>
                  <span className="ml-2">{error.retryable ? "Yes" : "No"}</span>
                </div>
                <div>
                  <span className="font-medium">Retry Count:</span>
                  <span className="ml-2">{retryCount}</span>
                </div>
              </div>

              {error.code === "PERMISSION" && (
                <div className="mt-3 p-3 bg-blue-50 rounded">
                  <h4 className="font-medium text-blue-900 mb-1">How to enable GPS:</h4>
                  <ol className="text-blue-800 text-xs space-y-1 list-decimal list-inside">
                    <li>Click the location icon in your browser's address bar</li>
                    <li>Select "Allow" for location access</li>
                    <li>Refresh the page</li>
                  </ol>
                </div>
              )}

              {error.code === "NETWORK" && (
                <div className="mt-3 p-3 bg-yellow-50 rounded">
                  <h4 className="font-medium text-yellow-900 mb-1">Network troubleshooting:</h4>
                  <ul className="text-yellow-800 text-xs space-y-1 list-disc list-inside">
                    <li>Check your internet connection</li>
                    <li>Try refreshing the page</li>
                    <li>Contact support if the problem persists</li>
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connection Quality Indicator */}
      {isConnected && (
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <CheckCircle className="h-3 w-3 text-green-600" />
          <span>GPS signal strong</span>
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-green-600 rounded"></div>
            <div className="w-1 h-3 bg-green-600 rounded"></div>
            <div className="w-1 h-3 bg-green-600 rounded"></div>
            <div className="w-1 h-2 bg-gray-300 rounded"></div>
          </div>
        </div>
      )}
    </div>
  )
}
