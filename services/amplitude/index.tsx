import amplitude from 'amplitude-js'
import { TrackingEvent } from 'helpers/amplitude/trackingEvents'

const apiKey = '86bd0da4661aa24a7d2c9f658197b49a'

export const initAmplitude = (): void => {
  amplitude.getInstance().init(apiKey)
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
