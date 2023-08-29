import {
  formatNumberByLocalization,
  replacePriceSeparatorByLocalization,
  rupiah,
} from 'utils/handler/rupiah'
import {
  Article,
  CityOtrOption,
  FinalLoan,
  LoanCalculatorIncludePromoPayloadType,
  LoanCalculatorInsuranceAndPromoType,
  SpecialRateListWithPromoType,
} from 'utils/types/utils'
import {
  trackLCCTAHitungKemampuanClick,
  trackLCCtaWaDirectClick,
  trackLCKualifikasiKreditClick,
  trackLCKualifikasiKreditPopUpClose,
  trackVariantListPageCodeFailed,
  trackVariantListPageCodeSuccess,
  trackWebPDPCreditTab,
} from 'helpers/amplitude/seva20Tracking'
import { MoengageEventName, setTrackEventMoEngage } from 'helpers/moengage'
import { useLocalStorage } from 'utils/hooks/useLocalStorage'
import {
  InstallmentTypeOptions,
  LoanRank,
  TrackerFlag,
} from 'utils/types/models'
import React, { useEffect, useMemo, useState } from 'react'
import {
  Articles,
  CalculationResult,
  LeadsFormSecondary,
} from 'components/organisms'
import styles from 'styles/components/organisms/creditTab.module.scss'
import {
  Button,
  Gap,
  IconCalculator,
  IconLoading,
  Toast,
} from 'components/atoms'
import {
  FormPromoCode,
  FormSelectCarVariant,
  FormSelectCity,
  FormSelectModelCar,
  Info,
} from 'components/molecules'
import { availableList, availableListColors } from 'config/AvailableListColors'
import { getMinimumMonthlyInstallment } from 'utils/carModelUtils/carModelUtils'
import { hundred, million } from 'utils/helpers/const'
import {
  defaultCity,
  saveCity,
} from 'utils/hooks/useCurrentCityOtr/useCurrentCityOtr'
import { useFunnelQueryData } from 'services/context/funnelQueryContext'
import IncomeForm from 'components/molecules/credit/income'
import DpForm from 'components/molecules/credit/dp'
import { CicilOptionForm } from 'components/molecules/credit/cicil'
import { FormAgeCredit } from 'components/molecules/credit/age'
import { useSessionStorageWithEncryption } from 'utils/hooks/useSessionStorage/useSessionStorage'
import { checkPromoCodeGias } from 'services/preApproval'
import { ButtonSize, ButtonVersion } from 'components/atoms/button'
import {
  getLoanCalculatorInsurance,
  getNewFunnelLoanSpecialRate,
  getNewFunnelRecommendations,
  getNewFunnelRecommendationsByCity,
  postLoanPermutationIncludePromo,
} from 'services/newFunnel'
import { getCarModelDetailsById } from 'services/recommendations'
import {
  CarRecommendation,
  SimpleCarVariantDetail,
  SpecialRateListType,
} from 'utils/types/utils'
import { getCustomerAssistantWhatsAppNumber } from 'services/lead'
import CarRecommendations from 'components/organisms/carRecomendations'
import CreditCualificationBenefit from 'components/organisms/CreditCualificationBenefit'
import { variantEmptyValue } from 'components/molecules/form/formSelectCarVariant'
import { useFinancialQueryData } from 'services/context/finnancialQueryContext'
import { QualificationCreditModal } from 'components/molecules/qualificationCreditModal'
import { getLocalStorage, saveLocalStorage } from 'utils/handler/localStorage'
import elementId from 'helpers/elementIds'
import { useRouter } from 'next/router'
import { CarModel } from 'utils/types/carModel'
import { ModelVariant } from 'utils/types/carVariant'
import { TrackVariantList } from 'utils/types/tracker'
import { useCar } from 'services/context/carContext'
import { LanguageCode, LocalStorageKey, SessionStorageKey } from 'utils/enum'
import { ageOptions } from 'utils/config/funnel.config'
import { formatPriceNumberThousandDivisor } from 'utils/numberUtils/numberUtils'
import { getToken } from 'utils/handler/auth'
import { getCustomerInfoSeva } from 'services/customer'
import {
  generateAllBestPromoList,
  getInstallmentAffectedByPromo,
  getInterestRateAffectedByPromo,
  getTdpAffectedByPromo,
} from 'utils/loanCalculatorUtils'
import { removeFirstWordFromString } from 'utils/stringUtils'

const CarSillhouete = '/revamp/illustration/car-sillhouete.webp'

interface FormState {
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

export const CreditTab = () => {
  const router = useRouter()
  const { carModelDetails, carVariantDetails, recommendation } = useCar()
  const [cityOtr] = useLocalStorage<CityOtrOption | null>(
    LocalStorageKey.CityOtr,
    null,
  )
  const [info, setInfo] = useState<any>({})
  const { funnelQuery, patchFunnelQuery } = useFunnelQueryData()
  const [isDisableCtaCalculate, setIsDisableCtaCalculate] = useState(true)
  const { financialQuery, patchFinancialQuery } = useFinancialQueryData()
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
  const [modelError, setModelError] = useState<boolean>(false)
  const [isIncomeTooLow, setIsIncomeTooLow] = useState(false)
  const [dpValue, setDpValue] = useState<number>(0)
  const [dpPercentage, setDpPercentage] = useState<number>(20)
  const [mappedDpPercentage, setMappedDpPercentage] = useState<number>(20)
  const [isDpTooLow, setIsDpTooLow] = useState<boolean>(false)
  const [isDpExceedLimit, setIsDpExceedLimit] = useState<boolean>(false)
  const [installmentType, setInstallmentType] =
    useState<InstallmentTypeOptions>(InstallmentTypeOptions.ADDB)
  const [calculationResult, setCalculationResult] = useState([])
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [tooltipNextDisplay, setTooltipNextDisplay] = useState<string | null>(
    null,
  )
  const [isQualificationModalOpen, setIsQualificationModalOpen] =
    useState(false)
  const [carRecommendations, setCarRecommendations] = useState<
    CarRecommendation[]
  >([])
  const [articles, setArticles] = React.useState<Article[]>([])
  const [selectedLoan, setSelectedLoan] =
    useState<SpecialRateListWithPromoType | null>(null)
  const [storedFilter] = useLocalStorage<null>(
    LocalStorageKey.FinancialData,
    null,
  )
  const [flag, setFlag] = useState<TrackerFlag>(TrackerFlag.Init)
  const [flagMoengage, setFlagMoengage] = useState<TrackerFlag>(
    TrackerFlag.Init,
  )
  const [, setSimpleCarVariantDetails] =
    useLocalStorage<SimpleCarVariantDetail | null>(
      LocalStorageKey.SimpleCarVariantDetails,
      null,
    )
  const [insuranceAndPromoForAllTenure, setInsuranceAndPromoForAllTenure] =
    useState<LoanCalculatorInsuranceAndPromoType[]>([])
  const [isLoadingInsuranceAndPromo, setIsLoadingInsuranceAndPromo] =
    useState(false)
  const [isSelectPassengerCar, setIsSelectPassengerCar] = useState(false)
  const [calculationApiPayload, setCalculationApiPayload] =
    useState<LoanCalculatorIncludePromoPayloadType>()

  const referralCodeLocalStorage = getLocalStorage<string>(
    LocalStorageKey.referralTemanSeva,
  )
  const [isUserHasReffcode, setIsUserHasReffcode] = useState(false)
  const [isOpenToast, setIsOpenToast] = useState(false)
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
  const [toastMessage, setToastMessage] = useState(
    'Mohon maaf, terjadi kendala jaringan silahkan coba kembali lagi',
  )

  const getAutofilledCityData = () => {
    // related to logic inside component "FormSelectCity"
    // no need to check "isHasCarParameter" props
    if (cityOtr) {
      return cityOtr
    } else {
      return null
    }
  }

  const [forms, setForms] = React.useState<FormState>({
    city: getAutofilledCityData(),
    model: {
      brandName: '',
      modelName: '',
      modelId: '',
      modelImage: CarSillhouete,
    },
    variant: {
      variantId: '',
      variantName: '',
      otr: '',
      discount: 0,
    },
    promoCode: '',
    age: (storedFilter?.age && storedFilter?.age.toString()) || '',
    monthlyIncome:
      (storedFilter?.monthlyIncome && storedFilter?.monthlyIncome.toString()) ||
      '',
    downPaymentAmount:
      (storedFilter?.downPaymentAmount &&
        storedFilter?.downPaymentAmount.toString()) ||
      '',
    paymentOption: InstallmentTypeOptions.ADDM,
    isValidPromoCode: true,
  })

  const autofillCarModelAndVariantData = () => {
    const tempData = {
      model: {
        brandName: '',
        modelName: '',
        modelId: '',
        modelImage: '',
      },
      variant: {
        ...variantEmptyValue,
      },
    }

    if (carModelDetails) {
      tempData.model.brandName = carModelDetails.brand
      tempData.model.modelName = `${carModelDetails.brand} ${carModelDetails.model}`
      tempData.model.modelId = carModelDetails.id
      tempData.model.modelImage = carModelDetails.images[0]
    }

    if (carModelDetails && router.query?.selectedVariantId) {
      if (passedVariantData.length > 0 && forms?.city?.cityCode) {
        tempData.variant.variantId = passedVariantData[0].id
        tempData.variant.variantName = passedVariantData[0].name
        tempData.variant.otr = `Rp${formatPriceNumberThousandDivisor(
          passedVariantData[0].priceValue,
          LanguageCode.id,
        )}`
        tempData.variant.discount = passedVariantData[0].discount
      }
    }

    setForms({
      ...forms,
      ...tempData,
    })
  }

  const updateSelectedVariantData = () => {
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
  useEffect(() => {
    fetchAllCarModels()
    fetchArticles()

    const nextDisplay = localStorage.getItem('tooltipNextDisplay')
    if (nextDisplay) {
      setTooltipNextDisplay(nextDisplay)
    }
  }, [])

  React.useEffect(() => {
    setForms({
      ...forms,
      monthlyIncome: funnelQuery?.monthlyIncome?.toString() || '',
      age: funnelQuery?.age?.toString() || '',
    })
  }, [funnelQuery])

  useEffect(() => {
    if (
      carModelDetails !== undefined &&
      carVariantDetails !== undefined &&
      recommendation !== undefined
    ) {
      trackEventMoengage()
      getSummaryInfo()
      autofillCarModelAndVariantData()
    }
  }, [carModelDetails, carVariantDetails, recommendation])

  useEffect(() => {
    if (forms.model?.modelId && forms.city) {
      fetchCarVariant()
    }
  }, [forms.model?.modelId, forms.city])

  useEffect(() => {
    if (modelError) {
      resetVariant()
    }
  }, [modelError])

  React.useEffect(() => {
    if (!forms?.city?.cityCode) {
      // tempData is used to keep read-only model data
      // because credit tab can be used without selecting cityOtr first (city null)
      const tempData = {
        model: {
          brandName: '',
          modelName: '',
          modelId: '',
          modelImage: '',
        },
      }

      if (carModelDetails) {
        tempData.model.brandName = carModelDetails.brand
        tempData.model.modelName = `${carModelDetails.brand} ${carModelDetails.model}`
        tempData.model.modelId = carModelDetails.id
        tempData.model.modelImage = carModelDetails.images[0]
      }

      setForms({
        ...forms,
        ...tempData,
        variant: variantEmptyValue,
        // no need to reset model, because in PDP it will always has value
        // model: {
        //   brandName: '',
        //   modelId: '',
        //   modelImage: '',
        //   modelName: '',
        // },
      })
    }
  }, [forms.city?.cityCode])

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
    updateSelectedVariantData()
    checkReffcode()
  }, [carVariantList])

  const sortedCarModelVariant = useMemo(() => {
    return (
      carModelDetails?.variants.sort(function (a, b) {
        return a.priceValue - b.priceValue
      }) || []
    )
  }, [carModelDetails])

  const passedVariantData = useMemo(() => {
    return (
      carModelDetails?.variants.filter(
        (item) => item.id === router.query?.selectedVariantId,
      ) || []
    )
  }, [carModelDetails])

  useEffect(() => {
    if (carModelDetails && flag === TrackerFlag.Init) {
      sendAmplitude()
      setFlag(TrackerFlag.Sent)
    }
  }, [carModelDetails])

  const sendAmplitude = (): void => {
    if (!carModelDetails) return

    const data: TrackVariantList = {
      Car_Brand: carModelDetails?.brand || '',
      Car_Model: carModelDetails?.model || '',
      Car_Variant:
        passedVariantData.length > 0 ? passedVariantData[0].name : '',
      DP: `Rp${formatNumberByLocalization(
        sortedCarModelVariant[0].dpAmount,
        LanguageCode.id,
        1000000,
        10,
      )} Juta`,
      Monthly_Installment: `Rp${formatNumberByLocalization(
        sortedCarModelVariant[0].monthlyInstallment,
        LanguageCode.id,
        1000000,
        10,
      )} jt/bln`,
      Income:
        storedFilter && storedFilter?.monthlyIncome?.length > 0
          ? storedFilter?.monthlyIncome.toString()
          : '',
      Age:
        storedFilter && storedFilter?.age?.length > 0
          ? storedFilter?.age.toString()
          : '',
      Tenure: `${sortedCarModelVariant[0].tenure} Tahun`,
      City: cityOtr?.cityName || '',
    }
    trackWebPDPCreditTab(data)
  }

  const trackEventMoengage = () => {
    if (
      !carModelDetails ||
      !carVariantDetails ||
      recommendation.length === 0 ||
      flagMoengage === TrackerFlag.Sent
    )
      return

    const objData = {
      brand: carModelDetails?.brand,
      model: carModelDetails?.model,
      ...(passedVariantData.length > 0 && {
        variants: passedVariantData[0].name,
      }),
      ...(router.query?.selectedVariantId &&
        passedVariantData.length > 0 && {
          down_payment:
            (passedVariantData[0].priceValue - passedVariantData[0].discount) *
            0.2,
        }),
      ...(funnelQuery.monthlyIncome && {
        income: funnelQuery.monthlyIncome,
      }),
      ...(funnelQuery.age && {
        age: funnelQuery.age,
      }),
      ...(!!cityOtr?.cityName && { city: cityOtr?.cityName }),
    }
    setTrackEventMoEngage(
      MoengageEventName.view_variant_list_credit_tab,
      objData,
    )
    setFlagMoengage(TrackerFlag.Sent)
  }

  const getDimenssion = (payload: any) => {
    return payload.filter((car: any) => car.id === carModelDetails?.id)[0]
  }

  const getTransmissionType = (payload: any) => {
    if (payload) {
      const type: Array<string> = payload
        .map((item: any) => item.transmission)
        .filter(
          (value: any, index: number, self: any) =>
            self.indexOf(value) === index,
        )

      return type
    }
  }
  const getPriceRange = (payload: any) => {
    if (payload) {
      const variantLength = payload.length
      if (variantLength === 1) {
        const price: string = rupiah(payload[0].priceValue)
        return `yang tersedia dalam kisaran harga mulai dari ${price}`
      } else {
        const upperPrice = rupiah(payload[0].priceValue)
        const lowerPrice = rupiah(payload[variantLength - 1].priceValue)

        return `yang tersedia dalam kisaran harga ${lowerPrice} - ${upperPrice} juta`
      }
    }
  }

  const getInfoText = (): string => {
    return `${info.brand} ${info.model} adalah mobil dengan ${info.seats} Kursi ${info.type} ${info.priceRange} di Indonesia. Mobil ini tersedia dalam  ${info.color} pilihan warna, ${info.totalType} tipe mobil, dan ${info.transmissionType} opsi transmisi: ${info.transmissionDetail} di Indonesia. Mobil ini memiliki dimensi sebagai berikut: ${info.length} mm L x ${info.width} mm W x ${info.height} mm H. Cicilan kredit mobil ${info.brand} ${info.model} dimulai dari Rp ${info.credit} juta selama ${info.month} bulan.`
  }

  const getTipsText = (): string => {
    const currentYear: number = new Date().getFullYear()
    return `Saat ini membeli mobil baru bukanlah hal buruk. Di tahun ${currentYear} data menunjukan bahwa pembelian mobil baru mengalami peningkatan yang cukup signifikan,
   ini artinya mobil baru masih menjadi pilihan banyak orang. Jika kamu berniat membeli mobil baru, mobil baru ${info.brand} ${info.model}
  Membeli mobil baru sama halnya seperti membeli mobil bekas, kita juga harus memperhatikan perawatannya, karena mobil yang rajin perawatan tentu akan bertahan untuk jangka waktu yang panjang. Perawatan yang bisa dilakukan untuk mobil baru ${info.brand} ${info.model}
    adalah pergantian oli, filter AC, periksa tekanan ban, serta mencuci mobil.`
  }

  const getColorVariant = () => {
    const currentUrlPathName = window.location.pathname
    const splitedPath = currentUrlPathName.split('/')
    const carBrandModelUrl = `/${splitedPath[1]}/${splitedPath[2]}/${splitedPath[3]}`
    if (availableList.includes(carBrandModelUrl)) {
      const colorsTmp = availableListColors.filter(
        (url) => url.url === carBrandModelUrl,
      )[0].colors

      return colorsTmp.length
    }
  }

  const getCreditPrice = (payload: any) => {
    return getMinimumMonthlyInstallment(
      payload,
      LanguageCode.en,
      million,
      hundred,
    )
  }

  const getSummaryInfo = () => {
    const brand = carModelDetails?.brand || ''
    const model = carModelDetails?.model || ''
    const type = carVariantDetails?.variantDetail.bodyType
    const seats = carVariantDetails?.variantDetail.carSeats
    const priceRange = getPriceRange(carModelDetails?.variants)
    const totalType = carModelDetails?.variants.length
    const color = getColorVariant()
    const dimenssion = getDimenssion(recommendation)
    const credit = getCreditPrice(carModelDetails?.variants)
    const month = carModelDetails && carModelDetails!.variants[0].tenure * 12
    const transmissionType = getTransmissionType(
      carModelDetails?.variants,
    )?.length
    const transmissionDetail = getTransmissionType(
      carModelDetails?.variants,
    )?.join(' dan ')
    const CarVariants = carModelDetails?.variants
    const dpAmount = carModelDetails?.variants.sort(
      (a: any, b: any) => a.priceValue - b.priceValue,
    )[0].dpAmount

    const info = {
      brand,
      model,
      type,
      seats,
      priceRange,
      totalType,
      color,
      width: dimenssion?.width,
      height: dimenssion?.height,
      length: dimenssion?.length,
      credit,
      month,
      transmissionType,
      transmissionDetail,
      carVariants: CarVariants,
      carModelId: dimenssion?.id,
      lowestAssetPrice: dimenssion?.lowestAssetPrice,
      highestAssetPrice: dimenssion?.highestAssetPrice,
      dpAmount: dpAmount,
    }
    setInfo(info)
  }

  const fetchAllCarModels = async () => {
    const response = await getNewFunnelRecommendationsByCity(
      defaultCity.id,
      defaultCity.cityCode,
    )

    setAllModalCarList(response.carRecommendations)
  }

  const fetchCarVariant = async () => {
    const response = await getCarModelDetailsById(forms.model?.modelId ?? '')
    setCarVariantList(response.variants)
    setIsSelectPassengerCar(response.isPassengerCar)
  }

  const handleChange = (name: string, value: any) => {
    setIsDataSubmitted(false)

    if (name === 'city') {
      if (!value) {
        return setForms({
          ...forms,
          [name]: value,
          variant: variantEmptyValue,
          downPaymentAmount: '0',
        })
      } else {
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

    if (name === 'monthlyIncome') {
      setIsIncomeTooLow(false)
    }

    setForms({
      ...forms,
      [name]: value,
    })
  }

  const renderErrorMessageEmpty = () => {
    return (
      <div className={`${styles.errorMessageWrapper} shake-animation-X`}>
        <span className={styles.errorMessage}>Wajib diisi</span>
      </div>
    )
  }

  const renderErrorMessageCity = () => {
    if (modelError && forms.city?.cityCode) {
      return (
        <div className={`${styles.errorMessageWrapper} shake-animation-X`}>
          <span className={styles.errorMessage}>
            Mobil tidak tersedia di kotamu. Silakan pilih kota lain.
          </span>
        </div>
      )
    } else if (isValidatingEmptyField && !forms.city) {
      return renderErrorMessageEmpty()
    } else {
      return <></>
    }
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

  const onBlurIncomeInput = () => {
    if (parseInt(forms.monthlyIncome) < 3000000) {
      setIsIncomeTooLow(true)
    }
  }

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

  const getCarOtrNumber = () => {
    return Number(forms.variant?.otr.replace('Rp', '').replaceAll('.', ''))
  }

  const getCarDiscountNumber = () => {
    return Number(forms.variant?.discount ?? 0)
  }

  const handleInstallmentTypeChange = (
    name: InstallmentTypeOptions,
    value: boolean,
  ) => {
    if (value) {
      setInstallmentType(name)
    }
  }

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

  const checkPromoCode = async () => {
    if (!forms.promoCode) {
      setPromoCodeSessionStorage('')
      handlePromoCodeValidResult(true)
      return true
    }

    try {
      setIsLoadingPromoCode(true)
      const result: any = await checkPromoCodeGias(forms.promoCode)
      setIsLoadingPromoCode(false)

      if (result.message === 'valid promo code') {
        trackVariantListPageCodeSuccess(forms.promoCode)
        if (result.citySelector) {
          const citygias = {
            id: result.citySelector.id,
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
      trackVariantListPageCodeFailed(forms.promoCode)
      setIsErrorPromoCode(true)
      setisSuccessPromoCode(false)
      handlePromoCodeValidResult(false)
      return false
    } catch (err: any) {
      setIsLoadingPromoCode(false)
      trackVariantListPageCodeFailed(forms.promoCode)
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
        })
      } catch (e: any) {
        if (e?.response?.data?.message) {
          setToastMessage(`${e?.response?.data?.message}`)
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

    setInsuranceAndPromoForAllTenure(tempArr)
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
  const onClickCalculate = async () => {
    validateFormFields()

    if (isDisableCtaCalculate) {
      return
    }

    const promoCodeValidity = await checkPromoCode()

    if (promoCodeValidity) {
      setIsLoadingCalculation(true)

      trackLCCTAHitungKemampuanClick({
        Age: `${forms.age} Tahun`,
        Angsuran_Type: forms.paymentOption,
        Car_Brand: forms?.model?.brandName || '',
        Car_Model: forms?.model?.modelName || '',
        Car_Variant: forms.variant?.variantName || '',
        City: forms.city.cityName,
        DP: `Rp${replacePriceSeparatorByLocalization(
          forms.downPaymentAmount,
          LanguageCode.id,
        )}`,
        Page_Origination: window.location.href,
        Promo: forms.promoCode,
      })

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
      }

      postLoanPermutationIncludePromo(payload)
        .then((response) => {
          const result = response.data.reverse()
          const filteredResult = getFilteredCalculationResults(result)
          setCalculationResult(filteredResult)
          generateSelectedInsuranceAndPromo(filteredResult)

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

  const scrollToElement = (elementId: string) => {
    const target = document.getElementById(elementId)
    if (target) {
      target.scrollIntoView({ block: 'center' })
    }
  }

  const scrollToResult = () => {
    const element = document.getElementById(
      'loan-calculator-form-and-result-separator',
    )
    if (element) {
      element.scrollIntoView()
      // add more scroll because global page header is fixed position
      window.scrollBy({ top: -100, left: 0 })
    }
    if (!tooltipNextDisplay || isTooltipExpired()) {
      setIsTooltipOpen(true)
      const nextDisplay = calculateNextDisplayDate().toString()
      setTooltipNextDisplay(nextDisplay)
      localStorage.setItem('tooltipNextDisplay', nextDisplay)
    }
  }

  const handleRedirectToWhatsapp = async (
    loan: SpecialRateListWithPromoType,
  ) => {
    trackLCCtaWaDirectClick(getDataForAmplitudeQualification(loan))
    const { model, variant, downPaymentAmount } = forms
    const message = `Halo, saya tertarik dengan ${model?.modelName} ${variant?.variantName} dengan DP sebesar Rp ${downPaymentAmount}, cicilan per bulannya Rp ${loan?.installment}, dan tenor ${loan?.tenure} tahun.`

    const whatsAppUrl = await getCustomerAssistantWhatsAppNumber()
    window.open(`${whatsAppUrl}?text=${encodeURI(message)}`, '_blank')
  }

  const handleClickButtonQualification = (
    loan: SpecialRateListWithPromoType,
  ) => {
    trackLCKualifikasiKreditClick(getDataForAmplitudeQualification(loan))
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

  const fetchCarRecommendations = async () => {
    const response = await getNewFunnelRecommendations({
      ...funnelQuery,
      sortBy: 'highToLow',
      age: forms?.age,
      monthlyIncome: forms?.monthlyIncome,
    })
    const filteredCarRecommendations = response.carRecommendations.filter(
      (car: any) => car.loanRank === LoanRank.Green,
    )
    setCarRecommendations(filteredCarRecommendations.slice(0, 10))
  }

  const fetchArticles = async () => {
    const response = await fetch(
      'https://www.seva.id/wp-json/foodicious/latest-posts/65',
    )
    const responseData = await response.json()
    setArticles(responseData)
  }

  const resetVariant = () => {
    // when using this func, make sure to not exec "setForms" again
    // because there will be discrepancy (set state is async)
    setForms({
      ...forms,
      variant: variantEmptyValue,
    })
  }

  const getLoanRank = (rank: string) => {
    if (rank === LoanRank.Green) {
      return 'Mudah'
    } else if (rank === LoanRank.Red) {
      return 'Sulit'
    }

    return ''
  }

  const getDataForAmplitudeQualification = (
    loan: SpecialRateListWithPromoType | null,
  ) => {
    return {
      Age: `${forms.age} Tahun`,
      Angsuran_Type: forms.paymentOption,
      Car_Brand: forms?.model?.brandName || '',
      Car_Model: forms?.model?.modelName || '',
      Car_Variant: forms.variant?.variantName || '',
      City: forms.city.cityName,
      DP: `Rp${replacePriceSeparatorByLocalization(
        forms.downPaymentAmount,
        LanguageCode.id,
      )}`,
      Page_Origination: window.location.href,
      Promo: forms.promoCode,
      Monthly_Installment: `Rp${replacePriceSeparatorByLocalization(
        loan?.installment ?? 0,
        LanguageCode.id,
      )}`,
      Peluang_Kredit: getLoanRank(loan?.loanRank ?? ''),
      Tenure: `${loan?.tenure ?? ''} Tahun`,
      Total_DP: `Rp${replacePriceSeparatorByLocalization(
        loan?.dpAmount ?? 0,
        LanguageCode.id,
      )}`,
    }
  }

  const onCloseQualificationPopUp = () => {
    trackLCKualifikasiKreditPopUpClose(
      getDataForAmplitudeQualification(selectedLoan),
    )
    setIsQualificationModalOpen(false)
  }

  const clearPromoCodeHandler = () => {
    setIsErrorPromoCode(false)
    setForms({
      ...forms,
      promoCode: '',
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.formCardHeader}>
          <div className={styles.iconWrapper}>
            <IconCalculator width={24} height={24} color="#B4231E" />
          </div>
          <h3 className={styles.formCardTitle}>Kredit</h3>
        </div>
        <span className={styles.formCardSubtitle}>
          Isi data secara lengkap untuk mengetahui hasil kemampuan finansialmu
          dengan akurat.
        </span>

        <div className={styles.formWrapper}>
          <div id="loan-calculator-form-city">
            <FormSelectCity
              isHasCarParameter={false}
              handleChange={handleChange}
              name="city"
              isError={forms?.city?.cityCode ? modelError : false}
            />
            {renderErrorMessageCity()}
          </div>
          <div id="loan-calculator-form-car-model">
            <FormSelectModelCar
              selectedCity={forms?.city?.cityCode || ''}
              handleChange={handleChange}
              name="model"
              value={forms?.model?.modelName || ''}
              valueImage={
                forms.model?.modelImage || (CarSillhouete as unknown as string)
              }
              valueId={forms?.model?.modelId || ''}
              allModelCarList={allModelCarList}
              setModelError={setModelError}
              overrideDisabled={true}
              isCheckForError={false}
              isShowArrow={false}
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
              isErrorTooLow={isIncomeTooLow}
              emitOnBlurInput={onBlurIncomeInput}
            />
            {renderIncomeErrorMessage()}
          </div>
          {/* TODO : Implement carPrice by Car Variant Price */}
          <div id="loan-calculator-form-dp">
            <DpForm
              label="Kemampuan DP (Min. 20%)"
              value={dpValue}
              percentage={dpPercentage}
              onChange={handleDpChange}
              emitDpPercentageChange={handleDpPercentageChange}
              carPriceMinusDiscount={getCarOtrNumber() - getCarDiscountNumber()}
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
            />
          </div>
          <div id="loan-calculator-form-installment-type">
            <CicilOptionForm
              name="paymentOption"
              isClicked={installmentType === InstallmentTypeOptions.ADDB}
              onClick={(value: boolean) =>
                handleInstallmentTypeChange(InstallmentTypeOptions.ADDB, value)
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
              ageList={ageOptions}
              name="age"
              handleChange={handleChange}
              defaultValue={forms.age}
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
            version={
              isDisableCtaCalculate
                ? ButtonVersion.Disable
                : ButtonVersion.PrimaryDarkBlue
            }
            size={ButtonSize.Big}
            onClick={onClickCalculate}
            disabled={
              isDisableCtaCalculate ||
              isLoadingCalculation ||
              isLoadingInsuranceAndPromo
            }
            style={{ marginTop: 32 }}
            data-testid={elementId.PDP.Button.HitungKemampuan}
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
      </div>

      <div className={styles.gap} />

      <div id="loan-calculator-form-and-result-separator"></div>

      {calculationResult.length > 0 &&
      !isLoadingCalculation &&
      !isLoadingInsuranceAndPromo &&
      isDataSubmitted ? (
        <>
          <div className={styles.formCardCalculationResult}>
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
              calculationApiPayload={calculationApiPayload}
              setFinalLoan={setFinalLoan}
            />
          </div>
          {carRecommendations.length > 0 && (
            <CarRecommendations
              carRecommendationList={carRecommendations}
              title="Rekomendasi Sesuai Kemampuan Finansialmu"
              onClick={() => {
                return
              }}
              selectedCity={forms?.city?.cityName}
              additionalContainerStyle={styles.recommendationAdditionalStyle}
            />
          )}

          <div className={styles.benefitCard}>
            <CreditCualificationBenefit
              additionalContainerStyle={styles.benefitAdditionalStyle}
            />
          </div>
          <Articles
            articles={articles}
            cityName={forms?.city?.cityName || ''}
            carModel={forms?.model?.modelName || ''}
            carBrand={forms?.model?.brandName || ''}
          />
        </>
      ) : (
        <></>
      )}

      <LeadsFormSecondary />
      <div className={styles.wrapper}>
        <Gap height={24} />
        <Info isWithIcon headingText="Kredit Mobil" descText={getInfoText()} />
        <div className={styles.gap} />
        <Info
          headingText={`Membeli Mobil ${info.brand} ${info.model}? Seperti Ini Cara Perawatannya!`}
          descText={getTipsText()}
        />
        <div className={styles.gap} />
      </div>

      <QualificationCreditModal
        isOpen={isQualificationModalOpen}
        onClickCloseButton={onCloseQualificationPopUp}
        formData={forms}
        selectedLoan={selectedLoan}
      />

      <Toast
        width={339}
        open={isOpenToast}
        text={toastMessage}
        typeToast={'error'}
        onCancel={() => setIsOpenToast(false)}
        closeOnToastClick
      />
    </div>
  )
}