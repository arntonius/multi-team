import { createContext, useEffect, useState } from 'react'
import { useLocalStorage } from 'utils/hooks/useLocalStorage'
import { LocalStorageKey } from 'utils/types/models'
import { FunnelQuery, MobileWebTopMenuType } from 'utils/types/props'

enum PaymentType {
  MonthlyInstallment = 'monthlyInstallment',
  DownPayment = 'downPayment',
  CarModel = 'carModel',
}

enum DownPaymentType {
  DownPaymentAmount = 'amount',
  DownPaymentPercentage = 'percentage',
}

const initData = {
  paymentType: PaymentType.CarModel
    ? PaymentType.CarModel
    : PaymentType.DownPayment,
  downPaymentType: DownPaymentType.DownPaymentAmount,
  monthlyInstallment: '',
  downPaymentAmount: '',
  downPaymentPercentage: '',
  brand: [],
  bodyType: [],
  category: [],
  minPrice: '',
  maxPrice: '',
  priceRangeGroup: '',
  sortBy: 'lowToHigh',
  carModel: '',
  tenure: 5,
  age: '',
  monthlyIncome: '',
  isDefaultTenureChanged: false,
}

export type FunnelQueryContextType = {
  funnelQuery: FunnelQuery
  setFunnelQueryValue: (data: FunnelQuery) => void
  patchFunnelQuery: (data: FunnelQuery) => void
  clearQueryFilter: (data: FunnelQuery) => void
}

export const FunnelQueryContext = createContext<FunnelQueryContextType | []>([])

export const FunnelQueryContextProvider = ({ children }: any) => {
  const [isInit, setIsInit] = useState<boolean>(true)
  const [storedValue] = useLocalStorage<FunnelQuery>(
    LocalStorageKey.CarFilter,
    initData,
  )
  const [funnelQuery, setFunnelQuery] = useState<FunnelQuery>(initData)

  const setFunnelQueryValue = (value: FunnelQuery) => {
    setFunnelQuery({ ...funnelQuery, ...value })

    const prevValue = localStorage.getItem(LocalStorageKey.CarFilter)
    const prevValueParse = JSON.parse(String(prevValue)) || ''

    const updateValue = { ...prevValueParse, ...value }
    localStorage.setItem(LocalStorageKey.CarFilter, JSON.stringify(updateValue))
  }

  const patchFunnelQuery = (value: FunnelQuery) => {
    setFunnelQuery({ ...funnelQuery, ...value })

    const prevValue = localStorage.getItem(LocalStorageKey.CarFilter)
    const prevValueParse = JSON.parse(String(prevValue)) || ''

    const updateValue = { ...prevValueParse, ...value }
    localStorage.setItem(LocalStorageKey.CarFilter, JSON.stringify(updateValue))
  }

  const clearQueryFilter = () => {
    const initial = {
      paymentType: PaymentType.CarModel
        ? PaymentType.CarModel
        : PaymentType.DownPayment,
      downPaymentType: DownPaymentType.DownPaymentAmount,
      monthlyInstallment: '',
      downPaymentAmount: '',
      downPaymentPercentage: '',
      brand: [],
      bodyType: [],
      category: [],
      minPrice: '',
      maxPrice: '',
      priceRangeGroup: '',
      sortBy: 'lowToHigh',
      carModel: '',
      tenure: 5,
      monthlyIncome: '',
    }
    setFunnelQuery(initial)
    localStorage.setItem(LocalStorageKey.CarFilter, JSON.stringify(initial))
  }

  const checkIsInit = (): boolean => {
    const init = JSON.stringify(funnelQuery)
    const newData = JSON.stringify(storedValue)
    const result = init === newData
    if (!result) setIsInit(false)
    return result
  }

  useEffect(() => {
    const onload = () => {
      setFunnelQuery(storedValue)
    }
    window.addEventListener('load', onload)
    return () => {
      window.removeEventListener('load', onload)
    }
  }, [])

  useEffect(() => {
    checkIsInit()
    if (!isInit) {
      const temp = { ...funnelQuery, ...storedValue }
      setFunnelQuery(temp)
      // set localStorage so that it will be the same with context state using the updated data
      localStorage.setItem(LocalStorageKey.CarFilter, JSON.stringify(temp))
    }
  }, [isInit])

  return (
    <FunnelQueryContext.Provider
      value={{
        funnelQuery,
        setFunnelQueryValue,
        patchFunnelQuery,
        clearQueryFilter,
      }}
    >
      {children}
    </FunnelQueryContext.Provider>
  )
}
