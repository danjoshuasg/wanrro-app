"use client"

import type React from "react"

import { useState, useEffect } from "react"

type ToastType = "default" | "destructive" | "success"

interface Toast {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  type?: ToastType
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    toasts.forEach((toast) => {
      if (toast.duration !== Number.POSITIVE_INFINITY) {
        const timer = setTimeout(() => {
          setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id))
        }, toast.duration || 5000)

        timers.push(timer)
      }
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [toasts])

  const toast = ({ title, description, action, type = "default", duration = 5000 }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      title,
      description,
      action,
      type,
      duration,
    }

    setToasts((prevToasts) => [...prevToasts, newToast])

    return {
      id,
      dismiss: () => dismiss(id),
      update: (props: Partial<Omit<Toast, "id">>) => update(id, props),
    }
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  const update = (id: string, props: Partial<Omit<Toast, "id">>) => {
    setToasts((prevToasts) => prevToasts.map((toast) => (toast.id === id ? { ...toast, ...props } : toast)))
  }

  return {
    toasts,
    toast,
    dismiss,
    update,
  }
}

