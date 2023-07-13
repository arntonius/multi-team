import React from 'react'
import { PropsIcon } from 'utils/types'

export const IconCalculator: React.FC<PropsIcon> = ({
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
        d="M18.8663 7.26688L8.54499 7.26688C7.8372 7.26688 7.26686 7.83722 7.26686 8.54501V18.8667H18.8663V7.26688ZM5 20V8.54501C5 6.58801 6.588 5 8.54499 5H19.9997H19.9999H20H31.4549C33.4119 5 34.9999 6.58801 34.9999 8.54501V20H34.9998V20H34.9999V31.455C34.9999 33.412 33.4119 35 31.4549 35H20V34.9999H19.9999V35H8.54499C6.588 35 5 33.412 5 31.455V20.0001V20V20ZM18.8663 32.7331H8.54499C7.8372 32.7331 7.26686 32.1628 7.26686 31.455V21.1336H18.8663V32.733V32.7331ZM21.1332 7.26688V18.8667H32.7329H32.733V8.54501C32.733 7.83722 32.1627 7.26688 31.4549 7.26688H21.1332ZM21.1332 21.1336V32.733V32.7331H31.4549C32.1627 32.7331 32.733 32.1628 32.733 31.455V21.1336H32.7329H21.1332ZM24.8233 12.2348C24.1926 12.2348 23.6898 12.7376 23.6898 13.3682C23.6898 13.9988 24.1926 14.5016 24.8233 14.5016H29.6464C30.277 14.5016 30.7798 13.9988 30.7798 13.3682C30.7798 12.7376 30.277 12.2348 29.6464 12.2348H24.8233ZM24.8233 24.2926C24.1926 24.2926 23.6898 24.7955 23.6898 25.4261C23.6898 26.0567 24.1926 26.5595 24.8233 26.5595H29.6464C30.277 26.5595 30.7798 26.0567 30.7798 25.4261C30.7798 24.7955 30.277 24.2926 29.6464 24.2926H24.8233ZM24.8233 27.91C24.1926 27.91 23.6898 28.4128 23.6898 29.0435C23.6898 29.6741 24.1926 30.1769 24.8233 30.1769H29.6464C30.277 30.1769 30.7798 29.6741 30.7798 29.0435C30.7798 28.4128 30.277 27.91 29.6464 27.91H24.8233ZM15.1772 12.2348H13.8984V10.9567C13.8984 10.3261 13.3956 9.82326 12.765 9.82326C12.1344 9.82326 11.6316 10.3261 11.6316 10.9567V12.2348H10.3538C9.72312 12.2348 9.22032 12.7376 9.22032 13.3682C9.22032 13.9988 9.72312 14.5016 10.3538 14.5016H11.6316V15.7799C11.6316 16.4105 12.1344 16.9133 12.765 16.9133C13.3956 16.9133 13.8984 16.4105 13.8984 15.7799V14.5016H15.1772C15.8078 14.5016 16.3106 13.9988 16.3106 13.3682C16.3106 12.7376 15.8078 12.2348 15.1772 12.2348ZM12.7653 28.8291L13.7687 29.8324C13.9891 30.0699 14.2908 30.1768 14.574 30.1768C14.8558 30.1768 15.156 30.0709 15.3761 29.8359C15.8209 29.3979 15.8178 28.6763 15.3671 28.2422L14.3597 27.2347L15.3671 26.2273C15.8195 25.7916 15.8209 25.0664 15.3712 24.6288C14.9337 24.1792 14.2085 24.1806 13.7728 24.633L12.7653 25.6404L11.7579 24.633C11.3222 24.1806 10.597 24.1792 10.1595 24.6288C9.70982 25.0664 9.7112 25.7916 10.1636 26.2273L11.1687 27.2324L11.1675 27.2336L11.1698 27.2359L10.1636 28.2422C9.71284 28.6763 9.70984 29.3979 10.1546 29.8359C10.3747 30.0709 10.6749 30.1768 10.9567 30.1768C11.2398 30.1768 11.5416 30.0699 11.762 29.8324L12.7653 28.8291Z"
        fill={color}
      />
    </svg>
  )
}
