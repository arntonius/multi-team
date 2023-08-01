import Image from 'next/image'
import React from 'react'
import styles from 'styles/components/molecules/Refinancing.module.scss'
import circle from '/public/revamp/images/refinancing/circle.webp'
import model from '/public/revamp/images/refinancing/model.webp'

const Refinancing: React.FC = (): JSX.Element => {
  const headerText: string = 'Butuh Dana Cepat?'
  const descText: string =
    'SEVA menyediakan fasilitas dana pinjaman dengan jaminan BPKB mobil'
  const buttonText: string = 'Ajukan Pinjaman'
  const redirectUrlRefinancing: string = 'https://www.seva.id/fasilitas-dana'

  return (
    <div className={styles.wrapper}>
      <a href={redirectUrlRefinancing}>
        <div className={styles.fgLayer}>
          <div className={styles.info}>
            <p className={styles.headerText}>{headerText}</p>
            <p className={styles.descText}>{descText}</p>
            <button className={styles.button}>{buttonText}</button>
          </div>
          <div className={styles.wrapperBgImage}>
            <Image
              width={360}
              height={165}
              alt="seva-bg-fund-services"
              src={circle}
              unoptimized
              className={styles.circleImage}
            />
          </div>
          <Image
            width={189}
            height={165}
            alt="seva-fund-services-model"
            src={model}
            className={styles.modelImage}
            unoptimized
          />
        </div>
      </a>
    </div>
  )
}

export default Refinancing
