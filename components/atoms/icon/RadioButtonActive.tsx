import React from 'react'
import { PropsIcon } from '../../../utils/types'

export const IconRadioButtonActive: React.FC<PropsIcon> = ({
  width,
  height,
  color = '#05256E',
}): JSX.Element => {
  return (
    <svg
      width={width}
      viewBox="0 0 25 24"
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1298_876)">
        <path
          d="M12.5 7C9.74 7 7.5 9.24 7.5 12C7.5 14.76 9.74 17 12.5 17C15.26 17 17.5 14.76 17.5 12C17.5 9.24 15.26 7 12.5 7ZM12.5 2C6.98 2 2.5 6.48 2.5 12C2.5 17.52 6.98 22 12.5 22C18.02 22 22.5 17.52 22.5 12C22.5 6.48 18.02 2 12.5 2ZM12.5 20C8.08 20 4.5 16.42 4.5 12C4.5 7.58 8.08 4 12.5 4C16.92 4 20.5 7.58 20.5 12C20.5 16.42 16.92 20 12.5 20Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1298_876">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
