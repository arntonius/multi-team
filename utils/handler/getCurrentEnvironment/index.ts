import {
  Environment,
  FeatureTogglesPair,
  featureToggles,
} from 'utils/types/models'

type EnvironmentConfig = {
  name: string
  displayDebugErrors: boolean
  firebaseConfigs: {
    apiKey: string | undefined
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
  }
  bankLinkingUrl: string
  apiBaseUrl: string
  featureToggles: FeatureTogglesPair
  isShowMobileConsole?: boolean
  deeplink: string
  temanSevaApiBaseUrl: string
  microservicePreApprovalBaseUrl: string
  probe: string
}

const FirebaseAPIKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

const environments = {
  localhost: {
    name: 'Localhost',
    rootPath: 'localhost',
    displayDebugErrors: true,
    firebaseConfigs: {
      apiKey: 'AIzaSyBi0MBSiB88xCvbti1T8plNTreX-bzZfAw',
      authDomain: 'torq-308606.firebaseapp.com',
      projectId: 'torq-308606',
      storageBucket: 'torq-308606.appspot.com',
      messagingSenderId: '349467238591',
      appId: '1:349467238591:web:757b788dc92fbb83e5a60a',
    },
    bankLinkingUrl: 'https://cdn.onebrick.io/sandbox-widget/v1/',
    apiBaseUrl:
      process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'https://api.sevaio.xyz',
    featureToggles: featureToggles[Environment.Localhost],
    isShowMobileConsole: true,
    deeplink: 'seva://',
    temanSevaApiBaseUrl: 'https://teman.dev.sevaio.xyz',
    microservicePreApprovalBaseUrl: 'https://instant.dev.sevaio.xyz',
    probe: 'https://probe.addpush.com/d/sub/',
  },
  development: {
    name: 'Development',
    rootPath: 'https://dev.sevaio.xyz',
    displayDebugErrors: true,
    firebaseConfigs: {
      apiKey: 'AIzaSyBi0MBSiB88xCvbti1T8plNTreX-bzZfAw',
      authDomain: 'torq-308606.firebaseapp.com',
      projectId: 'torq-308606',
      storageBucket: 'torq-308606.appspot.com',
      messagingSenderId: '349467238591',
      appId: '1:349467238591:web:757b788dc92fbb83e5a60a',
    },
    bankLinkingUrl: 'https://cdn.onebrick.io/sandbox-widget/v1/',
    apiBaseUrl: 'https://api.sevaio.xyz',
    featureToggles: featureToggles[Environment.Development],
    isShowMobileConsole: false,
    deeplink: 'seva://',
    temanSevaApiBaseUrl: 'https://teman.dev.sevaio.xyz',
    microservicePreApprovalBaseUrl: 'https://instant.dev.sevaio.xyz',
    probe: 'https://probe.addpush.com/d/sub/',
  },

  staging: {
    name: 'Staging',
    rootPath: 'https://staging.sevaio.xyz',
    displayDebugErrors: true,
    firebaseConfigs: {
      apiKey: FirebaseAPIKey,
      authDomain: 'torq-staging-310201.firebaseapp.com',
      projectId: 'torq-staging-310201',
      storageBucket: 'torq-staging-310201.appspot.com',
      messagingSenderId: '828696580488',
      appId: '1:828696580488:web:b587e5f2bc0dc81529aa3d',
    },
    bankLinkingUrl: 'https://cdn.onebrick.io/sandbox-widget/v1/',
    apiBaseUrl: 'https://api.staging.sevaio.xyz',
    featureToggles: featureToggles[Environment.Staging],
    deeplink: 'seva://',
    temanSevaApiBaseUrl: 'https://teman.staging.sevaio.xyz',
    microservicePreApprovalBaseUrl: 'https://instant.staging.sevaio.xyz',
    probe: 'https://probe.addpush.com/d/sub/',
  },

  production: {
    name: 'Production',
    rootPath: 'https://seva.id',
    displayDebugErrors: false,
    firebaseConfigs: {
      apiKey: FirebaseAPIKey,
      authDomain: 'torq-prod.firebaseapp.com',
      projectId: 'torq-prod',
      storageBucket: 'torq-prod.appspot.com',
      messagingSenderId: '978280076410',
      appId: '1:978280076410:web:a15e9c98f7f28d5492d7c3',
    },
    bankLinkingUrl: 'https://cdn.onebrick.io/widget/v1/',
    apiBaseUrl: 'https://api.seva.id',
    featureToggles: featureToggles[Environment.Production],
    deeplink: 'seva://',
    temanSevaApiBaseUrl: 'https://teman.prod.seva.id',
    microservicePreApprovalBaseUrl: 'https://instant.prod.seva.id',
    probe: 'https://probe.addpush.com/d/sub/',
  } as EnvironmentConfig,
}

type EnvironmentKey = keyof typeof environments

function getCurrentEnvironment() {
  const key: EnvironmentKey =
    (process.env.NEXT_PUBLIC_ENVIRONMENT as EnvironmentKey) || 'localhost'

  return environments[key]
}

export default getCurrentEnvironment()
