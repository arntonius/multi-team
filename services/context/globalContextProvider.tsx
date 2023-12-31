import React, { HTMLAttributes } from 'react'
import { FinancialQueryContextProvider } from './finnancialQueryContext'
import { FunnelQueryContextProvider } from './funnelQueryContext'
import { SearchWidgetProvider } from './searchWidgetContext'
import { UtilsContextProvider } from './utilsContext'
import { ConfigProvider } from './configContext'
import { CarProvider } from './carContext'
import { AuthProvider } from './authContext'
import { CalculatorProvider } from './calculatorContext'
import { FormContextProvider } from './formContext'
import { ModalContextProvider } from './modalContext'
import { SideMenuListContextProvider } from './sideMenuListContext'
import { SideMenuContextProvider } from './sideMenuContext'
import { MultiUnitQueryContextProvider } from './multiUnitQueryContext'
import { GalleryContextProvider } from './galleryContext'
import { FunnelQueryUsedCarContextProvider } from './funnelQueryUsedCarContext'
import { AnnouncementBoxProvider } from './announcementBoxContext'
import { ContactFormProvider } from './contactFormContext'
import { SearchUsedCarWidgetProvider } from './searchUsedCarWidgetContext'

const providers: Array<
  React.JSXElementConstructor<React.PropsWithChildren<any>>
> = [
  FinancialQueryContextProvider,
  SearchWidgetProvider,
  UtilsContextProvider,
  ConfigProvider,
  AuthProvider,
  CarProvider,
  FunnelQueryContextProvider,
  FunnelQueryUsedCarContextProvider,
  AuthProvider,
  CalculatorProvider,
  FormContextProvider,
  ModalContextProvider,
  SideMenuListContextProvider,
  SideMenuContextProvider,
  MultiUnitQueryContextProvider,
  GalleryContextProvider,
  AnnouncementBoxProvider,
  ContactFormProvider,
  SearchUsedCarWidgetProvider,
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
