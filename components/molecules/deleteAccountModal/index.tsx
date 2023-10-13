import React from 'react'
import styles from '/styles/components/molecules/deleteAccountModal.module.scss'
import type { ModalProps } from 'antd/lib/modal'
import { Button, IconClose, TextButton } from 'components/atoms'
import { ButtonSize, ButtonVersion } from 'components/atoms/button'
import dynamic from 'next/dynamic'
const Modal = dynamic(() => import('antd/lib/modal'), { ssr: false })

type Props = ModalProps & {
  emitClickCtaCancel: () => void
  emitClickCtaConfirm: () => void
}

export const DeleteAccountModal = (props: Props) => {
  return (
    <Modal
      closable={true}
      closeIcon={<IconClose width={24} height={24} color="#13131B" />}
      centered
      className="delete-account-custom-modal"
      footer={null}
      maskStyle={{ background: 'rgba(19, 19, 27, 0.5)' }}
      {...props}
    >
      <h2 className={styles.title}>Hapus Akun</h2>

      <span className={styles.subtitle}>
        Hapus akun dan data kamu secara
        <br />
        permanen dari aplikasi SEVA?
        <br />
        Aktivitas ini tidak dapat dibatalkan.
      </span>

      <Button
        size={ButtonSize.Big}
        version={ButtonVersion.PrimaryDarkBlue}
        secondaryClassName={styles.ctaCancel}
        onClick={props.emitClickCtaCancel}
      >
        Batal
      </Button>

      <TextButton
        additionalClassName={styles.ctaConfirm}
        onClick={props.emitClickCtaConfirm}
      >
        Ya, Hapus Akun Saya
      </TextButton>
    </Modal>
  )
}
