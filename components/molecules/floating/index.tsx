import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../../../styles/Floating.module.css'
import selectorImage from '../../../assets/images/floating/selector.webp'
import contentImage from '../../../assets/images/floating/content.png'

export default function Floating({ onClickImage }: any) {
  const [isShow, setIsShow] = useState<boolean>(false)
  return (
    <div className={styles.wrapper}>
      <Image
        onClick={() => setIsShow(!isShow)}
        src={selectorImage}
        width={30}
        height={80}
        alt="seva-content"
        unoptimized
        className={styles.selectorImage}
      />
      {isShow && (
        <Image
          onClick={onClickImage}
          src={contentImage}
          width={30}
          height={80}
          unoptimized
          priority
          alt="seva-video-selector"
          className={styles.contentImage}
        />
      )}
    </div>
  )
}
