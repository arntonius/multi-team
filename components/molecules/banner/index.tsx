import React, { lazy, useEffect, useState } from 'react'
import styles from '../../../styles/Banner.module.css'
import Image from 'next/image'
import Widget from '../widget'
import amplitude from 'amplitude-js'
import TagManager from 'react-gtm-module'
declare global {
  interface Window {
    dataLayer: any
  }
}
export default function Banner({ data }: any) {
  const [isExpandForm, setIsExpandForm] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0)
  const [isActiveSending, setIsActiveSending] = useState<boolean>(true)
  const [dataSentIndex, setDataSentIndex] = useState<Array<number>>([0])
  const [isUserOnBannerScreen, setIsUserOnBannerScreen] =
    useState<boolean>(true)

  const pushDataLayerInit = (payload: any): void => {
    TagManager.dataLayer({
      dataLayer: {
        ecommerce: {
          promoView: {
            promotions: [
              {
                name: payload.name,
                creative: payload.creativeContext,
                position: payload.slot,
              },
            ],
          },
        },
        eventCategory: 'Ecommerce',
        eventAction: 'Promotion View - Control',
        eventLable: 'Homebanner',
      },
    })
  }

  const pushDataLayerWidgetOnClick = (index: number) => {
    TagManager.dataLayer({
      dataLayer: {
        promoClick: {
          promotions: [
            {
              name: data[index].name,
              creative: data[index].creativeContext,
              position: data[index].slot,
            },
          ],
        },
        eventCategory: 'Ecommerce',
        eventAction: 'PromotionClick - Control',
        eventLabel: 'HomepagePromoClick',
      },
    })
  }

  const getTimeStamp = (): string | null => {
    const timestamp: string | null = sessionStorage.getItem('timestamp')
    return timestamp
  }

  const setTimestamp = (): void => {
    const currentTime = new Date().getTime()
    sessionStorage.setItem('timestamp', currentTime.toString())
  }

  const isInBorderTime = (payload: number): boolean => {
    const currentTime = new Date().getTime()
    const constrainTime = 5 * 60 * 1000
    const diffTime = currentTime - payload
    return diffTime <= constrainTime
  }

  const isDataExist = (data: Array<number>, key: number) => {
    const filtered = data.filter((item: number) => item === key)
    return filtered.length > 0
  }

  const handleScroll = () => {
    const position: number = window.pageYOffset
    if (position > 470) {
      setIsUserOnBannerScreen(false)
    } else setIsUserOnBannerScreen(true)
  }

  useEffect(() => {
    const timestamp: string | null = getTimeStamp()
    if (timestamp === null) {
      setTimestamp()
      setIsActiveSending(true)
      pushDataLayerInit(data[0])
      sendAmplitudeBanner(data[0])
    } else {
      if (isInBorderTime(parseInt(timestamp))) {
        setIsActiveSending(false)
      } else {
        setTimestamp()
        setIsActiveSending(true)
        pushDataLayerInit(data[0])
        sendAmplitudeBanner(data[0])
      }
    }
  }, [])

  useEffect(() => {
    eventListenerScroll()
  }, [])

  const eventListenerScroll = () => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }

  const sendAmplitudeBanner = (payload: any): void => {
    amplitude.getInstance().logEvent('WEB_TOP_BANNER_VIEW', {
      Name: data[index].name,
      Page_direction_URL: data[index].url,
      Creative_context: data[index].creativeContext,
    })
  }
  useEffect(() => {
    if (isActiveSending && data.length > 0 && isUserOnBannerScreen) {
      const isDataSlideExists = isDataExist(dataSentIndex, index)
      if (!isDataSlideExists) {
        const dataIndex = dataSentIndex
        dataIndex.push(index)
        setDataSentIndex(dataIndex)
        pushDataLayerInit(data[index])
        sendAmplitudeBanner(data[index])
      }
    }
  }, [isActiveSending, index, data])

  return (
    <div className={isExpandForm ? styles.containerActive : styles.container}>
      <div
        className={isExpandForm ? styles.wrapperFormActive : styles.wrapperForm}
      >
        <Widget expandForm={() => setIsExpandForm(!isExpandForm)} />
      </div>
      <div className={styles.wrapperMobile}>
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {data.map((item: any, key: number) => {
              if (key === 0) {
                return (
                  <a href={item.url} key={key} className="swiper-slide">
                    <Image
                      src={item.attribute.web_mobile}
                      width={480}
                      height={360}
                      priority
                      alt="seva-banner"
                      sizes="(max-width: 1024px) 54vw, 92.4vw"
                      className={`swiper-lazy ${styles.banner}`}
                    />
                  </a>
                )
              } else {
                return (
                  <a href={item.url} key={key} className="swiper-slide">
                    <Image
                      src={item.attribute.web_mobile}
                      width={480}
                      height={360}
                      alt="seva-banner"
                      sizes="(max-width: 1024px) 54vw, 92.4vw"
                      className={`swiper-lazy ${styles.banner}`}
                    />
                  </a>
                )
              }
            })}
            <div className={`swiper-pagination ${styles.paginationBullet}`} />
          </div>
        </div>
      </div>
      <div className={styles.wrapperDesktop}>
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {data.map((item: any, key: number) => (
              <a
                key={key}
                className="swiper-slide"
                href={item.url}
                onClick={() => pushDataLayerWidgetOnClick(key)}
              >
                <Image
                  src={item.attribute.web_desktop}
                  width={1040}
                  height={416}
                  alt="seva-banner"
                  sizes="(max-width: 1024px) 54vw, 92.4vw"
                  className={`lazy-loader swiper-lazy ${styles.banner}`}
                />
              </a>
            ))}
          </div>
          <div className={`swiper-pagination ${styles.paginationBullet}`} />
        </div>
      </div>
    </div>
  )
}
