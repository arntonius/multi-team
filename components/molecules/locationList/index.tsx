import React, { useContext } from 'react'
import {
  LocationContext,
  LocationContextType,
} from '../../../services/context/locationContext'
import styles from '../../../styles/LocationList.module.css'
import { IconLocation } from '../../atoms'
interface PropsLocation {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const LocationList: React.FC<PropsLocation> = ({ onClick }): JSX.Element => {
  const { location, isInit } = useContext(
    LocationContext,
  ) as LocationContextType
  const infoText: string = 'Beli mobil di '
  const labelText: string = 'Ganti Lokasi'
  const defaultLocationText: string = 'Jakarta Pusat'

  return (
    <div className={styles.wrapper}>
      <IconLocation width={16} height={16} color="#D83130" />
      <p className={styles.descText}>
        {infoText}
        <span className={styles.locText}>
          {isInit ? defaultLocationText : location.cityName}
        </span>
        <button onClick={onClick} className={styles.button}>
          {labelText}
        </button>
      </p>
    </div>
  )
}

export default LocationList
