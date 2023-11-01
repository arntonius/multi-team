import React from 'react'
import FloatButton from 'antd/lib/float-button'
import { IconWhatsapp } from 'components/atoms/icon'
import {
  FloatButtonBadgeProps,
  FloatButtonShape,
  FloatButtonType,
} from 'antd/lib/float-button/interface'
import { TooltipProps } from 'antd/lib/tooltip'

export interface FloatButtonProps {
  prefixCls?: string
  className?: string
  rootClassName?: string
  style?: React.CSSProperties
  icon?: React.ReactNode
  description?: React.ReactNode
  type?: FloatButtonType
  shape?: FloatButtonShape
  tooltip?: TooltipProps['title']
  href?: string
  target?: React.HTMLAttributeAnchorTarget
  badge?: FloatButtonBadgeProps
  onClick?: React.MouseEventHandler<HTMLElement>
  ['aria-label']?: React.HtmlHTMLAttributes<HTMLButtonElement>['aria-label']
}

type Props = Omit<FloatButtonProps, 'icon'> & {
  additionalStyle?: string
}

const WhatsappButton = ({ additionalStyle, ...props }: Props) => {
  return (
    <FloatButton
      className={`whatsapp-floating-button ${additionalStyle}`}
      icon={<IconWhatsapp width={32} height={32} />}
      {...props}
    />
  )
}

export default WhatsappButton
