import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from '/styles/components/organisms/filtermobile.module.scss'
import {
  IconChevronDown,
  IconChevronUp,
  BottomSheet,
  Button,
  // Overlay,
} from 'components/atoms'
import { FormSelectBrandUsedCar } from '../../molecules/form/formSelectBrandUsedCar'
import { FormYear } from '../../molecules/form/formYear'
import { FormPriceUsedCar } from '../../molecules/form/formPriceUsedCar'
import { FormMileage } from 'components/molecules/form/formMileage'
import { FormTenure } from '../../molecules/form/formTenure'
import { FormCarLocation } from '../../molecules/form/formCarLocation'
import { toNumber } from 'utils/stringUtils'
import { AxiosResponse } from 'axios'
import { useFunnelQueryUsedCarData } from 'services/context/funnelQueryUsedCarContext'
import elementId from 'helpers/elementIds'
import urls from 'utils/helpers/url'
import { useRouter } from 'next/router'
import { CarRecommendationResponse, FunnelQuery } from 'utils/types/context'
import { usedCar } from 'services/context/usedCarContext'
import { ButtonSize, ButtonVersion } from 'components/atoms/button'
import { PreviousButton, navigateToPLP } from 'utils/navigate'
import { trackEventCountly } from 'helpers/countly/countly'
import { CountlyEventNames } from 'helpers/countly/eventNames'
import { FormTransmission } from 'components/molecules/form/formTransmission'
import { FormPlate } from 'components/molecules/form/formPlate'
import { getUsedCarFunnelRecommendations } from 'utils/handler/funnel'
import { getBrandList, getUsedCarCityList } from 'services/api'

interface ParamsUrl {
  bodyType?: string
  brand?: string
  sortBy?: string
  priceStart?: string
  priceEnd?: string
  mileageStart?: string | number
  mileageEnd?: string | number
  yearStart?: string | number
  yearEnd?: string | number
  transmission?: string
  cityId?: string
}

type FilterMobileProps = {
  onButtonClick?: (value: boolean) => void
  isButtonClick: boolean
  minMaxPrice?: any
  minMaxYear?: any
  minMaxMileage?: any
  isFilter?: any
  setIsFilter?: any
  isResetFilter?: boolean
  setCityListPLP?: any
  setIsResetFilter?: (value: boolean) => void
  isErrorIncome?: boolean
  setIsErrorIncome?: (value: boolean) => void
}
const FilterMobileUsedCar = ({
  onButtonClick,
  isButtonClick,
  minMaxPrice,
  minMaxYear,
  minMaxMileage,
  isFilter,
  setIsFilter,
  setCityListPLP,
  isResetFilter,
  setIsResetFilter,
}: FilterMobileProps) => {
  const router = useRouter()
  const { cityList, brandList } = usedCar()
  const { brand, transmission, plate } = router.query

  const { funnelQuery, patchFunnelQuery } = useFunnelQueryUsedCarData()
  const [transmissionFilter, setTransmissionFilter] = useState(
    funnelQuery?.transmission ? funnelQuery?.transmission : [],
  )
  const [plateFilter, setPlateFilter] = useState(
    funnelQuery?.plate ? funnelQuery?.plate : [],
  )
  const onClickClose = () => {
    setTimeout(() => {
      onButtonClick && onButtonClick(false)
      setIsApplied(false)
    }, 100)
  }
  const [isErrorForm, setIsErrorForm] = useState(false)
  const [, setLoading] = useState(false)

  const [minPriceFilter, setMinPriceFilter] = useState(
    funnelQuery.priceStart
      ? funnelQuery.priceStart?.toString()
      : minMaxPrice.minPriceValue,
  )
  const [maxPriceFilter, setMaxPriceFilter] = useState(
    funnelQuery.priceEnd
      ? funnelQuery.priceEnd?.toString()
      : minMaxPrice.maxPriceValue,
  )
  // Year
  const [minYearFilter, setMinYearFilter] = useState(
    funnelQuery.yearStart
      ? funnelQuery.yearStart?.toString()
      : minMaxYear.minYearValue,
  )
  const [maxYearFilter, setMaxYearFilter] = useState(
    funnelQuery.yearEnd
      ? funnelQuery.yearEnd?.toString()
      : minMaxYear.maxYearValue,
  )
  const [minMileageFilter, setMinMileageFilter] = useState(
    funnelQuery.mileageStart
      ? funnelQuery.mileageStart?.toString()
      : minMaxMileage.minMileageValue,
  )
  const [maxMileageFilter, setMaxMileageFilter] = useState(
    funnelQuery.mileageEnd
      ? funnelQuery.mileageEnd?.toString()
      : minMaxMileage.maxMileageValue,
  )

  const [locationSelected, setLocationSelected] = useState(
    funnelQuery.cityId ? funnelQuery.cityId : [],
  )

  const [isCheckedBrand, setIsCheckedBrand] = useState<string[]>(
    funnelQuery.brand ? funnelQuery.brand : [],
  )

  const { saveRecommendation, saveTotalItems } = usedCar()
  const [isApplied, setIsApplied] = useState(false)
  const [resetTmp, setResetTmp] = useState(false)

  useEffect(() => {
    if (!isButtonClick && resetTmp) {
      setResetTmp(false)
    }
    if (funnelQuery.brand !== isCheckedBrand) {
      setIsCheckedBrand(funnelQuery.brand ? funnelQuery.brand : [])
    }
    if (funnelQuery.cityId !== locationSelected) {
      setLocationSelected(funnelQuery.cityId ? funnelQuery.cityId : [])
    }
  }, [isFilter, isButtonClick])

  const onSubmitFilter = () => {
    setIsApplied(true)
    if (resetTmp) {
      const resetBrandAndBodyType: FunnelQuery = {
        brand: [],
        modelName: [],
        cityId: [],
        transmission: [],
        plate: [],
        yearEnd: '',
        yearStart: '',
        mileageEnd: '',
        mileageStart: '',
        priceEnd: '',
        priceStart: '',
      }
      setIsFilter(false)
      setIsCheckedBrand([])
      setLocationSelected([])
      setTransmissionFilter([])
      patchFunnelQuery(resetBrandAndBodyType)
      setIsResetFilter && setIsResetFilter(true)
    }

    onSubmitProcess()
  }

  const onSubmitProcess = async () => {
    setIsResetFilter && setIsResetFilter(false)

    setLoading(true)
    const paramUpdate = {
      ...paramQuery,
      brand: !resetTmp && isCheckedBrand.length > 0 ? isCheckedBrand : [],
      cityId: !resetTmp && locationSelected.length > 0 ? locationSelected : [],
      transmission:
        !resetTmp && transmissionFilter.length > 0 ? transmissionFilter : [],
      plate: !resetTmp && plateFilter.length > 0 ? plateFilter : [],
      sortBy: funnelQuery.sortBy,
      yearEnd: '',
      yearStart: '',
      mileageEnd: '',
      mileageStart: '',
      modelName: [],
      priceEnd: '',
      priceStart: '',
      page: '1',
      perPage: '10',
    }
    if (!resetTmp) {
      if (
        (minPriceFilter != minMaxPrice.minPriceValue ||
          maxPriceFilter != minMaxPrice.maxPriceValue) &&
        minPriceFilter !== 0 &&
        maxPriceFilter !== 0
      ) {
        paramUpdate.priceStart = minPriceFilter
        paramUpdate.priceEnd = maxPriceFilter
      }
    }
    if (!resetTmp) {
      if (
        (minYearFilter != minMaxYear.minYearValue ||
          maxYearFilter != minMaxPrice.maxYearValue) &&
        minYearFilter !== 0 &&
        maxYearFilter !== 0
      ) {
        paramUpdate.yearStart = minYearFilter
        paramUpdate.yearEnd = maxYearFilter
      }
    }
    if (!resetTmp) {
      if (
        (minMileageFilter != minMaxMileage.minMileageValue ||
          maxMileageFilter != minMaxMileage.maxMileageValue) &&
        minMileageFilter !== 0 &&
        maxMileageFilter !== 0
      ) {
        paramUpdate.mileageStart = minMileageFilter
        paramUpdate.mileageEnd = maxMileageFilter
      }
    }

    getUsedCarFunnelRecommendations(paramUpdate)
      .then((response: any) => {
        handleSuccess(response)
        setLoading(false)
      })
      .catch((e: AxiosResponse<CarRecommendationResponse>) => {
        setLoading(false)
        handleSuccess(e)
      })
  }

  const handleSuccess = async (response: any) => {
    const dataFunnelQuery: FunnelQuery = {
      brand: !resetTmp && isCheckedBrand.length > 0 ? isCheckedBrand : [],
      cityId: !resetTmp && locationSelected.length > 0 ? locationSelected : [],
      transmission:
        !resetTmp && transmissionFilter.length > 0 ? transmissionFilter : [],
      plate: !resetTmp && plateFilter.length > 0 ? plateFilter : [],
      sortBy: funnelQuery.sortBy || 'lowToHigh',
      modelName: [],
      priceStart: '',
      priceEnd: '',
      yearStart: '',
      yearEnd: '',
      mileageEnd: '',
      mileageStart: '',
    }
    const paramUrl: ParamsUrl = {
      ...(!resetTmp &&
        isCheckedBrand.length > 0 && { brand: String(isCheckedBrand) }),
      ...(!resetTmp &&
        locationSelected.length > 0 && {
          cityId: String(locationSelected),
        }),
      ...(!resetTmp &&
        transmissionFilter.length > 0 && {
          transmission: String(transmissionFilter),
        }),
      ...(!resetTmp &&
        plateFilter.length > 0 && {
          plate: String(plateFilter),
        }),
      // ...(funnelQuery.sortBy && { sortBy: String(funnelQuery.sortBy) }),
    }
    if (!resetTmp) {
      if (
        (minPriceFilter != minMaxPrice.minPriceValue ||
          maxPriceFilter != minMaxPrice.maxPriceValue) &&
        minPriceFilter !== 0 &&
        maxPriceFilter !== 0
      ) {
        paramUrl.priceStart = minPriceFilter
        paramUrl.priceEnd = maxPriceFilter
        dataFunnelQuery.priceStart = minPriceFilter
        dataFunnelQuery.priceEnd = maxPriceFilter
      }
    }
    if (!resetTmp) {
      if (
        (minYearFilter != minMaxYear.minYearValue ||
          maxYearFilter != minMaxYear.maxYearValue) &&
        minYearFilter !== 0 &&
        maxYearFilter !== 0
      ) {
        paramUrl.yearStart = minYearFilter
        paramUrl.yearEnd = maxYearFilter
        dataFunnelQuery.yearStart = minYearFilter
        dataFunnelQuery.yearEnd = maxYearFilter
      }
    }
    if (!resetTmp) {
      if (
        (minMileageFilter != minMaxMileage.minMileageValue ||
          maxMileageFilter != minMaxMileage.maxMileageValue) &&
        minMileageFilter !== 0 &&
        maxMileageFilter !== 0
      ) {
        paramUrl.mileageStart = minMileageFilter
        paramUrl.mileageEnd = maxMileageFilter
        dataFunnelQuery.mileageStart = minMileageFilter
        dataFunnelQuery.mileageEnd = maxMileageFilter
      }
    }

    patchFunnelQuery(dataFunnelQuery)
    saveTotalItems(response?.totalItems || 0)
    saveRecommendation(response?.carData || [])
    setResetTmp(false)
    navigateToPLP(
      PreviousButton.SmartSearch,
      { query: { ...paramUrl } },
      true,
      false,
      urls.internalUrls.usedCarResultsUrl,
    )
    onClickClose()
  }

  const paramQuery = funnelQuery

  const resultRef = useRef<null | HTMLDivElement>(null)
  const scrollToSection = () => {
    resultRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const priceRef = useRef<null | HTMLDivElement>(null)
  const yearRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (isButtonClick) {
      setTimeout(() => scrollToTopDiv(), 200)
    }
  }, [isButtonClick])

  const topDiv = useRef<null | HTMLDivElement>(null)
  const scrollToTopDiv = () => {
    topDiv.current?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
  }

  const resetFilter = () => {
    setResetTmp(true)
    if (isApplied) {
      setIsFilter(false)
      setIsResetFilter && setIsResetFilter(true)
    }
    trackEventCountly(CountlyEventNames.WEB_PLP_FILTER_RESET_CLICK)
  }
  return (
    <div>
      {/* <Overlay isShow={isButtonClick} onClick={onClickClose} zIndex={98} /> */}
      <BottomSheet
        className={`${styles.wrapper} ${styles.headerContent}`}
        open={isButtonClick || false}
        onDismiss={() => {
          !isResetFilter
          onClickClose()
        }}
        title="Filter"
        closeDatatestid={elementId.PLP.Close.Button.FilterPopup}
      >
        <>
          <div ref={topDiv} />
          <div className={styles.enhanceMargin}>
            <div className={styles.labelForm}>Merek Mobil</div>
            <FormSelectBrandUsedCar
              setIsCheckedBrand={setIsCheckedBrand}
              isResetFilter={isResetFilter || resetTmp}
              isApplied={isButtonClick && isFilter && isApplied}
              brand={brand}
              brandList={brandList}
              setResetTmp={setResetTmp}
              isButtonClick={isButtonClick}
            />
            <div ref={yearRef} className={styles.labelForm}>
              Tahun Mobil
            </div>
            <FormYear
              minMaxYear={minMaxYear}
              setMinYearFilter={setMinYearFilter}
              setMaxYearFilter={setMaxYearFilter}
              isResetFilter={isResetFilter || resetTmp}
              setIsErrorForm={setIsErrorForm}
              isApplied={isButtonClick && isFilter && isApplied}
              isButtonClick={isButtonClick}
            />
            <div className={styles.labelForm}>Transmisi</div>
            <FormTransmission
              setTransmissionFilter={setTransmissionFilter}
              isResetFilter={isResetFilter || resetTmp}
              isApplied={isApplied}
              transmission={transmission}
              transmissionFilter={transmissionFilter}
              isButtonClick={isButtonClick}
            />
            <div className={styles.labelForm}>Plat Nomor</div>
            <FormPlate
              setPlateFilter={setPlateFilter}
              isResetFilter={isResetFilter || resetTmp}
              isApplied={isApplied}
              plate={plate}
              isButtonClick={isButtonClick}
            />
            <div className={styles.labelForm}>Lokasi Mobil</div>
            <FormCarLocation
              cityList={cityList}
              setLocationSelected={setLocationSelected}
              isResetFilter={isResetFilter || resetTmp}
              isApplied={isApplied}
            />
            <div ref={yearRef} className={styles.labelForm}>
              Kilometer
            </div>
            <FormMileage
              minMaxMileage={minMaxMileage}
              setMinMileageFilter={setMinMileageFilter}
              setMaxMileageFilter={setMaxMileageFilter}
              isResetFilter={isResetFilter || resetTmp}
              setIsErrorForm={setIsErrorForm}
              isApplied={isButtonClick && isFilter && isApplied}
              isButtonClick={isButtonClick}
            />
            <div ref={priceRef} className={styles.labelForm}>
              Kisaran Harga
            </div>
            <FormPriceUsedCar
              minMaxPrice={minMaxPrice}
              setMinPriceFilter={setMinPriceFilter}
              setMaxPriceFilter={setMaxPriceFilter}
              isResetFilter={isResetFilter || resetTmp}
              setIsErrorForm={setIsErrorForm}
              isApplied={isButtonClick && isFilter && isApplied}
              isButtonClick={isButtonClick}
            />
          </div>
        </>

        <div className={styles.footerButton}>
          <Button
            onClick={resetFilter}
            disabled={!isFilter}
            version={ButtonVersion.Secondary}
            size={ButtonSize.Big}
            data-testid={elementId.FilterButton.Reset}
          >
            Atur Ulang
          </Button>
          <Button
            onClick={onSubmitFilter}
            version={ButtonVersion.PrimaryDarkBlue}
            size={ButtonSize.Big}
            disabled={
              Number(
                minPriceFilter ? minPriceFilter : minMaxPrice.minPriceValue,
              ) < minMaxPrice.minPriceValue ||
              Number(
                maxPriceFilter ? maxPriceFilter : minMaxPrice.maxPriceValue,
              ) > minMaxPrice.maxPriceValue ||
              isErrorForm
            }
            data-testid={elementId.FilterButton.Submit}
          >
            Terapkan
          </Button>
        </div>
      </BottomSheet>
    </div>
  )
}

export default FilterMobileUsedCar
