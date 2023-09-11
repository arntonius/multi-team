import styled, { css } from 'styled-components'

export const TextLargeRegularStyle = css`
  font-family: var(--open-sans);
  font-style: normal;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0px;
`

export const TextLargeRegular = styled.span`
  ${TextLargeRegularStyle};
`
