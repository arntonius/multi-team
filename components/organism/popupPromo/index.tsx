import { Modal } from 'antd'
import React, { TextareaHTMLAttributes } from 'react'
import type { ModalProps } from 'antd'
import { colors } from 'styles/colors'
import { IconClose } from 'components/atoms'
import styles from '../../../styles/saas/components/organism/popupPromo.module.scss'
import elementId from 'helpers/elementIds'

const promoList = [
  {
    title: 'Promo Cuma di SEVA',
    body: [
      {
        title: 'Cashback 1 Angsuran',
        body: 'Dapatkan max. cashback 4 juta rupiah setelah melakukan pembayaran Angsuran Pertama. Khusus pembelian mobil secara kredit dengan tenor 1 - 5 tahun melalui ACC dan TAF.',
      },
      {
        title: 'Bebas 1 Tahun Asuransi Comprehensive Garda Oto',
        body: 'Berlaku untuk pembelian mobil baru Toyota dan Daihatsu dengan tipe mobil passenger car. Khusus pembelian mobil secara kredit dengan tenor 3 - 5 tahun.',
      },
    ],
    snk: 'https://www.seva.id/info/promo/cuma-di-seva/',
  },
  {
    title: 'Paket Toyota Spektakuler',
    body: [
      {
        title: '',
        body: 'Dapatkan bunga spesial mulai dari 0%, bebas biaya administrasi atau bebas 2 tahun asuransi comprehensive hingga 20 juta rupiah untuk pembelian mobil baru Toyota Veloz, Avanza, Raize, dan Rush secara kredit. Khusus tipe Zenix Gasoline, berlaku bunga spesial mulai dari 2.77%.',
      },
    ],
    snk: 'https://www.seva.id/info/promo/toyota-spektakuler/',
  },

  {
    title: 'Promo Trade-In Daihatsu',
    body: [
      {
        title: 'Potongan DP & Cashback Daihatsu',
        body: 'Dapatkan cashback tambahan trade-in senilai 1 juta rupiah untuk pembelian mobil baru Brand Daihatsu semua tipe (LCGC dan non-LCGC).',
      },
    ],
    snk: 'https://www.seva.id/info/promo/promo-trade-in-daihatsu/',
  },
]

type PopupPromo = Omit<ModalProps, 'children'>

export const PopupPromo = (props: PopupPromo) => {
  const lastIndex = promoList.length - 1
  return (
    <Modal
      title={
        <Title data-testid={elementId.PLP.Text.JudulPopupPromo}>Promo</Title>
      }
      closeIcon={
        <IconClose
          width={24}
          height={22}
          color={colors.primaryBlack}
          datatestid={elementId.PLP.Close.Button.PopupPromo}
        />
      }
      footer={null}
      className="custom-modal"
      width={343}
      centered
      {...props}
    >
      <div className={styles.container}>
        {promoList.map((item, index) => (
          <div key={index} className={styles.contentPromo}>
            <span className={styles.titlePromo}>{item.title}</span>
            <div className={styles.bodyWrapper}>
              {item.body.map((body, idx) => (
                <div key={idx} className={styles.bodyContentWrapper}>
                  {body.title && (
                    <span className={styles.bodyTitle}>{body.title}</span>
                  )}
                  <span className={styles.bodyPromo}>{body.body}</span>
                </div>
              ))}
            </div>
            <a
              className={styles.snk}
              target="_blank"
              href={item.snk}
              rel="noreferrer noopener"
              data-testid={elementId.PLP.Button.LihatSNK}
            >
              Lihat S&K
            </a>
            {index !== lastIndex && <div className={styles.divider}></div>}
          </div>
        ))}
      </div>
    </Modal>
  )
}

const Title = ({
  children,
  ...props
}: TextareaHTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={styles.title} {...props}>
    {children}
  </h3>
)
