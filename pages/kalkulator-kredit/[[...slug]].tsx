import clsx from 'clsx'
import { Button, IconLoading } from 'components/atoms'
import styles from 'styles/pages/loanCalculator.module.scss'
import {
  CitySelectorModal,
  FooterMobile,
  FormPromoCode,
  FormSelectCity,
  FormSelectModelCar,
} from 'components/molecules'
import { FormAgeCredit } from 'components/molecules/credit/age'
import { CicilOptionForm } from 'components/molecules/credit/cicil'
import DpForm from 'components/molecules/credit/dp'
import IncomeForm from 'components/molecules/credit/income'
import {
  FormSelectCarVariant,
  variantEmptyValue,
} from 'components/molecules/form/formSelectCarVariant'
import { HeaderMobile } from 'components/organisms'
import { CalculationResultEmpty } from 'components/organisms/calculationResultEmpty'
import elementId from 'helpers/elementIds'
import { MoengageEventName, setTrackEventMoEngage } from 'helpers/moengage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useCar } from 'services/context/carContext'
import { useFinancialQueryData } from 'services/context/finnancialQueryContext'
import { useFunnelQueryData } from 'services/context/funnelQueryContext'
import { getToken } from 'utils/handler/auth'
import { LanguageCode, LocalStorageKey, SessionStorageKey } from 'utils/enum'
import {
  formatNumberByLocalization,
  replacePriceSeparatorByLocalization,
} from 'utils/handler/rupiah'
import { loanCalculatorDefaultUrl } from 'utils/helpers/routes'
import { defaultCity, getCity, saveCity } from 'utils/hooks/useGetCity'
import { useLocalStorage } from 'utils/hooks/useLocalStorage'
import { useSessionStorageWithEncryption } from 'utils/hooks/useSessionStorage/useSessionStorage'
import {
  generateAllBestPromoList,
  getInstallmentAffectedByPromo,
  getInterestRateAffectedByPromo,
  getTdpAffectedByPromo,
} from 'utils/loanCalculatorUtils'
import { getLocalStorage, saveLocalStorage } from 'utils/handler/localStorage'
import { formatPriceNumberThousandDivisor } from 'utils/numberUtils/numberUtils'
import {
  getSessionStorage,
  removeSessionStorage,
  saveSessionStorage,
} from 'utils/handler/sessionStorage'
import {
  capitalizeFirstLetter,
  capitalizeWords,
  removeFirstWordFromString,
} from 'utils/stringUtils'
import { CityOtrOption } from 'utils/types'
import { CarModel } from 'utils/types/carModel'
import { ModelVariant } from 'utils/types/carVariant'
import {
  AnnouncementBoxDataType,
  CarRecommendation,
  FinalLoan,
  trackDataCarType,
} from 'utils/types/utils'
import {
  Article,
  LoanCalculatorIncludePromoPayloadType,
  LoanCalculatorInsuranceAndPromoType,
  Option,
  SimpleCarVariantDetail,
  SpecialRateListWithPromoType,
} from 'utils/types/utils'
import { InstallmentTypeOptions, LoanRank } from 'utils/types/models'
import { ButtonVersion, ButtonSize } from 'components/atoms/button'
import Seo from 'components/atoms/seo'
import { client, defaultSeoImage } from 'utils/helpers/const'
import {
  trackEventCountly,
  valueForInitialPageProperty,
  valueForUserTypeProperty,
  valueMenuTabCategory,
} from 'helpers/countly/countly'
import { CountlyEventNames } from 'helpers/countly/eventNames'
import { removeCarBrand } from 'utils/handler/removeCarBrand'
import dynamic from 'next/dynamic'
import { getCustomerInfoSeva } from 'utils/handler/customer'
import { getCustomerAssistantWhatsAppNumber } from 'utils/handler/lead'
import { getCarModelDetailsById } from 'utils/handler/carRecommendation'
import { getNewFunnelRecommendations } from 'utils/handler/funnel'
import { useAfterInteractive } from 'utils/hooks/useAfterInteractive'
import { Currency } from 'utils/handler/calculation'
import { useUtils } from 'services/context/utilsContext'
import { useAnnouncementBoxContext } from 'services/context/announcementBoxContext'
import {
  getCities,
  postCheckPromoGiias,
  getRecommendation,
  getLoanCalculatorInsurance,
  getFinalDpRangeValidation,
  getMenu,
  getMobileHeaderMenu,
  getMobileFooterMenu,
  getAnnouncementBox as gab,
  postLoanPermutationIncludePromo,
} from 'services/api'

const CalculationResult = dynamic(() =>
  import('components/organisms').then((mod) => mod.CalculationResult),
)
const CarRecommendations = dynamic(
  () => import('components/organisms/carRecomendations'),
)
const CreditCualificationBenefit = dynamic(
  () => import('components/organisms/CreditCualificationBenefit'),
)
const Articles = dynamic(() =>
  import('components/organisms').then((mod) => mod.Articles),
)
const QualificationCreditModal = dynamic(() =>
  import('components/molecules/qualificationCreditModal').then(
    (mod) => mod.QualificationCreditModal,
  ),
)
const Toast = dynamic(() => import('components/atoms').then((mod) => mod.Toast))
const PopupResultRecommended = dynamic(() =>
  import('components/organisms/popupResultFilter/resultRecommended').then(
    (mod) => mod.PopupResultRecommended,
  ),
)

const CarSillhouete = '/revamp/illustration/car-sillhouete.webp'

export interface FormLCState {
  city: CityOtrOption
  model:
    | {
        modelId: string
        modelName: string
        modelImage: string
        brandName: string
        loanRank: string
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
  leasingOption?: string
}

export const getSlug = (query: any, index: number) => {
  return (
    query.slug && query.slug.length > index && (query.slug[index] as string)
  )
}

export default function LoanCalculatorPage() {
  const router = useRouter()
  const cityName = getSlug(router.query, 0)
  const brand = getSlug(router.query, 1)
  const model = getSlug(router.query, 2)
  const variant = getSlug(router.query, 3)
  const loanRankcr = router.query.loanRankCVL ?? ''
  const { financialQuery, patchFinancialQuery } = useFinancialQueryData()
  const [isActive, setIsActive] = useState(false)
  const [isHasCarParameter] = useState(
    !!cityName || !!brand || !!model || !!variant,
  )
  const { funnelQuery, patchFunnelQuery } = useFunnelQueryData()
  const [carRecommendations, setCarRecommendations] = useState<
    CarRecommendation[]
  >([])
  const [isOpenCitySelectorModal, setIsOpenCitySelectorModal] = useState(false)
  const [cityListApi, setCityListApi] = useState<Array<CityOtrOption>>([])
  const [cityOtr] = useLocalStorage<CityOtrOption | null>(
    LocalStorageKey.CityOtr,
    null,
  )
  const [calculationResult, setCalculationResult] = useState([])
  const [isDisableCtaCalculate, setIsDisableCtaCalculate] = useState(true)
  const [isValidatingEmptyField, setIsValidatingEmptyField] = useState(false)
  const [isLoadingCalculation, setIsLoadingCalculation] = useState(false)
  const [, setPromoCodeSessionStorage] =
    useSessionStorageWithEncryption<string>(
      SessionStorageKey.PromoCodeGiiass,
      '',
    )
  const [isLoadingPromoCode, setIsLoadingPromoCode] = useState(false)
  const [isErrorPromoCode, setIsErrorPromoCode] = useState(false)
  const [isSuccessPromoCode, setisSuccessPromoCode] = useState(false)
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)
  const [allModelCarList, setAllModalCarList] = useState<CarModel[]>([])
  const [carVariantList, setCarVariantList] = useState<ModelVariant[]>([])
  const [storedFilter] = useLocalStorage<null>(
    LocalStorageKey.FinancialData,
    null,
  )
  const [modelError, setModelError] = useState<boolean>(false)
  const [isIncomeTooLow, setIsIncomeTooLow] = useState(false)
  const [selectedLoan, setSelectedLoan] =
    useState<SpecialRateListWithPromoType | null>(null)
  const [, setSimpleCarVariantDetails] =
    useLocalStorage<SimpleCarVariantDetail | null>(
      LocalStorageKey.SimpleCarVariantDetails,
      null,
    )
  const [isDpTooLow, setIsDpTooLow] = useState<boolean>(false)
  const [isDpExceedLimit, setIsDpExceedLimit] = useState<boolean>(false)
  const { carVariantDetails, recommendation } = useCar()
  const [insuranceAndPromoForAllTenure, setInsuranceAndPromoForAllTenure] =
    useState<LoanCalculatorInsuranceAndPromoType[]>([])
  const [isLoadingInsuranceAndPromo, setIsLoadingInsuranceAndPromo] =
    useState(false)
  const kkForm: FormLCState | null = getSessionStorage(
    SessionStorageKey.KalkulatorKreditForm,
  )
  const [isUserChooseVariantDropdown, setIsUserChooseVariantDropdown] =
    useState(false)
  const [isSelectPassengerCar, setIsSelectPassengerCar] = useState(false)
  const [calculationApiPayload, setCalculationApiPayload] =
    useState<LoanCalculatorIncludePromoPayloadType>()
  const [isOpenToast, setIsOpenToast] = useState(false)
  const [toastMessage, setToastMessage] = useState(
    'Mohon maaf, terjadi kendala jaringan silahkan coba kembali lagi',
  )
  const [isSentCountlyPageView, setIsSentCountlyPageView] = useState(false)

  const [isUserHasReffcode, setIsUserHasReffcode] = useState(false)
  const [finalLoan, setFinalLoan] = useState<FinalLoan>({
    selectedInsurance: {},
    selectedPromoFinal: [],
    tppFinal: 0,
    tdpBeforePromo: 0,
    installmentFinal: 0,
    interestRateFinal: 0,
    interestRateBeforePromo: 0,
    installmentBeforePromo: 0,
  })
  const filterStorage: any = getLocalStorage(LocalStorageKey.CarFilter)

  const isUsingFilterFinancial =
    !!filterStorage?.age &&
    !!filterStorage?.downPaymentAmount &&
    !!filterStorage?.monthlyIncome &&
    !!filterStorage?.tenure

  const referralCodeFromUrl: string | null = getLocalStorage(
    LocalStorageKey.referralTemanSeva,
  )
  const IsShowBadgeCreditOpportunity = getSessionStorage(
    SessionStorageKey.IsShowBadgeCreditOpportunity,
  )
  const dataCar: trackDataCarType | null = getSessionStorage(
    SessionStorageKey.PreviousCarDataBeforeLogin,
  )
  const {
    saveMobileWebTopMenus,
    saveCities,
    saveDesktopWebTopMenu,
    saveMobileWebFooterMenus,
    saveDataAnnouncementBox,
    dataAnnouncementBox,
  } = useUtils()
  const [finalMinInputDp, setFinalMinInputDp] = useState(0)
  const [finalMaxInputDp, setFinalMaxInputDp] = useState(0)
  const [isOpenPopupRecommended, setIsOpenPopupRecommended] = useState(false)

  const getAutofilledCityData = () => {
    // related to logic inside component "FormSelectCity"
    if (cityOtr) {
      return cityOtr
    } else if (isHasCarParameter) {
      return defaultCity
    } else {
      return null
    }
  }

  const getAutofilledDownPayment = () => {
    if (kkForm?.downPaymentAmount) {
      return kkForm?.downPaymentAmount.toString()
    } else if (storedFilter?.downPaymentAmount) {
      return storedFilter?.downPaymentAmount.toString()
    } else {
      return ''
    }
  }

  const [forms, setForms] = useState<FormLCState>({
    city: getAutofilledCityData(),
    model: {
      brandName: brand ? capitalizeFirstLetter(brand) : '',
      modelName: '',
      modelId: '',
      modelImage: CarSillhouete as unknown as string,
      loanRank: '',
    },
    variant: {
      variantId: '',
      variantName: '',
      otr: '',
      discount: 0,
    },
    promoCode: kkForm?.promoCode ? kkForm?.promoCode : '',
    age: (storedFilter?.age && storedFilter?.age.toString()) || '',
    monthlyIncome:
      (storedFilter?.monthlyIncome && storedFilter?.monthlyIncome.toString()) ||
      '',
    downPaymentAmount: getAutofilledDownPayment(),
    paymentOption: kkForm?.paymentOption
      ? kkForm?.paymentOption
      : InstallmentTypeOptions.ADDB,
    isValidPromoCode: true,
  })

  const { showAnnouncementBox, saveShowAnnouncementBox } =
    useAnnouncementBoxContext()
  const [articles, setArticles] = useState<Article[]>([])

  const fetchArticles = async () => {
    const response = await fetch(
      'https://www.seva.id/wp-json/foodicious/latest-posts/65',
    )
    const responseData = await response.json()
    setArticles(responseData)
  }

  const checkCitiesData = () => {
    if (cityListApi.length === 0) {
      getCities().then((res) => {
        setCityListApi(res)
      })
    }
  }

  const getAnnouncementBox = async () => {
    try {
      const res: any = await gab({
        headers: {
          'is-login': getToken() ? 'true' : 'false',
        },
      })
      saveDataAnnouncementBox(res.data)
    } catch (error) {}
  }

  const checkPromoCode = async () => {
    if (!forms.promoCode) {
      setPromoCodeSessionStorage('')
      handlePromoCodeValidResult(true)
      return true
    }

    try {
      setIsLoadingPromoCode(true)
      const result: any = await postCheckPromoGiias(forms.promoCode)
      setIsLoadingPromoCode(false)

      if (result.message === 'valid promo code') {
        if (result.citySelector) {
          const citygias = {
            cityName: result.citySelector.cityName,
            cityCode: result.citySelector.cityCode,
            province: result.citySelector.province,
          }
          saveCity(citygias)
        }
        setIsErrorPromoCode(false)
        setisSuccessPromoCode(true)
        setPromoCodeSessionStorage(forms.promoCode)
        handlePromoCodeValidResult(true)
        return true
      }
      setIsErrorPromoCode(true)
      setisSuccessPromoCode(false)
      handlePromoCodeValidResult(false)
      return false
    } catch (err: any) {
      setIsLoadingPromoCode(false)
      setIsErrorPromoCode(true)
      setisSuccessPromoCode(false)
      handlePromoCodeValidResult(false)
      return false
    }
  }

  const resetPromoCodeStatus = () => {
    setIsLoadingPromoCode(false)
    setIsErrorPromoCode(false)
    setisSuccessPromoCode(false)
  }

  const trackMoengage = () => {
    const objData = {
      brand: brand ? capitalizeFirstLetter(brand) : '',
      model: model ? capitalizeFirstLetter(model.replaceAll('-', ' ')) : '',
      variants: variant
        ? variant
            .toUpperCase()
            .replaceAll('-', ' ')
            .replaceAll(' AT ', ' A/T ')
            .replaceAll(' MT ', ' M/T ')
        : '',
      down_payment:
        storedFilter && storedFilter?.downPaymentAmount?.length > 0
          ? formatPriceNumberThousandDivisor(
              Number(storedFilter?.downPaymentAmount),
              LanguageCode.id,
            )
          : '',
      income:
        storedFilter && storedFilter?.monthlyIncome?.length > 0
          ? formatPriceNumberThousandDivisor(
              Number(storedFilter?.monthlyIncome),
              LanguageCode.id,
            )
          : '',
      age:
        storedFilter && storedFilter?.age?.length > 0 ? storedFilter?.age : '',
      city: cityOtr?.cityName || '',
    }
    setTrackEventMoEngage(
      MoengageEventName.view_regular_calculator_page,
      objData,
    )
  }
  const fetchAllCarModels = async () => {
    const params = new URLSearchParams()
    params.append('cityId', defaultCity.id as string)
    params.append('city', defaultCity.cityCode as string)

    const response = await getRecommendation('', { params })

    setAllModalCarList(response.carRecommendations)
  }

  const fetchCarVariant = async () => {
    const response = await getCarModelDetailsById(forms.model?.modelId ?? '')
    setCarVariantList(response.variants)
    setIsSelectPassengerCar(response.isPassengerCar)
  }

  const autofillCarModelData = () => {
    if (allModelCarList.length > 0) {
      const modelData = allModelCarList.filter(
        (item) => item.model.toLowerCase().replaceAll(/ +/g, '-') === model,
      )

      if (modelData.length !== 0) {
        setForms({
          ...forms,
          model: {
            brandName: modelData[0].brand,
            modelName: `${modelData[0].brand} ${modelData[0].model}`,
            modelId: modelData[0].id,
            modelImage: modelData[0].images[0],
            loanRank: modelData[0].loanRank,
          },
        })
      }
    }
  }

  const autofillCarVariantData = () => {
    if (!!forms.variant?.variantId) {
      const currentVariantWithUpdatedData = carVariantList.filter(
        (item) => item.id === forms.variant?.variantId,
      )

      if (currentVariantWithUpdatedData.length !== 0) {
        setForms({
          ...forms,
          variant: {
            variantId: currentVariantWithUpdatedData[0].id,
            variantName: currentVariantWithUpdatedData[0].name,
            otr: `Rp${formatPriceNumberThousandDivisor(
              currentVariantWithUpdatedData[0].priceValue,
              LanguageCode.id,
            )}`,
            discount: currentVariantWithUpdatedData[0].discount,
          },
        })
      }

      // no need to setForms again when update currently selected variant
      return
    }

    if (carVariantList.length > 0) {
      const variantData = carVariantList.filter(
        (item) =>
          item.name.toLowerCase().replaceAll(/ +/g, '-').replaceAll('/', '') ===
          variant,
      )

      if (variantData.length !== 0) {
        setForms({
          ...forms,
          variant: {
            variantId: variantData[0].id,
            variantName: variantData[0].name,
            otr: `Rp${formatPriceNumberThousandDivisor(
              variantData[0].priceValue,
              LanguageCode.id,
            )}`,
            discount: variantData[0].discount,
          },
        })
      }
    }
  }
  const checkReffcode = () => {
    if (referralCodeLocalStorage) {
      setIsUserHasReffcode(true)
    } else if (!!getToken()) {
      getCustomerInfoSeva().then((response) => {
        if (response[0].temanSevaTrxCode) {
          setIsUserHasReffcode(true)
        }
      })
    }
  }

  const getPageOriginationForCountlyTracker = () => {
    if (router.query.from === 'homepageKualifikasi') {
      return 'Loan Calculator (KK)'
    } else {
      return 'Loan Calculator (Reg)'
    }
  }

  const getCreditBadgeForCountlyTracker = () => {
    let creditBadge = 'Null'
    if (loanRankcr && loanRankcr.includes(LoanRank.Green)) {
      creditBadge = 'Mudah disetujui'
    } else if (loanRankcr && loanRankcr.includes(LoanRank.Red)) {
      creditBadge = 'Sulit disetujui'
    }

    return creditBadge
  }

  const trackCountlyPageView = async () => {
    const pageReferrer = getSessionStorage(SessionStorageKey.PageReferrerLC)
    const previousSourceSection = getSessionStorage(
      SessionStorageKey.PreviousSourceSectionLC,
    )
    const referralCodeFromUrl: string | null = getLocalStorage(
      LocalStorageKey.referralTemanSeva,
    )

    let temanSevaStatus = 'No'
    if (referralCodeFromUrl) {
      temanSevaStatus = 'Yes'
    } else if (!!getToken()) {
      const response = await getCustomerInfoSeva()
      if (response[0].temanSevaTrxCode) {
        temanSevaStatus = 'Yes'
      }
    }

    if (client && !!window?.Countly?.q) {
      trackEventCountly(CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_VIEW, {
        PAGE_ORIGINATION: getPageOriginationForCountlyTracker(),
        PAGE_REFERRER: pageReferrer ?? 'Null',
        PREVIOUS_SOURCE_SECTION: previousSourceSection ?? 'Null',
        FINCAP_FILTER_USAGE: isUsingFilterFinancial ? 'Yes' : 'No',
        PELUANG_KREDIT_BADGE: isUsingFilterFinancial
          ? getCreditBadgeForCountlyTracker()
          : 'Null',
        CAR_BRAND: brand ? capitalizeWords(brand.replaceAll('-', ' ')) : 'Null',
        CAR_MODEL: model ? capitalizeWords(model.replaceAll('-', ' ')) : 'Null',
        USER_TYPE: valueForUserTypeProperty(),
        INITIAL_PAGE: pageReferrer ? 'No' : valueForInitialPageProperty(),
        TEMAN_SEVA_STATUS: temanSevaStatus,
      })

      setIsSentCountlyPageView(true)
      removeSessionStorage(SessionStorageKey.PageReferrerLC)
      removeSessionStorage(SessionStorageKey.PreviousSourceSectionLC)
    }
  }

  useEffect(() => {
    trackMoengage()
    checkCitiesData()
    fetchAllCarModels()
    fetchArticles()
    getAnnouncementBox()
    fetchDataContext()
    const timeoutCountlyTracker = setTimeout(() => {
      if (!isSentCountlyPageView) {
        trackCountlyPageView()
      }
    }, 1000) // use timeout because countly tracker cant process multiple event triggered at the same time

    // mock validation
    // TODO : replace with the real one later
    const isCarNotAvailable = false
    if (isCarNotAvailable) {
      // use replace, so that user cant go back to error page
      router.replace(loanCalculatorDefaultUrl)
    }

    return () => clearTimeout(timeoutCountlyTracker)
  }, [])

  useEffect(() => {
    document.body.style.overflowY = isActive ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [isActive])

  useEffect(() => {
    if (
      !forms.city ||
      !forms.model?.modelId ||
      !forms.model?.modelName ||
      modelError ||
      !forms.variant?.variantId ||
      !forms.variant?.variantName ||
      !forms.monthlyIncome ||
      isIncomeTooLow ||
      parseInt(forms.monthlyIncome) < 3000000 ||
      !forms.downPaymentAmount ||
      isDpTooLow ||
      isDpExceedLimit ||
      !forms.age ||
      (!forms.isValidPromoCode && forms.promoCode.length > 0)
    ) {
      setIsDisableCtaCalculate(true)
      return
    } else {
      setIsDisableCtaCalculate(false)
    }
  }, [forms, isIncomeTooLow, modelError, isDpTooLow, isDpExceedLimit])

  useEffect(() => {
    autofillCarModelData()
  }, [allModelCarList])

  useEffect(() => {
    if (forms.model?.modelId && forms.city) {
      fetchCarVariant()
    }
  }, [forms.model?.modelId, forms.city])

  useEffect(() => {
    autofillCarVariantData()
    checkReffcode()
  }, [carVariantList])

  useAfterInteractive(() => {
    if (dataAnnouncementBox) {
      const isShowAnnouncement = getSessionStorage(
        getToken()
          ? SessionStorageKey.ShowWebAnnouncementLogin
          : SessionStorageKey.ShowWebAnnouncementNonLogin,
      )
      if (typeof isShowAnnouncement !== 'undefined') {
        saveShowAnnouncementBox(isShowAnnouncement as boolean)
      } else {
        saveShowAnnouncementBox(true)
      }
    } else {
      saveShowAnnouncementBox(false)
    }
  }, [dataAnnouncementBox])

  const AgeList: Option<string>[] = [
    {
      value: '18-27',
      label: '18-27',
    },
    {
      value: '28-34',
      label: '28-34',
    },
    {
      value: '35-50',
      label: '35-50',
    },
    {
      value: '>51',
      label: '>51',
    },
  ]

  const resetVariant = () => {
    // when using this func, make sure to not exec "setForms" again
    // because there will be discrepancy (set state is async)
    setForms({
      ...forms,
      variant: variantEmptyValue,
    })
  }

  const handleChange = (name: string, value: any) => {
    setIsDataSubmitted(false)

    if (name === 'city') {
      // check reset condition
      if (!value) {
        setForms({
          ...forms,
          [name]: value,
          model: {
            brandName: brand ? capitalizeFirstLetter(brand) : '',
            modelName: '',
            modelId: '',
            modelImage: CarSillhouete as unknown as string,
            loanRank: '',
          },
          variant: variantEmptyValue,
        })

        return
      }

      const isModelFound = allModelCarList.find(
        (model) => model.id === forms.model?.modelId,
      )

      if (!isModelFound) {
        setForms({
          ...forms,
          [name]: value,
          variant: variantEmptyValue,
        })
        // after set value & reset variant, no need to set value again
        return
      }
    }

    if (name === 'model') {
      setForms({
        ...forms,
        [name]: value,
        variant: variantEmptyValue,
      })
      // after set value & reset variant, no need to set value again
      return
    }

    if (name === 'variant') {
      setIsUserChooseVariantDropdown(true)
    }

    if (name === 'monthlyIncome') {
      setIsIncomeTooLow(false)
    }

    if (name === 'paymentOption') {
      trackEventCountly(
        CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_ANGSURAN_TYPE_CLICK,
        { ...dataForCountlyTrackerOnClick(), ANGSURAN_TYPE: value },
      )
    }

    setForms({
      ...forms,
      [name]: value,
    })
  }

  useEffect(() => {
    if (!forms?.city?.cityCode) {
      setForms({
        ...forms,
        variant: variantEmptyValue,
        model: {
          brandName: '',
          modelId: '',
          modelImage: '',
          modelName: '',
          loanRank: '',
        },
      })
    }
  }, [forms.city?.cityCode])

  const handleOnChangePromoCode = (value: string) => {
    setIsDataSubmitted(false)

    setForms({
      ...forms,
      promoCode: value,
    })
  }

  const handlePromoCodeValidResult = (value: boolean) => {
    setForms({
      ...forms,
      isValidPromoCode: value,
    })
  }

  const [dpValue, setDpValue] = useState<number>(0)
  const [dpPercentage, setDpPercentage] = useState<number>(20)
  const [mappedDpPercentage, setMappedDpPercentage] = useState<number>(20)

  const handleDpChange = (
    value: number,
    percentage: number,
    mappedPercentage: number,
  ) => {
    setDpValue(value)
    setDpPercentage(percentage)
    setMappedDpPercentage(mappedPercentage)
  }

  const handleDpPercentageChange = (
    value: number,
    percentage: number,
    mappedPercentage: number,
  ) => {
    setDpValue(value)
    setDpPercentage(percentage)
    setMappedDpPercentage(mappedPercentage)
  }

  const [installmentType, setInstallmentType] =
    useState<InstallmentTypeOptions>(InstallmentTypeOptions.ADDB)
  const handleInstallmentTypeChange = (
    name: InstallmentTypeOptions,
    value: boolean,
  ) => {
    if (value) {
      setInstallmentType(name)
    }
  }

  const referralCodeLocalStorage = getLocalStorage<string>(
    LocalStorageKey.referralTemanSeva,
  )

  const scrollToElement = (elementId: string) => {
    const target = document.getElementById(elementId)
    if (target) {
      target.scrollIntoView({ block: 'center' })
    }
  }

  const validateFormFields = () => {
    setIsValidatingEmptyField(true)
    if (!forms.city) {
      scrollToElement('loan-calculator-form-city')
    } else if (!forms.model?.modelId || !forms.model.modelName || modelError) {
      scrollToElement('loan-calculator-form-car-model')
    } else if (!forms.variant?.variantId || !forms.variant.variantName) {
      scrollToElement('loan-calculator-form-car-variant')
    } else if (!forms.monthlyIncome || isIncomeTooLow) {
      scrollToElement('loan-calculator-form-income')
    } else if (!forms.downPaymentAmount || isDpTooLow || isDpExceedLimit) {
      scrollToElement('loan-calculator-form-dp')
    } else if (!forms.paymentOption) {
      scrollToElement('loan-calculator-form-installment-type')
    } else if (!forms.age) {
      scrollToElement('loan-calculator-form-age')
    }
  }

  const getCarOtrNumber = () => {
    return Number(forms.variant?.otr.replace('Rp', '').replaceAll('.', ''))
  }

  const getCarDiscountNumber = () => {
    return Number(forms.variant?.discount ?? 0)
  }

  const scrollToResult = () => {
    const element = document.getElementById(
      'loan-calculator-form-and-result-separator',
    )
    if (element) {
      element.scrollIntoView()
    }
    if (!tooltipNextDisplay || isTooltipExpired()) {
      setIsTooltipOpen(true)
      trackCountlyOnShowTooltip()
      const nextDisplay = calculateNextDisplayDate().toString()
      setTooltipNextDisplay(nextDisplay)
      localStorage.setItem('tooltipNextDisplay', nextDisplay)
    }
  }

  const generateSelectedInsuranceAndPromo = async (
    calculationResultValue: SpecialRateListWithPromoType[],
  ) => {
    const allTenure = calculationResultValue.map((item) => item.tenure)
    const tempArr: LoanCalculatorInsuranceAndPromoType[] = []

    setIsLoadingInsuranceAndPromo(true)
    for (let i = 0; i < allTenure.length; i++) {
      const currentTenurePermutation = calculationResultValue.filter(
        (item) => item.tenure === allTenure[i],
      )

      const isAppliedSDD01Promo = currentTenurePermutation[0]?.promoArr.some(
        (a) => a.promoId === 'SDD01',
      )

      try {
        const responseInsurance = await getLoanCalculatorInsurance({
          modelId: forms.model?.modelId ?? '',
          cityCode: forms.city.cityCode,
          tenure: allTenure[i],
        })

        tempArr.push({
          tenure: allTenure[i],
          allInsuranceList: responseInsurance,
          selectedInsurance: responseInsurance.filter(
            (item: any) => item.value === 'FC',
          )[0],
          applied: currentTenurePermutation[0]?.applied,
          allPromoList: generateAllBestPromoList(
            isUserHasReffcode // check for reffcode to remove promo id CDS02
              ? currentTenurePermutation[0]?.promoArr.filter(
                  (a) => a.promoId !== 'CDS01' && a.promoId !== 'CDS02',
                )
              : currentTenurePermutation[0]?.promoArr.filter(
                  (a) => a.promoId !== 'CDS01',
                ),
          ),
          allPromoListOnlyFullComprehensive: generateAllBestPromoList(
            currentTenurePermutation[0]?.promoArr,
          ), // this API return promo list related to full comprehensive
          selectedPromo: generateAllBestPromoList(
            isUserHasReffcode
              ? currentTenurePermutation[0]?.promoArr.filter(
                  (a) => a.promoId !== 'CDS02',
                )
              : currentTenurePermutation[0]?.promoArr,
          ), // by default use all because it is FC insurance promo
          tdpBeforePromo: currentTenurePermutation[0]?.totalFirstPayment,
          tdpAfterPromo: getTdpAffectedByPromo(currentTenurePermutation[0]),
          tdpWithPromo: getTdpAffectedByPromo(currentTenurePermutation[0]),
          installmentBeforePromo: currentTenurePermutation[0]?.installment,
          installmentAfterPromo: getInstallmentAffectedByPromo(
            currentTenurePermutation[0],
          ),
          installmentWithPromo: getInstallmentAffectedByPromo(
            currentTenurePermutation[0],
          ),
          interestRateBeforePromo: currentTenurePermutation[0].interestRate,
          interestRateWithPromo: getInterestRateAffectedByPromo(
            currentTenurePermutation[0],
          ),
          interestRateAfterPromo: getInterestRateAffectedByPromo(
            currentTenurePermutation[0],
          ),
          subsidiDp: isAppliedSDD01Promo
            ? currentTenurePermutation[0]?.subsidiDp
            : 0,
          dpDiscount: currentTenurePermutation[0]?.dpDiscount,
        })
      } catch (error: any) {
        if (error?.response?.data?.message) {
          setToastMessage(`${error?.response?.data?.message}`)
        } else {
          setToastMessage(
            'Mohon maaf, terjadi kendala jaringan silahkan coba kembali lagi',
          )
        }
        setIsOpenToast(true)
      }
    }
    setIsLoadingInsuranceAndPromo(false)
    scrollToResult()
    setInsuranceAndPromoForAllTenure(tempArr)
    setTimeout(() => {
      trackCountlyResultView()
    }, 1000) // use timeout because countly tracker cant process multiple event triggered at the same time

    const selectedData =
      tempArr.sort(
        (
          a: LoanCalculatorInsuranceAndPromoType,
          b: LoanCalculatorInsuranceAndPromoType,
        ) => b.tenure - a.tenure,
      )[0] ?? null
    setFinalLoan({
      selectedInsurance: selectedData.selectedInsurance,
      selectedPromoFinal: selectedData.selectedPromo,
      tppFinal: selectedData.tdpAfterPromo,
      installmentFinal: selectedData.installmentAfterPromo,
      interestRateFinal: selectedData.interestRateAfterPromo,
      installmentBeforePromo: selectedData.installmentBeforePromo,
      interestRateBeforePromo: selectedData.interestRateBeforePromo,
      tdpBeforePromo: selectedData.tdpBeforePromo,
    })
  }

  const getFilteredCalculationResults = (calculationResult: any) => {
    const tempArr = calculationResult
    if (!isSelectPassengerCar) {
      const fiveYearIndex = tempArr.findIndex((item: any) => item.tenure == 5)
      if (fiveYearIndex !== -1) {
        tempArr.splice(fiveYearIndex, 1)
      }
    }

    return tempArr
  }

  const validateDpInputRange = async () => {
    if (!!forms.variant?.variantId && !!forms.city.cityCode) {
      try {
        const finalDpRange = await getFinalDpRangeValidation(
          forms.variant?.variantId,
          forms.city.cityCode,
        )

        if (finalDpRange?.minAmount !== 0 && finalDpRange?.maxAmount !== 0) {
          setFinalMinInputDp(finalDpRange?.minAmount)
          setFinalMaxInputDp(finalDpRange?.maxAmount)
          if (forms.downPaymentAmount < finalDpRange?.minAmount) {
            setIsDpTooLow(true)
            setIsDpExceedLimit(false)
            scrollToElement('loan-calculator-form-dp')
            return false
          } else if (forms.downPaymentAmount > finalDpRange?.maxAmount) {
            setIsDpTooLow(false)
            setIsDpExceedLimit(true)
            scrollToElement('loan-calculator-form-dp')
            return false
          } else {
            setIsDpTooLow(false)
            setIsDpExceedLimit(false)
            return true
          }
        } else {
          const minDp20Percent = getCarOtrNumber() * 0.2
          const maxDp90Percent = getCarOtrNumber() * 0.9
          setFinalMinInputDp(minDp20Percent)
          setFinalMaxInputDp(maxDp90Percent)
          if (
            parseInt(forms.downPaymentAmount) >= minDp20Percent &&
            parseInt(forms.downPaymentAmount) <= maxDp90Percent
          ) {
            setIsDpTooLow(false)
            setIsDpExceedLimit(false)
            return true
          } else if (parseInt(forms.downPaymentAmount) < minDp20Percent) {
            setIsDpTooLow(true)
            setIsDpExceedLimit(false)
            scrollToElement('loan-calculator-form-dp')
            return false
          } else if (parseInt(forms.downPaymentAmount) > maxDp90Percent) {
            setIsDpTooLow(false)
            setIsDpExceedLimit(true)
            scrollToElement('loan-calculator-form-dp')
            return false
          }
        }
      } catch {
        return false
      }
    } else {
      return false
    }
  }

  const onClickCalculate = async () => {
    validateFormFields()

    if (isDisableCtaCalculate) {
      return
    }

    setIsLoadingCalculation(true)

    const dpInputRangeValidity = await validateDpInputRange()
    if (!dpInputRangeValidity) {
      setIsLoadingCalculation(false)
      return
    }

    const promoCodeValidity = await checkPromoCode()
    if (!promoCodeValidity) {
      setIsLoadingCalculation(false)
      return
    }

    const dataFinancial = {
      ...financialQuery,
      downPaymentAmount: dpValue,
      age: forms.age ? String(forms.age) : financialQuery.age,
      monthlyIncome: forms.monthlyIncome
        ? forms.monthlyIncome
        : financialQuery.monthlyIncome,
    }
    patchFinancialQuery(dataFinancial)
    patchFunnelQuery({
      age: forms.age,
      monthlyIncome: forms.monthlyIncome,
      downPaymentAmount: forms.downPaymentAmount,
    })

    fetchCarRecommendations()

    const payload: LoanCalculatorIncludePromoPayloadType = {
      brand: forms.model?.brandName ?? '',
      model: removeFirstWordFromString(forms.model?.modelName ?? ''),
      age: forms.age,
      angsuranType: forms.paymentOption,
      city: forms.city.cityCode,
      discount: getCarDiscountNumber(),
      dp: mappedDpPercentage,
      dpAmount: dpValue,
      monthlyIncome: forms.monthlyIncome,
      otr: getCarOtrNumber() - getCarDiscountNumber(),
      variantId: forms.variant?.variantId,
    }

    postLoanPermutationIncludePromo(payload)
      .then((response) => {
        const result = response.data.reverse()
        const filteredResult = getFilteredCalculationResults(result)
        setCalculationResult(filteredResult)
        generateSelectedInsuranceAndPromo(filteredResult)
        trackCountlyResult(filteredResult)

        // select loan with the longest tenure as default
        const selectedLoanInitialValue =
          filteredResult.sort(
            (
              a: SpecialRateListWithPromoType,
              b: SpecialRateListWithPromoType,
            ) => b.tenure - a.tenure,
          )[0] ?? null
        setSelectedLoan(selectedLoanInitialValue)

        setIsDataSubmitted(true)
        setCalculationApiPayload(payload)
        // scrollToResult()
      })
      .catch((error: any) => {
        if (error?.response?.data?.message) {
          setToastMessage(`${error?.response?.data?.message}`)
        } else {
          setToastMessage(
            'Mohon maaf, terjadi kendala jaringan silahkan coba kembali lagi',
          )
        }
        setIsOpenToast(true)
      })
      .finally(() => {
        setIsLoadingCalculation(false)
      })
  }

  const renderErrorMessageEmpty = () => {
    return (
      <div className={`${styles.errorMessageWrapper} shake-animation-X`}>
        <span className={styles.errorMessage}>Wajib diisi</span>
      </div>
    )
  }

  const renderIncomeErrorMessage = () => {
    if (isIncomeTooLow) {
      return (
        <div className={`${styles.errorMessageWrapper}`}>
          <span className={styles.errorMessage}>
            Pendapatan yang kamu masukkan terlalu rendah
          </span>
        </div>
      )
    } else if (isValidatingEmptyField && !forms.monthlyIncome) {
      return renderErrorMessageEmpty()
    } else {
      return <></>
    }
  }

  // Logic tooltip displayed after 30 day
  const [isQualificationModalOpen, setIsQualificationModalOpen] =
    useState(false)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [tooltipNextDisplay, setTooltipNextDisplay] = useState<string | null>(
    null,
  )

  useEffect(() => {
    const nextDisplay = localStorage.getItem('tooltipNextDisplay')
    if (nextDisplay) {
      setTooltipNextDisplay(nextDisplay)
    }
  }, [])

  const handleClickButtonQualification = (
    loan: SpecialRateListWithPromoType,
  ) => {
    trackCountlyClickCheckQualification(loan)
    setIsQualificationModalOpen(true)

    const selectedPromoTenure = insuranceAndPromoForAllTenure.filter(
      (x) => x.tenure === loan.tenure,
    )

    const rateType =
      selectedPromoTenure[0].interestRateAfterPromo !== 0
        ? selectedPromoTenure[0].applied === 'totalBayarGiias'
          ? 'GIIAS2023'
          : selectedPromoTenure[0].applied === 'totalBayarSepkta'
          ? 'TOYOTASPEKTA01'
          : 'REGULAR'
        : 'REGULAR'

    saveLocalStorage(LocalStorageKey.SelectedRateType, rateType)
    saveLocalStorage(
      LocalStorageKey.SelectablePromo,
      JSON.stringify(selectedPromoTenure[0]),
    )

    const dataWithoutPromo = {
      ...selectedPromoTenure[0],
      selectedInsurance: finalLoan.selectedInsurance,
      selectedPromo: finalLoan.selectedPromoFinal,
      tdpAfterPromo: finalLoan.tppFinal,
      installmentAfterPromo: finalLoan.installmentFinal,
      interestRateAfterPromo: finalLoan.interestRateFinal,
      installmentBeforePromo: finalLoan.installmentBeforePromo,
      interestRateBeforePromo: finalLoan.interestRateBeforePromo,
      tdpBeforePromo: finalLoan.tdpBeforePromo,
    }

    if (
      finalLoan.tppFinal !== 0 &&
      finalLoan.selectedInsurance.value.includes('FC')
    ) {
      saveLocalStorage(
        LocalStorageKey.SelectablePromo,
        JSON.stringify(selectedPromoTenure[0]),
      )
    } else {
      saveLocalStorage(
        LocalStorageKey.SelectablePromo,
        JSON.stringify(dataWithoutPromo),
      )
    }

    const installment =
      finalLoan.installmentFinal !== 0
        ? finalLoan.installmentFinal
        : finalLoan.installmentBeforePromo

    const tpp =
      finalLoan.tppFinal !== 0 ? finalLoan.tppFinal : finalLoan.tdpBeforePromo

    const rate =
      finalLoan.interestRateFinal !== 0
        ? finalLoan.interestRateFinal
        : finalLoan.interestRateBeforePromo

    const moengageAttribute = {
      brand: forms.model?.brandName,
      model: forms.model?.modelName,
      price: forms.variant?.otr,
      variants: forms.variant?.variantName,
      montly_instalment: selectedLoan?.installment.toString(),
      downpayment: selectedLoan?.dpAmount.toString(),
      loan_tenure: selectedLoan?.tenure.toString(),
      car_seat: carVariantDetails?.variantDetail.carSeats.toString(),
      fuel: carVariantDetails?.variantDetail.fuelType,
      transmition: carVariantDetails?.variantDetail.transmission,
      body_type: carVariantDetails?.variantDetail.bodyType,
      dimension:
        recommendation?.filter(
          (car) => car.id === carVariantDetails?.modelDetail.id,
        ).length > 0
          ? recommendation?.filter(
              (car) => car.id === carVariantDetails?.modelDetail.id,
            )[0].height
          : '',
    }
    saveLocalStorage(
      LocalStorageKey.MoengageAttribute,
      JSON.stringify(moengageAttribute),
    )
    saveLocalStorage(
      LocalStorageKey.SelectedAngsuranType,
      forms.paymentOption === InstallmentTypeOptions.ADDM
        ? InstallmentTypeOptions.ADDM
        : InstallmentTypeOptions.ADDB,
    )

    setSimpleCarVariantDetails({
      modelId: forms.model?.modelId,
      variantId: forms.variant?.variantId,
      loanTenure: selectedLoan?.tenure,
      loanDownPayment: tpp,
      loanMonthlyInstallment: installment,
      loanRank: selectedLoan?.loanRank,
      totalFirstPayment: tpp,
      flatRate: rate,
    })
  }

  const isTooltipExpired = (): boolean => {
    const currentDate = new Date().getTime()
    const nextDisplayDate = new Date(tooltipNextDisplay!).getTime()
    return currentDate > nextDisplayDate
  }

  const calculateNextDisplayDate = (): Date => {
    const nextDisplayDate = new Date()
    nextDisplayDate.setDate(nextDisplayDate.getDate() + 30) // Add 30 days
    return nextDisplayDate
  }

  const handleTooltipClose = () => {
    setIsTooltipOpen(false)
  }
  const trackCountlyDirectToWhatsapp = async (tenure: number) => {
    let temanSevaStatus = 'No'
    if (referralCodeFromUrl) {
      temanSevaStatus = 'Yes'
    } else if (!!getToken()) {
      const response = await getCustomerInfoSeva()
      if (response[0].temanSevaTrxCode) {
        temanSevaStatus = 'Yes'
      }
    }

    trackEventCountly(CountlyEventNames.WEB_WA_DIRECT_CLICK, {
      PAGE_ORIGINATION:
        router.query.from && router.query.from === 'homepageKualifikasi'
          ? 'Loan Calculator - Kualifikasi Kredit'
          : 'Loan Calculator',
      SOURCE_BUTTON: 'CTA button Hubungi Agen SEVA',
      CAR_BRAND: forms.model?.brandName,
      CAR_MODEL: removeCarBrand(forms.model?.modelName ?? 'Null'),
      CAR_VARIANT: forms.variant?.variantName
        ? forms.variant?.variantName
        : 'Null',
      PELUANG_KREDIT_BADGE:
        isUsingFilterFinancial && IsShowBadgeCreditOpportunity
          ? dataCar?.PELUANG_KREDIT_BADGE
          : 'Null',
      TENOR_OPTION: tenure ? tenure + ' Tahun' : 'Null',
      TENOR_RESULT:
        selectedLoan?.loanRank && selectedLoan?.loanRank === 'Green'
          ? 'Mudah disetujui'
          : selectedLoan?.loanRank && selectedLoan?.loanRank === 'Red'
          ? 'Sulit disetujui'
          : 'Null',
      KK_RESULT: 'Null',
      IA_RESULT: 'Null',
      TEMAN_SEVA_STATUS: temanSevaStatus,
      INCOME_LOAN_CALCULATOR: `Rp${Currency(forms.monthlyIncome)}`,
      INCOME_KUALIFIKASI_KREDIT: 'Null',
      INCOME_CHANGE: 'Null',
      OCCUPATION: 'Null',
    })
  }

  const handleRedirectToWhatsapp = async (
    loan: SpecialRateListWithPromoType,
  ) => {
    if (selectedLoan) {
      trackCountlyDirectToWhatsapp(selectedLoan.tenure)
    }
    const { model, variant } = forms

    const selectedLoanData = insuranceAndPromoForAllTenure.filter(
      (x) => x.tenure === loan.tenure,
    )[0]

    const getPromoListForWhatsapp = (): string => {
      const allParentPromoTitle = selectedLoanData.selectedPromo.map((item) => {
        return item.promo
      })
      if (allParentPromoTitle.length > 1) {
        return allParentPromoTitle.join(', ') + ','
      } else {
        return allParentPromoTitle.join()
      }
    }

    const getLastSentenceMessage = (): string => {
      if (getPromoListForWhatsapp().length > 0 && loan.dpDiscount !== 0) {
        return `Saya juga ingin menggunakan promo ${getPromoListForWhatsapp()} dan diskon unit sebesar Rp${replacePriceSeparatorByLocalization(
          loan.dpDiscount,
          LanguageCode.id,
        )}.`
      } else if (getPromoListForWhatsapp().length > 0) {
        return `Saya juga ingin menggunakan promo ${getPromoListForWhatsapp()}.`
      } else if (loan.dpDiscount !== 0) {
        return `Saya juga ingin menggunakan diskon unit sebesar Rp${replacePriceSeparatorByLocalization(
          loan.dpDiscount,
          LanguageCode.id,
        )}.`
      } else {
        return ''
      }
    }

    const message = `Halo saya tertarik dengan ${model?.modelName} ${
      variant?.variantName
    } dengan DP sebesar Rp${replacePriceSeparatorByLocalization(
      selectedLoanData.tdpAfterPromo !== 0
        ? selectedLoanData.tdpAfterPromo
        : selectedLoanData.tdpBeforePromo,
      LanguageCode.id,
    )}, cicilan per bulannya Rp${replacePriceSeparatorByLocalization(
      !!selectedLoanData.installmentAfterPromo &&
        selectedLoanData.installmentAfterPromo !== 0
        ? selectedLoanData.installmentAfterPromo
        : selectedLoanData.installmentBeforePromo,
      LanguageCode.id,
    )}, dan tenor ${loan?.tenure} tahun. ${getLastSentenceMessage()}`

    const whatsAppUrl = await getCustomerAssistantWhatsAppNumber()
    window.open(`${whatsAppUrl}?text=${encodeURI(message)}`, '_blank')
  }

  const fetchCarRecommendations = async () => {
    const response = await getNewFunnelRecommendations({
      ...funnelQuery,
      sortBy: 'highToLow',
      age: forms?.age,
      monthlyIncome: forms?.monthlyIncome,
      downPaymentAmount: forms?.downPaymentAmount,
    })

    const filteredCarRecommendations = response.carRecommendations.filter(
      (car: any) => car.loanRank === LoanRank.Green,
    )
    setCarRecommendations(filteredCarRecommendations.slice(0, 10))
  }

  const fetchDataContext = async () => {
    const [menuDesktopRes, menuMobileRes, footerRes, cityRes]: any =
      await Promise.all([
        getMenu(),
        getMobileHeaderMenu(),
        getMobileFooterMenu(),
        getCities(),
      ])

    saveMobileWebTopMenus(menuMobileRes.data)
    saveDesktopWebTopMenu(menuDesktopRes.data)
    saveMobileWebFooterMenus(footerRes.data)
    saveCities(cityRes)
  }

  useEffect(() => {
    if (modelError) {
      resetVariant()
    }
  }, [modelError])

  const onBlurIncomeInput = () => {
    if (parseInt(forms.monthlyIncome) < 3000000) {
      setIsIncomeTooLow(true)
    }
  }

  const onCloseQualificationPopUp = () => {
    trackCountlyOnCloseQualificationModal()
    setIsQualificationModalOpen(false)
  }

  const clearPromoCodeHandler = () => {
    setIsErrorPromoCode(false)
    setForms({
      ...forms,
      promoCode: '',
    })
  }

  const formatCurrency = (value: number): string => {
    return `Rp${value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
  }

  const dataForCountlyTrackerOnClick = () => {
    return {
      PAGE_ORIGINATION: getPageOriginationForCountlyTracker(),
      CAR_BRAND: forms.model?.brandName ?? 'Null',
      CAR_MODEL: removeCarBrand(forms.model?.modelName ?? 'Null'),
    }
  }

  const onOpenTooltipCityField = () => {
    trackEventCountly(
      CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_CITY_TOOLTIP_CLICK,
      dataForCountlyTrackerOnClick(),
    )
  }

  const onShowDropdownCityField = () => {
    trackEventCountly(
      CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_CITY_CLICK,
      dataForCountlyTrackerOnClick(),
    )
  }

  const onShowDropdownModelField = () => {
    trackEventCountly(
      CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_MODEL_CLICK,
      dataForCountlyTrackerOnClick(),
    )
  }

  const onShowDropdownVariantField = () => {
    trackEventCountly(
      CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_VARIANT_CLICK,
      dataForCountlyTrackerOnClick(),
    )
  }

  const onFocusIncomeField = () => {
    trackEventCountly(
      CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_INCOME_CLICK,
      dataForCountlyTrackerOnClick(),
    )
  }

  const onFocusDpAmountField = () => {
    trackEventCountly(
      CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_DP_AMOUNT_CLICK,
      dataForCountlyTrackerOnClick(),
    )
  }

  const onFocusDpPercentageField = () => {
    trackEventCountly(
      CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_DP_PERCENTAGE_CLICK,
      dataForCountlyTrackerOnClick(),
    )
  }

  const onAfterChangeDpSlider = () => {
    const hasTrackedDpSliderLC = getSessionStorage(
      SessionStorageKey.HasTrackedDpSliderLC,
    )
    if (!hasTrackedDpSliderLC) {
      trackEventCountly(
        CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_DP_SLIDER_CLICK,
        dataForCountlyTrackerOnClick(),
      )
      saveSessionStorage(SessionStorageKey.HasTrackedDpSliderLC, 'true')
    }
  }

  const onShowDropdownAgeField = () => {
    trackEventCountly(
      CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_AGE_CLICK,
      dataForCountlyTrackerOnClick(),
    )
  }

  const trackCountlyResult = (
    calculationResult: SpecialRateListWithPromoType[],
  ) => {
    const resultSortAscByTenure = calculationResult.sort(
      (a, b) => a.tenure - b.tenure,
    )

    trackEventCountly(
      CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_CALCULATE_CLICK,
      {
        ...dataForCountlyTrackerOnClick(),
        PELUANG_KREDIT_BADGE: isUsingFilterFinancial
          ? getCreditBadgeForCountlyTracker()
          : 'Null',
        CAR_VARIANT: forms.variant?.variantName ?? 'Null',
        OTR_LOCATION: forms.city.cityName,
        INCOME_AMOUNT: formatCurrency(parseInt(forms.monthlyIncome.toString())),
        DP_AMOUNT: formatCurrency(dpValue),
        DP_PERCENTAGE: formatCurrency(dpPercentage),
        ANGSURAN_TYPE: forms.paymentOption,
        AGE_RANGE: forms.age.replace('>', 'Above '),
        '1_YEAR_TENOR_RESULT':
          resultSortAscByTenure[0].loanRank === LoanRank.Green
            ? 'Mudah disetujui'
            : 'Sulit disetujui',
        '2_YEAR_TENOR_RESULT':
          resultSortAscByTenure[1].loanRank === LoanRank.Green
            ? 'Mudah disetujui'
            : 'Sulit disetujui',
        '3_YEAR_TENOR_RESULT':
          resultSortAscByTenure[2].loanRank === LoanRank.Green
            ? 'Mudah disetujui'
            : 'Sulit disetujui',
        '4_YEAR_TENOR_RESULT':
          resultSortAscByTenure[3].loanRank === LoanRank.Green
            ? 'Mudah disetujui'
            : 'Sulit disetujui',
        '5_YEAR_TENOR_RESULT': !resultSortAscByTenure[4]
          ? 'Null'
          : resultSortAscByTenure[4]?.loanRank === LoanRank.Green
          ? 'Mudah disetujui'
          : 'Sulit disetujui',
      },
    )
  }

  const trackCountlyResultView = () => {
    trackEventCountly(CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_RESULT_VIEW, {
      ...dataForCountlyTrackerOnClick(),
      CAR_VARIANT: forms.variant?.variantName ?? 'Null',
    })
  }

  const trackCountlyClickCheckQualification = (
    loan: SpecialRateListWithPromoType,
  ) => {
    const selectedInsurancePromo = insuranceAndPromoForAllTenure.filter(
      (x) => x.tenure === loan.tenure,
    )[0]

    trackEventCountly(
      CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_CHECK_QUALIFICATION_CLICK,
      {
        ...dataForCountlyTrackerOnClick(),
        PELUANG_KREDIT_BADGE: isUsingFilterFinancial
          ? getCreditBadgeForCountlyTracker()
          : 'Null',
        CAR_VARIANT: forms.variant?.variantName ?? 'Null',
        TENOR_OPTION: `${loan.tenure} tahun`,
        TENOR_RESULT:
          loan.loanRank === LoanRank.Green
            ? 'Mudah disetujui'
            : 'Sulit disetujui',
        INSURANCE_TYPE: !!selectedInsurancePromo
          ? selectedInsurancePromo.selectedInsurance.label
          : 'Null',
        PROMO_AMOUNT: !!selectedInsurancePromo
          ? selectedInsurancePromo.selectedPromo?.length
          : 'Null',
      },
    )
  }

  const trackCountlyOnClickCtaModal = () => {
    const selectedLoanDataStorage: any = getLocalStorage(
      LocalStorageKey.SelectablePromo,
    )
    if (selectedLoanDataStorage) {
      trackEventCountly(
        CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_CHECK_QUALIFICATION_BANNER_CHECK_CLICK,
        {
          ...dataForCountlyTrackerOnClick(),
          PELUANG_KREDIT_BADGE: isUsingFilterFinancial
            ? getCreditBadgeForCountlyTracker()
            : 'Null',
          CAR_VARIANT: forms.variant?.variantName ?? 'Null',
          TENOR_OPTION: `${selectedLoan?.tenure} tahun`,
          TENOR_RESULT:
            selectedLoan?.loanRank === LoanRank.Green
              ? 'Mudah disetujui'
              : 'Sulit disetujui',
          INSURANCE_TYPE: !!selectedLoanDataStorage
            ? selectedLoanDataStorage?.selectedInsurance.label
            : 'Null',
          PROMO_AMOUNT: !!selectedLoanDataStorage
            ? selectedLoanDataStorage?.selectedPromo?.length
            : 'Null',
          LOGIN_STATUS: !!getToken() ? 'Yes' : 'No',
        },
      )
    }
  }

  const trackCountlyOnCloseQualificationModal = () => {
    const selectedLoanDataStorage: any = getLocalStorage(
      LocalStorageKey.SelectablePromo,
    )
    if (selectedLoanDataStorage) {
      trackEventCountly(
        CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_CHECK_QUALIFICATION_BANNER_CLOSE_CLICK,
        {
          ...dataForCountlyTrackerOnClick(),
          CAR_VARIANT: forms.variant?.variantName ?? 'Null',
          TENOR_OPTION: `${selectedLoan?.tenure} tahun`,
          TENOR_RESULT:
            selectedLoan?.loanRank === LoanRank.Green
              ? 'Mudah disetujui'
              : 'Sulit disetujui',
        },
      )
    }
  }

  const onClickCtaQualificationModal = () => {
    trackCountlyOnClickCtaModal()
  }

  const trackCountlyOnShowTooltip = () => {
    trackEventCountly(
      CountlyEventNames.WEB_LOAN_CALCULATOR_PAGE_KUALIFIKASI_KREDIT_COACHMARK_VIEW,
      {
        ...dataForCountlyTrackerOnClick(),
        CAR_VARIANT: forms.variant?.variantName ?? 'Null',
      },
    )
  }

  return (
    <>
      <Seo
        title="SEVA - Beli Mobil Terbaru Dengan Cicilan Kredit Terbaik"
        description="Beli mobil terbaru dari Toyota, Daihatsu, BMW dengan Instant Approval*. Proses Aman & Mudah✅ Terintegrasi dengan ACC & TAF✅ SEVA member of ASTRA"
        image={defaultSeoImage}
      />
      <div className={styles.container}>
        <HeaderMobile
          isActive={isActive}
          setIsActive={setIsActive}
          style={{
            position: 'fixed',
          }}
          emitClickCityIcon={() => setIsOpenCitySelectorModal(true)}
          setShowAnnouncementBox={saveShowAnnouncementBox}
          isShowAnnouncementBox={showAnnouncementBox}
        />
        <div
          className={clsx({
            [styles.content]: !showAnnouncementBox,
            [styles.contentWithSpace]: showAnnouncementBox,
            [styles.announcementboxpadding]: showAnnouncementBox,
            [styles.announcementboxpadding]: false,
          })}
        >
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>
              {router.query.from === 'homepageKualifikasi'
                ? 'Yuk, Hitung Dulu Kemampuan Finansialmu'
                : 'Cari Tahu Kemampuan Finansialmu'}
            </h2>
            <p className={styles.subtitle}>
              {router.query.from === 'homepageKualifikasi'
                ? 'Sebelum cek kualifikasi kredit, isi data secara lengkap untuk tahu kemampuan finansialmu.'
                : 'Isi data secara lengkap untuk mengetahui hasil kemampuan finansialmu dengan akurat.'}
            </p>
          </div>
          <div className={styles.formWrapper}>
            <div id="loan-calculator-form-city">
              <FormSelectCity
                isHasCarParameter={isHasCarParameter}
                handleChange={handleChange}
                name="city"
                onOpenTooltip={onOpenTooltipCityField}
                onShowDropdown={onShowDropdownCityField}
                isError={isValidatingEmptyField && !forms.city}
              />
              {isValidatingEmptyField && !forms.city
                ? renderErrorMessageEmpty()
                : null}
            </div>
            <div id="loan-calculator-form-car-model">
              <FormSelectModelCar
                selectedCity={forms?.city?.cityCode || ''}
                handleChange={handleChange}
                name="model"
                value={forms?.model?.modelName || ''}
                valueImage={
                  forms.model?.modelImage ||
                  (CarSillhouete as unknown as string)
                }
                valueId={forms?.model?.modelId || ''}
                allModelCarList={allModelCarList}
                setModelError={setModelError}
                onShowDropdown={onShowDropdownModelField}
                overrideIsErrorFieldOnly={
                  isValidatingEmptyField &&
                  (!forms.model?.modelId || !forms.model.modelName)
                }
              />
              {isValidatingEmptyField &&
              (!forms.model?.modelId || !forms.model.modelName)
                ? renderErrorMessageEmpty()
                : null}
            </div>
            <div id="loan-calculator-form-car-variant">
              <FormSelectCarVariant
                selectedModel={forms?.model?.modelId || ''}
                handleChange={handleChange}
                name="variant"
                carVariantList={carVariantList}
                value={forms.variant || variantEmptyValue}
                modelError={modelError}
                onShowDropdown={onShowDropdownVariantField}
                isError={
                  isValidatingEmptyField &&
                  (!forms.variant?.variantId || !forms.variant.variantName)
                }
              />
              {isValidatingEmptyField &&
              (!forms.variant?.variantId || !forms.variant.variantName)
                ? renderErrorMessageEmpty()
                : null}
            </div>
            <div id="loan-calculator-form-income">
              <IncomeForm
                name="monthlyIncome"
                title="Pendapatan bulanan"
                value={Number(forms.monthlyIncome)}
                defaultValue={Number(forms.monthlyIncome)}
                handleChange={handleChange}
                isError={
                  isIncomeTooLow ||
                  (isValidatingEmptyField && !forms.monthlyIncome)
                }
                emitOnBlurInput={onBlurIncomeInput}
                onFocus={onFocusIncomeField}
              />
              {renderIncomeErrorMessage()}
            </div>
            <div id="loan-calculator-form-dp">
              <DpForm
                label="Kemampuan DP"
                value={dpValue}
                percentage={dpPercentage}
                onChange={handleDpChange}
                emitDpPercentageChange={handleDpPercentageChange}
                carPriceMinusDiscount={
                  getCarOtrNumber() - getCarDiscountNumber()
                }
                handleChange={handleChange}
                name="downPaymentAmount"
                isDisabled={
                  !forms.variant?.variantName || !forms?.model?.modelId
                    ? true
                    : false
                }
                isErrorEmptyField={
                  isValidatingEmptyField && !forms.downPaymentAmount
                }
                isDpTooLow={isDpTooLow}
                setIsDpTooLow={setIsDpTooLow}
                isDpExceedLimit={isDpExceedLimit}
                setIsDpExceedLimit={setIsDpExceedLimit}
                isAutofillValueFromCreditQualificationData={
                  !!kkForm && !isUserChooseVariantDropdown
                }
                emitOnFocusDpAmountField={onFocusDpAmountField}
                emitOnFocusDpPercentageField={onFocusDpPercentageField}
                emitOnAfterChangeDpSlider={onAfterChangeDpSlider}
                finalMinInputDp={finalMinInputDp}
                finalMaxInputDp={finalMaxInputDp}
              />
            </div>
            <div id="loan-calculator-form-installment-type">
              <CicilOptionForm
                name="paymentOption"
                isClicked={installmentType === InstallmentTypeOptions.ADDM}
                onClick={(value: boolean) =>
                  handleInstallmentTypeChange(
                    InstallmentTypeOptions.ADDM,
                    value,
                  )
                }
                handleChange={handleChange}
                value={forms.paymentOption}
              />
              {isValidatingEmptyField && !forms.paymentOption
                ? renderErrorMessageEmpty()
                : null}
            </div>
            <div
              id="loan-calculator-form-age"
              className={styles.loanCalculatorFormAge}
            >
              <FormAgeCredit
                ageList={AgeList}
                name="age"
                handleChange={handleChange}
                defaultValue={forms.age}
                onShowDropdown={onShowDropdownAgeField}
                isError={isValidatingEmptyField && !forms.age}
              />
              {isValidatingEmptyField && !forms.age
                ? renderErrorMessageEmpty()
                : null}
            </div>

            {false && (
              <div id="loan-calculator-form-promo-code">
                <FormPromoCode
                  emitOnChange={handleOnChangePromoCode}
                  emitPromoCodeValidResult={handlePromoCodeValidResult}
                  isLoadingPromoCode={isLoadingPromoCode}
                  isErrorPromoCode={isErrorPromoCode}
                  isSuccessPromoCode={isSuccessPromoCode}
                  passedResetPromoCodeStatusFunc={resetPromoCodeStatus}
                  passedCheckPromoCodeFunc={checkPromoCode}
                  onClearInput={clearPromoCodeHandler}
                  value={forms.promoCode}
                />
              </div>
            )}

            <Button
              // not using "disabled" attrib because some func need to be run
              // when disabled button is clicked
              version={ButtonVersion.PrimaryDarkBlue}
              secondaryClassName={styles.buttonSubmit}
              size={ButtonSize.Big}
              onClick={onClickCalculate}
              data-testid={elementId.LoanCalculator.Button.HitungKemampuan}
            >
              {isLoadingCalculation || isLoadingInsuranceAndPromo ? (
                <div className={`${styles.iconWrapper} rotateAnimation`}>
                  <IconLoading width={14} height={14} color="#FFFFFF" />
                </div>
              ) : (
                'Hitung Kemampuan'
              )}
            </Button>
          </div>

          <div id="loan-calculator-form-and-result-separator"></div>

          {calculationResult.length > 0 &&
          !isLoadingCalculation &&
          !isLoadingInsuranceAndPromo &&
          isDataSubmitted ? (
            <>
              <CalculationResult
                handleRedirectToWhatsapp={handleRedirectToWhatsapp}
                data={calculationResult}
                selectedLoan={selectedLoan}
                setSelectedLoan={setSelectedLoan}
                angsuranType={forms.paymentOption}
                isTooltipOpen={isTooltipOpen}
                isQualificationModalOpen={isQualificationModalOpen}
                closeTooltip={handleTooltipClose}
                handleClickButtonQualification={handleClickButtonQualification}
                formData={forms}
                insuranceAndPromoForAllTenure={insuranceAndPromoForAllTenure}
                setInsuranceAndPromoForAllTenure={
                  setInsuranceAndPromoForAllTenure
                }
                calculationApiPayload={calculationApiPayload}
                setFinalLoan={setFinalLoan}
                pageOrigination={getPageOriginationForCountlyTracker()}
              />

              {carRecommendations.length > 0 && (
                <CarRecommendations
                  carRecommendationList={carRecommendations}
                  title="Rekomendasi Sesuai
Kemampuan Finansialmu"
                  onClick={() => {
                    setIsOpenPopupRecommended(true)
                  }}
                  selectedCity={forms?.city?.cityName}
                />
              )}
              <CreditCualificationBenefit />
              <Articles
                articles={articles}
                cityName={forms?.city?.cityName || ''}
                carModel={forms?.model?.modelName || ''}
                carBrand={forms?.model?.brandName || ''}
              />
            </>
          ) : (
            <CalculationResultEmpty />
          )}
        </div>

        <FooterMobile pageOrigination={'PDP - ' + valueMenuTabCategory()} />

        <CitySelectorModal
          isOpen={isOpenCitySelectorModal}
          onClickCloseButton={() => {
            setIsOpenCitySelectorModal(false)
          }}
          cityListFromApi={cityListApi}
        />

        <QualificationCreditModal
          isOpen={isQualificationModalOpen}
          onClickCloseButton={onCloseQualificationPopUp}
          formData={forms}
          selectedLoan={selectedLoan}
          onClickCta={onClickCtaQualificationModal}
        />

        <Toast
          width={339}
          open={isOpenToast}
          text={toastMessage}
          typeToast={'error'}
          onCancel={() => setIsOpenToast(false)}
          closeOnToastClick
        />

        <PopupResultRecommended
          open={isOpenPopupRecommended}
          onCancel={() => {
            setIsOpenPopupRecommended(false)
          }}
        />
      </div>
    </>
  )
}
