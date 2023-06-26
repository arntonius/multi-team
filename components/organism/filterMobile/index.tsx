import 'react-spring-bottom-sheet/dist/style.css'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../../../styles/saas/components/organism/filtermobile.module.scss'
import {
  IconChevronDown,
  IconChevronUp,
  BottomSheet,
  // Overlay,
} from 'components/atoms'
import { Button, ButtonSize, ButtonVersion } from '../../atoms/button'
import { FormSelectBrandCar } from '../../molecules/form/formSelectBrandCar'
import { FormSelectTypeCar } from '../../molecules/form/formSelectTypeCar'
import { FormPrice } from '../../molecules/form/formPrice'
import { FormDP } from '../../molecules/form/formDP'
import { FormIncome } from '../../molecules/form/formIncome'
import { FormTenure } from '../../molecules/form/formTenure'
import { FormAge } from '../../molecules/form/formAge'
import { toNumber } from 'utils/stringUtils'
// import { trackFilterCarResults } from 'helpers/amplitude/newFunnelEventTracking'
import { AxiosResponse } from 'axios'
import { useFunnelQueryData } from 'context/funnelQueryContext/funnelQueryContext'
import { useFinancialQueryData } from 'context/financialQueryContext/financialQueryContext'
import {
  CarResultPageFilterParam,
  trackPLPClearFilter,
  trackPLPFilterShow,
  trackPLPSubmitFilter,
} from 'helpers/amplitude/seva20Tracking'
import { Currency } from 'utils/numberUtils/numberUtils'
import { carResultsUrl } from 'routes/routes'
import elementId from 'helpers/elementIds'
import { useRouter } from 'next/router'
import { useContextRecommendations } from 'context/recommendationsContext/recommendationsContext'
import { CarRecommendationResponse, FunnelQuery } from 'utils/types/context'
import { getNewFunnelRecommendations } from 'services/newFunnel'

interface ParamsUrl {
  age: string
  downPaymentAmount: string
  monthlyIncome: string
  bodyType: string
  brand: string
  sortBy: string
  tenure: string | number
  priceRangeGroup?: string
}

type FilterMobileProps = {
  onButtonClick?: (value: boolean) => void
  isButtonClick: boolean
  minMaxPrice?: any
  isFilter?: any
  isFilterFinancial?: any
  setIsFilter?: any
  isResetFilter?: boolean
  setIsResetFilter?: (value: boolean) => void
  isErrorIncome?: boolean
  setIsErrorIncome?: (value: boolean) => void
}
export const FilterMobile = ({
  onButtonClick,
  isButtonClick,
  minMaxPrice,
  isFilter,
  isFilterFinancial,
  setIsFilter,
  isResetFilter,
  setIsResetFilter,
}: FilterMobileProps) => {
  const router = useRouter()
  const { bodyType, brand } = router.query
  const { funnelQuery, patchFunnelQuery } = useFunnelQueryData()
  const { financialQuery, patchFinancialQuery } = useFinancialQueryData()
  const onClickClose = () => {
    setTimeout(() => {
      onButtonClick && onButtonClick(false)
      setIsApplied(false)
    }, 100)
  }
  const [collapseFirst, setCollapseFirst] = useState(false)
  const [collapseTwo, setCollapseTwo] = useState(false)
  const [isErrorForm, setIsErrorForm] = useState(false)
  const [, setLoading] = useState(false)
  const [tenureFilter, setTenureFilter] = useState(funnelQuery.tenure)
  const [ageFilter, setAgeFilter] = useState(funnelQuery.age)
  const [incomeAmount, setIncomeAmount] = useState(funnelQuery.monthlyIncome)
  const [downPaymentAmount, setDownPaymentAmount] = useState(
    funnelQuery.downPaymentAmount,
  )

  const [minPriceFilter, setMinPriceFilter] = useState(
    funnelQuery.priceRangeGroup
      ? funnelQuery.priceRangeGroup?.toString().split('-')[0]
      : minMaxPrice.minPriceValue,
  )
  const [maxPriceFilter, setMaxPriceFilter] = useState(
    funnelQuery.priceRangeGroup
      ? funnelQuery.priceRangeGroup?.toString().split('-')[1]
      : minMaxPrice.maxPriceValue,
  )
  const [isCheckedBrand, setIsCheckedBrand] = useState<string[]>(
    funnelQuery.brand ? funnelQuery.brand : [],
  )
  const [isCheckedType, setIsCheckedType] = useState<string[]>(
    funnelQuery.bodyType ? funnelQuery.bodyType : [],
  )
  const [isErrorAge, setIsErrorAge] = useState(false)
  const [isErrorDp, setIsErrorDp] = useState(false)
  const [isErrorMinMaxDP, setIsErrorMinMaxDP] = useState('0')
  const [isErrorIncome, setIsErrorIncome] = useState(false)
  const { setRecommendations } = useContextRecommendations()
  const [isApplied, setIsApplied] = useState(false)
  const [resetTmp, setResetTmp] = useState(false)

  const trackFilterAction = (): CarResultPageFilterParam => {
    const minPrice = minPriceFilter || minMaxPrice.minPriceValue
    const maxPrice = maxPriceFilter || minMaxPrice.maxPriceValue
    return {
      ...(isCheckedBrand.length > 0 && {
        Car_Brand: isCheckedBrand.join(', '),
      }),
      ...(isCheckedType.length > 0 && {
        Car_Body_Type: isCheckedType.join(', '),
      }),
      Min_Price: `Rp${Currency(String(minPrice))}`,
      Max_Price: `Rp${Currency(String(maxPrice))}`,
      ...(downPaymentAmount && {
        DP: `Rp${Currency(String(downPaymentAmount))}`,
      }),
      ...(incomeAmount && {
        Income: `Rp${Currency(String(incomeAmount))}`,
      }),
      ...(tenureFilter && {
        Tenure: String(tenureFilter),
      }),
      ...(ageFilter && {
        Age: String(ageFilter),
      }),
    }
  }

  const onCollapseFirst = () => {
    if (collapseFirst) setCollapseFirst(false)
    else setCollapseFirst(true)
  }

  const onCollapseTwo = () => {
    if (collapseTwo) {
      setCollapseTwo(false)
      setIsErrorDp(false)
      setIsErrorIncome(false)
      setIsErrorAge(false)
    } else setCollapseTwo(true)
    setTimeout(() => scrollToSection(), 200)
  }

  useEffect(() => {
    if (isFilter) {
      setCollapseFirst(true)
    }
    if (isFilterFinancial) {
      setCollapseTwo(true)
    }
    if (!isButtonClick && resetTmp) {
      setResetTmp(false)
    }
  }, [isFilter, isFilterFinancial, isButtonClick])

  const onSubmitFilter = () => {
    setIsApplied(true)
    if (resetTmp) {
      const resetBrandAndBodyType: FunnelQuery = {
        bodyType: [],
        brand: [],
      }
      setIsFilter(false)
      setIsCheckedBrand([])
      setIsCheckedType([])
      patchFunnelQuery(resetBrandAndBodyType)
      trackPLPClearFilter(trackFilterAction())
      setIsResetFilter && setIsResetFilter(true)
      setIsErrorMinMaxDP('0')
      setIsErrorAge(false)
    }
    if (ageFilter || downPaymentAmount || incomeAmount) {
      if (
        !ageFilter ||
        Number(downPaymentAmount) < 20000000 ||
        (Number(downPaymentAmount) >= 20000000 &&
          Number(downPaymentAmount) <
            (minPriceFilter
              ? (Number(minPriceFilter) / 100) * 20
              : (Number(minMaxPrice.minPriceValue) / 100) * 20)) ||
        (Number(downPaymentAmount) >= 20000000 &&
          Number(downPaymentAmount) >
            (maxPriceFilter
              ? (Number(maxPriceFilter) / 100) * 90
              : (Number(minMaxPrice.maxPriceValue) / 100) * 90)) ||
        Number(incomeAmount) < 3000000
      ) {
        setCollapseTwo(true)
        if (!ageFilter) {
          setIsErrorAge(true)
          setTimeout(() => scrollToAge(), 200)
        }
        if (Number(incomeAmount) < 3000000) {
          setIsErrorIncome(true)
          setTimeout(() => scrollToIncome(), 200)
        }
        if (
          Number(downPaymentAmount) >= 20000000 &&
          Number(downPaymentAmount) <
            (minPriceFilter
              ? (Number(minPriceFilter) / 100) * 20
              : (Number(minMaxPrice.minPriceValue) / 100) * 20)
        ) {
          setIsErrorMinMaxDP('1')
          setTimeout(() => scrollToDp(), 200)
        }
        if (
          Number(downPaymentAmount) >= 20000000 &&
          Number(downPaymentAmount) >
            (maxPriceFilter
              ? (Number(maxPriceFilter) / 100) * 90
              : (Number(minMaxPrice.maxPriceValue) / 100) * 90)
        ) {
          setIsErrorMinMaxDP('2')
          setTimeout(() => scrollToDp(), 200)
        }
        if (Number(downPaymentAmount) < 20000000) {
          setIsErrorDp(true)
          setTimeout(() => scrollToDp(), 200)
        }
        return
      }
    }
    onSubmitProcess()
  }

  const onSubmitProcess = async () => {
    setIsErrorAge(false)
    setIsErrorMinMaxDP('0')
    setIsResetFilter && setIsResetFilter(false)
    const filterCarResult = {
      maxMonthlyInstallments: toNumber(
        funnelQuery.monthlyInstallment as string,
      ),
      downPayment: toNumber(funnelQuery.downPaymentAmount as string),
      downPaymentPercentage: funnelQuery.downPaymentPercentage
        ? Number(funnelQuery.downPaymentPercentage) / 100
        : null,
      brands: funnelQuery.brand ? funnelQuery.brand : [],
      tenure: tenureFilter,
      minPrice: minPriceFilter,
      maxPrice: maxPriceFilter,
    }
    // trackFilterCarResults(filterCarResult)
    setLoading(true)
    const paramUpdate = {
      ...paramQuery,
      age: ageFilter,
      // downPaymentType: DownPaymentType.DownPaymentAmount,
      downPaymentAmount: downPaymentAmount,
      monthlyIncome: incomeAmount,
      bodyType: !resetTmp && isCheckedType.length > 0 ? isCheckedType : [],
      // sortBy: sortBy,
      brand: !resetTmp && isCheckedBrand.length > 0 ? isCheckedBrand : [],
      tenure: tenureFilter,
      sortBy: funnelQuery.sortBy,
    }
    if (!resetTmp) {
      if (
        (minPriceFilter != minMaxPrice.minPriceValue ||
          maxPriceFilter != minMaxPrice.maxPriceValue) &&
        minPriceFilter !== 0 &&
        maxPriceFilter !== 0
      ) {
        paramUpdate.priceRangeGroup = minPriceFilter + '-' + maxPriceFilter
      }
    }

    getNewFunnelRecommendations(paramUpdate)
      .then((response: AxiosResponse<CarRecommendationResponse>) => {
        handleSuccess(response)
        setLoading(false)
      })
      .catch((e: AxiosResponse<CarRecommendationResponse, any>) => {
        setLoading(false)
        handleSuccess(e)
      })
  }

  const handleSuccess = async (
    response: AxiosResponse<CarRecommendationResponse>,
  ) => {
    const dataFunnelQuery: FunnelQuery = {
      age: ageFilter,
      // downPaymentType: DownPaymentType.DownPaymentAmount,
      // sortBy: sortBy,
      priceRangeGroup: '',
      downPaymentAmount:
        (downPaymentAmount && downPaymentAmount.toString()) || '',
      monthlyIncome: (incomeAmount && incomeAmount.toString()) || '',
      bodyType: !resetTmp && isCheckedType.length > 0 ? isCheckedType : [],
      brand: !resetTmp && isCheckedBrand.length > 0 ? isCheckedBrand : [],
      tenure: tenureFilter,
      sortBy: funnelQuery.sortBy || 'lowToHigh',
    }
    const paramUrl: ParamsUrl = {
      // sortBy: sortBy,
      age: String(ageFilter),
      priceRangeGroup: '',
      downPaymentAmount:
        (downPaymentAmount && downPaymentAmount.toString()) || '',
      monthlyIncome: (incomeAmount && incomeAmount.toString()) || '',
      bodyType:
        !resetTmp && isCheckedType.length > 0 ? String(isCheckedType) : '',
      brand:
        !resetTmp && isCheckedBrand.length > 0 ? String(isCheckedBrand) : '',
      tenure: String(tenureFilter),
      sortBy: String(funnelQuery.sortBy) || 'lowToHigh',
    }
    if (!resetTmp) {
      if (
        (minPriceFilter != minMaxPrice.minPriceValue ||
          maxPriceFilter != minMaxPrice.maxPriceValue) &&
        minPriceFilter !== 0 &&
        maxPriceFilter !== 0
      ) {
        paramUrl.priceRangeGroup = minPriceFilter + '-' + maxPriceFilter
        dataFunnelQuery.priceRangeGroup = minPriceFilter + '-' + maxPriceFilter
      }
    }
    const dataFinancial = {
      ...financialQuery,
      age: ageFilter ? String(ageFilter) : financialQuery.age,
      downPaymentAmount: downPaymentAmount
        ? downPaymentAmount
        : financialQuery.downPaymentAmount,
      monthlyIncome: incomeAmount ? incomeAmount : financialQuery.monthlyIncome,
      tenure: tenureFilter ? String(tenureFilter) : financialQuery.tenure,
    }
    patchFinancialQuery(dataFinancial)
    patchFunnelQuery(dataFunnelQuery)

    router.replace({
      pathname: carResultsUrl,
      query: { ...paramUrl },
    })

    setRecommendations(response?.data?.carRecommendations || [])
    trackPLPSubmitFilter(trackFilterAction())
    onClickClose()
    setResetTmp(false)
  }

  // const handleError = (errorCode: number) => {
  //   if (errorCode === 500) {
  //     setRecommendations([])
  //   } else {
  //     setRecommendations([])
  //   }
  // }
  const paramQuery = funnelQuery

  const resultRef = useRef<null | HTMLDivElement>(null)
  const scrollToSection = () => {
    resultRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const priceRef = useRef<null | HTMLDivElement>(null)
  const scrollToPrice = () => {
    setCollapseFirst(true)
    setTimeout(
      () =>
        priceRef.current?.scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
        }),
      200,
    )
  }
  const dpRef = useRef<null | HTMLDivElement>(null)
  const scrollToDp = () => {
    dpRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
  }
  const incomeRef = useRef<null | HTMLDivElement>(null)
  const scrollToIncome = () => {
    incomeRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
  }
  const ageRef = useRef<null | HTMLDivElement>(null)
  const scrollToAge = () => {
    ageRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
  }
  const resetFilter = () => {
    setResetTmp(true)
    if (isApplied) {
      setIsFilter(false)
      trackPLPClearFilter(trackFilterAction())
      setIsResetFilter && setIsResetFilter(true)
      setIsErrorMinMaxDP('0')
      setIsErrorAge(false)
    }
  }
  return (
    <div>
      {/* <Overlay isShow={isButtonClick} onClick={onClickClose} zIndex={98} /> */}
      <BottomSheet
        className={`${styles.wrapper} ${styles.headerContent}`}
        open={isButtonClick || false}
        onDismiss={() => {
          !isResetFilter && trackPLPFilterShow(false)
          onClickClose()
        }}
        title="Filter"
        closeDatatestid={elementId.PLP.Close.Button.FilterPopup}
      >
        <div
          onClick={onCollapseFirst}
          className={`${styles.collapse} `}
          data-testid={elementId.PLP.Dropdown.DetailMobil}
        >
          <p className={styles.textCollapse}>Detail Mobil</p>{' '}
          {collapseFirst ? (
            <IconChevronUp width={24} height={24} />
          ) : (
            <IconChevronDown width={24} height={24} />
          )}
        </div>
        {collapseFirst ? (
          <>
            <div className={styles.labelForm}>Merek Mobil</div>
            <FormSelectBrandCar
              setIsCheckedBrand={setIsCheckedBrand}
              isResetFilter={isResetFilter || resetTmp}
              isApplied={isButtonClick && isFilter && isApplied}
              brand={brand}
              setResetTmp={setResetTmp}
              isButtonClick={isButtonClick}
            />
            <div className={styles.labelForm}>Tipe Mobil</div>
            <FormSelectTypeCar
              setIsCheckedType={setIsCheckedType}
              isResetFilter={isResetFilter || resetTmp}
              isApplied={isButtonClick && isFilter && isApplied}
              bodyType={bodyType}
              setResetTmp={setResetTmp}
              isButtonClick={isButtonClick}
            />
            <div ref={priceRef} className={styles.labelForm}>
              Kisaran Harga
            </div>
            <FormPrice
              minMaxPrice={minMaxPrice}
              setMinPriceFilter={setMinPriceFilter}
              setMaxPriceFilter={setMaxPriceFilter}
              isResetFilter={isResetFilter || resetTmp}
              setIsErrorForm={setIsErrorForm}
              isApplied={isButtonClick && isFilter && isApplied}
              isButtonClick={isButtonClick}
            />
          </>
        ) : (
          ''
        )}
        <div className={styles.divider}></div>
        <div className={styles.marginBot}>
          <div
            ref={resultRef}
            onClick={onCollapseTwo}
            className={`${styles.collapse}`}
            data-testid={elementId.PLP.Dropdown.FilterFinansial}
          >
            <p className={styles.textCollapse}>Filter Finansial</p>{' '}
            {collapseTwo ? (
              <IconChevronUp width={24} height={24} />
            ) : (
              <IconChevronDown width={24} height={24} />
            )}
          </div>
          {collapseTwo ? (
            <>
              <div ref={dpRef} />
              <FormDP
                collapseTwo={collapseTwo}
                setDownPaymentAmount={setDownPaymentAmount}
                isResetFilter={isResetFilter || resetTmp}
                isErrorDp={isErrorDp}
                setIsErrorDp={setIsErrorDp}
                isErrorMinMaxDP={isErrorMinMaxDP}
                setIsErrorMinMaxDP={setIsErrorMinMaxDP}
                minPriceValidation={
                  minPriceFilter ? minPriceFilter : minMaxPrice.minPriceValue
                }
                maxPriceValidation={
                  maxPriceFilter ? maxPriceFilter : minMaxPrice.maxPriceValue
                }
                scrollToPrice={scrollToPrice}
                isButtonClick={isButtonClick}
              />
              <div ref={incomeRef} />
              <FormIncome
                collapseTwo={collapseTwo}
                setIncomeAmount={setIncomeAmount}
                isResetFilter={isResetFilter || resetTmp}
                isErrorIncome={isErrorIncome}
                setIsErrorIncome={setIsErrorIncome}
                isApplied={isApplied}
              />
              <FormTenure
                setTenureFilter={setTenureFilter}
                isResetFilter={isResetFilter || resetTmp}
                isApplied={isApplied}
              />
              <FormAge
                isErrorAge={isErrorAge}
                setAgeFilter={setAgeFilter}
                setIsErrorAge={setIsErrorAge}
                isResetFilter={isResetFilter || resetTmp}
              />
              <div ref={ageRef} />
            </>
          ) : (
            ''
          )}
        </div>
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
              isErrorDp ||
              isErrorIncome ||
              isErrorAge ||
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
