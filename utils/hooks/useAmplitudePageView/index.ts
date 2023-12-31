import { useFunnelFormData } from 'services/context/funnelFormContext'
import { useEffect } from 'react'

type CarResultQuery = {
  downPayment?: number | null
  monthlyInstallment?: number | null
}
type CarResultParameters = {
  carResultParameters: CarResultQuery
}

export const useCarResultParameter = (): CarResultParameters => {
  const { funnelForm } = useFunnelFormData()
  const carResultObj: CarResultQuery = {
    monthlyInstallment: null,
    downPayment: null,
  }
  const monthlyInstallment = funnelForm.monthlyInstallment
  const downPayment = funnelForm.downPaymentAmount
  if (monthlyInstallment) {
    carResultObj.monthlyInstallment = Number(monthlyInstallment)
  }
  if (downPayment) {
    carResultObj.downPayment = Number(downPayment)
  }
  return {
    carResultParameters: carResultObj,
  }
}
