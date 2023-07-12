import amplitude from 'amplitude-js'
import { TrackingEvent } from 'helpers/amplitude/trackingEvents'
const NEXT_PUBLIC_AMPLITUDE_API_KEY =
  process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || ''
export const initAmplitude = (): void => {
  amplitude.getInstance().init(NEXT_PUBLIC_AMPLITUDE_API_KEY)
}

export const setAmplitudeUserId = (id: string | null): void =>
  amplitude.getInstance().setUserId(id)

export const setAmplitudeUserDevice = (installationToken: any): void => {
  amplitude.getInstance().setDeviceId(installationToken)
}

export const sendAmplitudeData = (
  eventType: any,
  eventProperties?: any,
): void => {
  amplitude.getInstance().logEvent(eventType, eventProperties)
}

export const logAmplitudeEvent = (event: TrackingEvent): void => {
  amplitude.getInstance().logEvent(event.name, event.data)
}
