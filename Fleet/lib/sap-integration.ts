import { ErrorLogger } from "@/components/error-logger"

export interface SAPConfig {
  baseUrl: string
  clientId: string
  username: string
  password: string
  systemId: string
  environment: "development" | "staging" | "production"
}

export interface SAPResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  statusCode?: number
  timestamp: string
}

export interface SAPVehicle {
  equipmentNumber: string
  description: string
  manufacturer: string
  model: string
  yearOfManufacture: number
  acquisitionValue: number
  depreciationArea: string
  costCenter: string
  plantCode: string
  location: string
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE"
  lastMaintenanceDate?: string
  nextMaintenanceDate?: string
}

export interface SAPMaintenanceOrder {
  orderNumber: string
  equipmentNumber: string
  orderType: string
  description: string
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  plannedStartDate: string
  plannedEndDate: string
  actualStartDate?: string
  actualEndDate?: string
  status: "CREATED" | "RELEASED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  costCenter: string
  estimatedCost: number
  actualCost?: number
  workCenter: string
  technician?: string
}

export interface SAPCostCenter {
  costCenterCode: string
  description: string
  companyCode: string
  controllingArea: string
  validFrom: string
  validTo: string
  responsible: string
  department: string
}

export interface SAPPurchaseOrder {
  poNumber: string
  vendor: string
  description: string
  orderDate: string
  deliveryDate: string
  totalAmount: number
  currency: string
  status: "CREATED" | "APPROVED" | "DELIVERED" | "INVOICED"
  items: SAPPurchaseOrderItem[]
}

export interface SAPPurchaseOrderItem {
  itemNumber: string
  material: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
  deliveryDate: string
}

export class SAPIntegration {
  private config: SAPConfig
  private authToken: string | null = null
  private tokenExpiry: Date | null = null

  constructor(config: SAPConfig) {
    this.config = config
  }

  private async authenticate(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/sap/bc/rest/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${this.config.username}:${this.config.password}`)}`,
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: this.config.clientId,
          scope: "ZFLEET_API",
        }),
      })

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`)
      }

      const data = await response.json()
      this.authToken = data.access_token
      this.tokenExpiry = new Date(Date.now() + data.expires_in * 1000)

      return true
    } catch (error) {
      ErrorLogger.logError(error as Error, "SAP Authentication")
      return false
    }
  }

  private async ensureAuthenticated(): Promise<boolean> {
    if (!this.authToken || !this.tokenExpiry || this.tokenExpiry <= new Date()) {
      return await this.authenticate()
    }
    return true
  }

  private async makeRequest<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any,
  ): Promise<SAPResponse<T>> {
    try {
      const authenticated = await this.ensureAuthenticated()
      if (!authenticated) {
        throw new Error("Failed to authenticate with SAP")
      }

      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          "Content-Type": "application/json",
          "X-CSRF-Token": "Fetch",
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      const responseData = await response.json()

      return {
        success: response.ok,
        data: response.ok ? responseData : undefined,
        error: response.ok ? undefined : responseData.error?.message || response.statusText,
        statusCode: response.status,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      ErrorLogger.logError(error as Error, `SAP API Request: ${endpoint}`)
      return {
        success: false,
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      }
    }
  }

  // Vehicle Management Integration
  async getVehicles(): Promise<SAPResponse<SAPVehicle[]>> {
    return this.makeRequest<SAPVehicle[]>("/sap/opu/odata/sap/ZPM_EQUIPMENT_SRV/EquipmentSet")
  }

  async getVehicle(equipmentNumber: string): Promise<SAPResponse<SAPVehicle>> {
    return this.makeRequest<SAPVehicle>(`/sap/opu/odata/sap/ZPM_EQUIPMENT_SRV/EquipmentSet('${equipmentNumber}')`)
  }

  async createVehicle(vehicle: Partial<SAPVehicle>): Promise<SAPResponse<SAPVehicle>> {
    return this.makeRequest<SAPVehicle>("/sap/opu/odata/sap/ZPM_EQUIPMENT_SRV/EquipmentSet", "POST", vehicle)
  }

  async updateVehicle(equipmentNumber: string, vehicle: Partial<SAPVehicle>): Promise<SAPResponse<SAPVehicle>> {
    return this.makeRequest<SAPVehicle>(
      `/sap/opu/odata/sap/ZPM_EQUIPMENT_SRV/EquipmentSet('${equipmentNumber}')`,
      "PUT",
      vehicle,
    )
  }

  // Maintenance Order Integration
  async getMaintenanceOrders(equipmentNumber?: string): Promise<SAPResponse<SAPMaintenanceOrder[]>> {
    const filter = equipmentNumber ? `?$filter=EquipmentNumber eq '${equipmentNumber}'` : ""
    return this.makeRequest<SAPMaintenanceOrder[]>(`/sap/opu/odata/sap/ZPM_ORDER_SRV/MaintenanceOrderSet${filter}`)
  }

  async createMaintenanceOrder(order: Partial<SAPMaintenanceOrder>): Promise<SAPResponse<SAPMaintenanceOrder>> {
    return this.makeRequest<SAPMaintenanceOrder>("/sap/opu/odata/sap/ZPM_ORDER_SRV/MaintenanceOrderSet", "POST", order)
  }

  async updateMaintenanceOrder(
    orderNumber: string,
    order: Partial<SAPMaintenanceOrder>,
  ): Promise<SAPResponse<SAPMaintenanceOrder>> {
    return this.makeRequest<SAPMaintenanceOrder>(
      `/sap/opu/odata/sap/ZPM_ORDER_SRV/MaintenanceOrderSet('${orderNumber}')`,
      "PUT",
      order,
    )
  }

  // Cost Center Integration
  async getCostCenters(): Promise<SAPResponse<SAPCostCenter[]>> {
    return this.makeRequest<SAPCostCenter[]>("/sap/opu/odata/sap/ZFI_COSTCENTER_SRV/CostCenterSet")
  }

  // Purchase Order Integration
  async createPurchaseOrder(po: Partial<SAPPurchaseOrder>): Promise<SAPResponse<SAPPurchaseOrder>> {
    return this.makeRequest<SAPPurchaseOrder>("/sap/opu/odata/sap/ZMM_PURCHASE_SRV/PurchaseOrderSet", "POST", po)
  }

  async getPurchaseOrders(filter?: string): Promise<SAPResponse<SAPPurchaseOrder[]>> {
    const queryFilter = filter ? `?$filter=${filter}` : ""
    return this.makeRequest<SAPPurchaseOrder[]>(`/sap/opu/odata/sap/ZMM_PURCHASE_SRV/PurchaseOrderSet${queryFilter}`)
  }

  // Financial Integration
  async postCosts(costs: any[]): Promise<SAPResponse<any>> {
    return this.makeRequest<any>("/sap/opu/odata/sap/ZFI_POSTING_SRV/CostPostingSet", "POST", { costs })
  }

  // Real-time Data Sync
  async syncVehicleData(vehicleId: string, fleetData: any): Promise<SAPResponse<any>> {
    const sapVehicle: Partial<SAPVehicle> = {
      equipmentNumber: vehicleId,
      description: `${fleetData.make} ${fleetData.model}`,
      manufacturer: fleetData.make,
      model: fleetData.model,
      yearOfManufacture: fleetData.year,
      status: this.mapFleetStatusToSAP(fleetData.status),
      location: fleetData.location || "DEPOT",
    }

    return this.updateVehicle(vehicleId, sapVehicle)
  }

  async syncMaintenanceData(maintenanceId: string, fleetMaintenance: any): Promise<SAPResponse<any>> {
    const sapOrder: Partial<SAPMaintenanceOrder> = {
      orderNumber: maintenanceId,
      equipmentNumber: fleetMaintenance.vehicleId,
      description: fleetMaintenance.description,
      priority: this.mapFleetPriorityToSAP(fleetMaintenance.priority),
      plannedStartDate: fleetMaintenance.scheduledDate,
      status: this.mapFleetMaintenanceStatusToSAP(fleetMaintenance.status),
      estimatedCost: fleetMaintenance.estimatedCost,
    }

    return this.createMaintenanceOrder(sapOrder)
  }

  // Utility Methods
  private mapFleetStatusToSAP(status: string): "ACTIVE" | "INACTIVE" | "MAINTENANCE" {
    switch (status.toLowerCase()) {
      case "active":
        return "ACTIVE"
      case "maintenance":
        return "MAINTENANCE"
      default:
        return "INACTIVE"
    }
  }

  private mapFleetPriorityToSAP(priority: string): "LOW" | "MEDIUM" | "HIGH" | "URGENT" {
    switch (priority.toLowerCase()) {
      case "high":
        return "HIGH"
      case "medium":
        return "MEDIUM"
      case "low":
        return "LOW"
      default:
        return "MEDIUM"
    }
  }

  private mapFleetMaintenanceStatusToSAP(
    status: string,
  ): "CREATED" | "RELEASED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "CREATED"
      case "in-progress":
        return "IN_PROGRESS"
      case "completed":
        return "COMPLETED"
      case "cancelled":
        return "CANCELLED"
      default:
        return "CREATED"
    }
  }

  // Health Check
  async healthCheck(): Promise<SAPResponse<{ status: string; timestamp: string }>> {
    return this.makeRequest<{ status: string; timestamp: string }>("/sap/bc/rest/health")
  }
}

// Singleton instance
let sapInstance: SAPIntegration | null = null

export const getSAPIntegration = (config?: SAPConfig): SAPIntegration => {
  if (!sapInstance && config) {
    sapInstance = new SAPIntegration(config)
  }
  if (!sapInstance) {
    throw new Error("SAP Integration not initialized. Please provide configuration.")
  }
  return sapInstance
}
