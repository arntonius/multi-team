import { rupiah } from 'utils/handler/rupiah'
import { useLocalStorage } from 'utils/hooks/useLocalStorage'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { LeadsFormSecondary } from 'components/organisms'
import Variants from '../variants'
import {
  CarVariantRecommendation,
  CityOtrOption,
  SpecialRateListType,
} from 'utils/types/utils'
import styles from 'styles/components/organisms/price.module.scss'
import { Info } from 'components/molecules'
import { getMinimumMonthlyInstallment } from 'utils/carModelUtils/carModelUtils'
import { hundred, million } from 'utils/helpers/const'
import { availableList, availableListColors } from 'config/AvailableListColors'
import { setTrackEventMoEngage } from 'helpers/moengage'
import { useFunnelQueryData } from 'services/context/funnelQueryContext'
import { useCar } from 'services/context/carContext'
import { LanguageCode, LocalStorageKey } from 'utils/enum'
import { TrackerFlag, InstallmentTypeOptions } from 'utils/types/models'
import { getNewFunnelLoanSpecialRate } from 'utils/handler/funnel'
import dynamic from 'next/dynamic'
import { getSeoFooterTextDescription } from 'utils/config/carVariantList.config'
import { PdpDataLocalContext } from 'pages/mobil-baru/[brand]/[model]/[[...slug]]'
import { useRouter } from 'next/router'
const Modal = dynamic(() => import('antd/lib/modal'), { ssr: false })

const PopupVariantDetail = dynamic(
  () => import('components/organisms/popupVariantDetail/index'),
)

type PriceTabProps = {
  setSelectedTabValue: (value: string) => void
  setVariantIdFuelRatio: (value: string) => void
  variantFuelRatio: string | undefined
  isOTO?: boolean
}
export const PriceTab = ({
  setSelectedTabValue,
  setVariantIdFuelRatio,
  variantFuelRatio,
  isOTO = false,
}: PriceTabProps) => {
  const { carModelDetails, carVariantDetails, recommendation } = useCar()
  const {
    dataCombinationOfCarRecomAndModelDetailDefaultCity,
    carVariantDetailsResDefaultCity,
    carRecommendationsResDefaultCity,
  } = useContext(PdpDataLocalContext)
  const modelDetailWithDefaultFromServer =
    carModelDetails || dataCombinationOfCarRecomAndModelDetailDefaultCity
  const variantDetailWithDefaultFromServer =
    carVariantDetails || carVariantDetailsResDefaultCity
  const carRecommendationsWithDefaultFromServer =
    recommendation.length > 0
      ? recommendation
      : carRecommendationsResDefaultCity?.carRecommendations
  const router = useRouter()

  const [cityOtr] = useLocalStorage<CityOtrOption | null>(
    LocalStorageKey.CityOtr,
    null,
  )

  const [openModal, setOpenModal] = useState(false)
  const [variantView, setVariantView] = useState<CarVariantRecommendation>()
  const { funnelQuery } = useFunnelQueryData()
  const [flag, setFlag] = useState<TrackerFlag>(TrackerFlag.Init)
  const [monthlyInstallment, setMonthlyInstallment] = useState<number>(0)

  const trackEventMoengage = () => {
    if (!carModelDetails || !carVariantDetails || recommendation.length === 0)
      return
    const objData = {
      brand: carModelDetails?.brand,
      model: carModelDetails?.model,
      brand_model: carModelDetails?.brand + ' ' + carModelDetails?.model,
      ...(funnelQuery.downPaymentAmount && {
        down_payment: funnelQuery.downPaymentAmount,
      }),
      ...(funnelQuery.tenure &&
        funnelQuery.isDefaultTenureChanged && {
          loan_tenure: funnelQuery.tenure,
        }),
      car_seat: carVariantDetails.variantDetail.carSeats,
      body_type: carVariantDetails?.variantDetail.bodyType
        ? carVariantDetails?.variantDetail.bodyType
        : '-',
    }
    setTrackEventMoEngage('view_variant_list_price_tab', objData)
  }

  useEffect(() => {
    if (carModelDetails && carVariantDetails && recommendation) {
      trackEventMoengage()
    }
  }, [carModelDetails, carVariantDetails, recommendation])

  const sortedCarModelVariant = useMemo(() => {
    return (
      carModelDetails?.variants.sort(function (a, b) {
        return a.priceValue - b.priceValue
      }) || []
    )
  }, [carModelDetails])

  useEffect(() => {
    if (carModelDetails && flag === TrackerFlag.Init) {
      setFlag(TrackerFlag.Sent)
    }
  }, [carModelDetails])

  useEffect(() => {
    if (variantView) {
      setVariantIdFuelRatio(variantView.id)
    }
  }, [variantView])

  const getDimenssion = (payload: any) => {
    return payload.filter((car: any) => car.id === carModelDetails?.id)[0]
  }

  const getTransmissionType = (payload: any) => {
    const type: Array<string> = payload
      .map((item: any) => item.transmission)
      .filter(
        (value: any, index: number, self: any) => self.indexOf(value) === index,
      )

    return type
  }

  const getColorVariant = () => {
    const currentUrlPathName = router.asPath
    const splitedPath = currentUrlPathName.split('/')
    const carBrandModelUrl = `/${splitedPath[1]}/${splitedPath[2]}/${splitedPath[3]}`
    if (availableList.includes(carBrandModelUrl)) {
      const colorsTmp = availableListColors.filter(
        (url: any) => url.url === carBrandModelUrl,
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
  const getMonthlyInstallment = (carVariantTmp: CarVariantRecommendation) => {
    getNewFunnelLoanSpecialRate({
      otr: carVariantTmp?.priceValue - carVariantTmp?.discount,
      dp: 20,
      dpAmount: carVariantTmp?.priceValue * 0.2,
      city: cityOtr?.cityCode,
      discount: carVariantTmp?.discount,
      rateType: 'REGULAR',
      angsuranType: InstallmentTypeOptions.ADDM,
    })
      .then((res: { data: any[] }) => {
        const result = res.data.reverse()
        const selectedLoanInitialValue =
          result.filter((item: SpecialRateListType) => item.tenure === 5)[0] ??
          null
        setMonthlyInstallment(selectedLoanInitialValue.installment)
      })
      .catch(() => {
        // TODO add error toast
      })
  }
  const getPriceRange = (payload: any) => {
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
  const info = React.useMemo(() => {
    const brand = modelDetailWithDefaultFromServer?.brand || ''
    const model = modelDetailWithDefaultFromServer?.model || ''
    const type = variantDetailWithDefaultFromServer?.variantDetail.bodyType
    const seats = variantDetailWithDefaultFromServer?.variantDetail.carSeats
    const priceRange = getPriceRange(modelDetailWithDefaultFromServer?.variants)
    const totalType = modelDetailWithDefaultFromServer?.variants.length
    const color = getColorVariant()
    const dimenssion = getDimenssion(carRecommendationsWithDefaultFromServer)
    const credit = getCreditPrice(modelDetailWithDefaultFromServer?.variants)
    const month = modelDetailWithDefaultFromServer!?.variants[0].tenure * 12
    const transmissionType = getTransmissionType(
      modelDetailWithDefaultFromServer?.variants,
    )?.length
    const transmissionDetail = getTransmissionType(
      modelDetailWithDefaultFromServer?.variants,
    )?.join(' dan ')

    const temp = {
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
    }

    return temp
  }, [
    modelDetailWithDefaultFromServer,
    variantDetailWithDefaultFromServer,
    carRecommendationsWithDefaultFromServer,
  ])

  const dimension = `${info.length} x ${info.width} x ${info.height} mm`

  const getInfoText = (): string => {
    return `${info.brand} ${info.model} adalah mobil dengan ${info.seats} Kursi ${info.type} ${info.priceRange} di Indonesia. Mobil ini tersedia dalam  ${info.color} pilihan warna, ${info.totalType} tipe mobil, dan ${info.transmissionType} opsi transmisi: ${info.transmissionDetail} di Indonesia. Mobil ini memiliki dimensi sebagai berikut: ${info.length} mm L x ${info.width} mm W x ${info.height} mm H. Cicilan kredit mobil ${info.brand} ${info.model} dimulai dari Rp ${info.credit} juta selama ${info.month} bulan.`
  }

  return (
    <div>
      <div className={styles.wrapper}>
        {carModelDetails && (
          <Variants
            carModelDetails={carModelDetails}
            setOpenModal={setOpenModal}
            setViewVariant={setVariantView}
            setSelectedTabValue={setSelectedTabValue}
            onCardClick={(value) => getMonthlyInstallment(value)}
            isOTO={isOTO}
          />
        )}
        {variantView && (
          <Modal
            open={openModal}
            onCancel={() => setOpenModal(false)}
            title="Detail Mobil"
            footer={null}
            className="custom-modal"
            width={343}
            style={{ borderRadius: '8px' }}
          >
            <PopupVariantDetail
              carVariant={variantView}
              dimension={dimension}
              fuelRatio={variantFuelRatio}
              monthlyInstallment={monthlyInstallment}
            />
          </Modal>
        )}
      </div>
      <LeadsFormSecondary isOTO={isOTO} />

      <div className={styles.wrapper}>
        <div className={styles.gap} />
        <Info isWithIcon headingText="Tentang Mobil" descText={getInfoText()} />
        <div className={styles.gap} />
        <Info
          headingText={`Membeli Mobil ${info.brand} ${info.model}? Seperti Ini Cara Perawatannya!`}
          descText={getSeoFooterTextDescription(info.brand, info.model)}
          isUsingSetInnerHtmlDescText={true}
        />
        <div className={styles.gap} />
      </div>
    </div>
  )
}
