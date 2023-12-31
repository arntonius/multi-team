import React, { useState } from 'react'
import styles from '../../../styles/components/organisms/headerMobile.module.scss'
import {
  IconHamburger,
  IconSearch,
  IconLocationLine,
  IconChevronLeft,
} from 'components/atoms'
import { rootOTOUrl, rootUrl } from 'utils/helpers/routes'
import clsx from 'clsx'
import getCurrentEnvironment from 'helpers/environments'
import elementId from 'helpers/elementIds'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { CountlyEventNames } from 'helpers/countly/eventNames'
import {
  trackEventCountly,
  valueForUserTypeProperty,
  valueMenuTabCategory,
} from 'helpers/countly/countly'
import { getPageName } from 'utils/pageName'
import Image from 'next/image'
import {
  PreviousButton,
  saveDataForCountlyTrackerPageViewHomepage,
} from 'utils/navigate'
import dynamic from 'next/dynamic'
import { getToken } from 'utils/handler/auth'

const Overlay = dynamic(() =>
  import('components/atoms').then((mod) => mod.Overlay),
)
const SearchModal = dynamic(() =>
  import('components/molecules/searchModal').then((mod) => mod.SearchModal),
)
const WebAnnouncementBox = dynamic(() =>
  import('components/organisms').then((mod) => mod.WebAnnouncementBox),
)
const SidebarMobile = dynamic(
  () => import('components/organisms').then((mod) => mod.SidebarMobile),
  { ssr: false },
)
const LogoPrimary = '/revamp/icon/logo-primary.webp'

type HeaderMobileProps = {
  startScroll?: boolean
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  emitClickCityIcon: () => void
  setShowAnnouncementBox?: (value: boolean) => void
  isShowAnnouncementBox?: boolean | null
  style?: {
    withBoxShadow?: boolean
    position?: 'fixed' | 'sticky'
  }
  pageOrigination?: string
  isOTO?: boolean
  transparent?: boolean
  isRegular?: boolean
  passCountlyTrackerPageView?: (() => void) | (() => Promise<void>)
}

export const HeaderMobile = ({
  startScroll,
  isActive = false,
  setIsActive,
  emitClickCityIcon,
  setShowAnnouncementBox,
  isShowAnnouncementBox = false,
  style,
  pageOrigination,
  isOTO = false,
  transparent = false,
  isRegular = true,
  passCountlyTrackerPageView,
}: HeaderMobileProps): JSX.Element => {
  const enableAnnouncementBoxAleph =
    getCurrentEnvironment.featureToggles.enableAnnouncementBoxAleph
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false)

  const router = useRouter()

  const adaSeva = router.asPath.split('/')[1]
  const [isLogin] = useState(!!getToken())

  const redirectHome = adaSeva === 'adaSEVAdiOTO' ? rootOTOUrl : rootUrl

  const handleClickCityIcon = () => {
    if (!isActive) {
      trackEventCountly(CountlyEventNames.WEB_CITY_SELECTOR_OPEN_CLICK, {
        PAGE_ORIGINATION:
          getPageName() === 'PLP'
            ? getPageName()
            : 'PDP - ' + valueMenuTabCategory(),
        USER_TYPE: valueForUserTypeProperty(),
        SOURCE_BUTTON: 'Location Icon (Navbar)',
      })
      emitClickCityIcon()
    }
  }

  const handleSearch = () => {
    if (!isActive) {
      setIsOpenSearchModal(true)
      if (pageOrigination && pageOrigination.length !== 0) {
        trackEventCountly(CountlyEventNames.WEB_CAR_SEARCH_ICON_CLICK, {
          PAGE_ORIGINATION: pageOrigination.includes('PDP')
            ? 'PDP - ' + valueMenuTabCategory()
            : pageOrigination,
        })
      }
    }
  }

  const handleToggleBurgerMenu = () => {
    if (!isActive) {
      if (pageOrigination && pageOrigination.length !== 0) {
        const track = {
          PAGE_ORIGINATION: pageOrigination.includes('PDP')
            ? 'PDP - ' + valueMenuTabCategory()
            : pageOrigination,
          LOGIN_STATUS: isLogin ? 'Yes' : 'No',
          USER_TYPE: valueForUserTypeProperty(),
        }

        trackEventCountly(CountlyEventNames.WEB_HAMBURGER_OPEN, track)
      }
    }
    setIsActive(() => !isActive)
  }

  const handleLogoClick = () => {
    if (pageOrigination && pageOrigination.length !== 0) {
      trackEventCountly(CountlyEventNames.WEB_SEVA_LOGO_CLICK, {
        PAGE_ORIGINATION: pageOrigination.includes('PDP')
          ? 'PDP - ' + valueMenuTabCategory()
          : pageOrigination,
        USER_TYPE: valueForUserTypeProperty(),
      })
    }
    saveDataForCountlyTrackerPageViewHomepage(PreviousButton.SevaLogo)
    if (window.location.pathname.includes('kalkulator-kredit')) {
      saveDataForCountlyTrackerPageViewHomepage(
        PreviousButton.SevaLogo,
        pageOrigination,
      )
    } else if (window.location.pathname === '/') {
      saveDataForCountlyTrackerPageViewHomepage(PreviousButton.SevaLogo)
      setTimeout(() => {
        passCountlyTrackerPageView && passCountlyTrackerPageView()
      }, 1000)
    } else {
      saveDataForCountlyTrackerPageViewHomepage(PreviousButton.SevaLogo)
    }
    setTimeout(() => {
      window.location.href = redirectHome
    }, 1000)
  }

  return (
    <>
      <header
        style={style?.position ? { position: style.position } : {}}
        className={clsx({
          [styles.wrapper]: true,
          [styles.stickyWrapper]: style?.position ? true : false,
          [styles.hideHeader]: startScroll && !isActive,
          [styles.showHeader]: !startScroll,
          [styles.isActive]: isActive,
          [styles.showAAnnouncementBox]:
            isShowAnnouncementBox && enableAnnouncementBoxAleph,
          [styles.shadow]: style?.withBoxShadow,
          [styles.homepage]: router.pathname === '/' && !isActive,
          [styles.transparent]: transparent,
        })}
      >
        <div className={styles.wrapperAnnouncementBox}>
          {router.pathname !== '/' && enableAnnouncementBoxAleph && (
            <WebAnnouncementBox
              onCloseAnnouncementBox={setShowAnnouncementBox}
              pageOrigination={pageOrigination}
            />
          )}
          {isOTO ? (
            <div>
              <div className={styles.newContainer}>
                <Link
                  data-testid={elementId.Homepage.GlobalHeader.HamburgerMenu}
                  className={styles.icons}
                  href={redirectHome}
                >
                  <IconChevronLeft
                    width={24}
                    height={24}
                    alt="SEVA back Icon"
                  />
                </Link>
                <div role="navigation" onClick={handleLogoClick}>
                  <Image
                    src={LogoPrimary}
                    height={30}
                    width={50}
                    alt="Logo SEVA"
                    className={styles.logoImg}
                    data-testid={elementId.Homepage.GlobalHeader.IconLogoSeva}
                    priority={true}
                  />
                </div>
                <div
                  className={styles.icons}
                  data-testid={elementId.Homepage.GlobalHeader.IconSearch}
                >
                  <IconSearch
                    width={24}
                    height={24}
                    onClick={handleSearch}
                    alt="SEVA search Icon"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.container}>
              <div data-testid={elementId.Homepage.GlobalHeader.HamburgerMenu}>
                <IconHamburger
                  width={24}
                  height={24}
                  alt="SEVA burger menu Icon"
                  onClick={handleToggleBurgerMenu}
                />
              </div>

              <div role="navigation" onClick={handleLogoClick}>
                <Image
                  src={LogoPrimary}
                  height={30}
                  width={50}
                  alt="Logo SEVA"
                  className={styles.logoImg}
                  data-testid={elementId.Homepage.GlobalHeader.IconLogoSeva}
                  priority={true}
                />
              </div>
              <SidebarMobile
                showSidebar={isActive}
                isShowAnnouncementBox={isShowAnnouncementBox}
                isOTO={isOTO}
                pageOrigination={pageOrigination}
              />
              <div
                className={styles.right}
                data-testid={elementId.Homepage.GlobalHeader.IconSearch}
              >
                <IconSearch
                  width={24}
                  height={24}
                  onClick={handleSearch}
                  alt="SEVA search Icon"
                />
                <div
                  onClick={handleClickCityIcon}
                  data-testid={elementId.Homepage.GlobalHeader.IconCitySelector}
                >
                  <IconLocationLine
                    width={24}
                    height={24}
                    alt="SEVA location Icon"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <SearchModal
          isOpen={isOpenSearchModal}
          handleCloseModal={() => setIsOpenSearchModal(false)}
          isOTO={adaSeva === 'adaSEVAdiOTO' ? true : false}
          pageOrigination={pageOrigination}
        />
      </header>
      <Overlay
        isShow={isActive}
        onClick={() => setIsActive(false)}
        additionalstyle={styles.overlayAdditionalStyle}
      />
    </>
  )
}
