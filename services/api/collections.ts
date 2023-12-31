import getCurrentEnvironment from 'helpers/environments'
import urls from 'utils/helpers/url'
import { temanSevaUrlPath } from 'utils/types/props'
const baseUrl = getCurrentEnvironment.apiBaseUrl
const baseUrlTemanSeva = getCurrentEnvironment.temanSevaApiBaseUrl

const utils = {
  menu: `${baseUrl}/menu`,
  cities: `${baseUrl}/city/fe-selector`,
  testimonials: `${baseUrl}/testimonials`,
  usage: `https://api.sslpots.com/api/how-to-use-seva-config?populate=*`,
  banner: `${baseUrl}/banner-image/homepage`,
  announcementBox: `${baseUrl}/announcement-box`,
  mobileHeaderMenu: `${baseUrl}/menu/mobile-web-top-menu`,
  mobileFooterMenu: `${baseUrl}/menu/mobile-web-bottom-menu`,
  search: `${baseUrl}/cars/search-bar`,
  metaTag:
    'https://api.sslpots.com/api/meta-seos/?filters[master_model][model_code][$contains]=',
  supportedBrowser: `${baseUrl}/web-browser/check`,
  incomeList: `${baseUrl}/recommendations/get-income-list`,
  checkPromoCodeGias: `${baseUrl}/promo-code/status`,
  probe: 'https://probe.addpush.com/d/sub/',
  checkReferralCode: temanSevaUrlPath.checkRefCode,
  checkNIKAvailable: `${baseUrl}/customers/check-ktp-availability`,
  salesAgent: `${baseUrl}/salesman/tso-dso`,
}

const product = {
  recommendation: `${baseUrl}/recommendations/new-funnel`,
  cityRecommendation: `${baseUrl}/recommendations/get-city-by-model-name`,
  variant: `${baseUrl}/variants`,
  type: `${baseUrl}/cars/body-type-data`,
  carofTheMonth: `${baseUrl}/car-of-the-month`,
  pricing: `${baseUrl}/recommendations/get-price-min-max-by-city`,
  modelDetails: baseUrl + '/models/:id',
  variantDetails: baseUrl + '/variants/:id',
  carVideoReview: baseUrl + '/car-video-review',
}

const usedCar = {
  usedCars: `${baseUrl}/used-car`,
  uuid: `${baseUrl}/used-car/details/:uuid`,
  cityList: `${baseUrl}/used-car/city-list`,
  pricing: `${baseUrl}/used-car/get-price-car-min-max-by-city`,
  years: `${baseUrl}/used-car/get-years-car-min-max-by-city`,
  mileage: `${baseUrl}/used-car/get-mileage-car-min-max-by-city`,
  brandList: `${baseUrl}/used-car/get-list-brand`,
  usedCarsLeads: `${baseUrl}/used-car/submit-leads`,
  modelUsedCar: `${baseUrl}/used-car/get-model`,
  usedRecommendations: `${baseUrl}/used-car/used-car-recommendations`,
  usedNewCarRecommendations: `${baseUrl}/used-car/new-car-recommendations`,
  getCarCreditsSk: `${baseUrl}/used-car/get-car-credits-sk`,
}

const leads = {
  unverifiedLeadNew: `${baseUrl}/unverifiedLeads/new`,
  customerAssistantDetails: `${baseUrl}/unverifiedLeads/csaDetails`,
  paIaInfo: `${baseUrl}${urls.internalUrls.paaIAInfo}`,
}

const omnicom = {
  check: `${baseUrl}/omnicom/check/:id`,
  updateLeads: `${baseUrl}/omnicom`,
  updateLeadsCM: `${baseUrl}/omnicom/cm`,
}

const auth = {
  user: `${baseUrl}/customers/info`,
  refresh: `${baseUrl}/auth/token`,
  otp: `${baseUrl}/auth/otp`,
  otpVerification: `${baseUrl}/auth/verification`,
  checkRegistered: `${baseUrl}${urls.internalUrls.checkRegistered}`,
  createCustomer: `${baseUrl}${urls.internalUrls.createCustomerSeva}`,
}

const loanCalculator = {
  specialRate: `${baseUrl}/loan-calculator/calculate`,
  insurance: `${baseUrl}/loan-calculator-v2/insurance/:modelId/:cityCode/:tenure`,
  loanPermutationIncludePromo: `${baseUrl}/loan-calculator-v2/calculate-included-promo`,
  loanPermutationAsuransiKombinasi: `${baseUrl}/loan-calculator-v2/calculate-asuransi-kombinasi`,
  finalDpValidation: `${baseUrl}/loan-calculator-v2/final-dp-validation/:variantId/:cityCode`,
}

const article = {
  mainArticle: `https://seva.id/wp-json/foodicious/latest-posts/`,
  subArticle: `https://seva.id/wp-json/seva/latest-posts/`,
}

const upload = {
  file: `${baseUrl}/customers/me/loan-documents`,
  ktpFile: `${baseUrl}/customers/ocr-ktp-new`,
  fileNew: `${baseUrl}/customers/me/loan-documents/new`,
}

const creditQualification = {
  single: `${baseUrl}/kualifikasi-kredit`,
  multi: `${baseUrl}/kualifikasi-kredit/multi`,
  instantApproval: `${baseUrl}/kualifikasi-kredit/ia`,
}

const ktp = {
  customer: `${baseUrl}/customers/get-ktp-existing`,
  customerSpouse: `${baseUrl}/customers/get-ktp-spouse-existing`,
  saveKtp: `${baseUrl}/customers/submit-ktp-new`,
  saveKtpSpouse: `${baseUrl}/customers/submit-ktp-spouse-only`,
}

const profile = {
  deleteAccount: `${baseUrl}/api/v1/archive-customer`,
  updateProfile: `${baseUrl}/customers/update-profile`,
}

const temanSeva = {
  checkTemanSeva: `${baseUrlTemanSeva}/auth/is-teman-seva`,
}

const refinancing = {
  refinancingCarsBrand: `${baseUrl}/refinancing-car/brand`,
  refinancingCarsModel: `${baseUrl}/refinancing-car/models/:model`,
  refinancingCarsYear: `${baseUrl}/refinancing-car/years`,
  refinancingSecondLeadsForm: `${baseUrl}/refinancing/product-choice`,
  sendRefiContact: `${baseUrl}/refinancing/contact`,
  sendRefiQuestion: `${baseUrl}/refinancing/question`,
}

export const collections = {
  utils,
  product,
  article,
  auth,
  leads,
  loanCalculator,
  upload,
  creditQualification,
  ktp,
  profile,
  omnicom,
  usedCar,
  temanSeva,
  refinancing,
}
