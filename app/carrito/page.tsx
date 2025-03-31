"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, CreditCard, Landmark, Wallet } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CartItemsList from "@/components/cart/cart-items-list"
import CartSummary from "@/components/cart/cart-summary"
import { saveOrder } from "@/lib/data"

// Definir las etapas del proceso de pago
type CheckoutStage = "cart" | "payment-method" | "payment-details" | "processing" | "success"

export default function CartPage() {
  const router = useRouter()
  const { items, isEmpty, clearCart } = useCart()
  const [checkoutStage, setCheckoutStage] = useState<CheckoutStage>("cart")
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card")
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Estados para los datos de pago
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
  })

  if (isEmpty) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24 text-center">
        <h1 className="text-3xl font-bold mb-6">Tu carrito está vacío</h1>
        <p className="text-xl mb-8">Explora nuestro catálogo para encontrar productos de automatización industrial</p>
        <Button asChild size="lg">
          <Link href="/productos">Ver Catálogo</Link>
        </Button>
      </div>
    )
  }

  const handleProceedToPayment = () => {
    setCheckoutStage("payment-method")
    window.scrollTo(0, 0)
  }

  const handleSelectPaymentMethod = (method: string) => {
    setPaymentMethod(method)
    setCheckoutStage("payment-details")
    window.scrollTo(0, 0)
  }

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    })
  }

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value,
    })
  }

  const handleBankNameChange = (value: string) => {
    setBankDetails({
      ...bankDetails,
      bankName: value,
    })
  }

  const handleSubmitPayment = async () => {
    try {
      setIsProcessing(true)
      setCheckoutStage("processing")
      window.scrollTo(0, 0)

      // Guardar los items del carrito temporalmente para usarlos en la página de confirmación
      localStorage.setItem("cartItems", JSON.stringify(items))

      // Simular proceso de pago
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Crear el pedido
      const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      const order = {
        customerId: "GUEST",
        customerName: "Cliente Web",
        date: new Date().toISOString().split("T")[0],
        total,
        status: "pending" as const,
        items: items,
      }

      // Guardar el pedido
      const savedOrder = await saveOrder(order)

      // Mostrar mensaje de éxito
      setCheckoutStage("success")
      setPaymentSuccess(true)

      // Limpiar carrito y redirigir
      setTimeout(() => {
        clearCart()
        router.push(`/carrito/confirmacion?orderId=${savedOrder.id}`)
      }, 2000)
    } catch (error) {
      console.error("Error al procesar el pago:", error)
      alert("Hubo un error al procesar el pago. Por favor, inténtelo de nuevo.")
      setCheckoutStage("payment-details")
      setIsProcessing(false)
    }
  }

  const renderPaymentMethodSelection = () => {
    return (
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-xl font-bold mb-6">Selecciona un método de pago</h2>

        <RadioGroup defaultValue="credit-card" className="space-y-4" onValueChange={setPaymentMethod}>
          <div className="flex items-center space-x-3 border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
            <RadioGroupItem value="credit-card" id="credit-card" />
            <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
              <CreditCard className="mr-2 h-5 w-5 text-primary" />
              <span>Tarjeta de Crédito/Débito</span>
            </Label>
          </div>

          <div className="flex items-center space-x-3 border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
            <RadioGroupItem value="bank-transfer" id="bank-transfer" />
            <Label htmlFor="bank-transfer" className="flex items-center cursor-pointer">
              <Landmark className="mr-2 h-5 w-5 text-primary" />
              <span>Transferencia Bancaria</span>
            </Label>
          </div>

          <div className="flex items-center space-x-3 border p-4 rounded-md hover:bg-slate-50 cursor-pointer">
            <RadioGroupItem value="digital-wallet" id="digital-wallet" />
            <Label htmlFor="digital-wallet" className="flex items-center cursor-pointer">
              <Wallet className="mr-2 h-5 w-5 text-primary" />
              <span>Billetera Digital</span>
            </Label>
          </div>
        </RadioGroup>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => setCheckoutStage("cart")}>
            Volver al Carrito
          </Button>
          <Button onClick={() => handleSelectPaymentMethod(paymentMethod)}>Continuar</Button>
        </div>
      </div>
    )
  }

  const renderPaymentDetails = () => {
    if (paymentMethod === "credit-card") {
      return (
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-bold mb-6">Detalles de la Tarjeta</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Número de Tarjeta</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
              <Input
                id="cardName"
                name="cardName"
                placeholder="Juan Pérez"
                value={cardDetails.cardName}
                onChange={handleCardDetailsChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Fecha de Expiración</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/AA"
                  value={cardDetails.expiryDate}
                  onChange={handleCardDetailsChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => setCheckoutStage("payment-method")}>
              Volver
            </Button>
            <Button onClick={handleSubmitPayment} disabled={isProcessing}>
              Pagar Ahora
            </Button>
          </div>
        </div>
      )
    } else if (paymentMethod === "bank-transfer") {
      return (
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-bold mb-6">Detalles de Transferencia Bancaria</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="bankName">Banco</Label>
              <Select value={bankDetails.bankName} onValueChange={handleBankNameChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu banco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bcp">BCP</SelectItem>
                  <SelectItem value="interbank">Interbank</SelectItem>
                  <SelectItem value="bbva">BBVA</SelectItem>
                  <SelectItem value="scotiabank">Scotiabank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="accountNumber">Número de Cuenta</Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                placeholder="123456789012"
                value={bankDetails.accountNumber}
                onChange={handleBankDetailsChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="accountName">Titular de la Cuenta</Label>
              <Input
                id="accountName"
                name="accountName"
                placeholder="Juan Pérez"
                value={bankDetails.accountName}
                onChange={handleBankDetailsChange}
                required
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => setCheckoutStage("payment-method")}>
              Volver
            </Button>
            <Button onClick={handleSubmitPayment} disabled={isProcessing}>
              Confirmar Transferencia
            </Button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-bold mb-6">Billetera Digital</h2>

          <div className="text-center p-6">
            <p className="mb-4">Serás redirigido a la plataforma de pago seleccionada.</p>
            <p className="text-sm text-slate-500">Asegúrate de tener una cuenta activa en la plataforma.</p>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => setCheckoutStage("payment-method")}>
              Volver
            </Button>
            <Button onClick={handleSubmitPayment} disabled={isProcessing}>
              Continuar al Pago
            </Button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-8">
        {checkoutStage === "cart"
          ? "Carrito de Compras"
          : checkoutStage === "payment-method"
            ? "Método de Pago"
            : checkoutStage === "payment-details"
              ? "Detalles de Pago"
              : "Procesando Pago"}
      </h1>

      {paymentSuccess ? (
        <Alert className="bg-green-50 border-green-200 mb-8">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">¡Pago procesado con éxito!</AlertTitle>
          <AlertDescription className="text-green-700">
            Su pedido ha sido confirmado. Será redirigido a la página de confirmación en unos segundos...
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {checkoutStage === "cart" ? (
          <CartItemsList />
        ) : checkoutStage === "payment-method" ? (
          renderPaymentMethodSelection()
        ) : checkoutStage === "payment-details" ? (
          renderPaymentDetails()
        ) : (
          <div className="bg-white p-6 rounded-lg border flex flex-col items-center justify-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-lg font-medium">Procesando su pago...</p>
            <p className="text-sm text-slate-500 mt-2">Por favor, no cierre esta ventana</p>
          </div>
        )}

        <div>
          <CartSummary />
          {checkoutStage === "cart" ? (
            <Button className="w-full mt-4" size="lg" onClick={handleProceedToPayment}>
              Proceder al Pago
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

