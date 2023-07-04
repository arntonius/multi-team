import React from 'react'
// import CarDetailLoad from '../carDetailLoadPdp'
import styles from 'styles/saas/components/organism/pdpSkeleton.module.scss'
import { Skeleton } from 'components/atoms'

const CarSkeleton = '/v3/assets/illustration/car-skeleton.webp'

const PdpCarOverviewSkeleton = () => {
  return (
    <div className={styles.carWrapperCarOverview}>
      <img
        src={CarSkeleton}
        className={styles.heroImg}
        alt={'car skeleton'}
        style={{ marginBottom: 13 }}
      />
      <div className={styles.lineWrapper}>
        <Skeleton width={'100%'} style={{ marginBottom: 13 }} />
        <Skeleton width={'100%'} style={{ marginBottom: 13 }} />
      </div>
    </div>
  )
}

export default PdpCarOverviewSkeleton
