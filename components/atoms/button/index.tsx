import React, { ButtonHTMLAttributes } from 'react'
import styles from 'styles/components/atoms/button.module.scss'
import { IconLoading } from '../icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  version: ButtonVersion
  size: ButtonSize
  loading?: boolean
  secondaryClassName?: any
}

export enum ButtonVersion {
  Secondary = 'Secondary',
  SecondaryDark = 'SecondaryDark',
  PrimaryDarkBlue = 'PrimaryDarkBlue',
  Outline = 'Outline',
  Disable = 'Disable',
  Default = 'Default',
}

export enum ButtonSize {
  Big = 'Big',
  Small = 'Small',
}

const Button = ({
  version,
  size = ButtonSize.Big,
  children,
  secondaryClassName,
  loading,
  ...props
}: ButtonProps) => {
  const buttonVersion = () => {
    switch (version) {
      case ButtonVersion.Secondary:
        return styles.secondary
      case ButtonVersion.SecondaryDark:
        return styles.secondaryDark
      case ButtonVersion.PrimaryDarkBlue:
        return styles.primaryDarkBlue
      case ButtonVersion.Outline:
        return styles.outline
      case ButtonVersion.Disable:
        return styles.disable
      case ButtonVersion.Default:
        return styles.default
      default:
        return styles.secondary
    }
  }

  const buttonSize = size === ButtonSize.Big ? styles.big : styles.small

  return (
    <button
      disabled={buttonVersion() === ButtonVersion.Disable}
      className={`${buttonVersion()} ${buttonSize} ${secondaryClassName}`}
      {...props}
    >
      {loading ? (
        <div className={`${styles.iconLoading} rotateAnimation`}>
          <IconLoading width={14} height={14} color="#FFFFFF" />
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
