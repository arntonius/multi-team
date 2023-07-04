import React from 'react'
import dynamic from 'next/dynamic'
import styles from 'styles/saas/components/organism/interior360Viewer.module.scss'
import { Icon360 } from 'components/atoms'
import { interiorImagesListNew } from 'config/Interior360ImageList.config'
import elementId from 'helpers/elementIds'

const Pannellum = dynamic(() => import('components/molecules/PanellumItem'), {
  ssr: false,
})

interface Props {
  isShowAnnouncementBox: boolean | null
}
export const Interior360ViewerTab = ({ isShowAnnouncementBox }: Props) => {
  const getImage = () => {
    const currentUrlPathname = window.location.pathname
    const temp = interiorImagesListNew.filter((item) =>
      currentUrlPathname.includes(item.url),
    )
    if (temp.length === 0) return ''
    return temp[0].source
  }

  const renderNonStatic = () => {
    if (getImage()?.includes('tso')) {
      return (
        <div
          className={styles.container}
          data-testid={elementId.Tab + '360-interior-image'}
        >
          <Pannellum image={getImage()}></Pannellum>
          <div className={styles.iconWrapper}>
            <Icon360 />
          </div>
        </div>
      )
    } else {
      return <iframe className={styles.styledIframe} src={getImage()} />
    }
  }

  // if (!getImage()) return <ImageUnavailable type={'interior 360'} />

  return (
    <div style={{ marginTop: isShowAnnouncementBox ? '24px' : '0px' }}>
      {getImage()?.includes('StaticImage') ? (
        <img className={styles.staticImage} src={getImage()}></img>
      ) : (
        renderNonStatic()
      )}
    </div>
  )
}
