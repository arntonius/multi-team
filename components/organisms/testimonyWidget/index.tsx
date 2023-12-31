import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from 'styles/components/organisms/testimonyWidget.module.scss'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { differentDateStatus } from 'utils/handler/date'
import Image from 'next/image'
import { TestimonialData } from 'utils/types/props'
import { CardShadow } from 'components/atoms'

import PopupTestimony from '../popupTestimony'
import { trackEventCountly } from 'helpers/countly/countly'
import { CountlyEventNames } from 'helpers/countly/eventNames'
import { getTestimony } from 'services/api'

const TestimonyWidget = () => {
  const [testimony, setTestimony] = useState<Array<TestimonialData>>([])
  const [openTestimony, setOpenTestimony] = useState<TestimonialData | null>(
    null,
  )
  const [indexCard, setIndexCard] = useState(1)
  const cardRef = useRef() as MutableRefObject<HTMLDivElement>
  const descRef = useRef() as MutableRefObject<HTMLSpanElement>

  useEffect(() => {
    getTestimony().then((result: any) => setTestimony(result.data))
  }, [])

  if (testimony.length === 0) return <></>

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Cerita Pengguna SEVA</h2>
        <Swiper
          spaceBetween={20}
          pagination={{
            clickable: true,
            bulletClass: styles.bullet,
            bulletActiveClass: styles.bulletActive,
          }}
          modules={[Pagination]}
          className={styles.wrapper}
          onSlideChange={({ activeIndex }) => {
            setIndexCard(activeIndex + 1)
          }}
        >
          {testimony.map((item, index) => (
            <SwiperSlide key={index} className={styles.content}>
              <Image
                src={item.pictureUrl}
                alt={item.pictureName}
                width={199}
                height={149}
                loading="lazy"
              />
              <CardShadow
                ref={cardRef}
                className={styles.card}
                role="button"
                onClick={() => {
                  setOpenTestimony(item)
                  trackEventCountly(
                    CountlyEventNames.WEB_HOMEPAGE_TESTIMONY_CLICK,
                    {
                      TESTIMONY_ORDER: index + 1,
                    },
                  )
                }}
              >
                <h3 className={styles.nameAge}>
                  {item.name}
                  {item.age ? `, ${item.age}  Th` : ''}
                </h3>
                <span className={styles.timeCity}>
                  {differentDateStatus(new Date(item.purchaseDate))},{' '}
                  {item?.cityName}
                </span>
                <span
                  ref={descRef}
                  className={styles.description}
                >{`"${item.detail}"`}</span>
              </CardShadow>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <PopupTestimony
        open={openTestimony !== null}
        testimony={openTestimony}
        onCancel={() => {
          setOpenTestimony(null)
        }}
      />
    </>
  )
}

export default TestimonyWidget
