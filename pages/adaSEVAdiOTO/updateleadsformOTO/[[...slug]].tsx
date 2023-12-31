import Seo from 'components/atoms/seo'
import { InformationSection } from 'components/organisms'
import { InferGetServerSidePropsType } from 'next'
import { defaultSeoImage } from 'utils/helpers/const'
import styles from 'styles/pages/updateLeadsformOTO.module.scss'
import styles2 from 'styles/components/molecules/formUpdateLeadsSevaOTO/formLeadsResponse.module.scss'
import { FormLeadsResponse } from 'components/molecules/formUpdateLeadsSevaOTO/formLeadsResponse'
import FormDBLeads from 'components/molecules/formUpdateLeadsSevaOTO/formDBLeads'
import { FormLeadsQualified } from 'components/molecules/formUpdateLeadsSevaOTO/formLeadsQualified'
import FormSelectCitySevaOTO from 'components/molecules/formUpdateLeadsSevaOTO/formSelectCitySevaOTO'
import { useEffect, useRef, useState } from 'react'
import { variantEmptyValue } from 'components/molecules/form/formSelectCarVariant'
import { ModelVariant } from 'utils/types/carVariant'
import { CityOtrOption } from 'utils/types'
import { useLocalStorage } from 'utils/hooks/useLocalStorage'
import { LocalStorageKey } from 'utils/enum'
import { CarModel } from 'utils/types/carModel'
import { Button, InputPhone } from 'components/atoms'
import { ButtonSize, ButtonVersion } from 'components/atoms/button'
import { FormSelectModelCarSevaOTO } from 'components/molecules/formUpdateLeadsSevaOTO/formSelectModelCarSevaOTO'
import { FormSelectCarVariantSevaOTO } from 'components/molecules/formUpdateLeadsSevaOTO/formSelectCarVariant'
import { updateLeadFormOTO } from 'services/leadsSeva'
import { FormSelectBrandCarSevaOTO } from 'components/molecules/formUpdateLeadsSevaOTO/formSelectBrandCarSevaOTO'
import { InputVersionType } from 'utils/enum'
import { Input } from 'antd'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { getCarModelDetailsById } from 'utils/handler/carRecommendation'

import CarSillhouete from '/public/revamp/illustration/car-sillhouete.webp'
import { getLeadsDetail, getRecommendation } from 'services/api'

const Toast = dynamic(() => import('components/atoms').then((mod) => mod.Toast))
const LabelTooltipSevaOTO = dynamic(() =>
  import('components/molecules/label/labelTooltipSevaOTO').then(
    (mod) => mod.LabelTooltipSevaOTO,
  ),
)

interface FormDataState {
  leadId: string
  city:
    | {
        cityName: string
        cityCode: string
        province: string
        id?: string
      }
    | undefined
  leadResponse: boolean
  isLeadQualified: boolean
  name: string
  phone: string
  model:
    | {
        modelId: string
        modelName: string
        modelImage: string
        brandName: string
      }
    | undefined
  variant:
    | { variantId: string; variantName: string; otr: string; discount: number }
    | undefined
}

interface inputData {
  leadId: string
  leadResponse: boolean
  isLeadQualified: boolean
  carVariantId: string
  carModelId: string
  cityId: number
  priceOtr: number
  notes: string
}

interface CsaInput {
  leadResponse: boolean
  isLeadQualified: boolean
  carVariantId: string
  carModelId: string
  cityId: number
  carVariant: string
  carModel: string
  notes: string
}

interface DataResponse {
  leadId: string
  phoneNumber: string
  name: string
  csaInput: CsaInput
}

const { TextArea } = Input

const UpdateLeadsFormOTO = ({
  isValid,
  csaInput,
  leadId,
  phoneNumber,
  name,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [leadRes, setLeadRes] = useState(
    csaInput?.leadResponse == null || undefined ? true : csaInput?.leadResponse,
  )
  const [leadQualified, setLeadQualified] = useState(
    csaInput?.isLeadQualified == null || undefined
      ? true
      : csaInput?.isLeadQualified,
  )
  const [modelError, setModelError] = useState<boolean>(false)
  const [disableBtn, setDisableBtn] = useState<boolean>(false)
  const [typeToast, setTypeToast] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCheckedBrand, setIsCheckedBrand] = useState<string[]>([])
  const [carVariantList, setCarVariantList] = useState<ModelVariant[]>([])
  const [allModelCarList, setAllModalCarList] = useState<CarModel[]>([])
  const [notes, setNotes] = useState(
    csaInput?.notes == null ? '' : csaInput?.notes,
  )
  const [cityOtr] = useLocalStorage<CityOtrOption | null>(
    LocalStorageKey.CityOtr,
    null,
  )
  const [isOpenToast, setIsOpenToast] = useState(false)
  const [toastMessage, setToastMessage] = useState(
    'Update form telah berhasil diperbaharui',
  )

  const titleRef = useRef<null | HTMLDivElement>(null)

  const router = useRouter()

  const [isUserChooseVariantDropdown, setIsUserChooseVariantDropdown] =
    useState(false)

  const getAutofilledCityData = () => {
    // related to logic inside component "FormSelectCity"
    if (cityOtr) {
      return cityOtr
    } else {
      return null
    }
  }

  const scrollToTitleRef = () => {
    titleRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
  }

  const [forms, setForms] = useState<FormDataState>({
    leadId: leadId,
    leadResponse: leadRes,
    isLeadQualified: leadQualified,
    name: name,
    phone: phoneNumber.slice(3),
    city: {
      cityCode: csaInput?.cityId.toString() ? csaInput?.cityId.toString() : '',
      cityName: '',
      province: '',
      id: csaInput?.cityId == null ? '' : csaInput?.cityId.toString(),
    },
    model: {
      brandName: '',
      modelName: csaInput?.carModel == null ? '' : csaInput?.carModel,
      modelId: csaInput?.carModelId == null ? '' : csaInput?.carModelId,
      modelImage: '',
    },
    variant: {
      variantId: csaInput?.carVariantId == null ? '' : csaInput?.carVariantId,
      variantName: csaInput?.carVariant == null ? '' : csaInput?.carVariant,
      otr: '',
      discount: 0,
    },
  })

  if (!isValid) {
    return <div className="blank"></div>
  }

  const handleChange = (name: string, value: any) => {
    if (name === 'city') {
      // check reset condition

      setForms({
        ...forms,
        [name]: value,
        variant: variantEmptyValue,
      })
      return
    }

    if (name === 'model') {
      setForms({
        ...forms,
        [name]: value,
        variant: variantEmptyValue,
      })
      // after set value & reset variant, no need to set value again
      return
    }

    if (name === 'variant') {
      setForms({
        ...forms,
        [name]: value,
      })

      return
    }
  }

  const fetchCarVariant = async () => {
    const response = await getCarModelDetailsById(forms.model?.modelId ?? '')
    setCarVariantList(response.variants)
  }

  const fetchAllCarModels = async () => {
    if (forms?.city?.id) {
      const params = new URLSearchParams()
      params.append('cityId', forms?.city?.id as string)
      params.append('city', forms?.city?.cityCode as string)

      const response = await getRecommendation('', { params })

      setAllModalCarList(
        response.carRecommendations.filter(
          (item: any) => item.brand === isCheckedBrand[0],
        ),
      )
    }
  }

  useEffect(() => {
    setForms({
      ...forms,
      leadResponse: leadRes,
    })
  }, [leadRes])

  useEffect(() => {
    setForms({
      ...forms,
      isLeadQualified: leadQualified,
    })
  }, [leadQualified])

  useEffect(() => {
    if (isCheckedBrand.length > 0) fetchAllCarModels()
  }, [isCheckedBrand, forms.city?.id])

  useEffect(() => {
    if (forms.model?.modelId !== '' && forms.city?.id !== '') fetchCarVariant()
  }, [forms.model?.modelId, forms.city])

  useEffect(() => {
    if (csaInput !== null) setDisableBtn(true)

    // setDisableBtn(true)
  }, [csaInput])

  const handleSubmit = async () => {
    setIsLoading(true)
    const otr = forms.variant?.otr.replace(/[^0-9]/g, '')

    // Convert the string to an integer.
    if (
      forms?.model?.modelId !== undefined &&
      forms?.variant?.variantId !== undefined
    ) {
      const data: inputData = {
        leadId: forms.leadId,
        leadResponse: forms.leadResponse,
        isLeadQualified: forms.isLeadQualified,
        carModelId: forms?.model?.modelId,
        carVariantId: forms.variant?.variantId,
        cityId: parseInt(forms?.city?.id!),
        priceOtr: parseInt(otr!),
        notes: notes,
      }

      if (data.leadResponse == false && data.isLeadQualified == true) {
        setIsLoading(false)
        setIsCheckedBrand([])
        setNotes('')
        setForms({
          ...forms,
          city: {
            cityCode: '',
            cityName: '',
            province: '',
            id: '',
          },
          model: {
            brandName: '',
            modelName: '',
            modelId: '',
            modelImage: '',
          },
          variant: {
            variantId: '',
            variantName: '',
            otr: '',
            discount: 0,
          },
        })
        setToastMessage('Update form gagal diperbaharui, silahkan coba lagi')
        setIsOpenToast(true)
        setTypeToast(false)
        setTimeout(() => {
          scrollToTitleRef()
          setIsOpenToast(false)
        }, 3000)
        return
      }

      if (
        data.carModelId === '' &&
        data.leadResponse === true &&
        data.isLeadQualified == true
      ) {
        setForms({
          ...forms,
          city: {
            cityCode: '',
            cityName: '',
            province: '',
            id: '',
          },
          model: {
            brandName: '',
            modelName: '',
            modelId: '',
            modelImage: '',
          },
          variant: {
            variantId: '',
            variantName: '',
            otr: '',
            discount: 0,
          },
        })
        setToastMessage(
          'Update form gagal diperbaharui, silahkan lengkapi form terlebih dahulu',
        )
        setIsOpenToast(true)
        setTypeToast(false)
        setTimeout(() => {
          scrollToTitleRef()
          setIsOpenToast(false)
        }, 3000)
        setIsLoading(false)
        return
      }

      if (
        data.carVariantId === '' &&
        data.leadResponse === true &&
        data.isLeadQualified == true
      ) {
        setForms({
          ...forms,
          variant: {
            variantId: '',
            variantName: '',
            otr: '',
            discount: 0,
          },
        })
        setToastMessage(
          'Update form gagal diperbaharui, silahkan lengkapi form terlebih dahulu',
        )
        setIsOpenToast(true)
        setTypeToast(false)
        setTimeout(() => {
          scrollToTitleRef()
          setIsOpenToast(false)
        }, 3000)
        setIsLoading(false)
        return
      }

      try {
        const res = await updateLeadFormOTO(data)

        if (res.code === 'SUCCESS') {
          setToastMessage('Update form telah berhasil diperbaharui')
          setIsOpenToast(true)
          setIsLoading(false)
          setTypeToast(true)
          setDisableBtn(true)
          setNotes('')
          setForms({
            ...forms,
            city: {
              cityCode: '',
              cityName: '',
              province: '',
              id: '',
            },
            model: {
              brandName: '',
              modelName: '',
              modelId: '',
              modelImage: '',
            },
            variant: {
              variantId: '',
              variantName: '',
              otr: '',
              discount: 0,
            },
          })
          setTimeout(() => {
            setIsOpenToast(false)
          }, 3000)
        }
      } catch (error) {
        setIsCheckedBrand([])
        setNotes('')
        setForms({
          ...forms,
          city: {
            cityCode: '',
            cityName: '',
            province: '',
            id: '',
          },
          model: {
            brandName: '',
            modelName: '',
            modelId: '',
            modelImage: '',
          },
          variant: {
            variantId: '',
            variantName: '',
            otr: '',
            discount: 0,
          },
        })
        setToastMessage('Update form gagal diperbaharui, silahkan coba lagi')
        setDisableBtn(true)
        setIsOpenToast(true)
        setTypeToast(false)
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <Seo
        title="SEVA - Beli Mobil Terbaru Dengan Cicilan Kredit Terbaik"
        description="Beli mobil terbaru dari Toyota, Daihatsu, BMW dengan Instant Approval*. Proses Aman & Mudah✅ Terintegrasi dengan ACC & TAF✅ SEVA member of ASTRA"
        image={defaultSeoImage}
      />
      <div className={styles.container}>
        <InformationSection />
        <div className={styles.titleWrapper}>
          <h2 className={styles.title} ref={titleRef}>
            Update Form SEVA X OTO
          </h2>
          <div className={styles.containerInput}>
            <FormDBLeads value={forms.leadId} />
          </div>
          <div className={styles.containerInput}>
            <FormDBLeads title="Name" value={forms.name} />
          </div>
          <div className={styles.containerInput}>
            <div
              className={styles2.textTitle}
              style={{ marginTop: '8px', marginBottom: '8px' }}
            >
              Phone Number
            </div>
            <InputPhone
              version={InputVersionType.Secondary}
              placeholder="Masukkan nomor HP"
              disabled={true}
              title=""
              value={forms?.phone}
              onChange={(e: any) => {}}
            />
          </div>
          <FormLeadsResponse
            className={styles.containerInput}
            setLeadRes={setLeadRes}
            leadRes={forms?.leadResponse}
          />
          <FormLeadsQualified
            className={styles.containerInput}
            setLeadQualified={setLeadQualified}
            leadQualified={forms?.isLeadQualified}
          />
          <div className={styles.containerInput}>
            <div className={styles2.textTitle}>
              City Name <span className={styles2.red}>*</span>
            </div>
            <FormSelectCitySevaOTO
              isHasCarParameter={false}
              disabledInput={disableBtn}
              handleChange={handleChange}
              name="city"
              className={styles.containerInput}
            />
          </div>
          <div className={styles.containerInput}>
            <div className={styles2.textTitle}>
              <LabelTooltipSevaOTO
                label={`Car Brand`}
                name="carBrand"
                required={true}
                content={
                  'Sebelum mengisi car brand wajib mengisi city name terlebih dahulu'
                }
              />
            </div>
            <FormSelectBrandCarSevaOTO
              isSelected={
                forms.city?.cityName !== ''
                  ? true
                  : false || disableBtn == true
                  ? false
                  : true
              }
              isCheckedBrand={isCheckedBrand}
              setIsCheckedBrand={setIsCheckedBrand}
              isButtonClick={false}
              isResetFilter={isOpenToast}
              setResetTmp={false}
            />
          </div>
          <div className={styles.containerInput}>
            <div className={styles2.gapTitle}>
              <LabelTooltipSevaOTO
                label={`Car Model`}
                name="model"
                required={true}
                content={
                  'Sebelum mengisi car model wajib mengisi car brand terlebih dahulu.'
                }
              />
            </div>
            <FormSelectModelCarSevaOTO
              selectedCity={forms?.city?.cityCode || ''}
              handleChange={handleChange}
              name="model"
              value={forms?.model?.modelName || ''}
              valueImage={
                forms.model?.modelImage || (CarSillhouete as unknown as string)
              }
              valueId={isCheckedBrand[0] || ''}
              allModelCarList={allModelCarList}
              setModelError={setModelError}
              overrideDisabled={disableBtn}
            />
          </div>
          <div className={styles.containerInput}>
            <div className={styles2.gapTitle}>
              <LabelTooltipSevaOTO
                label={`Car Variant`}
                name="carVariant"
                required={true}
                content={
                  'Sebelum mengisi car variant wajib mengisi car model terlebih dahulu'
                }
              />
            </div>
            <FormSelectCarVariantSevaOTO
              carVariantList={carVariantList}
              handleChange={handleChange}
              disable={disableBtn}
              name="variant"
              modelError={false}
              value={forms.variant || variantEmptyValue}
              selectedModel={forms?.model?.modelId || ''}
            />
          </div>
          <div className={styles.containerInput}>
            <div className={styles2.textTitle}>Notes</div>
            <TextArea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={disableBtn}
            />
          </div>
          <div className={styles.buttonSubmit}>
            <Button
              version={ButtonVersion.PrimaryDarkBlue}
              size={ButtonSize.Big}
              onClick={handleSubmit}
              loading={isLoading}
              disabled={disableBtn}
            >
              Submit
            </Button>
          </div>
          <Toast
            width={339}
            open={isOpenToast}
            text={toastMessage}
            typeToast={typeToast ? 'success' : 'error'}
            onCancel={() => setIsOpenToast(false)}
            closeOnToastClick
          />
        </div>
      </div>
    </>
  )
}

export default UpdateLeadsFormOTO

export async function getServerSideProps(context: any) {
  const detailId = context.query.slug[0]
  const TokenStatic = context.query.slug[1]
  let valid = true

  // TODO: Check Token
  if (TokenStatic !== 'b3RvY29t') {
    valid = false
  }
  // TODO: getDetail ID

  try {
    const response = await getLeadsDetail(detailId)
    const data: DataResponse = response.data

    const csaInput = data.csaInput
    const leadId = data.leadId
    const name = data.name
    const phoneNumber = data.phoneNumber

    return {
      props: {
        isValid: valid,
        csaInput,
        leadId,
        name,
        phoneNumber,
      },
    }
  } catch (error) {
    throw error
  }
}
