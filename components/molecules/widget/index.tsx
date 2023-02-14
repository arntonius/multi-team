import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import TagManager from 'react-gtm-module'
import { api } from '../../../services/api'
import { trackGAContact, trackGALead } from '../../../services/googleAds'
import styles from '../../../styles/Widget.module.css'
import { useComponentVisible } from '../../../utils'
import { IconChevronDown, IconChevronUp } from '../../atoms'
import FlagIndonesia from '../../../assets/images/flagIndonesia.png'
import { AuthContext } from '../../../services/context'
import { AuthContextType } from '../../../services/context/authContext'

export default function Widget({ expandForm }: any) {
  const { userData, dp, saveDp } = useContext(AuthContext) as AuthContextType
  const [isFieldError, setIsFieldError] = useState<boolean>(false)
  const carListUrl = 'https://seva.id/mobil-baru'
  const [form, setForm] = useState<any>({
    tenure: '5',
  })
  const { innerBorderRef } = useComponentVisible(() => setSelectorActive(''))
  const [phone, setPhone] = useState<string | number>('')
  const [selectorActive, setSelectorActive] = useState<string>('')
  const [isDetailShow, setIsDetailShow] = useState<boolean>(false)
  const selectorData = {
    dp: [30000000, 40000000, 50000000, 75000000, 100000000],
    income: [
      '< 2 juta/bulan',
      '2-4 juta/bulan',
      '4-6 juta/bulan',
      '6-8 juta/bulan',
      '8-10 juta/bulan',
    ],
    age: ['18-27', '29-34', '25-50', '>51'],
  }

  useEffect(() => {
    if (userData !== null) {
      const parsedPhone = userData.phoneNumber.toString().replace('+62', '')
      setPhone(parseInt(parsedPhone))
    }
    if (dp !== '') setForm((prevState: any) => ({ ...prevState, dp: dp }))
  }, [userData, dp])

  const getNumber = (num: number) => {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e6, symbol: ' Jt' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value
      })

    const fixedNumber = item
      ? (num / item.value).toFixed(2).replace(rx, '$1') + item.symbol
      : '0'

    const result = `Rp ${fixedNumber.replace('.', ',')}`
    return result
  }

  const ButtonTenure = ({ tenure, isActive }: any) => (
    <button
      onClick={() => {
        setForm((prevState: any) => ({ ...prevState, tenure: tenure }))
      }}
      className={isActive ? styles.tenureActive : styles.tenureInActive}
    >
      {tenure}
    </button>
  )

  const SelectorList = ({ placeholder, onClick, indexKey, isError }: any) => {
    if (isError) {
      return (
        <div>
          <button className={styles.selectorError} onClick={onClick}>
            <input
              className={styles.placeholderText}
              type="text"
              disabled
              placeholder={placeholder}
              value={
                indexKey === 'dp' && form[indexKey] !== undefined
                  ? getNumber(form[indexKey])
                  : form[indexKey]
              }
            />
            {selectorActive === indexKey ? (
              <IconChevronUp width={15} height={15} color="#e01f29" />
            ) : (
              <IconChevronDown width={15} height={15} color="#e01f29" />
            )}
          </button>
          <p className={styles.infoErrorText}>* Wajib diisi</p>
        </div>
      )
    } else {
      return (
        <button className={styles.selector} onClick={onClick}>
          <input
            className={styles.placeholderText}
            type="text"
            disabled
            placeholder={placeholder}
            value={
              indexKey === 'dp' && form[indexKey] !== undefined
                ? getNumber(form[indexKey])
                : form[indexKey]
            }
          />
          {selectorActive === indexKey ? (
            <IconChevronUp width={15} height={15} color="#002373" />
          ) : (
            <IconChevronDown width={15} height={15} />
          )}
        </button>
      )
    }
  }

  const sendRequest = () => {
    if (form.dp === undefined) setIsFieldError(true)
    else {
      setForm((prevState: any) => ({
        ...prevState,
        phone: phone,
      }))
      execUnverifiedLeads(form)
      pushDataLayerOnClick()
      window.location.href = carListUrl
    }
  }

  const execUnverifiedLeads = (payload: any) => {
    const isValidPhoneNumber = phone.toString().length > 3

    if (isValidPhoneNumber) {
      trackGALead()
      const data = {
        age: payload.age,
        income: payload.income,
        maxDp: payload.dp,
        phoneNumber: `+62${phone}`,
        tenure: payload.tenure,
        origination: 'Web_Homepage_Search_Widget',
        userTouchpoints: 'Web_Homepage_Search_Widget',
        adSet: null,
        utmCampaign: null,
        utmContent: null,
        utmId: null,
        utmMedium: null,
        utmSource: null,
        utmTerm: null,
      }
      sendUnverifiedLeads(data)
    } else trackGAContact()
  }

  const pushDataLayerOnClick = () => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'interaction',
        eventCategory: 'Leads Generator',
        eventAction: 'Homepage - Search Widget',
        eventLabel: 'Temukan Mobilku',
      },
    })
  }

  const handleClickDP = (payload: string) => {
    if (selectorActive === payload) setSelectorActive('')
    else setSelectorActive(payload)
  }

  const onChangeDataMobile = (payload: any) => {
    setPhone(payload)
  }

  const sendUnverifiedLeads = (payload: any) => {
    try {
      api.postUnverfiedLeads(payload)
    } catch (error) {
      throw error
    }
  }

  const DetailList = ({ data, indexKey }: any) => {
    return (
      <div className={styles.list}>
        {data.map((item: any, key: number) => (
          <button
            key={key}
            className={styles.buttonIncome}
            onClick={() => {
              if (indexKey === 'dp') {
                setIsFieldError(false)
                saveDp(item.toString())
              }
              setSelectorActive('')
              setForm((prevState: any) => ({ ...prevState, [indexKey]: item }))
            }}
          >
            {indexKey === 'dp' ? (
              <label className={styles.buttonListText}>{getNumber(item)}</label>
            ) : (
              <label className={styles.buttonListText}>{item}</label>
            )}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.form}>
      <h1 className={styles.title}>Cari mobil baru yang pas buat kamu</h1>
      <div className={styles.wrapperRow}>
        <div className={styles.wrapperLeft}>
          <h6 className={styles.desc}>Pilih maksimal DP</h6>
          <SelectorList
            placeholder=">Rp 350 Jt"
            indexKey="dp"
            isError={isFieldError}
            onClick={() => {
              handleClickDP('dp')
            }}
          />
          {selectorActive === 'dp' && (
            <DetailList indexKey="dp" data={selectorData.dp} />
          )}
        </div>
        <div className={styles.wrapperRight}>
          <h6 className={styles.desc}>Pilih tahun tenor</h6>
          <div className={styles.wrapperRow}>
            <ButtonTenure isActive={form.tenure === '1'} tenure="1" />
            <ButtonTenure isActive={form.tenure === '2'} tenure="2" />
            <ButtonTenure isActive={form.tenure === '3'} tenure="3" />
            <ButtonTenure isActive={form.tenure === '4'} tenure="4" />
            <ButtonTenure isActive={form.tenure === '5'} tenure="5" />
          </div>
        </div>
      </div>
      <p className={styles.desc}>
        Ingin bertanya langsung ke tim SEVA? Tulis nomor hp kamu untuk kami
        hubungi (Opsional)
      </p>
      <div className={styles.wrapperInputPhone}>
        <div className={styles.phoneDetail}>
          <Image
            src={FlagIndonesia}
            width={16}
            height={16}
            priority
            alt="indonesia-flag"
          />
          <p className={styles.labelRegion}>+62</p>
          <p className={styles.separator}>|</p>
        </div>
        <input
          type="number"
          value={phone}
          className={styles.input}
          placeholder="Contoh : 0895401011469"
          onChange={(e: any) => onChangeDataMobile(e.target.value)}
        ></input>
      </div>
      <p
        className={styles.advanceSearch}
        onClick={() => {
          setIsDetailShow(!isDetailShow)
          expandForm()
        }}
      >
        Advanced search
        <span className={styles.iconDropDown}>
          {isDetailShow ? (
            <IconChevronUp width={10} height={10} color="#246ed4" />
          ) : (
            <IconChevronDown width={10} height={10} color="#246ed4" />
          )}
        </span>
      </p>
      {isDetailShow && (
        <div className={styles.wrapperRow}>
          <div className={styles.wrapperLeft}>
            <p className={styles.desc}>Kisaran pendapatan</p>
            <SelectorList
              indexKey="income"
              placeholder="< 2 juta/bulan"
              onClick={() => handleClickDP('income')}
            />
            {selectorActive === 'income' && (
              <DetailList indexKey="income" data={selectorData.income} />
            )}
          </div>
          <div className={styles.wrapperRight}>
            <p className={styles.desc}>Rentang Usia</p>
            <SelectorList
              indexKey="age"
              placeholder="18-27"
              onClick={() => handleClickDP('age')}
            />
            {selectorActive === 'age' && (
              <DetailList indexKey="age" data={selectorData.age} />
            )}
          </div>
        </div>
      )}
      <button className={styles.button} onClick={() => sendRequest()}>
        Temukan Mobilku
      </button>
    </div>
  )
}
