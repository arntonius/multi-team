import React, { TextareaHTMLAttributes } from 'react'
import styles from '../../../styles/components/atoms/modal.module.scss'
import { PropsModal } from 'utils/types'
import { IconClose } from '../icon'
import { colors } from 'styles/colors'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
const Modal = dynamic(() => import('antd/lib/modal'), { ssr: false })

export const CustomModal = ({
  children,
  title,
  isFull,
  width = 343,
  className,
  ...props
}: PropsModal) => {
  return (
    <Modal
      title={<Title>{title}</Title>}
      closeIcon={
        <IconClose width={24} height={22} color={colors.primaryBlack} />
      }
      footer={null}
      className={clsx(isFull ? 'full' : 'default', className)}
      width={width}
      centered
      {...props}
    >
      {children}
    </Modal>
  )
}

const Title = ({ children }: TextareaHTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={styles.title}>{children}</h3>
)
