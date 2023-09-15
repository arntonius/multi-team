import React, { createContext, useEffect, useMemo, useState } from 'react'
import { PdpDesktop, PdpMobile } from 'components/organisms'
import { api } from 'services/api'
import { AnnouncementBoxDataType, CarRecommendation } from 'utils/types/utils'
import { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { getIsSsrMobile } from 'utils/getIsSsrMobile'
import { useIsMobileSSr } from 'utils/hooks/useIsMobileSsr'
import { useMediaQuery } from 'react-responsive'
import Seo from 'components/atoms/seo'
import { defaultSeoImage } from 'utils/helpers/const'
import { encryptValue } from 'utils/encryptionUtils'
import { LocalStorageKey } from 'utils/enum'
import { saveLocalStorage } from 'utils/handler/localStorage'
import { useUtils } from 'services/context/utilsContext'
import styles from 'styles/pages/plp.module.scss'
import { getToken } from 'utils/handler/auth'
import { mergeModelDetailsWithLoanRecommendations } from 'services/recommendations'

interface PdpDataLocalContextType {
  /**
   * this variable use "jakarta" as default payload, so that search engine could see page content.
   * need to re-fetch API in client with city from localStorage
   */
  carRecommendationsResDefaultCity: any
  /**
   * this variable use "jakarta" as default payload, so that search engine could see page content.
   * need to re-fetch API in client with city from localStorage
   */
  carModelDetailsResDefaultCity: any
  dataCombinationOfCarRecomAndModelDetailDefaultCity: any
  /**
   * this variable use "jakarta" as default payload, so that search engine could see page content.
   * need to re-fetch API in client with city from localStorage
   */
  carVariantDetailsResDefaultCity: any
  metaTagDataRes: any
  carVideoReviewRes: any
  carArticleReviewRes: any
}
/**
 * used to pass props without drilling through components
 */
export const PdpDataLocalContext = createContext<PdpDataLocalContextType>({
  carRecommendationsResDefaultCity: null,
  carModelDetailsResDefaultCity: null,
  dataCombinationOfCarRecomAndModelDetailDefaultCity: null,
  carVariantDetailsResDefaultCity: null,
  metaTagDataRes: null,
  carVideoReviewRes: null,
  carArticleReviewRes: null,
})
export default function index({
  carRecommendationsRes,
  carModelDetailsRes,
  dataCombinationOfCarRecomAndModelDetail,
  carVariantDetailsRes,
  metaTagDataRes,
  carVideoReviewRes,
  carArticleReviewRes,
  dataHeader,
  dataFooter,
  dataCities,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isMobile, setIsMobile] = useState(useIsMobileSSr())
  const isClientMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const {
    saveDataAnnouncementBox,
    saveMobileWebTopMenus,
    saveMobileWebFooterMenus,
    saveCities,
  } = useUtils()

  useEffect(() => {
    setIsMobile(isClientMobile)
  }, [isClientMobile])

  useEffect(() => {
    saveMobileWebTopMenus(dataHeader)
    saveMobileWebFooterMenus(dataFooter)
    saveCities(dataCities)
  }, [])

  const meta = useMemo(() => {
    const title =
      metaTagDataRes.data && metaTagDataRes.data.length > 0
        ? metaTagDataRes.data[0].attributes.meta_title
        : 'SEVA'
    const description =
      metaTagDataRes.data && metaTagDataRes.data.length > 0
        ? metaTagDataRes.data[0].attributes.meta_description
        : ''
    return { title, description }
  }, [metaTagDataRes])

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        image={carModelDetailsRes.images[0] || defaultSeoImage}
      />

      <PdpDataLocalContext.Provider
        value={{
          carRecommendationsResDefaultCity: carRecommendationsRes,
          carModelDetailsResDefaultCity: carModelDetailsRes,
          dataCombinationOfCarRecomAndModelDetailDefaultCity:
            dataCombinationOfCarRecomAndModelDetail,
          carVariantDetailsResDefaultCity: carVariantDetailsRes,
          metaTagDataRes: metaTagDataRes,
          carVideoReviewRes: carVideoReviewRes,
          carArticleReviewRes: carArticleReviewRes,
        }}
      >
        <div className={styles.mobile}>
          <PdpMobile />
        </div>
        <div className={styles.desktop}>
          <PdpDesktop />
        </div>
      </PdpDataLocalContext.Provider>
    </>
  )
}
export async function getServerSideProps(context: any) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  )
  try {
    if (context.query.slug?.length > 1) {
      return {
        notFound: true,
      }
    }
    const [
      carRecommendationsRes,
      metaTagDataRes,
      carVideoReviewRes,
      menuRes,
      footerRes,
      cityRes,
    ]: any = await Promise.all([
      api.getRecommendation('?city=jakarta&cityId=118'),
      api.getMetaTagData(context.query.model.replaceAll('-', '')),
      api.getCarVideoReview(),
      api.getMobileHeaderMenu(),
      api.getMobileFooterMenu(),
      api.getCities(),
    ])
    let id = ''
    const carList = carRecommendationsRes.carRecommendations
    const currentCar = carList.filter(
      (value: CarRecommendation) =>
        value.model.replace(/ +/g, '-').toLowerCase() === context.query.model,
    )
    if (currentCar.length > 0) {
      id = currentCar[0].id
    } else {
      return {
        notFound: true,
      }
    }
    const carModelDetailsRes: any = await api.getCarModelDetails(
      id,
      '?city=jakarta&cityId=118',
    )
    const sortedVariantsOfCurrentModel = carModelDetailsRes.variants
      .map((item: any) => item)
      .sort((a: any, b: any) => a.priceValue - b.priceValue)
    const carVariantDetailsRes: any = await api.getCarVariantDetails(
      sortedVariantsOfCurrentModel[0].id,
      '?city=jakarta&cityId=118',
    )

    const [carArticleReviewRes] = await Promise.all([
      fetch('https://www.seva.id/wp-json/seva/latest-posts/972').then((res) =>
        res.json(),
      ),
    ])

    const dataCombinationOfCarRecomAndModelDetail =
      mergeModelDetailsWithLoanRecommendations(
        carRecommendationsRes.carRecommendations,
        carModelDetailsRes,
      )

    return {
      props: {
        carRecommendationsRes,
        carModelDetailsRes,
        dataCombinationOfCarRecomAndModelDetail,
        carVariantDetailsRes,
        metaTagDataRes,
        carVideoReviewRes,
        carArticleReviewRes,
        isSsrMobile: getIsSsrMobile(context),
        dataHeader: menuRes.data,
        dataFooter: footerRes.data,
        dataCities: cityRes,
      },
    }
  } catch (error) {
    console.log('qwe error', error)
    return {
      props: {
        notFound: true,
        dataHeader: [],
        dataFooter: [],
        dataCities: [],
      },
    }
  }
}
