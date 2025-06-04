"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export interface GPSError {
  code: string
  message: string
  timestamp: Date
  retryable: boolean
}

export interface GPSState {
  isLoading: boolean
  isConnected: boolean
  error: GPSError | null
  lastUpdate: Date | null
  retryCount: number
}

export interface UseGPSTrackingOptions {
  updateInterval?: number
  maxRetries?: number
  retryDelay?: number
  timeout?: number
  enableAutoRetry?: boolean
}

export function useGPSTracking(options: UseGPSTrackingOptions = {}) {
  const { updateInterval = 3000, maxRetries = 3, retryDelay = 5000, timeout = 10000, enableAutoRetry = true } = options

  const [state, setState] = useState<GPSState>({
    isLoading: false,
    isConnected: false,
    error: null,
    lastUpdate: null,
    retryCount: 0,
  })

  const retryTimeoutRef = useRef<NodeJS.Timeout>()
  const updateIntervalRef = useRef<NodeJS.Timeout>()
  const abortControllerRef = useRef<AbortController>()

  const createError = useCallback((code: string, message: string, retryable = true): GPSError => {
    return {
      code,
      message,
      timestamp: new Date(),
      retryable,
    }
  }, [])

  const logError = useCallback((error: GPSError) => {
    console.error(`GPS Tracking Error [${error.code}]:`, error.message)

    // Store error for debugging
    try {
      const errorLog = {
        ...error,
        userAgent: navigator.userAgent,
        url: window.location.href,
      }

      const existingErrors = JSON.parse(localStorage.getItem("gps-tracking-errors") || "[]")
      existingErrors.push(errorLog)
      localStorage.setItem("gps-tracking-errors", JSON.stringify(existingErrors.slice(-20)))
    } catch (e) {
      console.error("Failed to log GPS error:", e)
    }
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null, retryCount: 0 }))
  }, [])

  const fetchGPSData = useCallback(async (): Promise<any> => {
    // Abort previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    const { signal } = abortControllerRef.current

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      // Simulate network request with timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("GPS_TIMEOUT")), timeout)
      })

      const fetchPromise = new Promise((resolve, reject) => {
        // Simulate GPS data fetch
        setTimeout(
          () => {
            if (signal.aborted) {
              reject(new Error("GPS_ABORTED"))
              return
            }

            // Simulate random failures for testing
            if (Math.random() < 0.1) {
              // 10% failure rate
              reject(new Error("GPS_NETWORK_ERROR"))
              return
            }

            resolve({
              timestamp: new Date(),
              vehicles: [], // Would contain actual GPS data
            })
          },
          1000 + Math.random() * 2000,
        ) // 1-3 second delay
      })

      const result = await Promise.race([fetchPromise, timeoutPromise])

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isConnected: true,
        lastUpdate: new Date(),
        retryCount: 0,
      }))

      return result
    } catch (error: any) {
      if (signal.aborted) {
        return // Don't update state if aborted
      }

      let gpsError: GPSError

      switch (error.message) {
        case "GPS_TIMEOUT":
          gpsError = createError("TIMEOUT", "GPS connection timed out. Please check your internet connection.", true)
          break
        case "GPS_NETWORK_ERROR":
          gpsError = createError("NETWORK", "Network error occurred while fetching GPS data.", true)
          break
        case "GPS_PERMISSION_DENIED":
          gpsError = createError("PERMISSION", "GPS permission denied. Please enable location access.", false)
          break
        default:
          gpsError = createError("UNKNOWN", `Unexpected GPS error: ${error.message}`, true)
      }

      logError(gpsError)

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isConnected: false,
        error: gpsError,
        retryCount: prev.retryCount + 1,
      }))

      throw gpsError
    }
  }, [timeout, createError, logError])

  const retry = useCallback(async () => {
    if (state.retryCount >= maxRetries) {
      const maxRetriesError = createError("MAX_RETRIES", `Maximum retry attempts (${maxRetries}) exceeded.`, false)
      setState((prev) => ({ ...prev, error: maxRetriesError }))
      return
    }

    try {
      await fetchGPSData()
    } catch (error) {
      // Error is already handled in fetchGPSData
    }
  }, [state.retryCount, maxRetries, fetchGPSData, createError])

  const scheduleRetry = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
    }

    if (!enableAutoRetry || !state.error?.retryable || state.retryCount >= maxRetries) {
      return
    }

    const delay = retryDelay * Math.pow(2, state.retryCount) // Exponential backoff

    retryTimeoutRef.current = setTimeout(() => {
      retry()
    }, delay)
  }, [enableAutoRetry, state.error, state.retryCount, maxRetries, retryDelay, retry])

  const startTracking = useCallback(() => {
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current)
    }

    // Initial fetch
    fetchGPSData().catch(() => {
      // Error handled in fetchGPSData
    })

    // Set up interval for updates
    updateIntervalRef.current = setInterval(() => {
      if (!state.error) {
        fetchGPSData().catch(() => {
          // Error handled in fetchGPSData
        })
      }
    }, updateInterval)
  }, [fetchGPSData, updateInterval, state.error])

  const stopTracking = useCallback(() => {
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current)
      updateIntervalRef.current = undefined
    }

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
      retryTimeoutRef.current = undefined
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    setState((prev) => ({ ...prev, isConnected: false }))
  }, [])

  // Auto-retry on error
  useEffect(() => {
    if (state.error?.retryable) {
      scheduleRetry()
    }

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [state.error, scheduleRetry])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTracking()
    }
  }, [stopTracking])

  return {
    ...state,
    startTracking,
    stopTracking,
    retry,
    clearError,
  }
}
