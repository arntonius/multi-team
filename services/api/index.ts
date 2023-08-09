import get from './get'
import post from './post'
import { collections } from './collections'
import { AxiosRequestConfig } from 'axios'
import { SpecialRateRequest } from 'utils/types/utils'
import { CreateProbeTrackRequest } from 'services/probe'
// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// import { getLocalStorage } from 'utils/handler/localStorage'
// import { UTMTagsData } from 'utils/types/props'
// import { LocalStorageKey } from 'utils/types/models'

// const getDataToken = () => {
//   const dataToken = localStorage.getItem('token')
//   const token = dataToken !== null ? JSON.parse(dataToken) : null
//   return token
// }

// const setDataToken = (payload: any) => {
//   localStorage.setItem('token', JSON.stringify(payload))
// }

// const requestNewToken = async (payload: any) => {
//   try {
//     const res = await api.postRefreshToken({ refreshToken: payload })
//     return res
//   } catch (error) {
//     throw error
//   }
// }

// axios.interceptors.response.use(
//   (res) => {
//     return res
//   },
//   async (err) => {
//     const originalConfig = err.config
//     const statusCode = err.response.status
//     const dataToken = getDataToken()

//     if (statusCode === 400)
//       window.location.href = 'https://www.seva.id/masuk-akun'
//     else if (statusCode === 401) {
//       const userToken: any = await requestNewToken(dataToken.refreshToken)
//       setDataToken(userToken)
//       originalConfig._retry = true
//       originalConfig.headers.Authorization = userToken.idToken
//       return axios(originalConfig)
//     }
//     return Promise.reject(err)
//   },
// )

const getConfigToken = () => {
  const dataToken = localStorage.getItem('token')
  const userToken = dataToken !== null ? JSON.parse(dataToken).idToken : null
  const config = {
    headers: { Authorization: userToken },
  }
  return config
}

// get request
const getMenu = () => get(collections.utils.menu)
const getCities = () => get(collections.utils.cities)
const getTestimony = () => get(collections.utils.testimonials)
const getRecommendation = (params?: string, config?: AxiosRequestConfig) =>
  get(collections.product.recommendation + params, config)
const getUsage = () => get(collections.utils.usage)
const getMetaTagData = (carModel: string) =>
  get(collections.utils.metaTag + carModel)
const getMainArticle = (params: string) =>
  get(collections.article.mainArticle + params, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
const getSubArticle = (params: number) =>
  get(collections.article.subArticle + params)
const getCarModelDetails = (
  id: string,
  params: string,
  config?: AxiosRequestConfig,
) => get(collections.product.modelDetails.replace(':id', id) + params, config)
const getCarVariantDetails = (
  id: string,
  params: string,
  config?: AxiosRequestConfig,
) => get(collections.product.variantDetails.replace(':id', id) + params, config)
const getVariantCar = (params?: string, config?: AxiosRequestConfig) =>
  get(collections.product.variant + params, config)
const getTypeCar = (params: string, config?: AxiosRequestConfig) =>
  get(collections.product.type + params, config)
const getBanner = () => get(collections.utils.banner)
const getCarofTheMonth = () => get(collections.product.carofTheMonth)
const getCarVideoReview = () => get(collections.product.carVideoReview)
const getAnnouncementBox = (config: AxiosRequestConfig) =>
  get(collections.utils.announcementBox, config)
const getUserInfo = () => get(collections.auth.user, getConfigToken())
const getSupportedBrowsers = () => get(collections.utils.supportedBrowser)
const getMobileFooterMenu = () => get(collections.utils.mobileFooterMenu)
const getMobileHeaderMenu = () => get(collections.utils.mobileHeaderMenu)
const getMinMaxPrice = (params: string, config?: AxiosRequestConfig) =>
  get(collections.product.pricing + params, config)
const getSearchDataQuery = (params: string, config?: AxiosRequestConfig) =>
  get(collections.utils.search + params, config)
const getIncomeList = () => get(collections.utils.incomeList)

// post request
const postUnverifiedLeadsNew = (body: any) =>
  post(collections.leads.unverifiedLeadNew, body)
const postRefreshToken = (body: any) => post(collections.auth.refresh, body)
const postSendSMSGeneration = (recaptchaToken: string, phoneNumber: string) =>
  post(collections.auth.otp, { recaptchaToken, phoneNumber })
const postVerifyOTPGeneration = (otpCode: string, phoneNumber: string) =>
  post(collections.auth.otpVerification, { otpCode, phoneNumber })
const postNewFunnelLoanSpecialRate = (
  body: SpecialRateRequest,
  config: AxiosRequestConfig,
) => post(collections.loanCalculator.specialRate, body, config)
const postNewFunnelCityRecommendations = (
  body: {
    modelName: string
    city: string
  },
  config?: AxiosRequestConfig,
) => post(collections.product.cityRecommendation, body, config)
const postCustomerAssistantDetails = (phoneNumber: string) =>
  post(collections.leads.customerAssistantDetails, { phoneNumber })
const postCheckPromoGiias = (promoCode: string) =>
  post(collections.utils.checkPromoCodeGias, { promoCode })
const postProbeTrack = (body: CreateProbeTrackRequest) =>
  post(collections.utils.probe, { body })

export const api = {
  getMenu,
  getCities,
  getTestimony,
  getRecommendation,
  getUsage,
  getMetaTagData,
  getMainArticle,
  getSubArticle,
  getCarModelDetails,
  getCarVariantDetails,
  getVariantCar,
  getTypeCar,
  getBanner,
  getCarofTheMonth,
  getCarVideoReview,
  getAnnouncementBox,
  getUserInfo,
  getMobileFooterMenu,
  getMobileHeaderMenu,
  getMinMaxPrice,
  getSearchDataQuery,
  getSupportedBrowsers,
  getIncomeList,

  postUnverifiedLeadsNew,
  postRefreshToken,
  postSendSMSGeneration,
  postVerifyOTPGeneration,
  postNewFunnelLoanSpecialRate,
  postNewFunnelCityRecommendations,
  postCustomerAssistantDetails,
  postCheckPromoGiias,
  postProbeTrack,
}
