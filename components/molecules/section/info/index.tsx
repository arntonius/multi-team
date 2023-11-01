import React, { useState } from 'react'
import styles from 'styles/components/molecules/info.module.scss'
import { IconInfo } from 'components/atoms'
import { useLocalStorage } from 'utils/hooks/useLocalStorage'
import { LocalStorageKey } from 'utils/enum'
import elementId from 'helpers/elementIds'
import { CityOtrOption } from 'utils/types/utils'
import { client } from 'utils/helpers/const'
import { useCar } from 'services/context/carContext'
import {
  trackEventCountly,
  valueMenuTabCategory,
} from 'helpers/countly/countly'
import { CountlyEventNames } from 'helpers/countly/eventNames'
import DOMPurify from 'dompurify'

export interface PropsInfo {
  isWithIcon?: boolean
  headingText: string
  descText: string
  isUsingSetInnerHtmlDescText?: boolean
}

export const Info: React.FC<PropsInfo> = ({
  isWithIcon,
  headingText,
  descText,
  isUsingSetInnerHtmlDescText = false,
}): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const readMoreText = 'Baca Selengkapnya'
  const closeText = 'Tutup'

  const { carModelDetails } = useCar()
  const [cityOtr] = useLocalStorage<CityOtrOption | null>(
    LocalStorageKey.CityOtr,
    null,
  )

  const handleClickExpand = () => {
    if (isWithIcon) {
      trackEventCountly(CountlyEventNames.WEB_PDP_SEO_TEXT_EXPAND_CLICK, {
        MENU_TAB_CATEGORY: valueMenuTabCategory(),
        CAR_BRAND: carModelDetails?.brand ?? '',
        CAR_MODEL: carModelDetails?.model ?? '',
        SOURCE_SECTION: 'Car Description',
      })
    } else {
      trackEventCountly(CountlyEventNames.WEB_PDP_SEO_TEXT_EXPAND_CLICK, {
        MENU_TAB_CATEGORY: valueMenuTabCategory(),
        CAR_BRAND: carModelDetails?.brand ?? '',
        CAR_MODEL: carModelDetails?.model ?? '',
        SOURCE_SECTION: 'SEO Text',
      })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        {isWithIcon && (
          <div className={styles.iconInfo}>
            <IconInfo
              width={24}
              height={24}
              color="#B4231E"
              alt="SEVA Information Icon"
            />
          </div>
        )}
        <h2
          className={styles.textHeading}
          data-testid={elementId.Text + 'tentang-mobil'}
        >
          {headingText}
        </h2>
      </div>
      <div className={styles.desc}>
        {isUsingSetInnerHtmlDescText ? (
          <div
            className={`${styles.innerHtmlWrapper} ${
              !isExpanded && styles.innerHtmlWrapperElipsed
            }`}
            dangerouslySetInnerHTML={{
              __html: client ? DOMPurify.sanitize(descText) : descText,
            }}
          ></div>
        ) : (
          <p className={`${styles.textDesc} ${!isExpanded && styles.elipsed}`}>
            {descText}
          </p>
        )}
        <br />
        <button
          className={styles.button}
          onClick={() => {
            if (!isExpanded) {
              handleClickExpand()
            }
            setIsExpanded(!isExpanded)
          }}
          data-testid={elementId.PDP.CTA.BacaSelengkapnya}
        >
          {isExpanded ? closeText : readMoreText}
        </button>
      </div>
    </div>
  )
}
