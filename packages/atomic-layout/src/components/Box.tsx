import * as React from 'react'
import styled from 'styled-components'
import { BoxProps, applyStyles } from '@atomic-layout/core'

const Box: React.FC<BoxProps> = styled.div<BoxProps>`
  display: ${({ flex, inline }) =>
    flex
      ? inline
        ? 'inline-flex'
        : 'flex'
      : inline
      ? 'inline-block'
      : 'block'};

  && {
    ${applyStyles};
  }
`

export default Box
