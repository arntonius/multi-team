import React from 'react'
import { PropsIcon } from 'utils/types'

export const IconUpload: React.FC<PropsIcon> = ({
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
        d="M27.4 12.2932C27.8898 11.8067 27.8925 11.0153 27.4059 10.5255L20.526 3.59954C20.2914 3.36331 19.9722 3.23047 19.6392 3.23047C19.3063 3.23047 18.987 3.36331 18.7524 3.59954L11.8725 10.5255C11.386 11.0153 11.3886 11.8067 11.8784 12.2932C12.3682 12.7798 13.1596 12.7771 13.6462 12.2873L19.6392 6.25416L25.6323 12.2873C26.1188 12.7771 26.9103 12.7798 27.4 12.2932Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7215 5.79988C19.0312 5.79988 18.4715 6.35952 18.4715 7.04988V21.8832C18.4715 22.5736 19.0312 23.1332 19.7215 23.1332C20.4119 23.1332 20.9715 22.5736 20.9715 21.8832V7.04988C20.9715 6.35952 20.4119 5.79988 19.7215 5.79988Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 18.75C8.69036 18.75 9.25 19.3096 9.25 20V28.3333C9.25 30.4044 10.9289 32.0833 13 32.0833H25.6667C27.7377 32.0833 29.4167 30.4044 29.4167 28.3333V20C29.4167 19.3096 29.9763 18.75 30.6667 18.75C31.357 18.75 31.9167 19.3096 31.9167 20V28.3333C31.9167 31.7851 29.1184 34.5833 25.6667 34.5833H13C9.54821 34.5833 6.75 31.7851 6.75 28.3333V20C6.75 19.3096 7.30964 18.75 8 18.75Z"
        fill={color}
      />
    </svg>
  )
}
