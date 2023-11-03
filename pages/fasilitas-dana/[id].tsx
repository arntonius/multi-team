import React from 'react'
import { RefinancingLandingPageContent } from 'components/organisms'
import Seo from 'components/atoms/seo'
import { defaultSeoImage } from 'utils/helpers/const'

const RefinancingPageWithIdSlug = () => {
  const metaTitle = 'Fasilitas Dana SEVA. Dana Tunai Jaminan BPKB Aman | SEVA'
  const metaDesc =
    'Jaminkan BPKB mobilmu di SEVA dan dapatkan Fasilitas Dana tunai untuk beragam kebutuhan.'

  return (
    <>
      <Seo title={metaTitle} description={metaDesc} image={defaultSeoImage} />
      <RefinancingLandingPageContent />
    </>
  )
}

export default RefinancingPageWithIdSlug
