import React, { useContext, useEffect, useState } from 'react'
import styles from '../../../styles/CarList.module.css'
import {
  Brand,
  Card,
  IconArrowRight,
  IconBackButton,
  IconNextButton,
} from '../../atoms'
import { api } from '../../../services/api'
import { useIsMobile } from '../../../utils'
import {
  LocationContext,
  LocationContextType,
} from '../../../services/context/locationContext'
import { ShimmerCardProduct } from '../../atoms/shimmer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { Car } from '../../../utils/types'
type TypesShadow = {
  type: string
}
type TypesCar = {
  data: Car
}
const CarList: React.FC<TypesCar> = ({ data }): JSX.Element => {
  const isMobile = useIsMobile()
  const brandList: Array<string> = [
    'Toyota',
    'Daihatsu',
    'Isuzu',
    'BMW',
    'Peugeot',
  ]
  const [carList, setCarList] = useState<any>(data)
  const [loading, setLoading] = useState<boolean>(false)
  const [typeActive, setTypeActive] = useState<any>('Toyota')
  const { location, isInit } = useContext(
    LocationContext,
  ) as LocationContextType
  const headerText = 'Mobil Baru Terpopuler'
  const buttonText = 'LIHAT SEMUA'
  const redirectUrlNewCar = 'https://www.seva.id/mobil-baru'

  const ShadowSlide: React.FC = (): JSX.Element => (
    <div className={styles.shadowSlider}></div>
  )

  const ShadowSlideWithContent: React.FC<TypesShadow> = ({
    type,
  }): JSX.Element => (
    <a href="https://www.seva.id/mobil-baru" className={styles.shadowSlider}>
      <IconArrowRight width={24} height={24} />
      <div className={styles.wrapperLabel}>
        <p className={styles.labelText}>Lihat semua</p>
        <p className={styles.labelText}>mobil {type}</p>
      </div>
    </a>
  )

  const Undefined: React.FC = (): JSX.Element => (
    <div className={styles.undefined}>
      <h1 className={styles.undefinedTitleText}>
        Merk yang kamu pilih belum tersedia di kotamu.
      </h1>
      <p className={styles.undefinedDescText}>Silakan pilih merk lain.</p>
    </div>
  )
  const getRecommendationCar = async (params: string): Promise<any> => {
    try {
      setLoading(true)
      setCarList([])
      const res: any = await api.getRecommendation(params)
      setCarList(res.carRecommendations)
      setLoading(false)
    } catch (error) {
      throw error
    }
  }

  const handleClick = (payload: string): void => {
    setTypeActive(payload)
    const params = isInit
      ? `?brand=${payload}&city=jakarta&cityId=189`
      : `?brand=${payload}&city=${location.cityCode}&cityId=${location.id}`
    getRecommendationCar(params)
  }

  const RenderContent: React.FC = (): JSX.Element => {
    if (loading) {
      return (
        <div className={styles.shimmer}>
          <ShimmerCardProduct />
          <ShimmerCardProduct />
          <ShimmerCardProduct />
        </div>
      )
    } else if (carList.length !== 0) {
      return (
        <div>
          {!isMobile && (
            <>
              <div
                className={`image-swiper-button-prev-car-list ${styles.navigationBackButton}`}
              >
                <IconBackButton width={80} height={80} />
              </div>
              <div
                className={`image-swiper-button-next-car-list ${styles.navigationNextButton}`}
              >
                <IconNextButton width={80} height={80} />
              </div>
            </>
          )}
          <Swiper
            navigation={{
              nextEl: '.image-swiper-button-next-car-list',
              prevEl: '.image-swiper-button-prev-car-list',
            }}
            slidesPerGroup={2}
            cssMode={true}
            slidesPerView={3}
            spaceBetween={140}
            breakpoints={{
              1024: {
                slidesPerGroup: 3,
                slidesPerView: 4,
                spaceBetween: 260,
                cssMode: false,
              },
              480: {
                slidesPerGroup: 3,
                slidesPerView: 4,
                spaceBetween: 140,
                cssMode: false,
              },
            }}
            modules={[Navigation]}
          >
            {carList.slice(0, 5).map((item: any, key: number) => (
              <SwiperSlide key={key}>
                <Card item={item} />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <ShadowSlideWithContent type={typeActive} />
            </SwiperSlide>
            <SwiperSlide>
              <ShadowSlide />
            </SwiperSlide>
          </Swiper>
        </div>
      )
    } else return <Undefined />
  }

  useEffect(() => {
    if (!isInit) {
      const params = `?brand=${typeActive}&city=${location.cityCode}&cityId=${location.id}`
      getRecommendationCar(params)
    }
  }, [location.cityCode])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>{headerText}</h1>
        <a href={redirectUrlNewCar} className={styles.redirectText}>
          {buttonText}
        </a>
      </div>
      <div className={styles.wrapperSwiper}>
        <div className={styles.brandList}>
          {brandList.map((item: string, key: number) => (
            <Brand
              key={key}
              onClick={() => handleClick(item)}
              src={require(`../../../assets/images/brandCar/${item}.png`)}
              name={item}
              isActive={typeActive === item}
            />
          ))}
        </div>
        <div className={styles.carListWrapper}>
          <RenderContent />
        </div>
      </div>
    </div>
  )
}

export default CarList
