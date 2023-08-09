import React, { useRef, useState } from 'react'
import styles from 'styles/components/organisms/variantsOptions.module.scss'
import {
  CarModelDetailsResponse,
  CarVariantRecommendation,
} from 'utils/types/utils'
import { IconFuel, IconTransmission } from 'components/atoms'
import {
  formatNumberByLocalization,
  replacePriceSeparatorByLocalization,
} from 'utils/numberUtils/numberUtils'
import { LanguageCode, LocalStorageKey } from 'utils/models/models'
import {
  IconChevronDown,
  IconChevronUp,
  IconToggleGridActive,
  IconToggleGridInactive,
  IconToggleListActive,
  IconToggleListInactive,
} from 'components/atoms'
import { useLocalStorage } from 'utils/hooks/useLocalStorage/useLocalStorage'
import { useFunnelQueryData } from 'context/funnelQueryContext/funnelQueryContext'
import {
  trackCarVariantPricelistClick,
  trackCarVariantPricelistClickCta,
  trackChangeLayoutClick,
} from 'helpers/amplitude/seva20Tracking'
import { million, ten } from 'utils/helpers/const'
import { variantListUrl } from 'utils/helpers/routes'
import elementId from 'helpers/elementIds'
import { CityOtrOption } from 'utils/types/utils'
import { useRouter } from 'next/router'

const rpIcon = '/revamp/illustration/rp-icon.webp'

type VariantsProps = {
  carModelDetails: CarModelDetailsResponse
  setViewVariant: (value: CarVariantRecommendation) => void
  setOpenModal: (value: boolean) => void
  onCardClick: (value: CarVariantRecommendation) => void
  setSelectedTabValue?: (value: string) => void
}
const TabContentLowerVariant = ({
  carModelDetails,
  setOpenModal,
  setViewVariant,
  setSelectedTabValue,
  onCardClick,
}: VariantsProps) => {
  const [toggleHorizontal, setToggleHorizontal] = useState(true)
  const [expandHorizontal, setExpandHorizontal] = useState(false)
  const [onHover, setOnHover] = useState(false)
  const collapseRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const [cityOtr] = useLocalStorage<CityOtrOption | null>(
    LocalStorageKey.CityOtr,
    null,
  )
  const router = useRouter()

  const brand = router.query.brand as string
  const model = router.query.model as string

  const { funnelQuery } = useFunnelQueryData()
  const getDataForAmplitude = (carVariant: CarVariantRecommendation) => {
    return {
      Car_Brand: carModelDetails.brand ?? '',
      Car_Model: carModelDetails.model ?? '',
      OTR:
        'RP' +
        replacePriceSeparatorByLocalization(
          carVariant.priceValue,
          LanguageCode.id,
        ),
      City: cityOtr?.cityName || 'null',
      Car_Variant: carVariant.name,
      Page_Origination_URL: window.location.href,
      ...(funnelQuery.downPaymentAmount && {
        DP: 'RP' + funnelQuery.downPaymentAmount + ' Juta',
      }),
      ...(funnelQuery.age && {
        Age_Group: funnelQuery.age.toString(),
      }),
      Cicilan: `Rp${formatNumberByLocalization(
        carVariant.monthlyInstallment,
        LanguageCode.id,
        million,
        ten,
      ).toString()} jt/bln`,
      ...(funnelQuery.tenure && {
        Tenure: funnelQuery.tenure.toString(),
      }),
    }
  }
  const removeToneColor = (variantName: string) => {
    const variantSplice =
      variantName[variantName.length - 1] === ' '
        ? variantName.slice(0, variantName.length - 1).toLowerCase()
        : variantName.toLowerCase()
    const variant = variantSplice.toLowerCase()
    if (variant.includes('non premium color')) {
      return variant.replace('(non premium color)', '').toUpperCase()
    } else if (variant.includes('premium color')) {
      return variant.replace('(premium color)', '').toUpperCase()
    } else if (variant.includes('two tone')) {
      return variant.replace('two tone', '').toUpperCase()
    } else if (variant.includes('one tone')) {
      return variant.replace('one tone', '').toUpperCase()
    } else {
      return variantName
    }
  }

  const navigateToCreditTab = (carVariant: CarVariantRecommendation) => {
    trackCarVariantPricelistClickCta(getDataForAmplitude(carVariant))
    setSelectedTabValue && setSelectedTabValue('Kredit')
    router.replace(
      {
        pathname: variantListUrl
          .replace(':brand', brand)
          .replace(':model', model)
          .replace(':tab?', 'kredit'),
        query: { selectedVariantId: carVariant.id },
      },
      undefined,
      { scroll: false },
    )
  }

  return (
    <div>
      <div className={styles.cardInfoDetail} style={{ height: 'auto' }}>
        <div className={styles.row} style={{ justifyContent: 'space-between' }}>
          <div
            className={styles.rowWithGap}
            data-testid={elementId.Text + 'harga'}
          >
            <img src={rpIcon} />
            <h2 className={styles.textTitleSection}>Harga</h2>
          </div>
          <div>
            {toggleHorizontal ? (
              <div
                className={styles.toggleHorizontalWrapper}
                data-testid={elementId.PDP.Button.Grid}
              >
                <div
                  className={styles.toggleActive}
                  onClick={() => {
                    setToggleHorizontal(true)
                    trackChangeLayoutClick({
                      Page_Origination_URL: window.location.href,
                    })
                  }}
                >
                  <IconToggleGridActive width={16} height={16} />
                </div>
                <div
                  onClick={() => {
                    setToggleHorizontal(false)
                    trackChangeLayoutClick({
                      Page_Origination_URL: window.location.href,
                    })
                  }}
                >
                  <IconToggleListInactive width={16} height={16} />
                </div>
              </div>
            ) : (
              <div
                className={styles.toggleVerticalWrapper}
                data-testid={elementId.PDP.Button.List}
              >
                <div
                  onClick={() => {
                    setToggleHorizontal(true)
                    trackChangeLayoutClick({
                      Page_Origination_URL: window.location.href,
                    })
                  }}
                >
                  <IconToggleGridInactive width={16} height={16} />
                </div>
                <div
                  className={styles.toggleActive}
                  onClick={() => {
                    setToggleHorizontal(false)
                    trackChangeLayoutClick({
                      Page_Origination_URL: window.location.href,
                    })
                  }}
                >
                  <IconToggleListActive width={16} height={16} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginBottom: '8px' }} ref={collapseRef}>
          <p className={styles.textHeaderVariant}>
            Harga varian mobil di bawah ini berdasarkan tenor 5 tahun.
          </p>
        </div>
        {!toggleHorizontal && !expandHorizontal ? (
          carModelDetails.variants
            .map((carVariant: CarVariantRecommendation) => (
              <div
                key={carVariant.id}
                className={styles.containerCard}
                data-testid={elementId.PDP.List.VariantCard}
              >
                <div className={styles.cardCarVariantGrid}>
                  <div
                    className={styles.cardCarVariantInfoGrid}
                    style={{ flexDirection: 'row' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                      }}
                    >
                      <div data-testid={elementId.PDP.List.VariantCard}>
                        <div className={styles.row}>
                          <p className={styles.openSansBoldGrey}>
                            {carVariant.name.includes('Premium Color') &&
                            !carVariant.name.includes('Non Premium Color')
                              ? 'Premium Color'
                              : carVariant.name.includes('Non Premium Color')
                              ? 'Non Premium Color'
                              : carVariant.name.includes('One Tone')
                              ? 'One Tone'
                              : carVariant.name
                                  .toLowerCase()
                                  .includes('two tone')
                              ? 'Two Tone'
                              : 'One Tone'}
                          </p>
                        </div>
                        <div>
                          <div>
                            <div className={styles.tooltip}>
                              {removeToneColor(carVariant.name).length > 35 && (
                                <div>
                                  <p className={styles.openSansSemiBoldBlack}>
                                    {removeToneColor(carVariant.name).slice(
                                      0,
                                      35,
                                    ) + '...'}
                                  </p>
                                  <span
                                    className={styles.tooltiptext}
                                    onMouseOver={() => setOnHover(!onHover)}
                                  >
                                    {removeToneColor(carVariant.name)}
                                  </span>
                                </div>
                              )}
                              <p className={styles.openSansSemiBoldBlack}>
                                {removeToneColor(carVariant.name).length <=
                                  35 &&
                                removeToneColor(carVariant.name).includes('()')
                                  ? removeToneColor(carVariant.name).replace(
                                      '()',
                                      '',
                                    )
                                  : removeToneColor(carVariant.name).length <=
                                    35
                                  ? removeToneColor(carVariant.name)
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={styles.row}
                        style={{ marginBottom: '24px', marginTop: '16px' }}
                        onClick={() => {
                          setOpenModal(true)
                          setViewVariant(carVariant)
                          onCardClick(carVariant)
                          trackCarVariantPricelistClick(
                            getDataForAmplitude(carVariant),
                          )
                        }}
                        data-testid={elementId.PDP.List.VariantDetail}
                      >
                        <p className={styles.openSansLightBlue}>Lihat Detail</p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                        paddingTop:
                          removeToneColor(carVariant.name).slice(0, 30)
                            .length <= 19
                            ? '2%'
                            : removeToneColor(carVariant.name).slice(0, 30)
                                .length > 19
                            ? '8%'
                            : '0',
                      }}
                      onClick={() => {
                        setOpenModal(true)
                        setViewVariant(carVariant)
                        onCardClick(carVariant)
                        trackCarVariantPricelistClick(
                          getDataForAmplitude(carVariant),
                        )
                      }}
                      data-testid={elementId.PDP.List.VariantPrice}
                    >
                      <div className={styles.variantPriceWrapper}>
                        <p className={styles.openSansSemiBoldBlack}>
                          {'Rp' +
                            replacePriceSeparatorByLocalization(
                              carVariant.priceValue,
                              LanguageCode.id,
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.buttonPrimary}
                    onClick={() => navigateToCreditTab(carVariant)}
                    data-testid={elementId.PDP.List.CTAHitungKemampuan}
                  >
                    <p style={{ color: '#ffffff', fontSize: 12 }}>
                      Hitung Kemampuan
                    </p>
                  </div>
                </div>
              </div>
            ))
            .sort((a: any, b: any) => a.priceValue - b.priceValue)
            .slice(0, 5)
        ) : !toggleHorizontal && expandHorizontal ? (
          carModelDetails.variants
            .map((carVariant: CarVariantRecommendation) => (
              <div
                key={carVariant.id}
                className={styles.containerCard}
                data-testid={elementId.PDP.List.VariantCard}
              >
                <div className={styles.cardCarVariantGrid}>
                  <div
                    className={styles.cardCarVariantInfoGrid}
                    style={{ flexDirection: 'row' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                      }}
                    >
                      <div data-testid={elementId.PDP.List.VariantName}>
                        <div className={styles.row}>
                          <p className={styles.openSansBoldGrey}>
                            {carVariant.name.includes('Premium Color') &&
                            !carVariant.name.includes('Non Premium Color')
                              ? 'Premium Color'
                              : carVariant.name.includes('Non Premium Color')
                              ? 'Non Premium Color'
                              : carVariant.name.includes('One Tone')
                              ? 'One Tone'
                              : carVariant.name
                                  .toLowerCase()
                                  .includes('two tone')
                              ? 'Two Tone'
                              : 'One Tone'}
                          </p>
                        </div>
                        <div>
                          <div>
                            <div className={styles.tooltip}>
                              {removeToneColor(carVariant.name).length > 35 && (
                                <div>
                                  <p className={styles.openSansSemiBoldBlack}>
                                    {removeToneColor(carVariant.name).slice(
                                      0,
                                      35,
                                    ) + '...'}
                                  </p>
                                  <span
                                    className={styles.tooltiptext}
                                    onMouseOver={() => setOnHover(!onHover)}
                                  >
                                    {removeToneColor(carVariant.name)}
                                  </span>
                                </div>
                              )}
                              <p className={styles.openSansSemiBoldBlack}>
                                {removeToneColor(carVariant.name).length <=
                                  35 &&
                                removeToneColor(carVariant.name).includes('()')
                                  ? removeToneColor(carVariant.name).replace(
                                      '()',
                                      '',
                                    )
                                  : removeToneColor(carVariant.name).length <=
                                    30
                                  ? removeToneColor(carVariant.name)
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={styles.row}
                        style={{ marginBottom: '24px', marginTop: '16px' }}
                        onClick={() => {
                          setOpenModal(true)
                          setViewVariant(carVariant)
                          onCardClick(carVariant)
                          trackCarVariantPricelistClick(
                            getDataForAmplitude(carVariant),
                          )
                        }}
                        data-testid={elementId.PDP.List.VariantDetail}
                      >
                        <p className={styles.openSansLightBlue}>Lihat Detail</p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                        paddingTop:
                          removeToneColor(carVariant.name).slice(0, 30)
                            .length <= 19
                            ? '2%'
                            : removeToneColor(carVariant.name).slice(0, 30)
                                .length > 19
                            ? '5%'
                            : '0',
                      }}
                      onClick={() => {
                        setOpenModal(true)
                        setViewVariant(carVariant)
                        onCardClick(carVariant)
                        trackCarVariantPricelistClick(
                          getDataForAmplitude(carVariant),
                        )
                      }}
                      data-testid={elementId.PDP.List.VariantPrice}
                    >
                      <div className={styles.variantPriceWrapper}>
                        <p className={styles.openSansSemiBoldBlack}>
                          {'Rp' +
                            replacePriceSeparatorByLocalization(
                              carVariant.priceValue,
                              LanguageCode.id,
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.buttonPrimary}
                    onClick={() => navigateToCreditTab(carVariant)}
                    data-testid={elementId.PDP.List.CTAHitungKemampuan}
                  >
                    <p style={{ color: '#ffffff', fontSize: 12 }}>
                      Hitung Kemampuan
                    </p>
                  </div>
                </div>
              </div>
            ))
            .sort((a: any, b: any) => a.priceValue - b.priceValue)
        ) : (
          <div className={styles.rowScrollHorizontal}>
            {carModelDetails.variants
              .map((carVariant: CarVariantRecommendation) => (
                <div
                  key={carVariant.id}
                  data-testid={elementId.PDP.Grid.VariantCard}
                >
                  <div className={styles.cardCarVariantList}>
                    <div className={styles.cardCarVariantInfoCenterContent}>
                      <div
                        className={styles.cardCarVariantInfo}
                        onClick={() => {
                          setViewVariant(carVariant)
                          onCardClick(carVariant)
                          trackCarVariantPricelistClick(
                            getDataForAmplitude(carVariant),
                          )
                        }}
                      >
                        <div
                          className={styles.rowCenterContent}
                          data-testid={elementId.PDP.Grid.VariantName}
                        >
                          <p className={styles.openSansBoldGrey}>
                            {carVariant.name.includes('Premium Color') &&
                            !carVariant.name.includes('Non Premium Color')
                              ? 'Premium Color'
                              : carVariant.name.includes('Non Premium Color')
                              ? 'Non Premium Color'
                              : carVariant.name.includes('One Tone')
                              ? 'One Tone'
                              : carVariant.name
                                  .toLowerCase()
                                  .includes('two tone')
                              ? 'Two Tone'
                              : 'One Tone'}
                          </p>
                          <div className={styles.tooltip}>
                            {removeToneColor(carVariant.name).length > 30 && (
                              <div>
                                <p className={styles.openSansSemiBoldBlack}>
                                  {removeToneColor(carVariant.name).slice(
                                    0,
                                    30,
                                  ) + '...'}
                                </p>
                                <span
                                  className={styles.tooltiptext}
                                  onMouseOver={() => setOnHover(!onHover)}
                                >
                                  {removeToneColor(carVariant.name)}
                                </span>
                              </div>
                            )}
                            <p className={styles.openSansSemiBoldBlack}>
                              {removeToneColor(carVariant.name).length <= 30 &&
                              removeToneColor(carVariant.name).includes('()')
                                ? removeToneColor(carVariant.name).replace(
                                    '()',
                                    '',
                                  )
                                : removeToneColor(carVariant.name).length <= 30
                                ? removeToneColor(carVariant.name)
                                : null}
                            </p>
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            setOpenModal(true)
                            setViewVariant(carVariant)
                            onCardClick(carVariant)
                            trackCarVariantPricelistClick(
                              getDataForAmplitude(carVariant),
                            )
                          }}
                          className={styles.onClickWrapper}
                        >
                          <div
                            className={styles.rowCenterContent}
                            data-testid={elementId.PDP.Grid.VariantPrice}
                          >
                            <p className={styles.openSansSmall}>Harga</p>
                            <p className={styles.openSansSemiBoldBlack}>
                              {'Rp' +
                                replacePriceSeparatorByLocalization(
                                  carVariant.priceValue,
                                  LanguageCode.id,
                                )}
                            </p>
                          </div>
                          <div className={styles.rowCenterContentWithGap}>
                            <IconTransmission
                              color={'#246ED4'}
                              height={24}
                              width={24}
                            />
                            <p
                              className={styles.openSans}
                              style={{ color: '#13131B' }}
                            >
                              {carVariant.transmission}
                            </p>
                          </div>
                          <div className={styles.rowCenterContentWithGap}>
                            <IconFuel
                              color={'#246ED4'}
                              height={24}
                              width={24}
                            />
                            <p
                              className={styles.openSans}
                              style={{ color: '#13131B' }}
                            >
                              {carVariant.fuelType}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={styles.buttonPrimary}
                        onClick={() => navigateToCreditTab(carVariant)}
                        data-testid={elementId.PDP.Grid.CTAHitungKemampuan}
                      >
                        <p style={{ color: '#ffffff', fontSize: 12 }}>
                          Hitung Kemampuan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              .sort((a: any, b: any) => a.priceValue - b.priceValue)}
          </div>
        )}
        {carModelDetails.variants.length > 5 && !toggleHorizontal && (
          <div
            className={styles.row}
            style={{ gap: 4 }}
            onClick={() => {
              setExpandHorizontal(!expandHorizontal)
              if (expandHorizontal) {
                collapseRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                })
              }
            }}
          >
            <p className={styles.openSansLightBlue}>
              {!expandHorizontal ? 'Lihat Semua Varian' : 'Tutup'}
            </p>
            {!expandHorizontal ? (
              <IconChevronDown width={24} height={24} color={'#246ED4'} />
            ) : (
              <IconChevronUp width={24} height={24} color={'#246ED4'} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TabContentLowerVariant
