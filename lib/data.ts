// Mock data functions for the MVP
import type { Product, SalesDashboardData, CRMData, Order } from "@/types"

const products: Product[] = [
  {
    id: "PLC-001",
    name: "PLC Siemens S7-1200",
    description: "Controlador lógico programable con 14 DI, 10 DO, 2 AI y comunicación Profinet.",
    price: 450,
    stock: 10,
    image: "https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.0,f_auto,h_300,q_auto,w_600/c_pad,h_300,w_600/F8624461-01.webp",
    category: "PLCs",
    specs: {
      "Entradas Digitales": 14,
      "Salidas Digitales": 10,
      "Entradas Analógicas": 2,
      Comunicación: "Profinet",
      Alimentación: "24V DC",
      "Memoria de trabajo": "100 KB",
      Referencia: "6ES7214-1AG40-0XB0",
    },
  },
  {
    id: "PLC-002",
    name: "PLC Allen-Bradley CompactLogix 5380",
    description: "Controlador de alta velocidad con EtherNet/IP integrado para aplicaciones complejas.",
    price: 800,
    stock: 5,
    image: "https://rockwellautomation.scene7.com/is/image/rockwellautomation/16x9-compact-guardLogix-5380-sil3-compact-guardlogix-5380-sil2-compactlogix-5380.2400.jpg",
    category: "PLCs",
    specs: {
      "Entradas Digitales": 16,
      "Salidas Digitales": 16,
      "Entradas Analógicas": 4,
      Comunicación: "EtherNet/IP",
      Alimentación: "24V DC",
      Memoria: "2 MB",
    },
  },
  {
    id: "PLC-003",
    name: "PLC Omron NX1P2",
    description: "Controlador compacto con capacidad EtherCAT para control de máquinas pequeñas.",
    price: 550,
    stock: 7,
    image: "https://images.wiautomation.com/public/images/landing/anticipa/product/11_03_2024_14_04_05_NX1P2_1040DT1_Omron.jpg",
    category: "PLCs",
    specs: {
      "Entradas Digitales": 14,
      "Salidas Digitales": 10,
      "Entradas Analógicas": 2,
      Comunicación: "EtherCAT",
      Alimentación: "24V DC",
      "Memoria de programa": "1.5 MB",
    },
  },
  {
    id: "LC-001",
    name: "Contactor Siemens 3RT2016",
    description: "Contactor industrial de alta durabilidad para control de motores y sistemas eléctricos.",
    price: 40,
    stock: 50,
    image: "https://ce8dc832c.cloudimg.io/v7/_cdn_/26/7E/50/00/0/386914_1.jpg?width=640&height=480&wat=1&wat_url=_tme-wrk_%2Ftme_new.png&wat_scale=100p&ci_sign=43a16a23f97f082edb54995f7f5d679c3d71d261",
    category: "Lógica Cableada",
    specs: {
      "Corriente nominal": "9A",
      "Tensión de bobina": "230V AC",
      "Contactos principales": "3 NA",
      "Contactos auxiliares": "1 NC",
      "Vida útil mecánica": "10 millones de ciclos",
    },
  },
  {
    id: "LC-002",
    name: "Temporizador Omron H3CR",
    description: "Temporizador multifuncional con 8 modos de operación y alta precisión.",
    price: 60,
    stock: 20,
    image: "https://www.mouser.pe/images/omron/images/H3CRF8AC100240DC100125_t.jpg",
    category: "Lógica Cableada",
    specs: {
      "Rango de tiempo": "0.05s a 300h",
      "Modos de operación": 8,
      "Tensión de alimentación": "100-240V AC",
      "Contactos de salida": "1 SPDT",
      Montaje: "Carril DIN",
    },
  },
  {
    id: "SER-001",
    name: "Instalación y Configuración Básica",
    description: "Servicio profesional de instalación y configuración inicial de equipos de automatización.",
    price: 200,
    stock: 999,
    image: "https://images.pexels.com/photos/27928759/pexels-photo-27928759/free-photo-of-construccion-tecnologia-profesional-herramientas.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    category: "Servicios",
    specs: {
      "Duración estimada": "8 horas",
      Incluye: "Instalación física, configuración de comunicación, pruebas básicas",
      Técnicos: 1,
      Garantía: "30 días",
    },
  },
  {
    id: "SER-002",
    name: "Programación Avanzada de PLC",
    description: "Desarrollo de programas personalizados para PLCs según requerimientos específicos.",
    price: 400,
    stock: 999,
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    category: "Servicios",
    specs: {
      "Duración estimada": "40 horas",
      Incluye: "Análisis de requisitos, desarrollo de programa, documentación, pruebas",
      Entregables: "Código fuente, manual de usuario, capacitación",
      Garantía: "90 días",
    },
  },
]

// Store orders in memory for the MVP
let orders: Order[] = [
  {
    id: "ORD-001",
    customerId: "CLI-001",
    customerName: "IndustriaTextil SAC",
    date: "2023-09-15",
    total: 1350,
    status: "delivered",
    items: [
      {
        id: "PLC-001",
        name: "PLC Siemens S7-1200",
        price: 450,
        quantity: 3,
        image: "https://ce8dc832c.cloudimg.io/v7/_cdn_/26/7E/50/00/0/386914_1.jpg?width=640&height=480&wat=1&wat_url=_tme-wrk_%2Ftme_new.png&wat_scale=100p&ci_sign=43a16a23f97f082edb54995f7f5d679c3d71d261",
      },
    ],
  },
  {
    id: "ORD-002",
    customerId: "CLI-002",
    customerName: "Minera Los Andes",
    date: "2023-09-20",
    total: 400,
    status: "shipped",
    items: [
      {
        id: "SER-002",
        name: "Programación Avanzada de PLC",
        price: 400,
        quantity: 1,
        image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
  },
  {
    id: "ORD-003",
    customerId: "CLI-003",
    customerName: "Alimentos Del Valle",
    date: "2023-09-25",
    total: 800,
    status: "processing",
    items: [
      {
        id: "PLC-002",
        name: "PLC Allen-Bradley CompactLogix 5380",
        price: 800,
        quantity: 1,
        image: "https://rockwellautomation.scene7.com/is/image/rockwellautomation/16x9-compact-guardLogix-5380-sil3-compact-guardlogix-5380-sil2-compactlogix-5380.2400.jpg",
      },
    ],
  },
  {
    id: "ORD-004",
    customerId: "CLI-004",
    customerName: "Constructora Pacífico",
    date: "2023-09-28",
    total: 600,
    status: "pending",
    items: [
      {
        id: "LC-001",
        name: "Contactor Siemens 3RT2016",
        price: 40,
        quantity: 5,
        image: "https://ce8dc832c.cloudimg.io/v7/_cdn_/26/7E/50/00/0/386914_1.jpg?width=640&height=480&wat=1&wat_url=_tme-wrk_%2Ftme_new.png&wat_scale=100p&ci_sign=43a16a23f97f082edb54995f7f5d679c3d71d261",
      },
      {
        id: "SER-001",
        name: "Instalación y Configuración Básica",
        price: 200,
        quantity: 2,
        image: "https://images.pexels.com/photos/27928759/pexels-photo-27928759/free-photo-of-construccion-tecnologia-profesional-herramientas.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
    ],
  },
]

const crmData: CRMData = {
  leads: [
    {
      id: "LEAD-001",
      name: "Juan Pérez",
      company: "Textiles Unidos",
      email: "juan@textilesunidos.pe",
      phone: "+51 999888777",
      status: "new",
      date: "2023-09-01",
    },
    {
      id: "LEAD-002",
      name: "María López",
      company: "Industria Metálica Sur",
      email: "mlopez@ims.com",
      phone: "+51 999777666",
      status: "contacted",
      date: "2023-09-05",
    },
    {
      id: "LEAD-003",
      name: "Carlos Rodríguez",
      company: "Alimentos Andinos",
      email: "crodriguez@alimentosandinos.com",
      phone: "+51 999666555",
      status: "qualified",
      date: "2023-09-10",
    },
    {
      id: "LEAD-004",
      name: "Sofía Mendoza",
      company: "Constructora Lima",
      email: "smendoza@constructoralima.pe",
      phone: "+51 999555444",
      status: "unqualified",
      date: "2023-09-15",
    },
  ],
  clients: [
    {
      id: "CLI-001",
      name: "Pedro Díaz",
      company: "IndustriaTextil SAC",
      email: "pdiaz@indtextil.pe",
      phone: "+51 999999999",
      lastPurchase: "2023-09-15",
      totalSpent: 5250.5,
      status: "active",
    },
    {
      id: "CLI-002",
      name: "Lucía Fernández",
      company: "Minera Los Andes",
      email: "lucia@mineraandes.com",
      phone: "+51 999888777",
      lastPurchase: "2023-09-20",
      totalSpent: 3800.75,
      status: "active",
    },
    {
      id: "CLI-003",
      name: "Roberto Gómez",
      company: "Alimentos Del Valle",
      email: "rgomez@adelvalle.pe",
      phone: "+51 999777666",
      lastPurchase: "2023-09-25",
      totalSpent: 2100.25,
      status: "active",
    },
    {
      id: "CLI-004",
      name: "Ana Torres",
      company: "Constructora Pacífico",
      email: "atorres@cpacific.pe",
      phone: "+51 999666555",
      lastPurchase: "2023-08-15",
      totalSpent: 950.0,
      status: "inactive",
    },
  ],
  opportunities: [
    {
      id: "OPP-001",
      clientId: "CLI-001",
      clientName: "IndustriaTextil SAC",
      title: "Automatización de Línea de Teñido",
      value: 2000,
      probability: 75,
      stage: "negotiation",
      expectedCloseDate: "2023-10-15",
    },
    {
      id: "OPP-002",
      clientId: "CLI-002",
      clientName: "Minera Los Andes",
      title: "Sistema de Monitoreo Remoto",
      value: 4500,
      probability: 50,
      stage: "proposal",
      expectedCloseDate: "2023-11-01",
    },
    {
      id: "OPP-003",
      clientId: "CLI-003",
      clientName: "Alimentos Del Valle",
      title: "Actualización de Controladores",
      value: 1800,
      probability: 90,
      stage: "won",
      expectedCloseDate: "2023-09-30",
    },
    {
      id: "OPP-004",
      clientId: "LEAD-001",
      clientName: "Textiles Unidos",
      title: "Diagnóstico de Sistema Actual",
      value: 300,
      probability: 25,
      stage: "initial-contact",
      expectedCloseDate: "2023-10-20",
    },
    {
      id: "OPP-005",
      clientId: "CLI-004",
      clientName: "Constructora Pacífico",
      title: "Implementación de HMI",
      value: 1200,
      probability: 10,
      stage: "lost",
      expectedCloseDate: "2023-09-20",
    },
  ],
}

const dashboardData: SalesDashboardData = {
  totalSales: 31500.75,
  salesIncrease: 15.3,
  totalOrders: 42,
  newOrders: 3,
  opportunities: 5,
  opportunitiesValue: 9800,
  activeClients: 15,
  newClients: 4,
  monthlySales: [
    { month: "Ene", sales: 2100 },
    { month: "Feb", sales: 2400 },
    { month: "Mar", sales: 1800 },
    { month: "Abr", sales: 2200 },
    { month: "May", sales: 2800 },
    { month: "Jun", sales: 3100 },
    { month: "Jul", sales: 3500 },
    { month: "Ago", sales: 3800 },
    { month: "Sep", sales: 4200 },
  ],
  topProducts: [
    { id: "PLC-001", name: "PLC Siemens S7-1200", sales: 28 },
    { id: "LC-001", name: "Contactor Siemens 3RT2016", sales: 45 },
    { id: "SER-001", name: "Instalación y Configuración Básica", sales: 15 },
    { id: "PLC-002", name: "PLC Allen-Bradley CompactLogix 5380", sales: 12 },
    { id: "LC-002", name: "Temporizador Omron H3CR", sales: 20 },
  ],
  recentOrders: orders,
}

export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return products
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return products.find((product) => product.id === id)
}

export async function getRelatedProducts(category: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return products.filter((product) => product.category === category).slice(0, 4)
}

export async function getSalesDashboardData(): Promise<SalesDashboardData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))
  // Always return fresh data with updated orders
  return {
    ...dashboardData,
    recentOrders: orders,
  }
}

export async function getCRMData(): Promise<CRMData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))
  return crmData
}

// Función para guardar un pedido
export async function saveOrder(order: Omit<Order, "id">): Promise<Order> {
  // Simular API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generar un nuevo ID de pedido
  const orderId = `ORD-${String(orders.length + 1).padStart(3, "0")}`

  // Crear el nuevo pedido
  const newOrder: Order = {
    id: orderId,
    ...order,
  }

  // Añadir al array de pedidos (al principio para que aparezca primero en la lista)
  orders = [newOrder, ...orders]

  // Actualizar datos del dashboard
  dashboardData.totalOrders += 1
  dashboardData.newOrders += 1

  // Disparar un evento personalizado para notificar que se ha creado un pedido
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("orderCreated"))
  }

  return newOrder
}

// Function to get pending orders
export async function getPendingOrders(): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return orders.filter((order) => order.status === "pending")
}

