import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist, createJSONStorage, subscribeWithSelector } from 'zustand/middleware'

interface AppSateType {
  price: number
  count: number
  color: string
  /*  addCount: () => void
  decrement: () => void
  getTotal: () => number
  doubleCount: () => Promise<void> */
}
const useAppleStore = create<AppSateType>()(
  devtools(
    subscribeWithSelector(
      persist(
        immer((/* set, get */) => ({
          price: 10,
          count: 10,
          color: 'red',
          /*  increment: () => {
            // set((state) => ({ count: state.count + 1 }))  // 无immer 写法
            set((state) => {
              state.count += 1
            })
          },
          decrement: () => {
            // set((state) => ({ count: state.count - 1 })) // 无immer 写法
            set((state) => {
              state.count -= 1
            })
          },
          getTotal: () => {
            return get().price * get().count
          },
          doubleCount: async () => {
            const rate = await Promise.resolve(2)
            // set((state) => ({ count: state.count * rate })) // 无immer 写法
            set((state) => {
              state.count *= rate
            })
          }, */
        })),
        {
          name: 'apple-store-storage',
          partialize: (state) => {
            // return { count: state.count, color: state.color } // 指定持久化字段
            return Object.fromEntries(Object.entries(state).filter(([key]) => !['price', 'color'].includes(key))) // 排除持久化字段
          },
          storage: createJSONStorage(() => localStorage), // 持久化方式(localStorage/sessionStorage)
        }
      )
    ),
    { name: 'appleStore', enabled: true }
  )
)

export default useAppleStore

export const increment = () => {
  useAppleStore.setState((state) => {
    state.count += 1
  })
}
export const decrement = () => {
  useAppleStore.setState((state) => {
    state.count -= 1
  })
}
export const getTotal = () => {
  return useAppleStore.getState().price * useAppleStore.getState().count
}
export const doubleCount = async () => {
  const rate = await Promise.resolve(2)
  useAppleStore.setState((state) => {
    state.count *= rate
  })
}
export const clearStore = () => {
  useAppleStore.persist.clearStorage()
}
