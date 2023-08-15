import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
// import { useShareModal } from 'components/ShareModal/ShareModal'
// import { FooterSeva } from 'pages/component/FooterSeva/FooterSeva'
// import { Link, useParams } from 'react-router-dom'
import { variantListUrl } from 'utils/helpers/routes'
import styled from 'styled-components'
import { colors } from 'styles/colors'
// import { Params } from './CarVariantListPage'
// import { ContentPage } from './ContentPage'
import { useMediaQuery } from 'react-responsive'
import { trackCarVariantShareClick } from 'helpers/amplitude/seva20Tracking'
import { replacePriceSeparatorByLocalization } from 'utils/handler/rupiah'
import { useRouter } from 'next/router'
import { StickyButtonProps } from 'components/molecules/StickyButton/StickyButton'
import { useLocalStorage } from 'utils/hooks/useLocalStorage'
import { CityOtrOption } from 'utils/types'
import { LanguageCode, LocalStorageKey } from 'utils/enum'
import { CarHeader } from 'components/molecules/CarHeader/CarHeader'
import Link from 'next/link'
import { ContentPage } from '../ContentPage/ContentPage'
import { useShareModal } from 'components/molecules/OldShareModal/ShareModal'
import { client } from 'utils/helpers/const'
import { FooterSeva } from '../FooterSeva'
import { PdpDataLocalContext } from 'pages/mobil-baru/[brand]/[model]/[[...slug]]'
import { useCar } from 'services/context/carContext'

export interface HeaderAndContentProps extends StickyButtonProps {
  onSticky?: (sticky: boolean) => void
  isShowLoading?: boolean
}

export const HeaderAndContent = ({
  onSticky,
  isShowLoading,
  ...props
}: HeaderAndContentProps) => {
  const router = useRouter()
  const { model, brand, slug } = router.query
  const tab = Array.isArray(slug) ? slug[0] : undefined
  const { showModal: showShareModal, ShareModal } = useShareModal()
  const [scrollXTab, setScrollXTab] = useState(0)
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' })
  const [scrollPosition, setScrollPosition] = useState(0)
  const { carModelDetails } = useCar()
  const { carModelDetailsResDefaultCity } = useContext(PdpDataLocalContext)
  const modelDetailData = carModelDetails || carModelDetailsResDefaultCity
  const [cityOtr] = useLocalStorage<CityOtrOption | null>(
    LocalStorageKey.CityOtr,
    null,
  )

  const isSticky = useMemo(() => {
    if (isDesktop && scrollPosition >= 525) {
      onSticky && onSticky(true)
      return true
    }
    if (!isDesktop && scrollPosition > 280) {
      onSticky && onSticky(true)
      return true
    }

    onSticky && onSticky(false)
    return false
  }, [scrollPosition])

  const handleScroll = () => {
    const position = client ? window.pageYOffset : 0
    setScrollPosition(position)
  }

  useEffect(() => {
    if (!client) return
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const checkActiveTab = () => {
    let positionValue = 0
    if (tab === 'spesifikasi' || tab === 'galeri') {
      positionValue = 200
    } else if (tab === 'harga') {
      if (scrollXTab < 106) {
        positionValue = 100
      } else {
        positionValue = -50
      }
    }

    scroll(positionValue)
  }

  useEffect(() => {
    checkActiveTab()
  }, [tab])

  const detectScroll = () => {
    const scrollLeft = tabRef.current.scrollLeft
    setScrollXTab(scrollLeft)
  }

  const tabRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const scroll = (scrollOffset: number) => {
    if (tabRef && tabRef.current) {
      tabRef.current.scrollTo({
        left: (tabRef.current.scrollLeft += scrollOffset),
        behavior: 'smooth',
      })
    }
  }

  const formatTabUrl = (path: string) => {
    return variantListUrl.replace(':tab', path)
  }

  const routeTabMenu = [
    { key: undefined, name: 'RINGKASAN', route: formatTabUrl('') },
    {
      key: 'harga',
      name: 'HARGA',
      route: formatTabUrl('harga'),
    },
    { key: 'kredit', name: 'KREDIT', route: formatTabUrl('kredit') },
    {
      key: 'spesifikasi',
      name: 'SPESIFIKASI',
      route: formatTabUrl('spesifikasi'),
    },
    { key: 'galeri', name: 'GALERI', route: formatTabUrl('galeri') },
  ]

  const sortCarModelVariant = useMemo(() => {
    return (
      modelDetailData?.variants.sort(function (a: any, b: any) {
        return a.priceValue - b.priceValue
      }) || []
    )
  }, [modelDetailData])

  const carOtrPrice = useMemo(() => {
    return sortCarModelVariant.length > 0
      ? replacePriceSeparatorByLocalization(
          sortCarModelVariant[0].priceValue || 0,
          LanguageCode.id,
        )
      : 0
  }, [sortCarModelVariant])

  const getDataForAmplitude = () => {
    return {
      Car_Brand: modelDetailData?.brand ?? '',
      Car_Model: modelDetailData?.model ?? '',
      OTR: `Rp${carOtrPrice}`,
      City: cityOtr?.cityName || 'null',
      Page_Origination_URL: client ? window.location.href : '',
    }
  }

  return (
    <>
      <CarHeader
        onClickShare={() => {
          trackCarVariantShareClick(getDataForAmplitude())
          showShareModal()
        }}
        isSticky={isSticky}
        {...props}
      />
      <TabContainer
        ref={tabRef}
        sticky={isSticky}
        dekstop={isDesktop}
        onScroll={detectScroll}
      >
        <TabWrapper>
          {routeTabMenu.map((item, index) => (
            <TabMenu
              key={index}
              href={item.route
                .replace(':brand', (brand as string) ?? '')
                .replace(':model', (model as string) ?? '')}
              active={
                tab && tab.includes('SEVA')
                  ? item.key === undefined
                  : item.key === tab
              }
            >
              <TabText>{item.name}</TabText>
            </TabMenu>
          ))}
        </TabWrapper>
      </TabContainer>
      <TabContentWrapper sticky={isSticky}>
        <ContentPage
          tab={tab}
          isSticky={isSticky}
          isShowLoading={isShowLoading}
        />
        <FooterSeva />
      </TabContentWrapper>
      <ShareModal dataForAmplitude={getDataForAmplitude()} />
    </>
  )
}

const TabContainer = styled.div<{
  sticky: boolean
  dekstop: boolean
}>`
  width: 100%;
  height: ${({ sticky }) => (sticky ? '38px' : '50px')};
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  position: ${({ sticky }) => (sticky ? 'fixed' : 'initial')};
  top: ${({ sticky, dekstop }) => (sticky && dekstop ? '0px' : '59px')};
  z-index: 3;
  scroll-snap-type: x proximity;
  float: left;

  @media (min-width: 1025px) {
    height: 48px;
    background-color: ${colors.primaryDarkBlue};
    margin-top: ${({ sticky }) => sticky && '0px'};
  }

  @media (max-width: 1024px) and (min-width: 480px) {
    max-width: 480px;
    margin: 0 auto;
  }
`

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 530px;
  height: 100%;
  background-color: ${colors.primaryDarkBlue};

  @media (min-width: 1025px) {
    max-width: 1040px;
    width: 100%;
    margin: 0 auto;
  }
`

const TabMenu = styled.a<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 106px;
  background-color: ${({ active }) =>
    active ? colors.primaryBlue : `transparent`};
  scroll-snap-align: start;
  scroll-snap-stop: normal;

  @media (min-width: 1025px) {
    width: 208px;
  }
`

const TabContentWrapper = styled.div<{ sticky: boolean }>`
  @media (max-width: 1024px) {
    min-height: 30vh;
    ${({ sticky }) => sticky && 'padding-top: 100px;'}
  }

  @media (min-width: 1025px) {
    ${({ sticky }) => sticky && 'padding-top: 45px;'}
  }
`

const TabText = styled.h2`
  font-family: 'KanyonBold';
  font-size: 12px;
  line-height: 16px;
  color: ${colors.white};
`
