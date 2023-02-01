import React, { useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from '../../../styles/CarList.module.css'
import { Brand, Card, IconBackButton, IconNextButton } from '../../atoms'
import { api } from '../../../services/api'
import Script from 'next/script'
import { useIsMobile } from '../../../utils'

export default function CarList({ data }: any) {
  const brandList = ['Toyota', 'Daihatsu', 'Isuzu', 'BMW', 'Peugeot']
  const [carList, setCarList] = useState<any>(data)
  const [typeActive, setTypeActive] = useState<any>('Toyota')
  const isMobile = useIsMobile()

  const ShadowSlide = () => <div className={styles.shadowSlider} />

  const getRecommendationCar = async (params: string) => {
    try {
      setCarList([])
      const query = `?brand=${params}&city=jakarta&cityId=189`
      const res: any = await api.getRecommendation(query)
      setCarList(res.carRecommendations)
    } catch (error) {
      throw error
    }
  }

  return (
    <div className={styles.container}>
      <Script src="/lazy.js" />
      <div className={styles.header}>
        <h1 className={styles.headerText}>Mobil Baru Terpopuler</h1>
        <a
          href="https://www.seva.id/mobil-baru"
          className={styles.redirectText}
        >
          LIHAT SEMUA
        </a>
      </div>
      <div className={styles.wrapperSwiper}>
        <div className={styles.brandList}>
          {brandList.map((item: string, key: number) => (
            <Brand
              key={key}
              onClick={() => {
                setTypeActive(item)
                getRecommendationCar(item)
              }}
              src={require(`../../../assets/images/brandCar/${item}.png`)}
              name={item}
              isActive={typeActive === item}
            />
          ))}
        </div>
        <div className={styles.carListWrapper}>
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
          <div className="swiper mySwiperProduct">
            <div className="swiper-wrapper">
              {carList.slice(0, 10).map((item: any, key: number) => (
                <div className="swiper-slide" key={key}>
                  <Card item={item} />
                </div>
              ))}
              <div className="swiper-slide">
                <ShadowSlide />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
