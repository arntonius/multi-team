import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  getAvailableNIK,
  getUserInfo,
  postCheckReferralCode,
  postDeleteAccount,
  postSaveKtp,
  postSaveKtpSpouse,
  postUpdateProfile,
  getCustomerKtpSeva as gcks,
  getCustomerSpouseKtpSeva as gcsks,
} from 'services/api'
import { encryptValue } from 'utils/encryptionUtils'
import { LocalStorageKey, SessionStorageKey } from 'utils/enum'
import { saveLocalStorage } from 'utils/handler/localStorage'
import { removeInformationWhenLogout } from 'utils/logoutUtils'
import { saveSessionStorage } from 'utils/handler/sessionStorage'
import { getToken } from 'utils/handler/auth'
import {
  CustomerKtpSeva,
  DeleteAccountRequestType,
  UpdateProfileType,
} from 'utils/types/utils'

export const getCustomerInfoSeva = () => {
  return getUserInfo()
}

export const getCustomerInfoWrapperSeva = async () => {
  try {
    const response = await getCustomerInfoSeva()
    const customerId = response[0].id ?? ''
    const customerName = response[0].fullName ?? ''
    saveLocalStorage(
      LocalStorageKey.CustomerId,
      encryptValue(customerId.toString()),
    )
    saveLocalStorage(LocalStorageKey.CustomerName, encryptValue(customerName))
    saveSessionStorage(
      SessionStorageKey.CustomerId,
      encryptValue(customerId.toString()),
    )
    return response
  } catch (err: any) {
    if (err?.response?.status === 404) {
      removeInformationWhenLogout()
    }
  }
}

export const getCustomerKtpSeva = () => {
  return gcks({
    headers: {
      Authorization: getToken()?.idToken,
    },
  })
}

export const getCustomerSpouseKtpSeva = () => {
  return gcsks({
    headers: {
      Authorization: getToken()?.idToken,
    },
  })
}

export const checkReferralCode = (
  refcode: string,
  phoneNumber: string,
): Promise<
  AxiosResponse<{
    data: any
  }>
> => {
  return postCheckReferralCode(
    {
      refcode,
      phoneNumber,
    },
    {
      headers: {
        Authorization: getToken()?.idToken,
      },
    },
  )
}

export const checkNIKAvailable = (nik: string) => {
  const params = new URLSearchParams()
  params.append('nik', nik)
  return getAvailableNIK({ params })
}

export const saveKtp = (data: CustomerKtpSeva, config?: AxiosRequestConfig) => {
  return postSaveKtp(
    { ...data },
    { ...config, headers: { Authorization: getToken()?.idToken } },
  )
}

export const saveKtpSpouse = (
  data: CustomerKtpSeva,
  config?: AxiosRequestConfig,
) => {
  return postSaveKtpSpouse(
    { spouseKtpObj: { ...data }, isSpouse: true },
    { ...config, headers: { Authorization: getToken()?.idToken } },
  )
}

export const deleteAccount = (
  payload: DeleteAccountRequestType,
  config?: AxiosRequestConfig,
) => {
  return postDeleteAccount(
    {
      phoneNumber: payload.phoneNumber,
      createdBy: payload.reason,
    },
    { ...config, headers: { Authorization: getToken()?.idToken } },
  )
}

export const updateProfile = (
  data: UpdateProfileType,
  config?: AxiosRequestConfig,
) => {
  return postUpdateProfile(data, {
    ...config,
    headers: { Authorization: getToken()?.idToken },
  })
}
