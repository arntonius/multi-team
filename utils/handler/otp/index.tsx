import { LocalStorageKey } from 'utils/enum'

export const getOtpIsSent = () => {
  return localStorage.getItem(LocalStorageKey.OtpIsSent)
}

export const saveOtpIsSent = (value: string) => {
  localStorage.setItem(LocalStorageKey.OtpIsSent, value)
}

export const getOtpTimerIsStart = () => {
  return localStorage.getItem(LocalStorageKey.OtpTimerIsStart)
}

export const saveOtpTimerIsStart = (value: string) => {
  localStorage.setItem(LocalStorageKey.OtpTimerIsStart, value)
}
