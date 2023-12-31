import React, { useContext, useEffect, useMemo, useState } from 'react'
import styles from 'styles/components/organisms/carOverView.module.scss'
import { useLocalStorage } from 'utils/hooks/useLocalStorage'
import {
  IconEdit,
  Button,
  TextButton,
  IconDownload,
  IconShare,
} from 'components/atoms'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useFunnelQueryData } from 'services/context/funnelQueryContext'
import elementId from 'helpers/elementIds'
import { variantListUrl } from 'utils/helpers/routes'
import { CityOtrOption, VariantDetail } from 'utils/types/utils'
import { useRouter } from 'next/router'
import { PdpDataLocalContext } from 'pages/mobil-baru/[brand]/[model]/[[...slug]]'
import { useCar } from 'services/context/carContext'
import { LanguageCode, LocalStorageKey } from 'utils/enum'
import { ButtonSize, ButtonVersion } from 'components/atoms/button'
import { Currency } from 'utils/handler/calculation'
import { formatNumberByLocalization } from 'utils/handler/rupiah'
import {
  formatPriceNumberThousandDivisor,
  formatPriceNumber,
} from 'utils/numberUtils/numberUtils'
import { CountlyEventNames } from 'helpers/countly/eventNames'
import {
  trackEventCountly,
  valueMenuTabCategory,
} from 'helpers/countly/countly'
import {
  PreviousButton,
  saveDataForCountlyTrackerPageViewLC,
} from 'utils/navigate'
import { PdpDataOTOLocalContext } from 'pages/adaSEVAdiOTO/mobil-baru/[brand]/[model]/[[...slug]]'
import { AdaOTOdiSEVALeadsForm } from 'components/organisms/leadsForm/adaOTOdiSEVA/popUp'
import { getCity } from 'utils/hooks/useGetCity'

interface Props {
  onClickCityOtrCarOverview: () => void
  onClickShareButton: () => void
  currentTabMenu: string
  isOTO?: boolean
  cityOtr?: CityOtrOption
}

export const CarOverview = ({
  onClickCityOtrCarOverview,
  onClickShareButton,
  currentTabMenu,
  isOTO = false,
  cityOtr,
}: Props) => {
  const {
    dataCombinationOfCarRecomAndModelDetailDefaultCity,
    carVariantDetailsResDefaultCity,
  } = useContext(isOTO ? PdpDataOTOLocalContext : PdpDataLocalContext)

  const { carModelDetails, carVariantDetails } = useCar()
  const [currentCityOtr, setCurrentCityOtr] = useState(cityOtr ?? getCity())

  const [isModalOpenend, setIsModalOpened] = useState<boolean>(false)

  const modelDetail =
    carModelDetails || dataCombinationOfCarRecomAndModelDetailDefaultCity
  const variantDetail = carVariantDetails || carVariantDetailsResDefaultCity

  const [isShowTooltip, setIsShowTooltip] = useState(false)
  const tooltipRef = useDetectClickOutside({
    onTriggered: () => {
      if (isShowTooltip) {
        setIsShowTooltip(false)
      }
    },
  })
  const { funnelQuery } = useFunnelQueryData()
  const router = useRouter()
  const { model, brand, slug } = router.query
  const [upperTabSlug, lowerTabSlug, citySlug] = slug?.length
    ? (slug as Array<string>)
    : []
  const loanRankcr = router.query.loanRankCVL ?? ''

  const sortedCarModelVariant = useMemo(() => {
    return (
      modelDetail?.variants.sort(function (a: VariantDetail, b: VariantDetail) {
        return a.priceValue - b.priceValue
      }) || []
    )
  }, [modelDetail])

  useEffect(() => {
    if (cityOtr) setCurrentCityOtr(cityOtr)
  }, [cityOtr])

  const closeLeadsForm = () => {
    setIsModalOpened(false)
  }

  const showLeadsForm = () => {
    setIsModalOpened(true)
  }

  const onClickOtrCity = () => {
    onClickCityOtrCarOverview()
  }

  const getCityWithDefault = () => {
    if (currentCityOtr && currentCityOtr.cityName) {
      return currentCityOtr.cityName
    } else {
      return 'Jakarta Pusat'
    }
  }

  const getCarPriceRange = () => {
    if (sortedCarModelVariant[0].priceValue.toString().length > 9) {
      return (
        'Rp' +
        formatPriceNumberThousandDivisor(
          formatPriceNumber(sortedCarModelVariant[0].priceValue),
          LanguageCode.id,
        ) +
        ' - ' +
        formatPriceNumberThousandDivisor(
          formatPriceNumber(
            sortedCarModelVariant[sortedCarModelVariant.length - 1].priceValue,
          ),
          LanguageCode.id,
        )
      )
    } else {
      return (
        'Rp' +
        formatNumberByLocalization(
          sortedCarModelVariant[0].priceValue,
          LanguageCode.id,
          1000000,
          10,
        ) +
        ' - ' +
        formatNumberByLocalization(
          sortedCarModelVariant[sortedCarModelVariant.length - 1].priceValue,
          LanguageCode.id,
          1000000,
          10,
        )
      )
    }
  }

  const getMonthlyInstallment = () => {
    return formatNumberByLocalization(
      sortedCarModelVariant[0].monthlyInstallment,
      LanguageCode.id,
      1000000,
      10,
    )
  }

  const getDp = () => {
    return formatNumberByLocalization(
      sortedCarModelVariant[0].dpAmount,
      LanguageCode.id,
      1000000,
      10,
    )
  }

  const getTenure = () => {
    return sortedCarModelVariant[0].tenure
  }

  const onClickShareButtonHandler = () => {
    trackClickShareCountly()
    onClickShareButton()
  }

  const trackClickCtaCountly = () => {
    trackEventCountly(CountlyEventNames.WEB_PDP_LOAN_CALCULATOR_CTA_CLICK, {
      SOURCE_SECTION: 'Main Top CTA',
      MENU_TAB_CATEGORY: valueMenuTabCategory(),
      VISUAL_TAB_CATEGORY: currentTabMenu,
      CAR_BRAND: modelDetail?.brand ?? '',
      CAR_MODEL: modelDetail?.model ?? '',
      CAR_ORDER: 'Null',
      CAR_VARIANT: 'Null',
    })
  }

  const trackClickBrochureCountly = () => {
    trackEventCountly(CountlyEventNames.WEB_PDP_BROCHURE_CLICK, {
      CAR_BRAND: modelDetail?.brand ?? '',
      CAR_MODEL: modelDetail?.model ?? '',
      VISUAL_TAB_CATEGORY: currentTabMenu,
      MENU_TAB_CATEGORY: valueMenuTabCategory(),
    })
  }

  const trackClickShareCountly = () => {
    trackEventCountly(CountlyEventNames.WEB_PDP_OPEN_SHARE_CLICK, {
      CAR_BRAND: modelDetail?.brand ?? '',
      CAR_MODEL: modelDetail?.model ?? '',
      VISUAL_TAB_CATEGORY: currentTabMenu,
      MENU_TAB_CATEGORY: valueMenuTabCategory(),
    })
  }

  const onClickDownloadBrochure = () => {
    trackClickBrochureCountly()
  }

  const onClickCalculateCta = () => {
    trackClickCtaCountly()
    saveDataForCountlyTrackerPageViewLC(PreviousButton.MainTopCta)
    window.location.href = variantListUrl
      .replace(':brand', brand as string)
      .replace(':model', model as string)
      .replace(':tab', `${upperTabSlug ?? 'Warna'}/Kredit`)
  }

  if (!modelDetail || !variantDetail) return <></>

  return (
    <div className={styles.container}>
      <h1
        className={styles.carBrandModelText}
        data-testid={elementId.Text + 'car-brand-model'}
      >
        {modelDetail?.brand + ' ' + modelDetail?.model}
      </h1>
      <p
        className={styles.carDescriptionText}
        data-testid={elementId.Text + 'car-description'}
      >
        {modelDetail?.brand + ' ' + modelDetail?.model} 2023 adalah{' '}
        {variantDetail?.variantDetail.carSeats} Seater{' '}
        {variantDetail?.variantDetail.bodyType}{' '}
        {sortedCarModelVariant.length === 1
          ? 'yang tersedia dalam daftar harga mulai dari ' +
            (sortedCarModelVariant[0].priceValue.toString().length > 9
              ? 'Rp ' +
                formatPriceNumberThousandDivisor(
                  formatPriceNumber(sortedCarModelVariant[0].priceValue),
                  LanguageCode.id,
                )
              : 'Rp ' +
                formatNumberByLocalization(
                  sortedCarModelVariant[0].priceValue,
                  LanguageCode.id,
                  1000000,
                  1,
                ))
          : 'yang tersedia dalam daftar harga ' + getCarPriceRange()}{' '}
        Juta di Indonesia.
      </p>

      <div className={styles.otrWrapper}>
        <div
          className={styles.cityInfoWrapper}
          data-testid={elementId.PDP.OTR.Widget.CTACitySelector}
        >
          <span className={styles.otrCityInfo}>
            Harga OTR{' '}
            <span
              style={{
                color: '#246ED4',
              }}
              onClick={onClickOtrCity}
              data-testid={elementId.PDP.CarOverview.CityOtr}
            >
              {getCityWithDefault()}
            </span>
          </span>
          <button
            className={styles.otrCityButton}
            onClick={onClickOtrCity}
            data-testid={elementId.PDP.CarOverview.CityOtr}
          >
            <IconEdit
              width={16}
              height={16}
              color="#246ED4"
              alt="SEVA pen Icon"
            />
          </button>
        </div>
        <h3
          className={styles.carOtrPriceText}
          data-testid={elementId.PDP.OTR.Widget.Price}
        >
          {getCarPriceRange() + ' jt'}
        </h3>
      </div>

      <div className={styles.packageWrapper}>
        <div
          className={styles.packageItem}
          style={{ flex: 1 }}
          data-testid={elementId.PDP.CarOverview.Cicilan}
        >
          <span className={styles.packageLabel}>Cicilan</span>
          <span className={styles.packageValue}>
            Rp
            {getMonthlyInstallment()} jt/bln
          </span>
        </div>
        <div
          className={styles.packageItem}
          style={{ flex: 1 }}
          data-testid={elementId.PDP.CarOverview.DPValue}
        >
          <span className={styles.packageLabel}>DP</span>
          <span className={styles.packageValue}>
            Rp
            {getDp()} jt
          </span>
        </div>
        <div
          className={styles.packageItem}
          data-testid={elementId.PDP.CarOverview.TenorValue}
        >
          <span className={styles.packageLabel}>Tenor</span>
          <span className={styles.packageValue}>{getTenure()} Tahun</span>
        </div>
      </div>

      <div className={styles.downloadBrochureWrapper}>
        <a
          href={variantDetail?.variantDetail.pdfUrl}
          style={{ width: '100%' }}
          target="_blank"
          rel="noreferrer"
          data-testid={elementId.PDP.CarOverview.DownloadBrochure}
          onClick={onClickDownloadBrochure}
        >
          <TextButton
            leftIcon={() => (
              <IconDownload
                width={16}
                height={16}
                color="#246ED4"
                alt="SEVA download Icon"
              />
            )}
            data-testid={elementId.PDP.CTA.UnduhBrosur}
          >
            Unduh Brosur
          </TextButton>
        </a>
      </div>

      <div className={styles.ctaAndShareGroup}>
        <div className={styles.ctaWrapper}>
          <Button
            version={ButtonVersion.PrimaryDarkBlue}
            size={ButtonSize.Big}
            onClick={isOTO ? showLeadsForm : onClickCalculateCta}
            data-testid={elementId.PDP.Button.HitungKemampuan}
          >
            {isOTO ? 'Saya Tertarik' : 'Hitung Kemampuan'}
          </Button>
        </div>

        <button
          className={styles.shareButton}
          onClick={onClickShareButtonHandler}
          data-testid={elementId.PDP.Button.Share}
        >
          <IconShare
            width={32}
            height={32}
            color="#05256E"
            alt="SEVA Share Icon"
          />
        </button>
      </div>
      {isModalOpenend && (
        <AdaOTOdiSEVALeadsForm
          onCancel={closeLeadsForm}
          onPage="PDP"
          isProduct={true}
        />
      )}
    </div>
  )
}
