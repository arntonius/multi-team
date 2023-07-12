import React from 'react'
import { PropsIcon } from 'utils/types'

export const IconBrand: React.FC<PropsIcon> = ({
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
        d="M19.9747 30.2772C19.2366 30.2778 18.5203 30.0648 17.9097 29.6725L14.8431 34.8822C14.6527 35.2219 14.3742 35.5048 14.0365 35.7014C13.6987 35.898 13.3141 36.001 12.9226 35.9999H12.8026C12.3845 35.9766 11.9814 35.8371 11.6392 35.5973C11.297 35.3576 11.0295 35.0271 10.8671 34.6437L9.8919 32.3784L7.46131 32.6914C7.05043 32.7451 6.63265 32.6827 6.25583 32.5113C5.87902 32.34 5.55842 32.0667 5.33079 31.7227C5.1145 31.373 5 30.9707 5 30.5603C5 30.1499 5.1145 29.7475 5.33079 29.3978L9.64095 21.9912C9.62372 21.8534 9.58715 21.7183 9.53202 21.59C9.4493 21.3974 9.32664 21.2243 9.17206 21.0819L7.83673 19.7705C7.13421 19.064 6.74063 18.1107 6.74146 17.1177C6.73779 16.629 6.83133 16.1444 7.01671 15.6917C7.2021 15.2391 7.47567 14.8272 7.82173 14.4798L9.17206 13.1535C9.31111 13.0142 9.42113 12.8491 9.49579 12.6675C9.57046 12.4859 9.60831 12.2915 9.60716 12.0953V10.605C9.60122 10.1106 9.69364 9.61984 9.87911 9.16096C10.0646 8.70209 10.3395 8.28411 10.688 7.93101C11.0365 7.57792 11.4517 7.29666 11.9099 7.10338C12.3682 6.91011 12.8603 6.80861 13.3581 6.80472H14.8584C15.0559 6.80585 15.2516 6.76826 15.4344 6.6941C15.6172 6.61993 15.7835 6.51065 15.9237 6.37253L17.304 5.07595C18.0254 4.38567 18.9881 4 19.9897 4C20.9913 4 21.954 4.38567 22.6754 5.07595L23.9957 6.38743C24.1359 6.52556 24.3021 6.63483 24.4849 6.709C24.6677 6.78316 24.8635 6.82076 25.0609 6.81962H26.5613C27.5615 6.82357 28.5193 7.22098 29.2251 7.92487C29.9309 8.62875 30.3272 9.58175 30.3272 10.5752V12.0655C30.3261 12.2617 30.3639 12.4561 30.4386 12.6377C30.5133 12.8193 30.6233 12.9844 30.7623 13.1237L32.0977 14.45C32.7968 15.1554 33.1886 16.1055 33.1886 17.0953C33.1886 18.0852 32.7968 19.0353 32.0977 19.7407L30.7623 21.0521C30.6215 21.1932 30.5104 21.3607 30.4357 21.545C30.3901 21.6575 30.3586 21.7748 30.3417 21.8943L34.7079 29.3828C34.9121 29.7411 35.0128 30.1484 34.9988 30.5598C34.9848 30.9713 34.8566 31.3709 34.6285 31.7146C34.4004 32.0584 34.0812 32.3328 33.706 32.5078C33.3308 32.6828 32.9143 32.7515 32.5024 32.7062L30.0418 32.3933L29.0965 34.6437C28.9342 35.0271 28.6667 35.3575 28.3245 35.5973C27.9823 35.8371 27.5792 35.9765 27.1611 35.9998H27.026C26.6346 36.001 26.25 35.8979 25.9122 35.7013C25.5745 35.5047 25.2959 35.2219 25.1056 34.8821L22.0822 29.6839C21.8827 29.8106 21.6713 29.9187 21.4505 30.0067C20.9816 30.1935 20.4798 30.2855 19.9747 30.2772ZM15.9837 27.8778L16.2289 28.1213L13.0127 33.7644L12.0374 31.4992C11.8486 31.0605 11.5208 30.695 11.1037 30.4583C10.6867 30.2216 10.2032 30.1265 9.72686 30.1877L7.28127 30.5006L10.1624 25.5593C10.3255 25.8387 10.5256 26.0984 10.7596 26.3307C11.4649 27.0314 12.4205 27.4268 13.4181 27.4307H14.9185C15.117 27.4315 15.3133 27.4714 15.4962 27.5482C15.6791 27.6249 15.8448 27.737 15.9837 27.8778ZM11.8577 23.5708V22.6241C11.9429 22.4045 11.9567 22.1623 11.8946 21.9321C11.8822 21.8863 11.8669 21.8415 11.849 21.798C11.8216 21.4023 11.7304 21.0129 11.5784 20.6448C11.3904 20.1893 11.113 19.7756 10.7624 19.4277L9.44212 18.1162C9.29855 17.9764 9.18472 17.8094 9.1074 17.6251C9.03008 17.4408 8.99084 17.2429 8.99201 17.0432C8.99284 16.846 9.03305 16.651 9.11031 16.4693C9.18757 16.2877 9.30036 16.1231 9.44212 15.9851L10.7624 14.6587C11.1112 14.3125 11.3876 13.9012 11.5755 13.4485C11.7635 12.9958 11.8594 12.5105 11.8577 12.0208V10.5305C11.8577 10.1353 12.0158 9.75619 12.2972 9.4767C12.5785 9.19721 12.9602 9.04019 13.3581 9.04019H14.8584C15.3515 9.04188 15.84 8.94662 16.2957 8.7599C16.7515 8.57318 17.1656 8.29869 17.5141 7.95226L18.8344 6.64078C18.9744 6.49655 19.1422 6.38182 19.3278 6.30346C19.5134 6.2251 19.713 6.18471 19.9147 6.18471C20.1164 6.18471 20.316 6.2251 20.5016 6.30346C20.6872 6.38182 20.855 6.49655 20.9949 6.64078L22.3153 7.95226C22.6638 8.29869 23.0778 8.57318 23.5336 8.7599C23.9894 8.94662 24.4779 9.04188 24.9709 9.04019H26.4713C26.8692 9.04019 27.2508 9.19721 27.5322 9.4767C27.8136 9.75619 27.9716 10.1353 27.9716 10.5305V12.0208C27.9699 12.5105 28.0658 12.9958 28.2538 13.4485C28.4418 13.9012 28.7181 14.3125 29.0669 14.6587L30.4022 15.9851C30.5451 16.1239 30.6587 16.2896 30.7362 16.4726C30.8137 16.6556 30.8537 16.8521 30.8537 17.0506C30.8537 17.2492 30.8137 17.4457 30.7362 17.6287C30.6587 17.8117 30.5451 17.9774 30.4022 18.1162L29.0669 19.4277C28.7163 19.7756 28.439 20.1893 28.2509 20.6448C28.0629 21.1002 27.968 21.5882 27.9716 22.0805V23.5708C27.9716 23.966 27.8136 24.3451 27.5322 24.6246C27.2508 24.9041 26.8692 25.0611 26.4713 25.0611H24.9709C24.4765 25.0588 23.9866 25.1553 23.5304 25.3448C23.0742 25.5342 22.661 25.8128 22.3153 26.1639L20.9949 27.4754C20.7027 27.7489 20.3162 27.9012 19.9147 27.9012C19.5131 27.9012 19.1267 27.7489 18.8344 27.4754L17.5141 26.1639C17.1684 25.8128 16.7552 25.5342 16.299 25.3448C15.8428 25.1553 15.3529 25.0588 14.8584 25.0611H13.3581C12.9602 25.0611 12.5785 24.9041 12.2972 24.6246C12.0158 24.3451 11.8577 23.966 11.8577 23.5708ZM29.2571 26.2939C29.4886 26.0575 29.6871 25.7924 29.8482 25.5058L32.7574 30.4857L30.2968 30.1876C29.8211 30.1314 29.3397 30.2285 28.9237 30.4646C28.5077 30.7008 28.1791 31.0634 27.9863 31.4991L27.056 33.7644L23.7763 28.1255L24.0257 27.8778C24.1646 27.737 24.3303 27.6249 24.5132 27.5482C24.6961 27.4714 24.8924 27.4315 25.0909 27.4307H26.5913C27.0891 27.4249 27.5809 27.3214 28.0383 27.1264C28.4958 26.9313 28.91 26.6484 29.2571 26.2939ZM18.1741 20.2773C18.3921 20.4852 18.682 20.6025 18.9843 20.6052C19.2819 20.6018 19.5668 20.4843 19.7794 20.2773L24.7907 15.2997C25.0014 15.0901 25.1198 14.806 25.1198 14.5098C25.1198 14.2136 25.0014 13.9295 24.7907 13.7199C24.5753 13.5132 24.2875 13.3977 23.988 13.3977C23.6885 13.3977 23.4007 13.5132 23.1853 13.7199L18.9843 17.9077L17.2888 16.2088C17.0734 16.0021 16.7856 15.8865 16.4861 15.8865C16.1866 15.8865 15.8988 16.0021 15.6834 16.2088C15.4727 16.4183 15.3544 16.7024 15.3544 16.9986C15.3544 17.2948 15.4727 17.5789 15.6834 17.7885L18.1741 20.2773Z"
        fill={color}
      />
    </svg>
  )
}
