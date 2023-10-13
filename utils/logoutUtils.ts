import { logoutModalId } from '../utils/helpers/const'
import { destroySessionMoEngage } from 'helpers/moengage'
import { LocalStorageKey, SessionStorageKey } from './enum'
import { isGoingToRestrictedRoutes } from './loginUtils'
import { rootUrl } from './helpers/routes'

export const hideLogout = () => {
  const logoutDom = document.getElementById(logoutModalId)
  if (logoutDom) {
    logoutDom.style.display = 'none'
  }
}

export const removeInformationWhenLogout = () => {
  localStorage.removeItem(LocalStorageKey.Token)
  localStorage.removeItem(LocalStorageKey.CustomerId)
  localStorage.removeItem(LocalStorageKey.sevaCust)
  sessionStorage.removeItem(SessionStorageKey.CustomerId)
  // MoEngage.destroySession()
  destroySessionMoEngage()
}

export const getPageBeforeProfile = () => {
  const destinationRoute = localStorage.getItem(
    LocalStorageKey.PageBeforeProfile,
  )
  if (destinationRoute && !isGoingToRestrictedRoutes(destinationRoute)) {
    return destinationRoute
  } else {
    return rootUrl
  }
}
