import React, { useEffect } from 'react'
import styles from 'styles/components/molecules/qualifacationModal.module.scss'
import { Button } from 'components/atoms'
import { ButtonVersion } from 'components/atoms/button'
import { ButtonSize } from 'components/atoms/button'
import { getToken } from 'utils/handler/auth'
import { LoginSevaUrl, creditQualificationUrl } from 'utils/helpers/routes'
import { savePageBeforeLogin } from 'utils/loginUtils'
import { IconClose } from 'components/atoms'
import { FormLCState, SpecialRateList } from 'utils/types/utils'
import elementId from 'helpers/elementIds'
import { SessionStorageKey } from 'utils/enum'
import { LoanRank } from 'utils/types/models'
import { saveSessionStorage } from 'utils/handler/sessionStorage'
import { navigateToKK } from 'utils/navigate'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const Modal = dynamic(() => import('antd/lib/modal'), { ssr: false })

const MainImage = '/revamp/illustration/loan-calculator.webp'

interface QualificationCreditModalProps {
  onClickCloseButton: () => void
  isOpen: boolean
  formData: FormLCState
  selectedLoan: SpecialRateList | null
  onClickCta?: () => void
}

export const QualificationCreditModal: React.FC<
  QualificationCreditModalProps
> = ({ onClickCloseButton, isOpen, formData, selectedLoan, onClickCta }) => {
  const [isLogin] = React.useState(!!getToken())

  const getLoanRank = (rank: string) => {
    if (rank === LoanRank.Green) {
      return 'Mudah'
    } else if (rank === LoanRank.Red) {
      return 'Sulit'
    }

    return ''
  }

  const handleClickCredit = () => {
    saveSessionStorage(
      SessionStorageKey.KalkulatorKreditForm,
      JSON.stringify(formData),
    )
    saveSessionStorage(SessionStorageKey.PreviousSourceSectionLogin, 'Null')
    onClickCta && onClickCta()
    if (isLogin) {
      navigateToKK(true)
    } else {
      saveSessionStorage(
        SessionStorageKey.PageReferrerLoginPage,
        'PDP - Kredit',
      )
      savePageBeforeLogin(creditQualificationUrl)
      window.location.href = LoginSevaUrl
    }
  }

  useEffect(() => {
    // Cek jika pengguna sudah login dan ada URL halaman instantApproval
    if (isLogin && window.location.href === LoginSevaUrl) {
      // Arahkan pengguna ke halaman instantApproval setelah login
      savePageBeforeLogin(creditQualificationUrl)
    }
  }, [isLogin])

  return (
    <Modal
      centered
      className={'qualification-custom-modal'}
      open={isOpen}
      footer={null}
      onCancel={onClickCloseButton}
      closeIcon={<IconClose color="#13131B" width={24} height={24} />}
      data-testid={elementId.LoanCalculator.Popup.KualifikasiKredit}
      styles={{
        mask: {
          background: 'rgba(19, 19, 27, 0.5)',
          maxWidth: '570px',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      }}
    >
      <div>
        <Image
          src={MainImage}
          alt="Banner Qualification Kredit"
          className={styles.modalBanner}
          width="200"
          height="200"
        />
      </div>

      <p className={styles.modalTitle}>
        3 Langkah Cepat untuk Pengecekan Kualifikasi Kredit
      </p>
      <div className={styles.modalContent}>
        <div className={styles.itemStep}>
          <p className={styles.itemContent}>
            <span className={styles.numberItem}>1</span>
            Silahkan login atau daftar di SEVA
          </p>
        </div>
        <div className={styles.itemStep}>
          <p className={styles.itemContent}>
            <span className={styles.numberItem}>2</span>
            Isi informasi sumber pendapatan
          </p>
        </div>
        <div className={styles.itemStep}>
          <p className={styles.itemContent}>
            <span className={styles.numberItem}>3</span>
            Lakukan verifikasi identitas (opsional)
          </p>
        </div>
      </div>
      <Button
        version={ButtonVersion.PrimaryDarkBlue}
        size={ButtonSize.Big}
        onClick={handleClickCredit}
        data-testid={elementId.LoanCalculator.Button.PopupKualifikasiKredit}
      >
        Cek Kualifikasi Kredit
      </Button>
    </Modal>
  )
}
