import Image from 'next/image'
import React from 'react'
import styles from '../../../styles/atoms/TypeCar.module.css'
import { PropsTypeCar } from '../../../utils/types/props'

const TypeCar: React.FC<PropsTypeCar> = ({
  name,
  src,
  onClick,
  isActive = false,
}): JSX.Element => {
  return (
    <button
      className={isActive ? `${styles.active}` : `${styles.inActive}`}
      onClick={onClick}
    >
      <Image
        src={src}
        width={50}
        height={30}
        alt="icon-type-car"
        className={styles.icon}
      />
      <p className={styles.labelType}>{name}</p>
    </button>
  )
}

export default TypeCar
