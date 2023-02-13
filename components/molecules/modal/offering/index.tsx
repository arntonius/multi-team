import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import styles from '../../../../styles/Offering.module.css'
import { IconCross } from '../../../atoms'
import FlagIndonesia from '../../../../assets/images/flagIndonesia.png'
import {
  AuthContext,
  AuthContextType,
} from '../../../../services/context/authContext'
import amplitude from 'amplitude-js'
import { CarContext } from '../../../../services/context'
import { CarContextType } from '../../../../services/context/carContext'
import TagManager from 'react-gtm-module'
import { api } from '../../../../services/api'

interface Form {
  name: string
  phone: any
  whatsapp: boolean
}
interface Props {
  openThankyouModal: any
  openLoginModal: any
  closeOfferingModal: any
}

export default function Offering({
  openThankyouModal,
  openLoginModal,
  closeOfferingModal,
}: Props) {
  const { car } = useContext(CarContext) as CarContextType
  const [active, setActive] = useState<boolean>(false)
  const { isLoggedIn, userData } = useContext(AuthContext) as AuthContextType
  const [form, setForm] = useState<Form>({
    name: '',
    phone: 0,
    whatsapp: false,
  })

  const handleChange = (indexKey: string, payload: string | boolean) => {
    setForm((prevState: any) => ({ ...prevState, [indexKey]: payload }))
  }

  const sendForm = () => {
    if (isLoggedIn) {
      sendUnverifiedLeads()
    } else openLoginModal()
  }

  const sendUnverifiedLeads = () => {
    const data = {
      contactType: form.whatsapp ? 'whatsapp' : 'phone',
      maxDp: 30000000, // uniq masalah dp, utm , dan token
      name: form.name,
      phoneNumber: `+62${form.phone}`,
      adSet: null,
      utmCampaign: null,
      utmContent: null,
      utmId: null,
      utmMedium: null,
      utmSource: null,
      utmTerm: null,
    }
    try {
      api.postUnverfiedLeads(data)
      openThankyouModal()
      sendAmplitude(car)
    } catch (error) {
      throw error
    }
  }

  const sendAmplitude = (car: any) => {
    amplitude.getInstance().logEvent('WEB_CAR_OF_THE_MONTH_LEADS_FORM_SUBMIT', {
      Car_Brand: car.model.carModel.brand,
      Car_Model: car.model.carModel.model,
    })
  }

  useEffect(() => {
    setActive(form.name !== '' && form.phone.length > 3)
  }, [form])

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.bundleIcon}>
            <div className={styles.buttonClose} onClick={closeOfferingModal}>
              <IconCross width={24} height={24} />
            </div>
          </div>
          <h1 className={styles.headerText}>Punya Pertanyaan ?</h1>
          <p className={styles.descText}>
            Tulis rincian kontakmu supaya agen kami bisa segera menghubungi
            kamu.
          </p>
          <input
            type="text"
            className={styles.inputName}
            placeholder="Nama Lengkap"
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <div className={styles.wrapperInputPhone}>
            <div className={styles.phoneDetail}>
              <Image
                src={FlagIndonesia}
                width={16}
                height={16}
                alt="indonesia-flag"
              />
              <p className={styles.labelRegion}>+62</p>
              <p className={styles.separator}>|</p>
            </div>
            <input
              type="number"
              className={styles.inputPhone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Contoh : 0895401011469"
            />
          </div>
          <label className={styles.agreement}>
            <input
              type="checkbox"
              name="checkbox"
              onChange={() => handleChange('whatsapp', !form.whatsapp)}
            />
            <p className={styles.agreementText}>
              Saya memilih untuk dihubungi via WhatsApp
            </p>
          </label>
          <button
            onClick={() => {
              active && sendForm()
            }}
            className={active ? styles.buttonActive : styles.buttonInActive}
          >
            Kirim Rincian
          </button>
        </div>
      </div>
    </div>
  )
}
