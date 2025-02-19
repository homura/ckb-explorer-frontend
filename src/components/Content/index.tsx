import { ReactNode } from 'react'
import styled from 'styled-components'

const ContentPanel = styled.div`
  width: 100%;
  overflow-x: hidden;
  flex: 1;
  background: #ededed;
`
export default ({ children, style }: { children: ReactNode; style?: any }) => {
  return <ContentPanel style={style}>{children}</ContentPanel>
}
