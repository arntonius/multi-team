import styled from 'styled-components'
import React, { HTMLAttributes } from 'react'
import { colors } from 'styles/colors'

interface Props extends HTMLAttributes<HTMLDivElement> {
  width?: string
}

const defaultWidth = 0.88

export const ModalBody = ({
  width = `${defaultWidth * 100}%`,
  children,
}: Props) => {
  return <ModalBodyWrapper width={width}>{children}</ModalBodyWrapper>
}

export const ModalBodyCarNotAvailable = ({
  width = `${defaultWidth * 100}%`,
  children,
}: Props) => {
  return (
    <ModalBodyWrapperCarNotAvailable width={width}>
      <>{children}</>
    </ModalBodyWrapperCarNotAvailable>
  )
}

const ModalBodyWrapper = styled.div<{ width: string }>`
  min-height: 480px;
  width: ${({ width }) => width};
  max-width: calc(100% * ${defaultWidth});
  margin: auto;
  background: ${colors.offWhite};
  box-shadow: 0 32px 64px rgba(17, 17, 17, 0.08);
  border-radius: 15px;
  align-self: center;
  @media (max-width: 780px) {
    height: 600px;
  }
  @media (max-width: 480px) {
    height: auto;
  }
`
const ModalBodyWrapperCarNotAvailable = styled.div<{ width: string }>`
  min-height: 400px;
  width: ${({ width }) => width};
  max-width: calc(100% * ${defaultWidth});
  margin: auto;
  background: ${colors.offWhite};
  box-shadow: 0 32px 64px rgba(17, 17, 17, 0.08);
  border-radius: 15px;
  align-self: center;
  @media (max-width: 780px) {
    min-height: 320px;
  }
  @media (max-width: 480px) {
    height: auto;
  }
`
