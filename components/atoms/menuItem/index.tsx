import React from 'react'
import styles from 'styles/components/atoms/menuItem.module.scss'
import { sendAmplitudeData } from 'services/amplitude'
import { AmplitudeEventName } from 'services/amplitude/types'
import { MobileWebTopMenuType } from 'utils/types/props'
import { IconChevronDown } from '../icon'

type MenuItemProps = {
  item?: MobileWebTopMenuType
}

const MenuItem: React.FC<MenuItemProps> = ({ item }): JSX.Element => {
  const [state, setState] = React.useState(false)

  const handleClickMenu = (menuUrl: string, menuName: string) => {
    sendAmplitudeData(AmplitudeEventName.WEB_BURGER_MENU_CLICK, {
      Page_Origination_URL: window.location.href,
      Menu: menuName,
    })
    window.location.href = menuUrl
  }

  return (
    <>
      <div className={styles.parentMenu} onClick={() => setState(() => !state)}>
        <h3 className={`${styles.menu} ${state ? styles.isActive : ''}`}>
          {item?.menuName}
        </h3>
        <IconChevronDown
          height={25}
          width={25}
          color="#13131B"
          className={state ? styles.rotateUp : styles.rotateDown}
        />
      </div>

      <div
        className={`${styles.submenuContainer} ${
          state ? styles.slideDown : styles.slideUp
        }`}
      >
        {item?.subMenu.map((child) => (
          <div
            onClick={() =>
              handleClickMenu(child.menuUrl as string, child.menuName)
            }
            className={styles.submenu}
            key={child.menuCode}
          >
            {child.menuName}
          </div>
        ))}
      </div>
    </>
  )
}
export default MenuItem
