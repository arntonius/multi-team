if (!self.define) {
  let e,
    s = {}
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = a), (e.onload = s), document.head.appendChild(e)
        } else (e = a), importScripts(a), s()
      }).then(() => {
        let e = s[a]
        if (!e) throw new Error(`Module ${a} didn’t register its module`)
        return e
      })
  )
  self.define = (i, n) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href
    if (s[c]) return
    let r = {}
    const o = (e) => a(e, c),
      t = { module: { uri: c }, exports: r, require: o }
    s[c] = Promise.all(i.map((e) => t[e] || o(e))).then((e) => (n(...e), r))
  }
}
define(['./workbox-588899ac'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/v3/Kanyon-Bold.otf',
          revision: '65efeaeb62e6ce3040d4cb21d9e18477',
        },
        {
          url: '/v3/Kanyon-Medium.otf',
          revision: 'e1d21457d17911d83fab829c6a52138f',
        },
        {
          url: '/v3/Kanyon-Regular.otf',
          revision: '9ea1f5bc0d2bc67ede28da670baff9bc',
        },
        {
          url: '/v3/OpenSans-Regular.woff2',
          revision: 'ac6121dd7f045d6d7910df694a65de73',
        },
        {
          url: '/v3/OpenSans-SemiBold.woff2',
          revision: 'a8168efe03f831b205165cf3b2e5fb6d',
        },
        {
          url: '/v3/_next/static/chunks/1.ea0e9ef245df5b98.js',
          revision: 'ea0e9ef245df5b98',
        },
        {
          url: '/v3/_next/static/chunks/125-5e195e36fe435db9.js',
          revision: '5e195e36fe435db9',
        },
        {
          url: '/v3/_next/static/chunks/160.0ceb1be65ea4f965.js',
          revision: '0ceb1be65ea4f965',
        },
        {
          url: '/v3/_next/static/chunks/182.0a2e236ed6175c8c.js',
          revision: '0a2e236ed6175c8c',
        },
        {
          url: '/v3/_next/static/chunks/185.de6eaf369f8811da.js',
          revision: 'de6eaf369f8811da',
        },
        {
          url: '/v3/_next/static/chunks/396.cc520e2d95cfaec9.js',
          revision: 'cc520e2d95cfaec9',
        },
        {
          url: '/v3/_next/static/chunks/462.5d0ea4d87959f9aa.js',
          revision: '5d0ea4d87959f9aa',
        },
        {
          url: '/v3/_next/static/chunks/463.ca395839ce1b334a.js',
          revision: 'ca395839ce1b334a',
        },
        {
          url: '/v3/_next/static/chunks/465-0249c5cf59c583aa.js',
          revision: '0249c5cf59c583aa',
        },
        {
          url: '/v3/_next/static/chunks/483.585ab0b73771c3ac.js',
          revision: '585ab0b73771c3ac',
        },
        {
          url: '/v3/_next/static/chunks/572-5cf9765addd08dbf.js',
          revision: '5cf9765addd08dbf',
        },
        {
          url: '/v3/_next/static/chunks/598.3090cdff15c8156e.js',
          revision: '3090cdff15c8156e',
        },
        {
          url: '/v3/_next/static/chunks/614.8fe31ef6ed6b2134.js',
          revision: '8fe31ef6ed6b2134',
        },
        {
          url: '/v3/_next/static/chunks/687.753886c16aaff43d.js',
          revision: '753886c16aaff43d',
        },
        {
          url: '/v3/_next/static/chunks/699.5114c55c73510a7c.js',
          revision: '5114c55c73510a7c',
        },
        {
          url: '/v3/_next/static/chunks/808.d92a587e89071009.js',
          revision: 'd92a587e89071009',
        },
        {
          url: '/v3/_next/static/chunks/826-8c9f3117226b9c15.js',
          revision: '8c9f3117226b9c15',
        },
        {
          url: '/v3/_next/static/chunks/849.3d0427d310f98666.js',
          revision: '3d0427d310f98666',
        },
        {
          url: '/v3/_next/static/chunks/918.222cbbef20e97d29.js',
          revision: '222cbbef20e97d29',
        },
        {
          url: '/v3/_next/static/chunks/d6e1aeb5.14d6956aac896c53.js',
          revision: '14d6956aac896c53',
        },
        {
          url: '/v3/_next/static/chunks/ff239f9d-883b7a4a19ea68eb.js',
          revision: '883b7a4a19ea68eb',
        },
        {
          url: '/v3/_next/static/chunks/framework-50116e63224baba2.js',
          revision: '50116e63224baba2',
        },
        {
          url: '/v3/_next/static/chunks/main-4ceb59e80cb24a43.js',
          revision: '4ceb59e80cb24a43',
        },
        {
          url: '/v3/_next/static/chunks/pages/_app-024dd1a3982aa4f4.js',
          revision: '024dd1a3982aa4f4',
        },
        {
          url: '/v3/_next/static/chunks/pages/_error-409f831d3504c8f5.js',
          revision: '409f831d3504c8f5',
        },
        {
          url: '/v3/_next/static/chunks/pages/index-f189aab708e273c6.js',
          revision: 'f189aab708e273c6',
        },
        {
          url: '/v3/_next/static/chunks/pages/mobil-baru-e0ccb797437fc063.js',
          revision: 'e0ccb797437fc063',
        },
        {
          url: '/v3/_next/static/chunks/pages/mobil-baru/%5Bbrand%5D-7ecb5a42672b9ccb.js',
          revision: '7ecb5a42672b9ccb',
        },
        {
          url: '/v3/_next/static/chunks/pages/mobil-baru/%5Bbrand%5D/%5Bmodel%5D/%5B%5B...slug%5D%5D-1a4b06b8f5ca3a02.js',
          revision: '1a4b06b8f5ca3a02',
        },
        {
          url: '/v3/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/v3/_next/static/chunks/polyfills-core-js.0623a246f14ccbcd.js',
          revision: '0623a246f14ccbcd',
        },
        {
          url: '/v3/_next/static/chunks/polyfills-dom.6b0741a5c9171aff.js',
          revision: '6b0741a5c9171aff',
        },
        {
          url: '/v3/_next/static/chunks/webpack-ceb3216a80247016.js',
          revision: 'ceb3216a80247016',
        },
        {
          url: '/v3/_next/static/css/07f3166d15c89b86.css',
          revision: '07f3166d15c89b86',
        },
        {
          url: '/v3/_next/static/css/2f00d889114b206d.css',
          revision: '2f00d889114b206d',
        },
        {
          url: '/v3/_next/static/css/9232080ae666992b.css',
          revision: '9232080ae666992b',
        },
        {
          url: '/v3/_next/static/css/9c8c817c2666cad5.css',
          revision: '9c8c817c2666cad5',
        },
        {
          url: '/v3/_next/static/css/ad7003aa0d0f4358.css',
          revision: 'ad7003aa0d0f4358',
        },
        {
          url: '/v3/_next/static/media/1783a73d1694d38f.p.woff2',
          revision: 'a8168efe03f831b205165cf3b2e5fb6d',
        },
        {
          url: '/v3/_next/static/media/258196c4df74bb26.p.woff2',
          revision: 'ac6121dd7f045d6d7910df694a65de73',
        },
        {
          url: '/v3/_next/static/media/392e6f0f021ffbd8.p.otf',
          revision: 'e1d21457d17911d83fab829c6a52138f',
        },
        {
          url: '/v3/_next/static/media/6cdc7e676af368ff.p.otf',
          revision: '65efeaeb62e6ce3040d4cb21d9e18477',
        },
        {
          url: '/v3/_next/static/media/87a8af1d55d8f70e.p.otf',
          revision: '9ea1f5bc0d2bc67ede28da670baff9bc',
        },
        {
          url: '/v3/_next/static/media/background.d91c6166.svg',
          revision: 'd91c6166',
        },
        {
          url: '/v3/_next/static/media/bgLoanDesktop.13b23ce8.webp',
          revision: '13b23ce8',
        },
        {
          url: '/v3/_next/static/media/bgLoanMobile.fcaa948f.webp',
          revision: 'fcaa948f',
        },
        {
          url: '/v3/_next/static/media/compass.b67df886.svg',
          revision: 'b67df886',
        },
        {
          url: '/v3/_next/static/media/grab.9456cfe4.svg',
          revision: '9456cfe4',
        },
        {
          url: '/v3/_next/static/media/grabbing.d045e2c0.svg',
          revision: 'd045e2c0',
        },
        {
          url: '/v3/_next/static/media/sprites.ef90573e.svg',
          revision: 'ef90573e',
        },
        {
          url: '/v3/_next/static/pzas8TP2fdtZcYHpjNYty/_buildManifest.js',
          revision: '76327e6ebc4fffda3186b51245ef25e9',
        },
        {
          url: '/v3/_next/static/pzas8TP2fdtZcYHpjNYty/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/v3/assets/fonts/Kanyon/Kanyon-Bold.otf',
          revision: '65efeaeb62e6ce3040d4cb21d9e18477',
        },
        {
          url: '/v3/assets/fonts/Kanyon/Kanyon-Light.otf',
          revision: 'e95e530215ea089fc6272e2b3e5fe1aa',
        },
        {
          url: '/v3/assets/fonts/Kanyon/Kanyon-Medium.otf',
          revision: 'e1d21457d17911d83fab829c6a52138f',
        },
        {
          url: '/v3/assets/fonts/Kanyon/Kanyon-Regular.otf',
          revision: '9ea1f5bc0d2bc67ede28da670baff9bc',
        },
        {
          url: '/v3/assets/fonts/OpenSans/OpenSans-Bold.woff2',
          revision: 'd2208dd95f53dc18e763fa247f662f1c',
        },
        {
          url: '/v3/assets/fonts/OpenSans/OpenSans-ExtraBold.woff2',
          revision: '058275e07c21242a9bcf0a7c95352a09',
        },
        {
          url: '/v3/assets/fonts/OpenSans/OpenSans-Light.woff2',
          revision: '630d91b251a256788f3488c512585fcd',
        },
        {
          url: '/v3/assets/fonts/OpenSans/OpenSans-Regular.woff2',
          revision: 'ac6121dd7f045d6d7910df694a65de73',
        },
        {
          url: '/v3/assets/fonts/OpenSans/OpenSans-SemiBold.woff2',
          revision: 'a8168efe03f831b205165cf3b2e5fb6d',
        },
        {
          url: '/v3/assets/icon/AstraLogo.webp',
          revision: '9e3e70e201882c06fa25345d504e0822',
        },
        {
          url: '/v3/assets/icon/Daihatsu.png',
          revision: 'c1d798610083f67ea223fdd86b7c16e7',
        },
        {
          url: '/v3/assets/icon/FlagIndonesia.svg',
          revision: '3b3a87cb16a3677f2c3b8f73dffa7b9d',
        },
        {
          url: '/v3/assets/icon/Isuzu-new.png',
          revision: '493df90e28d93174ffb87225e9da26af',
        },
        {
          url: '/v3/assets/icon/Logo-BMW-potrait.webp',
          revision: 'cf1e5c9a902b935829d6c95c09360522',
        },
        {
          url: '/v3/assets/icon/Logo-Daihatsu-potrait.webp',
          revision: 'c1d798610083f67ea223fdd86b7c16e7',
        },
        {
          url: '/v3/assets/icon/Logo-Isuzu-potrait.webp',
          revision: 'c1dacd63d8960fedb142dc11ae2dd0d9',
        },
        {
          url: '/v3/assets/icon/Logo-Peugeot-potrait.webp',
          revision: '50d1639da23714ce52acd88a738cba56',
        },
        {
          url: '/v3/assets/icon/Logo-Potrait-BMW.webp',
          revision: 'f5edcff0bbf3072d3527b83991f8f642',
        },
        {
          url: '/v3/assets/icon/Logo-Potrait-Daihatsu.webp',
          revision: '29a42d71ab90d8bfc3901c3709b8be5d',
        },
        {
          url: '/v3/assets/icon/Logo-Potrait-Isuzu.webp',
          revision: 'd313de8c5f0d9b619c4c2ad9da7193d5',
        },
        {
          url: '/v3/assets/icon/Logo-Potrait-Peugeot.webp',
          revision: '4a6b1cebd5b5263ef1f6a2d12314ceed',
        },
        {
          url: '/v3/assets/icon/Logo-Potrait-Toyota.webp',
          revision: '0d91a2ffc82c8e13b6490ed3eb12a0d1',
        },
        {
          url: '/v3/assets/icon/Logo-Toyota-potrait.webp',
          revision: 'f48c6a78e47fa3b704d3588083743c33',
        },
        {
          url: '/v3/assets/icon/OldBodyTypesIcon/Car_Type_Icons_Crossover.png',
          revision: '873811fa116819fd0c418b82e1ca3fe4',
        },
        {
          url: '/v3/assets/icon/OldBodyTypesIcon/Car_Type_Icons_Hatchback.png',
          revision: '7110b7ea6cb5624dd636f00f58ba33e7',
        },
        {
          url: '/v3/assets/icon/OldBodyTypesIcon/Car_Type_Icons_MPV.png',
          revision: '13ba7d60b648cac65451bdd1c91349aa',
        },
        {
          url: '/v3/assets/icon/OldBodyTypesIcon/Car_Type_Icons_Minivan.png',
          revision: '5507ebbae214be5d81bc35111f227d9b',
        },
        {
          url: '/v3/assets/icon/OldBodyTypesIcon/Car_Type_Icons_SUV.png',
          revision: '319d502db2b5f23849bd4997e1450d76',
        },
        {
          url: '/v3/assets/icon/OldBodyTypesIcon/Car_Type_Icons_Sedan.png',
          revision: 'c2d52b67e91cb0e252adfa041d494900',
        },
        {
          url: '/v3/assets/icon/OldBodyTypesIcon/Car_Type_Icons_Sport.png',
          revision: '22b58f2856f249e884a7abee4c90a31e',
        },
        {
          url: '/v3/assets/icon/OldShareEmailLogo.webp',
          revision: '12bdcab3c6947cd42bf4919a6476cd54',
        },
        {
          url: '/v3/assets/icon/OldShareTwitterLogo.webp',
          revision: '19d51323b7b051287fc80be26fed6a59',
        },
        {
          url: '/v3/assets/icon/OldShareWhatsappLogo.webp',
          revision: '4371bd5a05fd29e2183c9437d00b1d56',
        },
        {
          url: '/v3/assets/icon/OldTafLogo.webp',
          revision: '2e496180dcf0d033f38eb5ba86a4e547',
        },
        {
          url: '/v3/assets/icon/app-store.webp',
          revision: 'e544dd47d1522d0b3bb35580598499a7',
        },
        {
          url: '/v3/assets/icon/arrowLeftSmall.svg',
          revision: 'dac22733bfa0dd7619f3287e427d2bd8',
        },
        {
          url: '/v3/assets/icon/arrowLeftSmall.webp',
          revision: 'd8ed2bf6bf43dd4b83778bae7e16b18b',
        },
        {
          url: '/v3/assets/icon/arrowRightSmall.svg',
          revision: 'bf7b6c22d9a35bc3e18ebef7cb738ac0',
        },
        {
          url: '/v3/assets/icon/arrowRightSmall.webp',
          revision: '71d7203c845ef8991d1d1c2c6b3e9bf3',
        },
        {
          url: '/v3/assets/icon/checked.webp',
          revision: '95bdd8c58f54cda4aa7df0bfbf0366e3',
        },
        {
          url: '/v3/assets/icon/chevron-left.webp',
          revision: '6ef4a747bc0089dd8d553dc58b422574',
        },
        {
          url: '/v3/assets/icon/chevron-right-icon.webp',
          revision: 'c32ee38ed2974fd5cc694b184f25d63e',
        },
        {
          url: '/v3/assets/icon/daihatsu-update.png',
          revision: '7489f2abe14bd59c7946c510dfa628ae',
        },
        {
          url: '/v3/assets/icon/facebook-outline.png',
          revision: '3f0461a5d732f6a19e526197d88517b9',
        },
        {
          url: '/v3/assets/icon/google-play.webp',
          revision: '453076bf4fe908faa9be6da685173a6e',
        },
        {
          url: '/v3/assets/icon/iso.webp',
          revision: '3c1c6dcfa9db0afb702c77569cfdb166',
        },
        {
          url: '/v3/assets/icon/logo-acc.webp',
          revision: '41df7ddb4f3c6bc3c97cae19a76b3751',
        },
        {
          url: '/v3/assets/icon/logo-bmw-min.png',
          revision: '03e2773e222ff0730b59564a01d29db2',
        },
        {
          url: '/v3/assets/icon/logo-bmw.webp',
          revision: '0708736a4dbdc78cddb3d5224260f706',
        },
        {
          url: '/v3/assets/icon/logo-daihatsu-min.png',
          revision: '43cc8783e881ab28f365bdfa28fce93e',
        },
        {
          url: '/v3/assets/icon/logo-daihatsu.webp',
          revision: '957c5ebdaa0bf44179a2a5566f151c4d',
        },
        {
          url: '/v3/assets/icon/logo-isuzu.webp',
          revision: 'ad48a1e37472415a1e97dae3b8f32fa4',
        },
        {
          url: '/v3/assets/icon/logo-on-dark.webp',
          revision: 'e34cb0a77d2dfe2ca6a7f541020539b5',
        },
        {
          url: '/v3/assets/icon/logo-peugeot.webp',
          revision: 'e4d97349e50ecd8fae41604c72dd9267',
        },
        {
          url: '/v3/assets/icon/logo-primary.webp',
          revision: '654d17777aa6f2f174d353852c98b72b',
        },
        {
          url: '/v3/assets/icon/logo-secondary.webp',
          revision: '68bb549584628533049479bb9005edc3',
        },
        {
          url: '/v3/assets/icon/logo-taf.webp',
          revision: '21d28fc31838992f9f69ee162469125a',
        },
        {
          url: '/v3/assets/icon/logo-toyota-min.png',
          revision: '7cf1896ddbd655d9890ef00e2ac01275',
        },
        {
          url: '/v3/assets/icon/logo-toyota.webp',
          revision: 'cb87980e45901370190e45550703b963',
        },
        {
          url: '/v3/assets/icon/peugeot.png',
          revision: '8fe30031139c52624a586cf512387030',
        },
        {
          url: '/v3/assets/icon/thumbnail-primary.webp',
          revision: '1cf81091709aa1f90fba0d27c9ceab5a',
        },
        {
          url: '/v3/assets/icon/thumbnail-secondary.webp',
          revision: 'c5dc0685721464918cbd04daed6b6eb2',
        },
        {
          url: '/v3/assets/icon/toyota-1989.png',
          revision: '91b2004cd3f387428d74ba34b09c86df',
        },
        {
          url: '/v3/assets/illustration/CarNotExistImg.webp',
          revision: '235ba3f9de85f4ecee20123cdcdcced0',
        },
        {
          url: '/v3/assets/illustration/Car_Type_Icons_Crossover.png',
          revision: '873811fa116819fd0c418b82e1ca3fe4',
        },
        {
          url: '/v3/assets/illustration/Car_Type_Icons_Hatchback.png',
          revision: '7110b7ea6cb5624dd636f00f58ba33e7',
        },
        {
          url: '/v3/assets/illustration/Car_Type_Icons_MPV.png',
          revision: '13ba7d60b648cac65451bdd1c91349aa',
        },
        {
          url: '/v3/assets/illustration/Car_Type_Icons_Minivan.png',
          revision: '5507ebbae214be5d81bc35111f227d9b',
        },
        {
          url: '/v3/assets/illustration/Car_Type_Icons_SUV.png',
          revision: '319d502db2b5f23849bd4997e1450d76',
        },
        {
          url: '/v3/assets/illustration/Car_Type_Icons_Sedan.png',
          revision: 'c2d52b67e91cb0e252adfa041d494900',
        },
        {
          url: '/v3/assets/illustration/Car_Type_Icons_Sport.png',
          revision: '22b58f2856f249e884a7abee4c90a31e',
        },
        {
          url: '/v3/assets/illustration/EmptyCalculationImage.webp',
          revision: 'dd2f4d7e754e45af49f9332a8cd64d40',
        },
        {
          url: '/v3/assets/illustration/FlagIndonesiaNew.png',
          revision: '876ce13d6b21508aca4251998945b5b3',
        },
        {
          url: '/v3/assets/illustration/Forward.svg',
          revision: 'fb5ab515a04e6156962b1462d18914de',
        },
        {
          url: '/v3/assets/illustration/KTP.webp',
          revision: '7ac26ff8942ecf09027c89b8200b7d3b',
        },
        {
          url: '/v3/assets/illustration/OldCitySelectorBackgroundMobile.webp',
          revision: '1fe3f2b9ccc4abad3f535d914683e1a0',
        },
        {
          url: '/v3/assets/illustration/PromoAsuransi.gif',
          revision: 'dad3679a27ecb37b81c6a39b59add783',
        },
        {
          url: '/v3/assets/illustration/PromoCumaDiSEVA.webp',
          revision: '6b1fedc42d8831d96a64e2b3a2d42aa1',
        },
        {
          url: '/v3/assets/illustration/PromoCumaDiSEVAPopup.webp',
          revision: '1ddf2cb8d0464e387dc797f796d6056c',
        },
        {
          url: '/v3/assets/illustration/PromoTSO.webp',
          revision: '923a6ceae410f7451f1d617f0086a0be',
        },
        {
          url: '/v3/assets/illustration/PromoTSOPopup.webp',
          revision: '84606f690793fc0e9bffdbde05d6fff5',
        },
        {
          url: '/v3/assets/illustration/PromoTradeIn.webp',
          revision: '7a7b860b94dbe0702009ab0cab6a600d',
        },
        {
          url: '/v3/assets/illustration/PromoTradeInPopup.webp',
          revision: 'b2914110f5230ea044fb789fde069ce9',
        },
        {
          url: '/v3/assets/illustration/approval.webp',
          revision: '13e9ed595e10649b803542cb81adf7aa',
        },
        {
          url: '/v3/assets/illustration/approved.webp',
          revision: 'a84d835f283d6212b31fb5a844e8e64b',
        },
        {
          url: '/v3/assets/illustration/background-desktop-green.webp',
          revision: 'cb20f47d1b7d6463ed0fbca4bbac3072',
        },
        {
          url: '/v3/assets/illustration/background-desktop-red.webp',
          revision: '61774262e6a24cbe7041d52be51ce50d',
        },
        {
          url: '/v3/assets/illustration/background-desktop.webp',
          revision: '8f26dd56652392faeedcd5796d74b7f7',
        },
        {
          url: '/v3/assets/illustration/background-image-desktop.webp',
          revision: '6a2e623501a4ea1edde59fc171bf1bc4',
        },
        {
          url: '/v3/assets/illustration/banner_qualifacation.webp',
          revision: '7c4e7689620bfe7b7012dd5185245d16',
        },
        {
          url: '/v3/assets/illustration/buttonLeft.svg',
          revision: '197f90fb97831404292ba70b9bfbf1e5',
        },
        {
          url: '/v3/assets/illustration/buttonRight.svg',
          revision: 'ad17069b6b06dc300fadfd63bb091416',
        },
        {
          url: '/v3/assets/illustration/car-icon.webp',
          revision: 'd19c73bbe564cff27aee44daddeb3529',
        },
        {
          url: '/v3/assets/illustration/car-main-hero-skeleton.webp',
          revision: 'e1273c66263ce08256e809e6704b76b1',
        },
        {
          url: '/v3/assets/illustration/car-not-exist.webp',
          revision: '7d8de6722c5f129325560fa0b9b4fcbf',
        },
        {
          url: '/v3/assets/illustration/car-sillhouete.webp',
          revision: 'ed2a2c3cbe52109329dc794abe9ca78b',
        },
        {
          url: '/v3/assets/illustration/car-skeleton.webp',
          revision: 'cf1daaff394efff1c83ed986d5723736',
        },
        {
          url: '/v3/assets/illustration/car_search_desktop.png',
          revision: 'dd70c6568710487b08ab33748ed9afcd',
        },
        {
          url: '/v3/assets/illustration/car_search_mobile.png',
          revision: '98b4ac032b9d1cc565574355b736788a',
        },
        {
          url: '/v3/assets/illustration/empty-car.webp',
          revision: '03548b293758332d154262e9edaec02d',
        },
        {
          url: '/v3/assets/illustration/error.webp',
          revision: '4edd3677964e4eb7e22354d2633721b4',
        },
        {
          url: '/v3/assets/illustration/ia-approval.webp',
          revision: '81b25c2337eb27c9d40c5b841c6f0e67',
        },
        {
          url: '/v3/assets/illustration/ia-approved.webp',
          revision: 'd165e504d725b3d8d8d07996dda77b19',
        },
        {
          url: '/v3/assets/illustration/ia-rejected.webp',
          revision: '5c919736a96c414b5c217a7ce24425da',
        },
        {
          url: '/v3/assets/illustration/ia-waiting.webp',
          revision: '6c9c8866a2802bfde5bba08917d0e837',
        },
        {
          url: '/v3/assets/illustration/image-unavailable-desktop.webp',
          revision: '3b3698fb7f905c20ca37891aae35e4b1',
        },
        {
          url: '/v3/assets/illustration/jumpa-pay-modal-bg.webp',
          revision: '7f99e1121196327f3f28f3706c261bb8',
        },
        {
          url: '/v3/assets/illustration/kualifikasi-kredit.webp',
          revision: 'bafc9918cca107ce443799df5100c0d8',
        },
        {
          url: '/v3/assets/illustration/loan-calculator.webp',
          revision: 'fe7e0592cad9018291ab17b3bcdd1568',
        },
        {
          url: '/v3/assets/illustration/logo-giias.webp',
          revision: '6d8f644e10a6232fda9067a6ac97c0e4',
        },
        {
          url: '/v3/assets/illustration/main-hero-raize-cencored.webp',
          revision: 'b1f4b908ac9d9d33f1874429c0174230',
        },
        {
          url: '/v3/assets/illustration/main-hero-raize.webp',
          revision: 'becf4ec4565628e0a903755b148141ae',
        },
        {
          url: '/v3/assets/illustration/placeholder-150.webp',
          revision: '7f4afd37783823bc54817cf3714a70d0',
        },
        {
          url: '/v3/assets/illustration/placeholder.gif',
          revision: '3da2d4659243005f83008feaeb9dc9aa',
        },
        {
          url: '/v3/assets/illustration/plp-empty.webp',
          revision: 'b4add6b7a109877518859775f52b0a0d',
        },
        {
          url: '/v3/assets/illustration/promo-1.webp',
          revision: 'e286f6e82122744adc3ceffe08973173',
        },
        {
          url: '/v3/assets/illustration/promo-icon.webp',
          revision: 'ecd4284eef0f83394ec42f9877d5e330',
        },
        {
          url: '/v3/assets/illustration/promo-image-1.webp',
          revision: 'f7d3565834b744f4353bb70a3828aa8a',
        },
        {
          url: '/v3/assets/illustration/rejected-approval.webp',
          revision: '8dc093aac6de88923700de2cc098d042',
        },
        {
          url: '/v3/assets/illustration/rp-icon.webp',
          revision: '91e4d208160f9954e81cff5fbfdea989',
        },
        {
          url: '/v3/assets/illustration/sub-product-1.webp',
          revision: 'e926c4c1afca17ad1e39b0be2a2e4dfc',
        },
        {
          url: '/v3/assets/illustration/sub-product-2.webp',
          revision: '44badf572884986db724741077a603fc',
        },
        {
          url: '/v3/assets/illustration/success-verification.webp',
          revision: 'cce1117a9f889e75a836fb211dd4ac90',
        },
        {
          url: '/v3/assets/illustration/supergraphic-2.webp',
          revision: 'fa36bb280878e624ea2c0da3957859f1',
        },
        {
          url: '/v3/assets/illustration/supergraphic-large.webp',
          revision: 'd6b92e35e433e8da55db8dca98d9b15c',
        },
        {
          url: '/v3/assets/illustration/supergraphic-mobile.webp',
          revision: '7b32ed5edd78dfbb6076e1cea7747871',
        },
        {
          url: '/v3/assets/illustration/supergraphic-secondary-large.webp',
          revision: '2bfc564dc11e9e2ebd45e39f11d9ba46',
        },
        {
          url: '/v3/assets/illustration/supergraphic-secondary-small.webp',
          revision: '1d893f69e00217ec924abf00bce0ef34',
        },
        {
          url: '/v3/assets/illustration/supergraphic-small.webp',
          revision: '15240a98f24c448a76fe24f55bc05c34',
        },
        {
          url: '/v3/assets/illustration/vector-6.png',
          revision: 'c8153c23c964fad07603e068fd12fafd',
        },
        {
          url: '/v3/assets/illustration/vector-7.png',
          revision: 'c1f8443062d7f22fb7c2efab9f58fed7',
        },
        {
          url: '/v3/assets/illustration/wishlist.webp',
          revision: 'db49a875011945e4de7927ebad152d96',
        },
        {
          url: '/v3/assets/images/banner/login-placeholder.webp',
          revision: 'e7ae8a6d26f31e998e80ef31f0c6103b',
        },
        {
          url: '/v3/assets/images/banner/promotional-banner-rounded.webp',
          revision: 'bc72d6dd150214e08331e898eb0bb07d',
        },
        {
          url: '/v3/assets/images/banner/register-placeholder.webp',
          revision: '19592081a065755a9f60673593626c40',
        },
        {
          url: '/v3/assets/images/floating/FloatingIconNew.webp',
          revision: 'ddb0fb4a9d616f0e647b6f0f330f7dff',
        },
        {
          url: '/v3/assets/images/floating/IconExpand.png',
          revision: '83ec47a2b8204533274356e3ac7e72d1',
        },
        {
          url: '/v3/assets/images/profile/app-store.webp',
          revision: '8de8763d05e7b7af9605e62aeff2a76c',
        },
        {
          url: '/v3/assets/images/profile/card_promotion-banner.webp',
          revision: 'c6683ee51a846c25d27f8d4a575c5e1e',
        },
        {
          url: '/v3/assets/images/profile/google-play.webp',
          revision: '911cab9fa05c00ff9937a974f9561138',
        },
        {
          url: '/v3/assets/images/profile/ktp_promotion-banner.webp',
          revision: '391a822365e43aa8cd413239d3c4f397',
        },
        {
          url: '/v3/assets/images/profile/profile_promotion-banner.webp',
          revision: 'e788e3c39dfadb394af696ad4f812d04',
        },
        {
          url: '/v3/favicon.ico',
          revision: 'c30c7d42707a47a3f4591831641e50dc',
        },
        {
          url: '/v3/favicon.png',
          revision: '15737d95fb1cfe4a27e894d62f4e97e3',
        },
        {
          url: '/v3/icon-512x512.png',
          revision: '8afc03adb947fdb401cc9a661d12f196',
        },
        { url: '/v3/icon.png', revision: '68099a2c28a233f95509b9302f6b1a35' },
        {
          url: '/v3/manifest.json',
          revision: '428c7a095599504dfd2921a9b9fe101c',
        },
        { url: '/v3/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        {
          url: '/v3/thirteen.svg',
          revision: '53f96b8290673ef9d2895908e69b2f92',
        },
        { url: '/v3/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/v3',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: i,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const s = e.pathname
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET',
    )
})
