import { ReactElement } from 'react'
import { InstallmentTypeOptions } from 'utils/models/models'
import {
  ContactType,
  LoanRank,
  UnverifiedLeadSubCategory,
  UTMTags,
} from 'utils/enum'

export type FormControlValue = string | number | readonly string[] | undefined

export interface Option<T extends FormControlValue> {
  label: string
  value: T
  testid?: string
}

export interface OptionWithImage<T extends FormControlValue> {
  image?: string
  label: string
  value: T
  disabled?: boolean
  brand?: string
  testid?: string
}

export interface OptionWithText<T extends FormControlValue> {
  text?: string
  label: string
  value: T
  testid?: string
}

export type CheckboxItemType = {
  value: string
  label: string
  isChecked: boolean
  image?: () => ReactElement
  subOptions?: CheckboxItemType[]
}

export interface Time {
  hours: string
  minutes: string
  seconds: string
}
export interface Location {
  cityName: string
  cityCode: string
  id: number | string
  province: string
}

export interface Article {
  title: string
  category: string
  category_link: string
  url: string
  excerpt: string
  publish_date: string
  writer_name: string
  writer_initial: string
  featured_image: string
}

export interface Banner {
  name: string
  creativeContext: string
  slot: string
  url: string
  attribute: {
    web_desktop: string
    web_mobile: string
  }
}

export interface Car {
  brand: string
  model: string
  image: string
  variants: any
}

export interface CarDetail {
  brand: string
  model: {
    description: string
    url: string
    data: { image: string }
    carModel: {
      brand: string
      model: string
    }
  }
}

export interface Testimony {
  pictureUrl: string
  name: string
  cityName: string
  purchaseDate: string
  rating: number
  detail: string
}

export interface HowToUse {
  head_title: string
  title_1: string
  subtitle_1: string
  icon_1: { data: { attributes: { url: string } } }
  title_2: string
  subtitle_2: string
  icon_2: { data: { attributes: { url: string } } }
  title_3: string
  subtitle_3: string
  icon_3: { data: { attributes: { url: string } } }
}

export interface Variant {
  id: string
  model: string
  code: string
  variant_name: string
  variant_title: string
  price_currency: string
  price_value: number
  price_formatted_value: string
}

export interface Form {
  name: string
  phone: string
  whatsapp: boolean
}
export interface FormWidget {
  age: string
  dp: string
  income: string
  tenure: number
}

export interface Menu {
  id: number
  menuCode: string
  menuDesc: string
  menuLevel: string
  menuName: string
  menuOrder: number
  menuParent: string
  menuUrl: string
  status: boolean
  toogleNew: boolean
  subMenu: Array<Menu>
}

export interface UTMCollector {
  utm_id: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  adset: string | null
}

export interface BodyType {
  body_type: string
  data_count: number
}

export interface AnnouncementBoxDataType {
  id: number
  title: string
  data: {
    folder: string
    icon: string
    thumbnail: {
      icon: string
    }
  }
  url: string | null
  description: string
  textDisplay: string | null
  backgroundColor: string
  bannerDesign: string
  userTarget: string
}

export interface UTMTagsData {
  [UTMTags.UtmSource]: string | null
  [UTMTags.UtmMedium]: string | null
  [UTMTags.UtmCampaign]: string | null
  [UTMTags.UtmContent]: string | null
  [UTMTags.UtmTerm]: string | null
  [UTMTags.UtmId]: string | null
  [UTMTags.Adset]: string | null
}
export interface LoanDetail {
  loanRank: LoanRank
  tenure: number
  dpAmount: number
  monthlyInstallment: number
}

export interface CarVariantLoan extends LoanDetail {
  id: string
  modelId?: string
  priceValue: number
}

export type CarRecommendation = {
  id: string
  brand: string
  model: string
  image: string
  images: string[]
  numberOfPopulation: number
  lowestAssetPrice: number
  highestAssetPrice: number
  height: number
  width: number
  length: number
  loanRank: string
  variants: CarVariantLoan[]
  brandAndModel?: string
  modelAndBrand?: string
}

export interface CarRecommendationResponse {
  carRecommendations: CarRecommendation[]
  lowestCarPrice: number
  highestCarPrice: number
}

export interface CarResultIndexPage {
  startIndex: number
  endIndex: number
}

export interface SimpleCarVariantDetail {
  modelId: string
  variantId: string
  loanTenure: number
  loanDownPayment: number
  loanMonthlyInstallment: number
  loanRank: string
  totalFirstPayment?: number
  angsuranType?: string
  rateType?: string
  flatRate?: number
}

export interface VideoDataType {
  thumbnailVideo: string
  title: string
  videoSrc: string
  videoId: string
  accountName: string
  date: string
}

export interface SpecialRateListType {
  tenure: number
  interestRate: number
  dp: number
  dpAmount: number
  installment: number
  saveAmount: number
  loanRank: string
  totalFirstPayment: number
  totalFirstPaymentADDB: number
  totalFirstPaymentADDM: number
}

export interface SpecialRateList {
  tenure: number
  interestRate: number
  dp: number
  dpAmount: number
  installment: number
  saveAmount: number
  loanRank: string
  totalFirstPayment: number
}
export interface CreateUnverifiedLeadRequestNew {
  origination: UnverifiedLeadSubCategory
  name?: string
  phoneNumber: string
  contactType?: ContactType
  email?: string
  sevaKnowledge?: string
  isPurchaseSoon?: boolean
  sevaCarBrands?: string[]
  otherCarBrand?: string[]
  paymentPreference?: string
  income?: string
  age?: string
  tenure?: number
  dp?: number
  otrPrice?: number
  monthlyInstallment?: number
  promo?: string
  carBrand?: string
  carModelText?: string
  cityId?: number
  platform?: string
}

export interface CustomerInfoSeva {
  id: number
  phoneNumber: string
  fullName: string
  gender: string
  dob: string
  nik: string
  email: string
  marital: string
  registType: string
  isSales: boolean
  isCrmCustomer: boolean
  createdAt?: string
}

export interface MobileWebTopMenuItemType {
  menuName: string
  menuDesc: string
  menuCode: string
  menuParent: string | null
  menuUrl: string | null
  menuLevel: number
  status: boolean
  menuOrder: number
  toggleNew: boolean
  menuType: string
  subMenu: MobileWebTopMenuItemType[]
}
export interface MobileWebTopMenuType extends MobileWebTopMenuItemType {
  subMenu: MobileWebTopMenuItemType[]
}

export interface AnnouncementBoxDataType {
  id: number
  title: string
  data: {
    folder: string
    icon: string
    thumbnail: {
      icon: string
    }
  }
  url: string | null
  description: string
  textDisplay: string | null
  backgroundColor: string
  bannerDesign: string
  userTarget: string
}

export interface CityOtrOption {
  cityName: string
  cityCode: string
  province: string
  id?: string
}

export interface CarModelBasicInfo {
  id: string
  brand: string
  model: string
  promoFlag: boolean
}

export interface CarVariant {
  id: string
  name: string
  priceValue: number
  fuelType: string
  transmission: string
  engineCapacity: number
  carSeats: number
  discount: number
  rasioBahanBakar: string
}

export interface CarVariantRecommendation extends CarVariant {
  loanRank: string
  tenure: number
  dpAmount: number
  monthlyInstallment: number
}

export interface CityOtrOption {
  cityName: string
  cityCode: string
  province: string
  id?: string
}

export interface SpecialRateRequest {
  otr: number
  dp: number
  dpAmount: number
  monthlyIncome?: number
  age?: string
  city: string
  discount: number
  rateType?: string
  angsuranType?: InstallmentTypeOptions
  isFreeInsurance?: boolean
}

export interface CarVariantListPageUrlParams {
  brand: string
  model: string
  tab: string
}

export interface AlephArticleCategoryType {
  label: string
  url: string
  value: string
  testid?: string
}

export interface dpRateCollectionNewCalculatorTmp {
  dpRate: number
  dpCalc: number
}

export interface SimpleCarVariantDetail {
  modelId: string
  variantId: string
  loanTenure: number
  loanDownPayment: number
  loanMonthlyInstallment: number
  loanRank: string
  totalFirstPayment?: number
  angsuranType?: string
  rateType?: string
  flatRate?: number
}

export interface FormLCState {
  city: CityOtrOption
  model:
    | {
        modelId: string
        modelName: string
        modelImage: string
        brandName: string
      }
    | undefined
  variant:
    | {
        variantId: string
        variantName: string
        otr: string
        discount: number
      }
    | undefined
  promoCode: string
  isValidPromoCode: boolean
  age: string
  monthlyIncome: string
  downPaymentAmount: string
  paymentOption: InstallmentTypeOptions
}

export interface CarModelBasicDetailsResponse extends CarModelBasicInfo {
  variants: CarVariant[]
  images: string[]
}

export interface CarModelDetailsResponse {
  id: string
  brand: string
  model: string
  modelWordpressTag?: string
  promoFlag: boolean
  variants: CarVariantRecommendation[]
  images: string[]
  length?: number
  width?: number
  height?: number
}

export interface MetaTagApiResponse {
  id: number
  attributes: {
    meta_title: string
    meta_description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    location_page3: string
  }
}

export interface CarModelBasicInfo {
  id: string
  brand: string
  model: string
  promoFlag: boolean
}

export interface CarModelBasicDetailsResponse extends CarModelBasicInfo {
  variants: CarVariant[]
  images: string[]
}

export type VideoOptionType = {
  UploadedBy: string
  PostedDate: string
  videoUrl: string
}

export type MainVideoResponseType = {
  id: number
  modelId: string
  link: string
  thumbnail: string
  isMain: boolean
  title: string
  accountName: string
  createdAt: string
  updatedAt: string
  listVideo: VideoOptionType[]
}

export interface Time {
  hours: string
  minutes: string
  seconds: string
}

export interface CarVariantRecommendation extends CarVariant {
  loanRank: string
  tenure: number
  dpAmount: number
  monthlyInstallment: number
}

export interface VariantDetail {
  id: string
  name: string
  priceValue: number
  fuelType: string
  transmission: string
  engineCapacity: number
  bodyType: string
  carSeats: number
  length: number
  pdfUrl: string
  images: string[]
  newFunnelMainColorImage: string
  description: {
    en: string
    id: string
  }
  discount: number
  rasioBahanBakar: string
}

export interface NewFunnelCarVariantDetails {
  modelDetail: CarModelBasicInfo
  variantDetail: VariantDetail
}

export interface CarVariantDetails extends NewFunnelCarVariantDetails {
  loanDetail: LoanDetail
}

export interface SpecialRateList {
  tenure: number
  interestRate: number
  dp: number
  dpAmount: number
  installment: number
  saveAmount: number
  loanRank: string
  totalFirstPayment: number
}

export interface SpecialRateListType {
  tenure: number
  interestRate: number
  dp: number
  dpAmount: number
  installment: number
  saveAmount: number
  loanRank: string
  totalFirstPayment: number
  totalFirstPaymentADDB: number
  totalFirstPaymentADDM: number
}

export interface FooterSEOAttributes {
  location_tag: string
  location_page2: string
  title_1: string
  Title_2: string
  Title_3: string
  content_1: string
  Content_2: string
  Content_3: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}
export interface ArticleCategoryType {
  name: string
  isSelected: boolean
  url: string
}

export interface AlephArticleCategoryType {
  label: string
  url: string
  value: string
  testid?: string
}

export type VideoReviewType = {
  brand: string
  Model: string
  MainVideoUrl: string
  listVideo: VideoOptionType[]
  UploadedBy: string
  PostedDate: string
}

export interface PreapprovalDataType {
  phoneNumber?: string
  occupation: string
  totalIncome: string
  province: string
  city: string
  zipCode: string
  email: string
}

export interface CarModelResponse {
  id: string
  brand: string
  model: string
  lowestAssetPrice: number
  highestAssetPrice: number
  // brandAndModel: String
  image: string
  loanRank: string
  // modelAndBrand: String
  numberOfPopulation: number
  // variants: CarVariantRecommendation[]
}

export interface BannerHomepageType {
  name: string
  attribute: {
    web_desktop: string
    web_mobile: string
    native: string
    thumbnail: {
      web_desktop: string
      web_mobile: string
      native: string
    }
  }
  slot: string
  url: string
  creativeContext: string | null
}

export type IconThumbnail = {
  thumbnail: {
    name: string
  }
}

export type IconImage = {
  url: string
  formats: IconThumbnail
}

export interface USPAttributes {
  head_title: string
  icon_1: {
    data: {
      attributes: IconImage
    }
  }
  icon_2: {
    data: {
      attributes: IconImage
    }
  }
  icon_3: {
    data: {
      attributes: IconImage
    }
  }
  subtitle_1: string
  subtitle_2: string
  subtitle_3: string
  title_1: string
  title_2: string
  title_3: string
}

export type CarSuggestions = {
  id: number
  model: string
  variant_name: string
  variant_title: string
  price_currency: number
  price_value: number
  price_formatted_value: number
}

export type COMDataModel = {
  id: number
  modelId: string
  url: string
  startDate: string
  data: {
    folder: string
    image: string
    thumbnail: {
      image: string
    }
  }
  description: string
  modifiedBy: number
  status: boolean
  createdAt: string
  updatedAt: string
  isArchived: boolean
  variantId: string
  carModel: {
    id: string
    brand: string
    model: string
    imageUrls: {
      main_color: string[]
      colors: string[]
      gallery: string[]
      brochure: string[]
      new_funnel_main_color: string[]
    }
    promoFlag: boolean | null
    productCode: string | null
    status: boolean
    otrStatus: null
    modelWordpressTag: string
  }
  carCatalog: {
    id: number
    make: string
    model: string
    base_product: string
    body_type: string
    variant_name: string
    body_type_url: string
    code: string
    colour_name: string | null
    description_bahasa: string
    description_english: string
    engine_capacity: number
    price_currency: string
    price_formatted_value: string
    price_value: number
    seat: number
    variant_title: string
    transmission: string
    seva_url: string
    length: number
    width: number
    height: number
    fuel_type: string
    model_id: string
    variant_id: string
    discount: number
    price_value_sby: number | null
    price_formatted_value_sby: string | null
    status: boolean
  }
  priceValueJkt: number
  price: number | null
}

export type COMData = {
  id: number
  brand: string
  order: number
  status: boolean
  model?: COMDataModel
}

export interface TestimonialData {
  pictureName: string
  pictureUrl: string
  detail: string
  rating: number
  name: string
  age?: number
  cityName: string
  purchaseDate: string
  displayNumber: number
}

export interface ArticleData {
  title: string
  excerpt: string
  publish_date: string
  writer_name: string
  writer_initial: string
  category: string
  category_link: string
  url: string
  featured_image: string
}

export interface NavbarItemResponse {
  id: number
  menuName: string
  menuDesc: string
  menuCode: string
  menuParent: string
  menuUrl: string
  menuLevel: number
  status: boolean
  toggleNew: boolean
  subMenu: NavbarItemResponse[]
}
