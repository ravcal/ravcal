"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, RefreshCw, Bug, Home } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Log error to monitoring service
    this.logError(error, errorInfo)

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  logError = (error: Error, errorInfo: React.ErrorInfo) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "Unknown",
      url: typeof window !== "undefined" ? window.location.href : "Unknown",
    }

    // In a real app, send to logging service
    console.error("GPS Tracking Error:", errorData)

    // Store in localStorage for debugging
    try {
      if (typeof localStorage !== "undefined") {
        const existingErrors = JSON.parse(localStorage.getItem("gps-errors") || "[]")
        existingErrors.push(errorData)
        localStorage.setItem("gps-errors", JSON.stringify(existingErrors.slice(-10))) // Keep last 10 errors
      }
    } catch (e) {
      console.error("Failed to store error in localStorage:", e)
    }
  }

  retry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} retry={this.retry} />
      }

      return <DefaultErrorFallback error={this.state.error!} retry={this.retry} />
    }

    return this.props.children
  }
}

interface DefaultErrorFallbackProps {
  error: Error
  retry: () => void
}

function DefaultErrorFallback({ error, retry }: DefaultErrorFallbackProps) {
  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          <span>GPS Tracking Error</span>
        </CardTitle>
        <CardDescription>Something went wrong with the GPS tracking system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Bug className="h-4 w-4" />
          <AlertDescription className="font-mono text-sm">{error.message}</AlertDescription>
        </Alert>

        <div className="flex space-x-2">
          <Button onClick={retry} className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "/"
              }
            }}
          >
            <Home className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Button>
        </div>

        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">Technical Details</summary>
          <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">{error.stack}</pre>
        </details>
      </CardContent>
    </Card>
  )
}

// GPS-specific error fallback
export function GPSErrorFallback({ error, retry }: DefaultErrorFallbackProps) {
  const getErrorMessage = (error: Error) => {
    if (error.message.includes("permission")) {
      return "GPS permission denied. Please enable location access in your browser settings."
    }
    if (error.message.includes("timeout")) {
      return "GPS connection timed out. Please check your internet connection and try again."
    }
    if (error.message.includes("network")) {
      return "Network error occurred while fetching GPS data. Please check your connection."
    }
    return "An unexpected error occurred with the GPS tracking system."
  }

  const getErrorSolution = (error: Error) => {
    if (error.message.includes("permission")) {
      return "Click the location icon in your browser's address bar and allow location access."
    }
    if (error.message.includes("timeout")) {
      return "Try refreshing the page or check if you're in an area with good GPS signal."
    }
    if (error.message.includes("network")) {
      return "Check your internet connection and try again."
    }
    return "Try refreshing the page or contact support if the problem persists."
  }

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          <span>GPS Tracking Unavailable</span>
        </CardTitle>
        <CardDescription>{getErrorMessage(error)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">How to fix this:</h4>
          <p className="text-blue-800 text-sm">{getErrorSolution(error)}</p>
        </div>

        <div className="flex space-x-2">
          <Button onClick={retry} className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Retry GPS Connection</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "/"
              }
            }}
          >
            <Home className="h-4 w-4 mr-2" />
            Return to Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
