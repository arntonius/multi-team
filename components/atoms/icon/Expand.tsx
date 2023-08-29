import React from 'react'
import { PropsIcon } from '../../../utils/types'

export const IconExpand: React.FC<PropsIcon> = ({
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
        d="M20.2019 8.85901C20.2019 8.16788 20.7609 7.60761 21.4505 7.6076H31.1502C31.4814 7.6076 31.799 7.73945 32.0331 7.97413C32.2673 8.20882 32.3988 8.52712 32.3988 8.85901V18.5806C32.3988 19.2718 31.8398 19.832 31.1502 19.832C30.4607 19.832 29.9017 19.2718 29.9017 18.5806V10.1104L21.4505 10.1104C20.7609 10.1104 20.2019 9.55014 20.2019 8.85901Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.731 9.00695C31.2186 9.49566 31.2186 10.288 30.731 10.7767L22.9237 18.6016C22.4361 19.0903 21.6455 19.0903 21.1579 18.6016C20.6703 18.1129 20.6703 17.3205 21.1579 16.8318L28.9652 9.00695C29.4528 8.51825 30.2434 8.51825 30.731 9.00695Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7982 31.1398C19.7982 31.8309 19.2392 32.3912 18.5496 32.3912H8.84991C8.51876 32.3912 8.20118 32.2593 7.96702 32.0246C7.73287 31.79 7.60132 31.4717 7.60132 31.1398V21.4182C7.60132 20.727 8.16033 20.1668 8.84991 20.1668C9.53949 20.1668 10.0985 20.727 10.0985 21.4182L10.0985 29.8884L18.5496 29.8884C19.2392 29.8884 19.7982 30.4486 19.7982 31.1398Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.2718 30.6751C8.7842 30.1864 8.7842 29.394 9.2718 28.9053L17.0791 21.0805C17.5667 20.5917 18.3572 20.5917 18.8448 21.0805C19.3324 21.5692 19.3324 22.3615 18.8448 22.8502L11.0376 30.6751C10.55 31.1638 9.75941 31.1638 9.2718 30.6751Z"
        fill={color}
      />
    </svg>
  )
}
