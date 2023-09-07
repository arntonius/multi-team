import {
  trackLCAllArticleClick,
  trackLCArticleClick,
} from 'helpers/amplitude/seva20Tracking'
import React from 'react'
import PrimaryCard from 'components/molecules/card/primaryCard'
import styles from 'styles/components/organisms/articles.module.scss'
import { Article } from 'utils/types'
import { trackEventCountly } from 'helpers/countly/countly'
import { CountlyEventNames } from 'helpers/countly/eventNames'

type TArticlesProps = {
  articles: Article[]
  cityName: string
  carModel: string
  carBrand: string
  additionalContainerStyle?: string
  additionalLinkStyle?: string
  selectedTenure?: number
  selectedLoanRank?: string
}

export default function Articles({
  articles,
  carBrand,
  carModel,
  cityName,
  additionalContainerStyle,
  additionalLinkStyle,
  selectedTenure,
  selectedLoanRank,
}: TArticlesProps) {
  const [showAllArticlesUrl, setShowAllArticlesUrl] = React.useState('')

  const fetchBaseConfig = async () => {
    const response = await fetch('https://api.sslpots.com/api/base-conf')
    const responseData = await response.json()
    setShowAllArticlesUrl(responseData.data.attributes.show_all_articles_url)
  }

  React.useEffect(() => {
    fetchBaseConfig()
  }, [])

  const handleClickArticle = (url: string) => {
    trackLCArticleClick({
      Page_Origination: window.location.href,
      Car_Brand: carBrand,
      Car_Model: carModel,
      City: cityName,
      Article: url,
    })
    trackEventCountly(CountlyEventNames.WEB_ARTICLE_CLICK, {
      PAGE_ORIGINATION: 'PDP - Kredit',
      TENOR_OPTION: selectedTenure,
      TENOR_RESULT: selectedLoanRank,
      PAGE_DIRECTION_URL: url,
    })
    window.location.href = url
  }

  const handleClickAllArticle = () => {
    trackLCAllArticleClick({
      Page_Origination: window.location.href,
      Car_Brand: carBrand,
      Car_Model: carModel,
      City: cityName,
    })

    trackEventCountly(CountlyEventNames.WEB_ARTICLE_ALL_CLICK, {
      PAGE_ORIGINATION: 'PDP - Kredit',
      TENOR_OPTION: selectedTenure,
      TENOR_RESULT: selectedLoanRank,
    })
    window.location.href = showAllArticlesUrl
  }

  return (
    <div className={`${styles.container} ${additionalContainerStyle}`}>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>Baca Artikel Terkini</h3>

        <div
          onClick={handleClickAllArticle}
          className={`${styles.link} ${additionalLinkStyle}`}
        >
          Lihat Semua
        </div>
      </div>

      <div className={styles.articlesContainer}>
        {articles?.map((article) => (
          <PrimaryCard
            key={article.title}
            date={new Date(article.publish_date)}
            image={article.featured_image}
            title={article.title}
            url={article.url}
            label={article.category}
            handleClick={handleClickArticle}
          />
        ))}
      </div>
    </div>
  )
}
