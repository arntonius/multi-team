import React from 'react'
import { PropsIcon } from 'utils/types'

export const IconDimension: React.FC<PropsIcon> = ({
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
        d="M19.9999 8.75003C20.4141 8.75003 20.7499 9.08581 20.7499 9.50003V13C20.7499 13.4142 20.4141 13.75 19.9999 13.75C19.5857 13.75 19.2499 13.4142 19.2499 13V9.50003C19.2499 9.08581 19.5857 8.75003 19.9999 8.75003Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.4999 20.2484V27.9281L18.9999 31.7516V24.072L12.4999 20.2484ZM10.4999 19.3742C10.4999 18.2141 11.7605 17.4931 12.7604 18.0813L20.2604 22.4931C20.7186 22.7626 20.9999 23.2545 20.9999 23.786V32.6258C20.9999 33.7859 19.7393 34.5069 18.7394 33.9187L11.2394 29.507C10.7812 29.2375 10.4999 28.7456 10.4999 28.2141V19.3742Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.2394 18.0813C28.2393 17.4931 29.4999 18.2141 29.4999 19.3742V28.2141C29.4999 28.7456 29.2186 29.2375 28.7604 29.507L21.2604 33.9187C20.2605 34.5069 18.9999 33.7859 18.9999 32.6258V23.786C18.9999 23.2545 19.2812 22.7626 19.7394 22.4931L27.2394 18.0813ZM27.4999 20.2484L20.9999 24.072V31.7516L27.4999 27.9281V20.2484Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.9999 14.6602L13.4722 18.5L19.9999 22.3398L26.5276 18.5L19.9999 14.6602ZM19.2394 12.7872C19.7088 12.5111 20.291 12.5111 20.7604 12.7872L28.2743 17.2071C29.2602 17.7871 29.2602 19.213 28.2743 19.7929L20.7604 24.2128C20.291 24.489 19.7088 24.489 19.2394 24.2128L11.7255 19.7929C10.7396 19.213 10.7396 17.7871 11.7255 17.2071L19.2394 12.7872Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1511 28.1279C12.3566 28.4876 12.2317 28.9457 11.872 29.1512L8.37202 31.1512C8.01238 31.3567 7.55424 31.2318 7.34873 30.8721C7.14322 30.5125 7.26817 30.0544 7.62781 29.8488L11.1278 27.8488C11.4874 27.6433 11.9456 27.7683 12.1511 28.1279ZM27.8487 28.1279C28.0542 27.7683 28.5124 27.6433 28.872 27.8488L32.372 29.8488C32.7317 30.0544 32.8566 30.5125 32.6511 30.8721C32.4456 31.2318 31.9874 31.3567 31.6278 31.1512L28.1278 29.1512C27.7682 28.9457 27.6432 28.4876 27.8487 28.1279Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.0732 6.4405C19.5438 5.87583 20.3976 5.8371 20.9174 6.35685L22.6767 8.11614C23.4641 8.9036 22.9064 10.25 21.7928 10.25H18.5674C17.5076 10.25 16.9287 9.01396 17.6072 8.1998L19.0732 6.4405ZM20.0503 7.61109L19.1012 8.75003H21.1893L20.0503 7.61109Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.47954 28.9892C5.74964 27.9088 7.19113 27.6943 7.76408 28.6492L9.52198 31.5791C10.0949 32.534 9.22733 33.705 8.14695 33.4349L5.80308 32.8489C5.13334 32.6815 4.72614 32.0028 4.89357 31.3331L5.47954 28.9892ZM6.78837 29.9385L6.40942 31.4543L7.92522 31.8333L6.78837 29.9385ZM33.2115 29.9385L32.0746 31.8333L33.5904 31.4543L33.2115 29.9385ZM32.2357 28.6492C32.8087 27.6943 34.2502 27.9088 34.5203 28.9892L35.1063 31.3331C35.2737 32.0028 34.8665 32.6815 34.1967 32.8489L31.8529 33.4349C30.7725 33.705 29.9049 32.534 30.4778 31.5791L32.2357 28.6492Z"
        fill={color}
      />
    </svg>
  )
}
