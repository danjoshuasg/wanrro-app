import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navigation from "@/components/navigation"
import { CartProvider } from "@/hooks/use-cart"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
// Importar el AuthProvider
import { AuthProvider } from "@/hooks/use-auth"
// Añadir el import del LoginButton
import LoginButton from "@/components/auth/login-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wanrro Automatización - PLCs y Dispositivos de Automatización",
  description:
    "Marketplace especializado en PLCs y dispositivos de automatización industrial con precios competitivos y asesoría técnica.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Modificar el return para incluir el AuthProvider
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <CartProvider>
              <Navigation />
              <div className="flex-1">{children}</div>
              <footer className="bg-slate-900 text-white py-8">
                <div className="container px-4 md:px-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="font-bold mb-4">Wanrro Automatización</h3>
                      <p className="text-slate-300">
                        Especialistas en PLCs y dispositivos de automatización industrial.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-4">Enlaces</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="/productos" className="text-slate-300 hover:text-white">
                            Productos
                          </a>
                        </li>
                        <li>
                          <a href="/servicios" className="text-slate-300 hover:text-white">
                            Servicios
                          </a>
                        </li>
                        <li>
                          <a href="/contacto" className="text-slate-300 hover:text-white">
                            Contacto
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-4">Contacto</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="mailto:info@wanrro.com" className="text-slate-300 hover:text-white">
                            info@wanrro.com
                          </a>
                        </li>
                        <li>
                          <a href="tel:+51999999999" className="text-slate-300 hover:text-white">
                            +51 999 999 999
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-slate-400 mb-4 md:mb-0">
                      © {new Date().getFullYear()} Wanrro Automatización. Todos los derechos reservados.
                    </div>
                    <LoginButton />
                  </div>
                </div>
              </footer>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'