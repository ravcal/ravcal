"use client"

import type React from "react"

import { useEffect } from "react"

interface ErrorLoggerProps {
  children: React.ReactNode
}

export function ErrorLogger({ children }: ErrorLoggerProps) {
  useEffect(() => {
    // Global error handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason)

      // Log to error tracking service
      logError({
        type: "unhandled_rejection",
        message: event.reason?.message || "Unhandled promise rejection",
        stack: event.reason?.stack,
        timestamp: new Date().toISOString(),
      })
    }

    // Global error handler for JavaScript errors
    const handleError = (event: ErrorEvent) => {
      console.error("Global error:", event.error)

      // Log to error tracking service
      logError({
        type: "javascript_error",
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
      })
    }

    // Add event listeners
    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    window.addEventListener("error", handleError)

    // Cleanup
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
      window.removeEventListener("error", handleError)
    }
  }, [])

  return <>{children}</>
}

function logError(errorData: any) {
  try {
    // Store in localStorage for debugging
    const existingErrors = JSON.parse(localStorage.getItem("app-errors") || "[]")
    existingErrors.push(errorData)
    localStorage.setItem("app-errors", JSON.stringify(existingErrors.slice(-50))) // Keep last 50 errors

    // In a real app, send to error tracking service like Sentry
    // Example: Sentry.captureException(errorData)
  } catch (e) {
    console.error("Failed to log error:", e)
  }
}
