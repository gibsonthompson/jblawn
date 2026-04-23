'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type BookingContextType = {
  openBooking: () => void
  closeBooking: () => void
  isOpen: boolean
}

const BookingContext = createContext<BookingContextType>({
  openBooking: () => {},
  closeBooking: () => {},
  isOpen: false,
})

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <BookingContext.Provider value={{
      openBooking: () => setIsOpen(true),
      closeBooking: () => setIsOpen(false),
      isOpen,
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}
