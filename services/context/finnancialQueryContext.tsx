import { createContext, useEffect, useState } from 'react'
import { useLocalStorage } from 'utils/hooks/useLocalStorage'
import { LocalStorageKey } from 'utils/types/models'
import { FinancialQuery } from 'utils/types/props'

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

export type FinancialQueryContextType = {
  financialQuery: FinancialQuery
  setFinancialQueryValue: (data: FinancialQuery) => void
  patchFinancialQuery: (data: FinancialQuery) => void
  clearQueryFilter: (data: FinancialQuery) => void
}

export const FinancialQueryContext = createContext<
  FinancialQueryContextType | []
>([])

export const FinancialQueryContextProvider = ({ children }: any) => {
  const [isInit, setIsInit] = useState<boolean>(true)
  const [storedValue] = useLocalStorage<FinancialQuery>(
    LocalStorageKey.CarFilter,
    initData,
  )
  const [financialQuery, setFinancialQuery] = useState<FinancialQuery>(initData)

  const setFinancialQueryValue = (value: FinancialQuery) => {
    setFinancialQuery({ ...financialQuery, ...value })

    const prevValue = localStorage.getItem(LocalStorageKey.CarFilter)
    const prevValueParse = JSON.parse(String(prevValue)) || ''

    const updateValue = { ...prevValueParse, ...value }
    localStorage.setItem(LocalStorageKey.CarFilter, JSON.stringify(updateValue))
  }

  const patchFinancialQuery = (value: FinancialQuery) => {
    setFinancialQuery({ ...financialQuery, ...value })

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
    setFinancialQuery(initial)
    localStorage.setItem(LocalStorageKey.CarFilter, JSON.stringify(initial))
  }

  const checkIsInit = (): boolean => {
    const init = JSON.stringify(financialQuery)
    const newData = JSON.stringify(storedValue)
    const result = init === newData
    if (!result) setIsInit(false)
    return result
  }

  useEffect(() => {
    const onload = () => {
      setFinancialQuery(storedValue)
    }
    window.addEventListener('load', onload)
    return () => {
      window.removeEventListener('load', onload)
    }
  }, [])

  useEffect(() => {
    checkIsInit()
    if (!isInit) {
      const temp = { ...financialQuery, ...storedValue }
      setFinancialQuery(temp)
      // set localStorage so that it will be the same with context state using the updated data
      localStorage.setItem(LocalStorageKey.CarFilter, JSON.stringify(temp))
    }
  }, [isInit])

  return (
    <FinancialQueryContext.Provider
      value={{
        financialQuery,
        setFinancialQueryValue,
        patchFinancialQuery,
        clearQueryFilter,
      }}
    >
      {children}
    </FinancialQueryContext.Provider>
  )
}
