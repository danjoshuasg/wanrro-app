export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image: string
  category: string
  specs: Record<string, string | number | boolean>
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  date: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  items: CartItem[]
}

export interface SalesDashboardData {
  totalSales: number
  salesIncrease: number
  totalOrders: number
  newOrders: number
  opportunities: number
  opportunitiesValue: number
  activeClients: number
  newClients: number
  monthlySales: { month: string; sales: number }[]
  topProducts: { id: string; name: string; sales: number }[]
  recentOrders: Order[]
}

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: "new" | "contacted" | "qualified" | "unqualified"
  date: string
}

export interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  lastPurchase: string
  totalSpent: number
  status: "active" | "inactive"
}

export interface Opportunity {
  id: string
  clientId: string
  clientName: string
  title: string
  value: number
  probability: number
  stage: "initial-contact" | "proposal" | "negotiation" | "won" | "lost"
  expectedCloseDate: string
}

export interface CRMData {
  leads: Lead[]
  clients: Client[]
  opportunities: Opportunity[]
}

