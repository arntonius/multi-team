import React from 'react'
import styles from 'styles/components/organisms/articleWidget.module.scss'
import { Article } from 'utils/types'
import Image from 'next/image'
import { articleDateFormat } from 'utils/handler/date'
import { LanguageCode } from 'utils/enum'
import { trackEventCountly } from 'helpers/countly/countly'
import { CountlyEventNames } from 'helpers/countly/eventNames'

type ArticlesWidgetProps = {
  article: Article
  currentTab: string
  articleOrder: number
}
const ArticleWidgetCard = ({
  article,
  currentTab,
  articleOrder,
}: ArticlesWidgetProps) => {
  return (
    <div>
      <div
        className={styles.cardArticle}
        onClick={() => {
          trackEventCountly(CountlyEventNames.WEB_ARTICLE_CLICK, {
            PAGE_ORIGINATION: 'Homepage',
            ARTICLE_SECTION: 'Main article',
            ARTICLE_ORDER: articleOrder + 1,
            ARTICLE_CATEGORY: article.category.replace('&', 'dan'),
            PAGE_DIRECTION_URL: article.url,
          })
          window.location.href = article.url
        }}
      >
        <Image
          alt="article"
          src={article.featured_image}
          width={480}
          height={258}
          className={styles.images}
        />
        {article.category && (
          <div className={styles.categoryTextWrapper}>
            <p>{article.category}</p>
          </div>
        )}
        <div className={styles.descriptionWrapper}>
          <p className={styles.textDate}>
            {articleDateFormat(new Date(article.publish_date), LanguageCode.id)}
          </p>
          <h4 className={styles.textTitle}>{article.title}</h4>
        </div>
      </div>
    </div>
  )
}

export default ArticleWidgetCard
