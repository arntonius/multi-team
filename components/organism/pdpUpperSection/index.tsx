import {
  ExteriorTab,
  InteriorTab,
  WarnaTab,
  Exterior360ViewerTab,
  Interior360ViewerTab,
  VideoTab,
  CarOverview,
} from 'components/organism'
import React, { useEffect, useState } from 'react'

import { upperSectionNavigationTab } from 'config/carVariantList.config'
import { NavigationTabV2 } from 'components/molecules'
import { CityOtrOption, VideoDataType } from 'utils/types/utils'
import { useContextCarModelDetails } from 'context/carModelDetailsContext/carModelDetailsContext'
import styles from 'styles/components/organism/pdpUpperSection.module.scss'
import { exteriorImagesListNew } from 'config/Exterior360ImageList.config'
import { interiorImagesListNew } from 'config/Interior360ImageList.config'
import {
  TrackingEventName,
  TrackingEventWebPDPPhoto,
} from 'helpers/amplitude/eventTypes'
import {
  CarVariantPhotoParam,
  trackPDPPhotoClick,
} from 'helpers/amplitude/seva20Tracking'
import { useLocalStorage } from 'utils/hooks/useLocalStorage/useLocalStorage'
import { LocalStorageKey } from 'utils/models/models'
import { useRouter } from 'next/router'

interface Props {
  emitActiveIndex: (e: number) => void
  emitDataImages: (e: Array<string>) => void
  activeIndex: number
  isPreviewOpened: boolean
  videoData: VideoDataType
  onClickCityOtrCarOverview: () => void
  onClickShareButton: () => void
  isShowAnnouncementBox: boolean | null
}

export const PdpUpperSection = ({
  emitActiveIndex,
  emitDataImages,
  activeIndex,
  isPreviewOpened,
  videoData,
  onClickCityOtrCarOverview,
  onClickShareButton,
  isShowAnnouncementBox,
}: Props) => {
  const router = useRouter()

  const tab = router.query.tab as string

  const [selectedTabValue, setSelectedTabValue] = useState(
    tab || upperSectionNavigationTab[0].value,
  )

  const [tabItemList, setTabItemList] = useState(upperSectionNavigationTab)
  const [cityOtr] = useLocalStorage<CityOtrOption | null>(
    LocalStorageKey.CityOtr,
    null,
  )

  const getImageExterior360 = () => {
    const currentUrlPathname = window.location.pathname
    const temp = exteriorImagesListNew.filter((item) =>
      currentUrlPathname.includes(item.url),
    )
    if (temp.length === 0) return []
    return temp[0].source
  }

  const getImageInterior360 = () => {
    const currentUrlPathname = window.location.pathname
    const temp = interiorImagesListNew.filter((item) =>
      currentUrlPathname.includes(item.url),
    )
    if (temp.length === 0) return ''
    return temp[0].source
  }

  const { carModelDetails } = useContextCarModelDetails()

  const getInteriorImage = () => {
    const { images: carModelImages } = { ...carModelDetails }
    if (carModelImages) {
      const interior = carModelImages.filter((item: string) =>
        item.toLowerCase().includes('int'),
      )
      return [...interior]
    }
  }

  const filterTabItem = () => {
    let temp = upperSectionNavigationTab
    if (!getImageExterior360() || getImageExterior360().length === 0) {
      temp = temp.filter((item: any) => item.value !== '360º Eksterior')
    }
    if (!getImageInterior360()) {
      temp = temp.filter((item: any) => item.value !== '360º Interior')
    }
    if (videoData.videoId === '') {
      temp = temp.filter((item: any) => item.value !== 'Video')
    }
    if (getInteriorImage()?.length === 0) {
      temp = temp.filter((item: any) => item.value !== 'Interior')
    }
    setTabItemList(temp)
  }

  const trackEventPhoto = (
    event: TrackingEventWebPDPPhoto,
    photoType: string,
  ) => {
    const trackProperties: CarVariantPhotoParam = {
      Car_Brand: carModelDetails?.brand as string,
      Car_Model: carModelDetails?.model as string,
      Page_Origination_URL: window.location.href.replace('https://www.', ''),
      Photo_Type: photoType,
      City: cityOtr?.cityName || 'null',
    }
    trackPDPPhotoClick(event, trackProperties)
  }

  useEffect(() => {
    // useEffect to set tab item hidden or not
    filterTabItem()
  }, [videoData, carModelDetails])

  const renderContent = () => {
    switch (selectedTabValue) {
      case 'Warna':
        return <WarnaTab isShowAnnouncementBox={isShowAnnouncementBox} />
      case 'Eksterior':
        return (
          <ExteriorTab
            isPreviewOpened={isPreviewOpened}
            emitActiveIndex={emitActiveIndex}
            emitDataImages={emitDataImages}
            activeIndex={activeIndex}
            isShowAnnouncementBox={isShowAnnouncementBox}
          />
        )
      case 'Interior':
        return (
          <InteriorTab
            emitDataImages={emitDataImages}
            isPreviewOpened={isPreviewOpened}
            emitActiveIndex={emitActiveIndex}
            activeIndex={activeIndex}
            isShowAnnouncementBox={isShowAnnouncementBox}
          />
        )
      case 'Video':
        return (
          <VideoTab
            data={videoData}
            isShowAnnouncementBox={isShowAnnouncementBox}
          />
        )
      case '360º Eksterior':
        return (
          <Exterior360ViewerTab isShowAnnouncementBox={isShowAnnouncementBox} />
        )
      case '360º Interior':
        return (
          <Interior360ViewerTab isShowAnnouncementBox={isShowAnnouncementBox} />
        )
      default:
        return <WarnaTab isShowAnnouncementBox={isShowAnnouncementBox} />
    }
  }

  return (
    <div>
      <div
        className={`${styles.upperSpacing}  ${
          isShowAnnouncementBox && styles.showAAnnouncementBox
        }`}
      >
        {/* div used as spacing because it needs to be in different color than html */}
      </div>
      <NavigationTabV2
        itemList={tabItemList}
        onSelectTab={(value: any) => {
          setSelectedTabValue(value)
          router.replace({
            query: {
              ...router.query,
              tab: value,
            },
          })
          trackEventPhoto(TrackingEventName.WEB_PDP_TAB_PHOTO_CLICK, value)
        }}
        isShowAnnouncementBox={isShowAnnouncementBox}
        onPage={'PDP'}
      />
      <div id="pdp-upper-content">
        <>
          <div className={styles.content}>{renderContent()}</div>
          <CarOverview
            onClickCityOtrCarOverview={onClickCityOtrCarOverview}
            onClickShareButton={onClickShareButton}
            currentTabMenu={selectedTabValue}
          />
        </>
      </div>
    </div>
  )
}
