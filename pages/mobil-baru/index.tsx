import { PLP } from 'components/organisms'
import React from 'react'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getMinMaxPrice, getNewFunnelRecommendations } from 'services/newFunnel'
import { CarRecommendationResponse, MinMaxPrice } from 'utils/types/context'
import {
  CarRecommendation,
  FooterSEOAttributes,
  NavbarItemResponse,
} from 'utils/types/utils'
import PLPDesktop from 'components/organisms/PLPDesktop'
import { getIsSsrMobile } from 'utils/getIsSsrMobile'
import { MenuContext } from 'context/menuContext'
import { api } from 'services/api'
import Seo from 'components/atoms/seo'
import { defaultSeoImage } from 'const/const'

const NewCarResultPage = ({
  meta,
  isSsrMobile,
  dataMenu,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const isMobile = isSsrMobile
  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        image={defaultSeoImage}
      />

      <MenuContext.Provider
        value={{
          dataMenu,
        }}
      >
        {isMobile ? (
          <PLP
            carRecommendation={meta.carRecommendations}
            minmaxPrice={meta.MinMaxPrice}
            alternativeRecommendation={meta.alternativeCarRecommendation}
          />
        ) : (
          <PLPDesktop
            carRecommendation={meta.carRecommendations}
            footer={meta.footer}
          />
        )}
      </MenuContext.Provider>
    </>
  )
}

export default NewCarResultPage

type PLPProps = {
  title: string
  description: string
  footer: FooterSEOAttributes
  MinMaxPrice: MinMaxPrice
  carRecommendations: CarRecommendationResponse
  alternativeCarRecommendation: CarRecommendation[]
}

const getBrand = (brand: string | string[] | undefined) => {
  if (String(brand).toLowerCase() === 'toyota') {
    return 'Toyota'
  } else if (String(brand).toLowerCase() === 'daihatsu') {
    return 'Daihatsu'
  } else if (String(brand).toLowerCase() === 'bmw') {
    return 'Bmw'
  } else {
    return ''
  }
}

export const getServerSideProps: GetServerSideProps<{
  meta: PLPProps
  isSsrMobile: boolean
  dataMenu: NavbarItemResponse[]
}> = async (ctx) => {
  const metabrand = getBrand(ctx.query.brand)
  const metaTagBaseApi =
    'https://api.sslpots.com/api/meta-seos/?filters[location_page3][$eq]=CarSearchResult'
  const footerTagBaseApi =
    'https://api.sslpots.com/api/footer-seos/?filters[location_page2][$eq]=CarSearchResult'
  const meta = {
    title: 'SEVA',
    description: '',
    footer: {
      location_tag: '',
      location_page2: '',
      title_1: '',
      Title_2: '',
      Title_3: '',
      content_1: '',
      Content_2: '',
      Content_3: '',
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
    },
    MinMaxPrice: { maxPriceValue: 0, minPriceValue: 0 },
    carRecommendations: {
      carRecommendations: [],
      lowestCarPrice: 0,
      highestCarPrice: 0,
    },
    alternativeCarRecommendation: [],
  }

  const {
    downPaymentAmount,
    brand,
    bodyType,
    priceRangeGroup,
    age,
    tenure,
    monthlyIncome,
    sortBy,
  } = ctx.query

  try {
    const [fetchMeta, fetchFooter, menuRes]: any = await Promise.all([
      axios.get(metaTagBaseApi + metabrand),
      axios.get(footerTagBaseApi + metabrand),
      api.getMenu(),
    ])

    const metaData = fetchMeta.data.data
    const footerData = fetchFooter.data.data

    if (!priceRangeGroup) {
      const minmax = await getMinMaxPrice({})
      const minmaxPriceData = minmax.data
      meta.MinMaxPrice = {
        minPriceValue: minmaxPriceData.minPriceValue,
        maxPriceValue: minmaxPriceData.maxPriceValue,
      }
    }

    const queryParam: any = {
      ...(downPaymentAmount && { downPaymentType: 'amount' }),
      ...(downPaymentAmount && { downPaymentAmount }),
      ...(brand && { brand: String(brand)?.split(',') }),
      ...(bodyType && { bodyType: String(bodyType)?.split(',') }),
      ...(priceRangeGroup
        ? { priceRangeGroup }
        : {
            priceRangeGroup: `${meta.MinMaxPrice.minPriceValue}-${meta.MinMaxPrice.maxPriceValue}`,
          }),
      ...(age && { age }),
      ...(tenure && { tenure }),
      ...(monthlyIncome && { monthlyIncome }),
      ...(sortBy && { sortBy }),
    }

    const [funnel, alternative] = await Promise.all([
      getNewFunnelRecommendations({ ...queryParam }),
      getNewFunnelRecommendations({ ...queryParam, brand: [] }),
    ])

    const recommendation = funnel.data
    const alternativeData = alternative.data

    if (metaData && metaData.length > 0) {
      meta.title = metaData[0].attributes.meta_title
      meta.description = metaData[0].attributes.meta_description
    }

    if (footerData && footerData.length > 0) {
      meta.footer = footerData[0].attributes
    }

    if (recommendation) meta.carRecommendations = recommendation
    meta.alternativeCarRecommendation = alternativeData.carRecommendations

    return {
      props: { meta, isSsrMobile: getIsSsrMobile(ctx), dataMenu: menuRes.data },
    }
  } catch (e) {
    return { props: { meta, isSsrMobile: getIsSsrMobile(ctx), dataMenu: [] } }
  }
}
