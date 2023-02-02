import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../../../../styles/OTRPrimary.module.css'
import { Capsule, IconCross, IconLocation } from '../../../atoms'

export default function OTRPrimary({ data, onClick }: any) {
  const [isListShow, setIsListShow] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const [city, setCity] = useState<any>(data)

  const handleChange = (payload: string) => {
    setInput(payload)
    filterData(payload)
  }

  const filterData = (params: string) => {
    const tempData = data
    const newData = tempData.filter((item: any) => {
      const itemData = `${item.cityName.toUpperCase()}`
      const paramsData = params.toUpperCase()

      return itemData.indexOf(paramsData) > -1
    })
    if (newData.length > 0 && params !== '') {
      setIsListShow(true)
      setCity(newData)
    } else setIsListShow(false)
  }

  return (
    <div className={styles.modalLocation}>
      <div className={styles.wrapper}>
        <div className={styles.wrapperLocator}>
          <Image
            src="https://www.seva.id/static/media/CitySelectorBackgroundMobile.0bda639bbb6387a2830874684c0af082.svg"
            width={320}
            height={388}
            priority
            alt="seva-modal-mobile"
            className={styles.bgImageMobile}
          />
          <Image
            src="https://www.seva.id/static/media/CitySelectorBackgroundDesktop.c7c088fbdaf6912d331555837ab523be.svg"
            width={740}
            height={390}
            alt="seva-modal-desktop"
            className={styles.bgImageDekstop}
          />
          <div className={styles.info}>
            <div className={styles.closeModal}>
              <div onClick={onClick}>
                <IconCross width={24} height={24} color="#FFFFFF" />
              </div>
            </div>
            <h1 className={styles.mobileHeader}>
              <pre className={styles.headerText}>Pilih kota dulu </pre>
              <pre className={styles.headerText}>untuk info harga OTR </pre>
              <pre className={styles.headerText}>
                dan stok yang lebih akurat
              </pre>
            </h1>
            <h1 className={styles.dekstopHeader}>
              <pre className={styles.headerText}>
                Pilih kota dulu untuk info harga OTR
              </pre>
              <pre className={styles.headerText}>
                dan stok yang lebih akurat
              </pre>
            </h1>
            <div className={styles.suggestedLocation}>
              <Capsule name="Bekasi" />
              <Capsule name="Medan" />
              <Capsule name="Tanggerang" />
              <Capsule name="Jakarta Selatan" />
              <Capsule name="Surabaya" />
            </div>
            <p className={styles.descText}>atau cari Kota yang sesuai KTP</p>
            <div className={styles.wrapperInput}>
              <IconLocation width={17} height={18} color="#D83130" />
              <input
                type="text"
                value={input}
                className={styles.input}
                onChange={(e: any) => handleChange(e.target.value)}
                placeholder="Pilih kota sesuai KTP"
              />
            </div>
            {isListShow && (
              <div className={styles.wrapperList}>
                {city.map((item: any) => (
                  <button key={item.id} className={styles.list}>
                    {item.cityName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
