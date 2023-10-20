import { IconLockFill } from 'components/atoms'
import elementId from 'helpers/elementIds'
import Image from 'next/image'
import React from 'react'
import styles from 'styles/components/organisms/landingIA.module.scss'
import LogoACC from '/public/revamp/icon/logo-acc.webp'
import ISOIcon from '/public/revamp/icon/iso.webp'
import AstraFinancialIcon from '/public/revamp/icon/Logo-Astra-Financial.webp'
import TAFIcon from '/public/revamp/icon/Logo-TAF.png'

export const FooterStakeholder = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.iconWrapper} style={{ gap: 4 }}>
        <IconLockFill width={10} height={10} />
        <span>Kami menjamin datamu aman dan terlindungi</span>
      </div>
      <div className={styles.iconWrapper}>
        <Image
          src={ISOIcon}
          width={26}
          height={27}
          alt="CBQA ISO 27001"
          datatest-id={elementId.Footer.LogoISO}
        />
        <Image alt="logo-acc" src={LogoACC} className={styles.logoACC} />
        <Image src={TAFIcon} width={40} height={40} alt="TAF" />
        <Image
          src={AstraFinancialIcon}
          width={114}
          height={40}
          alt="Astra Financial"
        />
      </div>
    </div>
  )
}
