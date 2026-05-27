"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface CartItem {
  id: string
  sku: string
  brand: string
  name: string
  description: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "9",
      sku: "IN-89024X",
      brand: "K&N",
      name: "Kit de Admisión de Aire Frío V8",
      description:
        "Flujo de aire optimizado para motores de combustión interna de alto rendimiento. Malla de acero inoxidable.",
      price: 245.0,
      image: "/products/cold-air-intake.jpg",
      quantity: 1,
    },
    {
      id: "10",
      sku: "BRK-C441-F",
      brand: "AUTOPRO",
      name: "Juego de Pastillas de Freno Cerámicas (Delanteras)",
      description:
        "Compuesto de baja emisión de polvo. Resistencia térmica extrema para frenadas de precisión.",
      price: 89.5,
      image: "/products/brake-pads-ceramic.jpg",
      quantity: 1,
    },
  ])

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...newItem, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
