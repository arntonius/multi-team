import React from 'react'
import { PropsIcon } from 'utils/types'

export const IconPromo: React.FC<PropsIcon> = ({
  width = 40,
  height = 40,
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
        d="M4.93558 8.3024C5.22089 6.37917 6.77492 4.89478 8.70921 4.6979L18.0254 3.74966C19.3302 3.61685 20.6232 4.09388 21.529 5.04227L33.9952 18.0934C35.6165 19.7907 35.5548 22.481 33.8575 24.1022L23.1671 34.3134C21.4698 35.9347 18.7796 35.873 17.1583 34.1757L4.69213 21.1245C3.78625 20.1762 3.36897 18.8627 3.56143 17.5653L4.93558 8.3024ZM8.96236 7.18505C8.16589 7.26612 7.52599 7.87733 7.40851 8.66925L6.03436 17.9322C5.95512 18.4664 6.12694 19.0072 6.49995 19.3978L18.9661 32.4489C19.6337 33.1478 20.7414 33.1732 21.4403 32.5056L32.1307 22.2944C32.8296 21.6268 32.855 20.5191 32.1874 19.8202L19.7212 6.76906C19.3482 6.37855 18.8158 6.18212 18.2785 6.23681L8.96236 7.18505Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0817 10.7194C18.7983 12.5166 18.733 15.3651 16.9358 17.0817C15.1386 18.7984 12.2901 18.7331 10.5735 16.9359C8.85689 15.1387 8.92219 12.2902 10.7194 10.5736C12.5165 8.85697 15.365 8.92227 17.0817 10.7194ZM15.209 15.2739C16.0078 14.511 16.0368 13.245 15.2738 12.4462C14.5109 11.6475 13.2449 11.6185 12.4462 12.3814C11.6474 13.1444 11.6184 14.4103 12.3813 15.2091C13.1443 16.0078 14.4103 16.0369 15.209 15.2739Z"
        fill={color}
      />
    </svg>
  )
}
