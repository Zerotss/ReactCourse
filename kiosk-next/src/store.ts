import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from './generated/prisma/client'

interface Store {
    order: OrderItem[]
    addToCart: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    deleteProduct: (id: Product['id']) => void
    clearOrder: () => void
}
export const useStore = create<Store>((set, get) => ({
    order: [],
    addToCart: (product) => {
        const { categoryId, image, ...data } = product

        let items: OrderItem[] = []
        //truthy
        if (get().order.find((it) => it.id === product.id)) {
            items = get().order.map((it) => it.id === product.id ? {
                ...it,
                quantity: it.quantity + 1,
                subtotal: it.price * (it.quantity + 1)
            } : it)
        } else {
            items = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set((state) => ({
            order: items
        }))
    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map((it) => it.id === id ? {
                ...it,
                quantity: it.quantity + 1,
                subtotal: it.price * (it.quantity + 1)
            } : it)
        }))
    },
    decreaseQuantity: (id) => {

        let items: OrderItem[] = []
        //truthy
        if (get().order.find((it) => it.id === id)?.quantity == 1) {
            items = [...get().order.filter((it) => it.id !== id)]
        } else {
            items = get().order.map((it) => it.id === id ? {
                ...it,
                quantity: it.quantity - 1,
                subtotal: it.price * (it.quantity - 1)
            } : it)
        }

        set((state) => ({
            order: items
        }))
    },
    deleteProduct: (id) => {
        set((state) => ({
            order: [...get().order.filter((it) => it.id !== id)]
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))