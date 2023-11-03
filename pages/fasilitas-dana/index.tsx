import React, { useEffect } from 'react'
import { RefinancingLandingPageContent } from 'components/organisms'
import Seo from 'components/atoms/seo'
import { defaultSeoImage } from 'utils/helpers/const'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  getMenu,
  getMobileHeaderMenu,
  getMobileFooterMenu,
  getCities,
  getAnnouncementBox as gab,
} from 'services/api'
import { getToken } from 'utils/handler/auth'
import {
  CityOtrOption,
  MobileWebTopMenuType,
  NavbarItemResponse,
} from 'utils/types/utils'
import { MobileWebFooterMenuType } from 'utils/types/props'
import { useUtils } from 'services/context/utilsContext'

const RefinancingPage = ({
  dataMobileMenu,
  dataFooter,
  dataCities,
  dataDesktopMenu,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const metaTitle = 'Fasilitas Dana SEVA. Dana Tunai Jaminan BPKB Aman | SEVA'
  const metaDesc =
    'Jaminkan BPKB mobilmu di SEVA dan dapatkan Fasilitas Dana tunai untuk beragam kebutuhan.'

  const {
    saveDesktopWebTopMenu,
    saveMobileWebTopMenus,
    saveMobileWebFooterMenus,
    saveCities,
    saveDataAnnouncementBox,
  } = useUtils()

  const getAnnouncementBox = async () => {
    try {
      const res: any = await gab({
        headers: {
          'is-login': getToken() ? 'true' : 'false',
        },
      })
      saveDataAnnouncementBox(res.data)
    } catch (error) {}
  }

  useEffect(() => {
    saveDesktopWebTopMenu(dataDesktopMenu)
    saveMobileWebTopMenus(dataMobileMenu)
    saveMobileWebFooterMenus(dataFooter)
    saveCities(dataCities)
    getAnnouncementBox()
  }, [])

  return (
    <>
      <Seo title={metaTitle} description={metaDesc} image={defaultSeoImage} />
      <RefinancingLandingPageContent />
    </>
  )
}

export default RefinancingPage

export const getServerSideProps: GetServerSideProps<{
  dataDesktopMenu: NavbarItemResponse[]
  dataMobileMenu: MobileWebTopMenuType[]
  dataFooter: MobileWebFooterMenuType[]
  dataCities: CityOtrOption[]
}> = async (ctx) => {
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=59, stale-while-revalidate=3000',
  )

  try {
    const [menuDesktopRes, menuMobileRes, footerRes, cityRes]: any =
      await Promise.all([
        getMenu(),
        getMobileHeaderMenu(),
        getMobileFooterMenu(),
        getCities(),
      ])

    return {
      props: {
        dataDesktopMenu: menuDesktopRes.data,
        dataMobileMenu: menuMobileRes.data,
        dataFooter: footerRes.data,
        dataCities: cityRes,
      },
    }
  } catch (e) {
    return {
      props: {
        dataDesktopMenu: [],
        dataMobileMenu: [],
        dataFooter: [],
        dataCities: [],
      },
    }
  }
}
