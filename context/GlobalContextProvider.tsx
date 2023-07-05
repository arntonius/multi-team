import React, { HTMLAttributes } from 'react'
import { RecommendationsContextProvider } from './recommendationsContext/recommendationsContext'
import { FunnelQueryContextProvider } from './funnelQueryContext/funnelQueryContext'
import { FinancialQueryContextProvider } from './financialQueryContext/financialQueryContext'
import { MobileWebTopMenusContextProvider } from './mobileWebTopMenuContext/mobileWebTopMenuContext'
import { LastOtpSentTimeContextProviderRevamp } from './lastOtpSentTimeContext'
import { CarVariantDetailsContextProvider } from './carVariantDetailsContext/carVariantDetailsContext'
import { CarModelDetailsContextProvider } from './carModelDetailsContext/carModelDetailsContext'
import { ModalContextProvider } from './modalContext/modalContext'
import { SurveyFormProvider } from './surveyFormContext/surveyFormContext'
import { SpecialRateListResultsContextProvider } from './specialRateResultsContext/specialRateResultsContext'
import { CurrentLanguageContextProvider } from './currentLanguageContext/currentLanguageContext'

const providers: Array<
  React.JSXElementConstructor<React.PropsWithChildren<any>>
> = [
  RecommendationsContextProvider,
  CarModelDetailsContextProvider,
  CarVariantDetailsContextProvider,
  FunnelQueryContextProvider,
  FinancialQueryContextProvider,
  MobileWebTopMenusContextProvider,
  LastOtpSentTimeContextProviderRevamp,
  ModalContextProvider,
  SurveyFormProvider,
  SpecialRateListResultsContextProvider,
  CurrentLanguageContextProvider,
]

export const GlobalContextProvider = (props: HTMLAttributes<HTMLElement>) => {
  return (
    <>
      {providers.reduceRight((accumulator, Component) => {
        return <Component>{accumulator}</Component>
      }, props.children)}
    </>
  )
}
