/* eslint-disable react-hooks/rules-of-hooks */
import React, { HTMLAttributes, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { createPortal } from 'react-dom'
import { colors } from 'utils/helpers/style/colors'
import urls from 'utils/helpers/url'
import { useRouter } from 'next/router'
import { IconCloseOutlined } from 'components/atoms/icons'
import { useIsMobile } from 'utils'
import { CloseSnackBar, OpenSnackBar } from './slide'

const TextLegalMediumStyle = css`
  font-family: 'OpenSans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0px;
`

const paFlowUrlPrefixList = [
  '/pre-approval',
  '/ekyc',
  '/camera',
  '/image-preview',
  '/image-quality-check',
  '/ocr-success',
  '/ocr-fail',
  '/bank-selection',
  '/link-brick-success',
  '/link-brick-fail',
  '/pre-approval-sms-sending',
  '/image-crop',
  '/pac',
]
const isPreApprovalFlowPage = (url: string): boolean =>
  paFlowUrlPrefixList.some((prefix: any) => url.startsWith(prefix))

export const maxPageWidth = isPreApprovalFlowPage(window.location.pathname)
  ? '700px'
  : '100%'

export const TextLegalMedium = styled.span`
  ${TextLegalMediumStyle}
`

export enum ToastType {
  Error = 'Error',
  Success = 'Success',
  Info = 'Info',
  ErrorPreApproval = 'ErrorPreApproval',
}

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  type: ToastType
  message?: string
  onClose?: () => void
  isDismissible?: boolean
  duration?: number // in seconds
  visible?: boolean
  messageAsComponent?: () => JSX.Element
  overridePositionToBottom?: boolean
}

const MILLISECONDS_IN_A_SECOND = 1000

const ToastComponent = ({
  type,
  message = '',
  isDismissible = true,
  onClose = () => ({}),
  duration = 5,
  visible,
  messageAsComponent,
  overridePositionToBottom,
}: ToastProps) => {
  const domEl = document.querySelector('body')
  if (!domEl) return null

  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (type !== ToastType.ErrorPreApproval) {
        onClose()
      }
    }, duration * MILLISECONDS_IN_A_SECOND)

    return () => clearTimeout(timer)
  }, [])

  const handleRetry = () => {
    router.push(urls.internalUrls.preApprovalQuestionFlowUrl)
  }

  const renderMessage = () => {
    if (!!messageAsComponent) {
      return messageAsComponent()
    } else if (type === ToastType.ErrorPreApproval) {
      return (
        <TextLegalMedium>
          {message}{' '}
          <TextRetry onClick={() => handleRetry()}>
            Ulangi Instant Approval
          </TextRetry>
        </TextLegalMedium>
      )
    } else {
      return <TextLegalMedium>{message}</TextLegalMedium>
    }
  }

  return createPortal(
    <StyledToastContainer
      visible={visible}
      overridePositionToBottom={overridePositionToBottom}
    >
      <StyledToastWrapper type={type} hasCloseIcon={isDismissible}>
        {renderMessage()}
        {isDismissible && (
          <StyledCloseButton onClick={onClose}>
            <IconCloseOutlined width={24} height={24} color={colors.offWhite} />
          </StyledCloseButton>
        )}
      </StyledToastWrapper>
    </StyledToastContainer>,
    domEl,
  )
}

const Toast = React.memo(ToastComponent)

export const useToast = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleAnimation, setIsVisibleAnimation] = useState(false)

  const showToast = () => {
    setIsVisible(true)
    setIsVisibleAnimation(true)
  }
  const hideToast = () => {
    setIsVisibleAnimation(false)
    setTimeout(() => {
      setIsVisible(false)
    }, 1000) // same duration with animation
  }

  const RenderToast = ({ ...props }: ToastProps) => (
    <>
      {isVisible && (
        <Toast onClose={hideToast} visible={isVisibleAnimation} {...props} />
      )}
    </>
  )

  return {
    showToast,
    hideToast,
    RenderToast,
  }
}

interface ToastWrapperProps {
  type: ToastType
  hasCloseIcon: boolean
}

const HiddenBlock = css`
  visibility: hidden;
`

const getToastLocation = (overridePositionToBottom?: boolean) => {
  const isMobile = useIsMobile()
  if (overridePositionToBottom) {
    return 'bottom: 0;'
  } else if (isMobile) {
    return 'top: 0;'
  } else {
    return 'bottom: 0;'
  }
}

const StyledToastContainer = styled.div<{
  visible?: boolean
  overridePositionToBottom?: boolean
}>`
  position: fixed;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: ${maxPageWidth};
  z-index: 1000;

  ${({ overridePositionToBottom }) =>
    getToastLocation(overridePositionToBottom)};

  ${({ visible }) =>
    typeof visible === 'undefined'
      ? HiddenBlock
      : visible
      ? OpenSnackBar
      : CloseSnackBar}
`

const ErrorStyle = css`
  background: ${colors.error};
`

const SuccessStyle = css`
  background: ${colors.success};
`

const InfoStyle = css`
  background: ${colors.body};
`
const StyledToastWrapper = styled.div<ToastWrapperProps>`
  width: 100%;
  min-height: 72px;
  color: ${colors.offWhite};
  display: flex;
  justify-content: space-around;
  padding: 25px 16px;

  ${({ type }) => {
    switch (type) {
      case ToastType.Error:
        return ErrorStyle
      case ToastType.Success:
        return SuccessStyle
      case ToastType.Info:
        return InfoStyle
      case ToastType.ErrorPreApproval:
        return ErrorStyle
      default:
        return InfoStyle
    }
  }}

  ${({ hasCloseIcon }) =>
    hasCloseIcon &&
    css`
      justify-content: space-between;
      align-items: center;
    `};
`

const StyledCloseButton = styled.div`
  :hover {
    cursor: pointer;
  }
`

const TextRetry = styled(TextLegalMedium)`
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
`
