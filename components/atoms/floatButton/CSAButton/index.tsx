import React from 'react'
import FloatButton from 'antd/lib/float-button'
import { IconCSA } from 'components/atoms/icon'
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

type CSAButtonProps = Omit<FloatButtonProps, 'icon'> & {
  additionalstyle?: string
}

const CSAButton = (props: CSAButtonProps) => {
  return (
    <FloatButton
      className={`csa-button ${props.additionalstyle}`}
      icon={<IconCSA width={32} height={32} color={'#246ed4'} />}
      {...props}
    />
  )
}

export default CSAButton
