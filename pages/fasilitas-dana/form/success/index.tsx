import React, { useEffect, useState } from 'react'
import styles from 'styles/pages/refinancingSuccessPage.module.scss'
import { useRouter } from 'next/router'
import { refinancingUrl } from 'utils/helpers/routes'
import { colors } from 'utils/helpers/style/colors'
import Image from 'next/image'
import Vector1 from 'public/revamp/images/refinancing/Vector1.webp'

const Rectangle = '/revamp/images/refinancing/Rectangle.webp'

export default function RefinancingSuccessPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(5)

  useEffect(() => {
    if (timeLeft === 0) {
      router.push(refinancingUrl)
    }
    if (!timeLeft) return
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [timeLeft])

  return (
    <div className={styles.container}>
      {/* <Background /> */}
      <div className={styles.thankyouText}>
        <p>Terima Kasih!</p>
      </div>
      <div className={styles.vector}>
        <Image
          src={Vector1}
          alt="refinancing-success-vector1"
          width={162}
          height={161}
        />
      </div>
      <div className={styles.textAnnounce}>
        <p>
          Pastikan nomor yang terdaftar aktif, sehingga kamu tidak ketinggalan
          penawaran terbaik lainnya dari SEVA.
        </p>
      </div>
      <div className={styles.textCounter}>
        <p>Otomatis tertutup dalam {timeLeft} detik....</p>
      </div>
      <a className={styles.textRedirect} href={refinancingUrl}>
        Kembali ke Laman Utama
      </a>
      <img
        className={styles.vector6}
        src={Rectangle}
        alt="refinancing-success-vector6"
      />
    </div>
  )
}
