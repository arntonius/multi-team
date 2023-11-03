import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import styles from 'styles/pages/refinancingFormPage.module.scss'
import axios from 'axios'
import { useRouter } from 'next/router'
import {
  getCities,
  getRefinancingCarsBrand,
  getRefinancingCarsModel,
  getRefinancingCarsYear,
  postSendRefinancingSecondLeadsForm,
} from 'services/api'
import { LanguageCode, LocalStorageKey } from 'utils/enum'
import { getToken } from 'utils/handler/auth'
import { checkReferralCode, getCustomerInfoSeva } from 'utils/handler/customer'
import { decryptValue } from 'utils/handler/encryption'
import { getLocalStorage, saveLocalStorage } from 'utils/handler/localStorage'
import { replacePriceSeparatorByLocalization } from 'utils/handler/rupiah'
import { refinancingSuccessUrl } from 'utils/helpers/routes'
import { useLocalStorage } from 'utils/hooks/useLocalStorage'
import { filterNonDigitCharacters } from 'utils/stringUtils'
import { CityOtrOption, FormControlValue, Option } from 'utils/types'
import { temanSevaUrlPath } from 'utils/types/props'
import { RefinancingSecondLeadsData } from 'utils/types/utils'
import { RefinancingFormHeader } from 'components/molecules'
import { colors } from 'utils/helpers/style/colors'
import { AlertBlue } from 'components/atoms/icon/AlertBlue'
import clsx from 'clsx'
import AccLogo from 'public/revamp/icon/logo-acc.webp'
import Image from 'next/image'
import { FormReferralCode } from 'components/molecules/form/formReferralCode'
import { Button, IconLoading, InputSelect, NewInput } from 'components/atoms'
import { ButtonSize, ButtonVersion } from 'components/atoms/button'
import Fuse from 'fuse.js'

export default function RefinancingFormPage() {
  const MAX_LOAN = 300000000
  const MAX_LOAN_ERROR_MESSAGE = 'Nominal yang kamu masukkan terlalu tinggi'
  const MIN_LOAN = 10000000
  const MIN_LOAN_ERROR_MESSAGE = 'Nominal yang kamu masukkan terlalu rendah'
  const router = useRouter()
  const [samePhoneNumber, setSamePhoneNumber] = useState(true)
  const [loadSubmit, setLoadSubmit] = useState(false)
  const [cityOption, setCityOption] = useState([{ label: '', value: '' }])
  const [brands, setBrands] = useState([{ label: '', value: '' }])
  const [models, setModels] = useState([{ label: '', value: '' }])
  const [years, setYears] = useState([{ label: '', value: '' }])
  const [suggestionListCity, setSuggestionListCity] = useState([
    { label: '', value: '' },
  ])
  const [suggestionListBrands, setSuggestionListBrands] = useState([
    { label: '', value: '' },
  ])
  const [suggestionListModels, setSuggestionListModels] = useState([
    { label: '', value: '' },
  ])
  const [suggestionListYears, setSuggestionListYears] = useState([
    { label: '', value: '' },
  ])

  const [connectedCode, setConnectedCode] = useState('')
  const [referralCodeInput, setReferralCodeInput] = useState('')
  const [currentUserOwnCode, setCurrentUserOwnCode] = useState('')
  const [isLoadingReferralCode, setIsLoadingReferralCode] = useState(false)
  const [isErrorReferralCodeInvalid, setIsErrorReferralCodeInvalid] =
    useState(false)
  const [isErrorRefCodeUsingOwnCode, setIsErrorRefCodeUsingOwnCode] =
    useState(false)
  const [isSuccessReferralCode, setisSuccessReferralCode] = useState(false)
  const [cityOtr] = useLocalStorage<CityOtrOption | null>(
    LocalStorageKey.CityOtr,
    null,
  )
  const referralCodeFromUrl: string =
    getLocalStorage(LocalStorageKey.referralTemanSeva) ?? ''

  const [loadList, setLoadList] = useState({
    brand: true,
    model: false,
    year: false,
  })

  const [data, setData] = useState({
    brand: '',
    lastChosenBrand: '',
    model: '',
    lastChosenModel: '',
    year: '',
    lastChosenYear: '',
    cityId: cityOtr?.id ?? 0,
    lastChosenCityName: '',
    cityName: '',
    loan: '',
    tenure: '3',
  })

  const [error, setError] = useState({
    brand: { empty: false, message: '' },
    model: { empty: false, message: '' },
    year: { empty: false, message: '' },
    city: { empty: false, message: '' },
    loan: { empty: false, message: '' },
  })

  const formatLabel = (value: string) => {
    return value
      .toLowerCase()
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(' ')
  }

  const localContactId = getLocalStorage(LocalStorageKey.IdCustomerRefi)
  const localPhoneNumber = getLocalStorage(LocalStorageKey.PhoneNumberRefi)

  const contactId = useMemo(() => {
    if (localContactId) {
      const decr = decryptValue(localContactId as string)
      return decr
    }

    return ''
  }, [localContactId])

  const checkPhoneNumber = () => {
    if (localPhoneNumber) {
      const decr = decryptValue(localPhoneNumber as string)
      if (getToken()) {
        getCustomerInfoSeva().then((response) => {
          if (response) {
            const customerPhoneNumber = response[0].phoneNumber ?? ''
            if (decr === customerPhoneNumber) {
              setSamePhoneNumber(true)
            } else {
              setSamePhoneNumber(false)
            }
          }
        })
      } else {
        setSamePhoneNumber(true)
      }
    }
  }

  useEffect(() => {
    checkPhoneNumber()
    const initFetch = async () => {
      const [resultCities, resultBrand, resultYears] = await Promise.all([
        getCities(),
        getRefinancingCarsBrand(),
        getRefinancingCarsYear(),
      ])

      const listCities = resultCities
      const listBrands = resultBrand.data
      const listYears = resultYears.data

      const formOptionCity = listCities
        .filter(
          (x: { cityName: string | string[] }) => !x.cityName.includes('GIIAS'),
        )
        .map((item: { cityName: any; id: number }) => ({
          label: item.cityName,
          value: item.id,
        }))

      const formBrand = listBrands.map((item: { brand: string }) => ({
        label: formatLabel(item.brand),
        value: item.brand,
      }))

      const formYear = listYears.map((item: { year: string }) => ({
        label: item.year.toString(),
        value: item.year.toString(),
      }))

      setCityOption(formOptionCity)
      setBrands(formBrand)
      setYears(formYear)
      setLoadList((prev) => ({ ...prev, brand: false }))
    }

    initFetch()
    if (!!getToken()) {
      getCurrentUserInfo
      getCurrentUserOwnCode()
    }
  }, [])

  useEffect(() => {
    autofillRefCodeValue()
  }, [connectedCode])

  useEffect(() => {
    if (data.cityName === '') {
      setSuggestionListCity(cityOption)
      return
    }

    const tempCity = cityOption
      ?.filter((x) =>
        String(x.label).toLowerCase().includes(data.cityName.toLowerCase()),
      )
      .filter((y) => y.value)

    setSuggestionListCity(tempCity)
  }, [data.cityName, cityOption])

  useEffect(() => {
    if (data.brand === '') {
      setSuggestionListBrands(brands)
      return
    }

    const tempBrands = brands
      ?.filter((x) =>
        String(x.label).toLowerCase().includes(data.brand.toLowerCase()),
      )
      .filter((y) => y.value)

    setSuggestionListBrands(tempBrands)
  }, [data.brand, brands])

  useEffect(() => {
    if (data.model === '') {
      setSuggestionListModels(models)
      return
    }

    const tempModels = models
      ?.filter((x) =>
        String(x.label).toLowerCase().includes(data.model.toLowerCase()),
      )
      .filter((y) => y.value)

    setSuggestionListModels(tempModels)
  }, [data.model, models])

  useEffect(() => {
    if (data.year === '') {
      setSuggestionListYears(years)
      return
    }

    const tempYears = years
      ?.filter((x) => String(x.label).includes(data.year))
      .filter((y) => y.value)

    setSuggestionListYears(tempYears)
  }, [data.year, years])

  const onChooseBrand = (item: Option<FormControlValue>) => {
    if (data.brand && item.value !== data.brand) {
      setData((prev) => ({
        ...prev,
        model: '',
        lastChosenModel: '',
        year: '',
        lastChosenYear: '',
      }))
    }
    setData((prev) => ({
      ...prev,
      brand: item.value as string,
      lastChosenBrand: item.value as string,
    }))
    setError((prev) => ({ ...prev, brand: { empty: false, message: '' } }))
    if (!item.value) return
    setLoadList((prev) => ({ ...prev, model: true }))
    getRefinancingCarsModel(item.value as string).then((result) => {
      const list = result.data
      const formModel = list.map((listItem: { model: string }) => ({
        label: formatLabel(listItem.model),
        value: listItem.model,
      }))
      setModels(formModel)
      setLoadList((prev) => ({ ...prev, model: false }))
    })
  }

  const onChooseModel = (item: Option<FormControlValue>) => {
    if (data.model && item.value !== data.model) {
      setData((prev) => ({ ...prev, year: '', lastChosenYear: '' }))
    }
    setData((prev) => ({
      ...prev,
      model: item.value as string,
      lastChosenModel: item.value as string,
    }))
    setError((prev) => ({ ...prev, model: { empty: false, message: '' } }))
  }

  const onChooseYear = (item: Option<FormControlValue>) => {
    setData((prev) => ({
      ...prev,
      year: item.value as string,
      lastChosenYear: item.value as string,
    }))
    setError((prev) => ({ ...prev, year: { empty: false, message: '' } }))
  }

  const onChooseCity = (item: Option<FormControlValue>) => {
    setData((prev) => ({
      ...prev,
      cityName: item.label as string,
      lastChosenCityName: item.label as string,
      cityId: item.value as number,
    }))
    setError((prev) => ({ ...prev, city: { empty: false, message: '' } }))
  }

  const onInputLoanRange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value.length < 12) {
      const digit = filterNonDigitCharacters(value)
      const digitWithSeparator = replacePriceSeparatorByLocalization(
        digit,
        LanguageCode.id,
      )
      setData((prev) => ({ ...prev, loan: digitWithSeparator }))
      if (value) {
        setError((prev) => ({
          ...prev,
          loan: {
            empty: false,
            message:
              Number(digit) > MAX_LOAN
                ? MAX_LOAN_ERROR_MESSAGE
                : Number(digit) < MIN_LOAN
                ? MIN_LOAN_ERROR_MESSAGE
                : '',
          },
        }))
      } else {
        setError((prev) => ({
          ...prev,
          loan: {
            empty: false,
            message: '',
          },
        }))
      }
    }
  }

  const handleInputRefferal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsErrorReferralCodeInvalid(false)
    setIsErrorRefCodeUsingOwnCode(false)
    setIsLoadingReferralCode(false)
    setisSuccessReferralCode(false)
    const input = e.target.value
      .toUpperCase()
      .replace(' ', '')
      .replace(/[^\w\s]/gi, '')

    setReferralCodeInput(input)
  }

  const getCurrentUserInfo = () => {
    getCustomerInfoSeva()
      .then((response) => {
        if (response[0].temanSevaTrxCode && referralCodeInput === '') {
          setReferralCodeInput(response[0].temanSevaTrxCode)
          localStorage.setItem(
            LocalStorageKey.ReferralCodePrelimQuestion,
            response[0].temanSevaTrxCode,
          )
        }

        if (response[0].temanSevaTrxCode) {
          setConnectedCode(response[0].temanSevaTrxCode ?? '')
        } else {
          setConnectedCode('')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const autofillRefCodeValue = () => {
    if (referralCodeFromUrl && referralCodeFromUrl.length > 0) {
      setReferralCodeInput(referralCodeFromUrl)
      checkRefCode(referralCodeFromUrl)
    } else if (connectedCode.length > 0) {
      setReferralCodeInput(connectedCode)
      checkRefCode(connectedCode)
    } else {
      setReferralCodeInput('')
    }
  }

  const resetReferralCodeStatus = (): void => {
    setIsLoadingReferralCode(false)
    setIsErrorReferralCodeInvalid(false)
    setIsErrorRefCodeUsingOwnCode(false)
    setisSuccessReferralCode(false)
    setReferralCodeInput('')
  }

  const checkRefCode = async (value: string): Promise<boolean> => {
    if (value !== '') {
      if (value === currentUserOwnCode) {
        setIsErrorReferralCodeInvalid(false)
        setIsErrorRefCodeUsingOwnCode(true)
        localStorage.setItem(LocalStorageKey.ReferralCodePrelimQuestion, '')
        return false
      } else {
        setIsLoadingReferralCode(true)
        try {
          await checkReferralCode(value, getToken()?.phoneNumber ?? '')
          setIsLoadingReferralCode(false)
          setIsErrorReferralCodeInvalid(false)
          setIsErrorRefCodeUsingOwnCode(false)
          setisSuccessReferralCode(true)
          localStorage.setItem(
            LocalStorageKey.ReferralCodePrelimQuestion,
            value,
          )
          return true
        } catch (error) {
          setIsLoadingReferralCode(false)
          setIsErrorReferralCodeInvalid(true)
          setIsErrorRefCodeUsingOwnCode(false)
          setisSuccessReferralCode(false)
          localStorage.setItem(LocalStorageKey.ReferralCodePrelimQuestion, '')
          return false
        }
      }
    } else {
      localStorage.setItem(LocalStorageKey.ReferralCodePrelimQuestion, '')
      return true
    }
  }

  const getErrorMesssageRefCode = () => {
    if (isErrorReferralCodeInvalid) {
      return 'Kode referral tidak tersedia.'
    } else if (isErrorRefCodeUsingOwnCode) {
      return 'Kamu tidak bisa menggunakan kode referral milikmu sendiri.'
    } else {
      return 'Kode referral tidak ditemukan.'
    }
  }

  const getCurrentUserOwnCode = () => {
    axios
      .get(temanSevaUrlPath.profile, {
        headers: { phoneNumber: getToken()?.phoneNumber ?? '' },
      })
      .then((res) => {
        setCurrentUserOwnCode(res.data.temanSevaRefCode)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onChooseTenure = (tenure: string) => () => {
    setData((prev) => ({ ...prev, tenure }))
  }

  const checkFormFilled = (): boolean => {
    const gotEmpty = {
      brand: { empty: !data.brand, message: '' },
      model: { empty: !data.model, message: '' },
      year: { empty: !data.year, message: '' },
      city: { empty: !data.cityName, message: '' },
      loan: { empty: !data.loan, message: error.loan.message },
    }

    const checkGotEmpty = Object.values(gotEmpty).filter((x) => x.empty)
    if (checkGotEmpty.length > 0) {
      setError(gotEmpty)
      return false
    }

    if (error.loan.message) return false

    return true
  }

  const onSubmit = async () => {
    const isFormFilled = checkFormFilled()
    const refCodeValidity = await checkRefCode(referralCodeInput)
    if (isFormFilled && refCodeValidity) {
      setLoadSubmit(true)
      if (referralCodeInput && referralCodeInput.length > 0) {
        saveLocalStorage(LocalStorageKey.referralTemanSeva, referralCodeInput)
      }
      const dataLeadsForm: RefinancingSecondLeadsData = {
        carBrandText: data.brand,
        carModelText: data.model,
        carYear: data.year,
        cityId: Number(data.cityId),
        contactId: contactId,
        loanAmount: Number(filterNonDigitCharacters(data.loan)),
        loanTenure: data.tenure,
        leasing: 'ACC',
        temanSevaTrxCode: referralCodeInput || '',
      }

      postSendRefinancingSecondLeadsForm(dataLeadsForm)
        .then(() => {
          localStorage.removeItem(LocalStorageKey.IdCustomerRefi)
          localStorage.removeItem(LocalStorageKey.FullNameRefi)
          localStorage.removeItem(LocalStorageKey.PhoneNumberRefi)
          router.push(refinancingSuccessUrl)
        })
        .finally(() => setLoadSubmit(false))
    }
  }

  const renderErrorMessage = (message: string) => {
    return (
      <div className={styles.errorWrapper}>
        <AlertBlue width={16} height={16} color="#EC0A23" />
        <div className={styles.errorText}>{message || 'Wajib diisi'}</div>
      </div>
    )
  }

  const onChangeBrand = (value: string) => {
    setData((prev) => ({ ...prev, brand: value as string }))
  }

  const onChangeModel = (value: string) => {
    setData((prev) => ({ ...prev, model: value as string }))
  }

  const onChangeYear = (value: string) => {
    setData((prev) => ({ ...prev, year: value as string }))
  }

  const onChangeCity = (value: string) => {
    setData((prev) => ({ ...prev, cityName: value }))
  }

  const onBlurBrand = () => {
    setData((prev) => ({ ...prev, brand: prev.lastChosenBrand as string }))
  }

  const onBlurModel = () => {
    setData((prev) => ({ ...prev, model: prev.lastChosenModel as string }))
  }

  const onBlurYear = () => {
    setData((prev) => ({ ...prev, year: prev.lastChosenYear as string }))
  }

  const onBlurCity = () => {
    setData((prev) => ({
      ...prev,
      cityName: prev.lastChosenCityName as string,
    }))
  }

  const renderLoadingIcon = () => {
    return (
      <div className="rotateAnimation">
        <IconLoading width={20} height={20} />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <RefinancingFormHeader checkSamePhonenumber={samePhoneNumber} />
      <div className={styles.bodyContainer}>
        <span className={styles.labelForm}>Merek mobil kamu</span>
        <InputSelect
          additionalContainerClassname={styles.styledSearchInput}
          value={data.brand}
          options={suggestionListBrands}
          onChange={onChangeBrand}
          placeholderText={'Tuliskan merek mobil kamu'}
          isAutoFocus={false}
          isClearable={false}
          noOptionsText="Merek tidak ditemukan."
          onBlurInput={onBlurBrand}
          onChoose={onChooseBrand}
          rightIcon={loadList.brand ? renderLoadingIcon : undefined}
          isError={error.brand.empty}
        />
        {error.brand.empty ? renderErrorMessage(error.brand.message) : <></>}

        <span className={styles.labelForm}>Model mobil kamu</span>
        <InputSelect
          additionalContainerClassname={styles.styledSearchInput}
          value={data.model}
          options={suggestionListModels}
          onChange={onChangeModel}
          placeholderText={'Tuliskan model mobil kamu'}
          isAutoFocus={false}
          isClearable={false}
          noOptionsText="Model tidak ditemukan."
          onBlurInput={onBlurModel}
          onChoose={onChooseModel}
          disabled={!data.brand}
          rightIcon={loadList.model ? renderLoadingIcon : undefined}
          isError={error.model.empty}
        />
        {error.model.empty ? renderErrorMessage(error.model.message) : <></>}

        <span className={styles.labelForm}>Tahun mobil kamu</span>
        <InputSelect
          additionalContainerClassname={styles.styledSearchInput}
          value={data.year}
          options={suggestionListYears}
          onChange={onChangeYear}
          placeholderText={'Contoh: 2019'}
          isAutoFocus={false}
          isClearable={false}
          noOptionsText="Tahun tidak ditemukan."
          onBlurInput={onBlurYear}
          onChoose={onChooseYear}
          disabled={!data.model}
          rightIcon={loadList.year ? renderLoadingIcon : undefined}
          isError={error.year.empty}
        />
        {error.year.empty ? renderErrorMessage(error.year.message) : <></>}

        <span className={styles.labelForm}>Lokasi pengajuan</span>
        <InputSelect
          additionalContainerClassname={styles.styledSearchInput}
          value={data.cityName}
          options={suggestionListCity}
          onChange={onChangeCity}
          placeholderText={'Tuliskan kota kamu berada'}
          isAutoFocus={false}
          isClearable={false}
          noOptionsText="Kota tidak ditemukan."
          onBlurInput={onBlurCity}
          onChoose={onChooseCity}
          isError={error.city.empty}
        />
        {error.city.empty ? renderErrorMessage(error.city.message) : <></>}

        <span className={styles.labelForm}>
          Besaran pinjaman yang kamu harapkan
        </span>
        <NewInput
          prefixComponent={() => <span className={styles.prefixRp}>Rp</span>}
          placeholder="10.000.000"
          type={'tel'}
          value={data.loan}
          onChange={onInputLoanRange}
          // additionalContainerClassname={}
          additionalInputAreaClassname={clsx({
            [styles.styledInput]: true,
            [styles.styledInputError]: error.loan.empty || error.loan.message,
          })}
        />
        {(error.loan.empty || error.loan.message) &&
          renderErrorMessage(error.loan.message)}
        <span className={styles.labelForm}>Pilih tenor yang kamu inginkan</span>
        <div className={styles.tenureWrapper}>
          {['1', '2', '3', '4'].map((item) => (
            <div
              className={clsx({
                [styles.tenureOption]: true,
                [styles.tenureOptionSelected]: item === data.tenure,
              })}
              key={item}
              onClick={onChooseTenure(item)}
            >
              <label>{item} Tahun</label>
            </div>
          ))}
        </div>
        <div className={styles.accWrapper}>
          <Image width={24} height={31} src={AccLogo} alt="Logo ACC" />
          <span className={styles.accClaim}>
            {
              'Kamu akan dibantu oleh perusahaan pembiayaan Astra Credit Companies (ACC)'
            }
          </span>
        </div>
        <FormReferralCode
          onClearInput={resetReferralCodeStatus}
          value={referralCodeInput}
          isLoadingReferralCode={isLoadingReferralCode}
          isErrorReferralCode={
            referralCodeInput !== '' &&
            (isErrorReferralCodeInvalid || isErrorRefCodeUsingOwnCode)
          }
          isSuccessReferralCode={isSuccessReferralCode}
          passedResetReferralCodeStatusFunc={resetReferralCodeStatus}
          passedCheckReferralCodeFunc={() => checkRefCode(referralCodeInput)}
          emitOnChange={handleInputRefferal}
          checkedIconColor={'#05256E'}
          errorIconColor={'#D83130'}
          errorMessage={getErrorMesssageRefCode()}
          maxInputLength={8}
          vibrateErrorMessage={true}
          fieldLabel={'Kode Referral Teman SEVA (Opsional)'}
          placeholderText={'Contoh: SEVA0000'}
          additionalContainerStyle={styles.styledReferralInput}
        />
        <Button
          version={ButtonVersion.Default}
          size={ButtonSize.Big}
          className={styles.sendButton}
          onClick={onSubmit}
          loading={loadSubmit}
        >
          Kirim
        </Button>
        <span className={styles.acceptanceWord}>
          Dengan mengirim informasi ini, kamu akan dihubungi oleh Tim SEVA
        </span>
      </div>
    </div>
  )
}
