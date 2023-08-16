import { api } from 'services/api'

export interface CreateProbeTrackRequest {
  utmCampaign: string
  campaignId?: number
  utmContent?: string
  adsetId?: string
  utmTerm?: string
  adId?: number
  platform?: string
  fullName?: string
  email?: string
  phoneNumber?: string
  city?: string
  carVariant?: string
  loanDownPayment?: number
  utmSource?: string
  dmContactable?: string
  dmDataValidation?: string
  dmDataValidationAnswerDate?: string
  dmEndJourneyDate?: string
  dmValidation?: string
}

export const createProbeTrack = (requestBody: CreateProbeTrackRequest) => {
  return api.postProbeTrack(requestBody)
}
