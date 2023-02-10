import React, { useContext, useState } from 'react'
import {
  LocationContext,
  LocationContextType,
} from '../../../../services/context/locationContext'
import styles from '../../../../styles/LocationSelector.module.css'
import { IconCross, IconSearch } from '../../../atoms'

export default function LocationSelector({ data, onCloseSelector }: any) {
  const [input, setInput] = useState<string>('')
  const [isCrossShow, setIsCrossShow] = useState<boolean>(false)
  const [isLocationShow, setIsLocationShow] = useState<boolean>(false)
  const [city, setCity] = useState<Array<any>>([])
  const { location, isInit, saveLocation } = useContext(
    LocationContext,
  ) as LocationContextType

  const handleChange = (payload: string) => {
    setInput(payload)
    if (payload === '') {
      setIsCrossShow(false)
      setIsLocationShow(false)
      setCity([])
    } else {
      setIsCrossShow(true)
      filterData(payload)
    }
    filterData(payload)
  }

  const handleClick = (payload: any) => {
    saveLocation(payload)
    setIsLocationShow(false)
    onCloseSelector()
  }

  const clearInput = () => {
    setInput('')
    setIsCrossShow(false)
    setIsLocationShow(false)
  }

  const filterData = (params: string) => {
    const tempData = data
    const newData = tempData.filter((item: any) => {
      const itemData = `${item.cityName.toUpperCase()}`
      const paramsData = params.toUpperCase()

      return itemData.indexOf(paramsData) > -1
    })
    if (newData.length > 0 && params !== '') {
      setIsLocationShow(true)
      setCity(newData)
    } else setIsLocationShow(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.headerText}>
          Pilih kotamu
          <span className={styles.optText}> (Pilih sesuai KTP)</span>
        </p>
        <div onClick={onCloseSelector} className={styles.buttonClose}>
          <IconCross width={24} height={24} color="#002373" />
        </div>
      </div>
      {isLocationShow && (
        <div className={styles.wrapperCityList}>
          {city.map((item: any) => (
            <div
              key={item.id}
              className={styles.buttonCityList}
              onClick={() => handleClick(item)}
            >
              {item.cityName}
            </div>
          ))}
        </div>
      )}
      <div className={styles.wrapperInput}>
        <input
          type="text"
          value={input}
          className={styles.input}
          placeholder={isInit ? 'Jakarta Pusat' : location.cityName}
          onChange={(e) => handleChange(e.target.value)}
        />
        {isCrossShow ? (
          <div onClick={() => clearInput()}>
            <IconCross width={24} height={24} />
          </div>
        ) : (
          <IconSearch width={24} height={24} />
        )}
      </div>
    </div>
  )
}
