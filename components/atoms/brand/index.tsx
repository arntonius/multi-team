import Image from 'next/image'
import React from 'react'
import { PropsBrand } from 'utils/types'
import styles from 'styles/components/atoms/Brand.module.scss'

const Brand: React.FC<PropsBrand> = ({
  name,
  src,
  isActive,
  onClick,
}): JSX.Element => {
  return (
    <button
      className={isActive ? styles.brandActive : styles.brandInActive}
      onClick={onClick}
    >
      <Image
        src={src}
        width={50}
        height={40}
        sizes="9vw"
        className={styles.brandImage}
        alt={name}
      />
    </button>
  )
}
export default Brand
