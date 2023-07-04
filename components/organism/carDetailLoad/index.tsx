import React from 'react'
import { CardShadow, Skeleton } from 'components/atoms'
import styles from 'styles/saas/components/organism/carDetailLoad.module.scss'

const CarSkeleton = '/v3/assets/illustration/car-skeleton.webp'

export const CarDetailLoad = () => {
  return (
    <div className={styles.container}>
      <CardShadow className={styles.cardWrapper}>
        <img
          src={CarSkeleton}
          className={styles.heroImg}
          alt={'car skeleton'}
        />
        <Skeleton
          height={32}
          width={140}
          className={styles.skeletonLabelPromo}
        />
        <div className={styles.contentWrapper}>
          <Skeleton width={121} style={{ marginBottom: 23 }} />
          <Skeleton width={148} height={42} style={{ marginBottom: 17 }} />
          <Skeleton width={'100%'} height={42} style={{ marginBottom: 12 }} />
          <Skeleton width={121} style={{ marginBottom: 22 }} />
          <div className={styles.buttonWrapper}>
            <Skeleton width={'100%'} height={46} />
            <Skeleton width={40} height={46} />
          </div>
        </div>
      </CardShadow>
    </div>
  )
}
