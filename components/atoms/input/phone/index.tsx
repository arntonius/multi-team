import React, { useState } from 'react'
import styles from '../../../../styles/saas/components/atoms/inputPhone.module.scss'
import { PropsInput } from 'utils/types'
import { Separator } from '../../separator'

const InputPhone = ({
  value,
  placeholder,
  onChange,
  isError,
  message,
  disabled,
  title,
  dataTestId,
  className,
  ...props
}: PropsInput): JSX.Element => {
  const [isFocus, setIsFocus] = useState(false)
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {title && <p className={styles.titleText}>{title}</p>}
      <div
        className={`${styles.wrapperInput} ${
          isFocus ? styles.focus : styles.default
        } ${isError && styles.error} ${disabled && styles.disabled}`}
      >
        <p className={`${styles.textRegion} ${disabled && styles.disabled} `}>
          +62
        </p>
        <Separator width={1} height={16} />
        <input
          type={'tel'}
          data-test-id={dataTestId}
          value={value}
          maxLength={13}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className={`${styles.input} ${disabled && styles.disabled} `}
          placeholder={placeholder}
          {...props}
        />
      </div>

      {isError && <p className={styles.errorText}>{message}</p>}
    </div>
  )
}

export default InputPhone
