import React from 'react'
import { PropsIcon } from '../../../utils/types'

export const IconCompare: React.FC<PropsIcon> = ({
  width,
  height,
  color = '#05256E',
}): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 5.00171C20.6904 5.00171 21.25 5.56135 21.25 6.25171L21.25 33.7744C21.25 34.4648 20.6904 35.0244 20 35.0244C19.3096 35.0244 18.75 34.4648 18.75 33.7744L18.75 6.25171C18.75 5.56135 19.3096 5.00171 20 5.00171Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.75 12C7.75 9.65279 9.65279 7.75 12 7.75H22C22.6904 7.75 23.25 8.30964 23.25 9C23.25 9.69036 22.6904 10.25 22 10.25H12C11.0335 10.25 10.25 11.0335 10.25 12V28.5C10.25 29.4665 11.0335 30.25 12 30.25H22C22.6904 30.25 23.25 30.8096 23.25 31.5C23.25 32.1904 22.6904 32.75 22 32.75H12C9.65279 32.75 7.75 30.8472 7.75 28.5V12Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.75 12C32.75 9.65279 30.8472 7.75 28.5 7.75H27C26.3096 7.75 25.75 8.30964 25.75 9C25.75 9.69036 26.3096 10.25 27 10.25H28.5C29.4665 10.25 30.25 11.0335 30.25 12V14C30.25 14.6904 30.8096 15.25 31.5 15.25C32.1904 15.25 32.75 14.6904 32.75 14V12Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.75 28.5C32.75 30.8472 30.8472 32.75 28.5 32.75H27C26.3096 32.75 25.75 32.1904 25.75 31.5C25.75 30.8096 26.3096 30.25 27 30.25H28.5C29.4665 30.25 30.25 29.4665 30.25 28.5V26.5C30.25 25.8096 30.8096 25.25 31.5 25.25C32.1904 25.25 32.75 25.8096 32.75 26.5V28.5Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.5 17.25C32.1904 17.25 32.75 17.8096 32.75 18.5V21.5C32.75 22.1904 32.1904 22.75 31.5 22.75C30.8096 22.75 30.25 22.1904 30.25 21.5V18.5C30.25 17.8096 30.8096 17.25 31.5 17.25Z"
        fill={color}
      />
    </svg>
  )
}
