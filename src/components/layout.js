import * as React from "react"
import Header from "../components/header"
import styled from "styled-components"
import Bio from "../components/bio"
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const StyledMain = styled.div`
  width: 100%;
  height: 99vh;
  background-color: #FAF9F6;
`
const SplitLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
`

const ScrollBar = styled(SimpleBar)`
  max-height: 87vh;
  overflowX: hidden;
  max-width: 1100px;
  flex: 95%;
`

const ScrollContainer = styled.div`
  width: 95%;
`

const Layout = ({ location, title, children }) => {


  return (
    <div>
      <StyledMain>
        <Header title={title}/>
        <SplitLayout>
            <ScrollBar>
              <ScrollContainer>
                {children}
              </ScrollContainer>
              <footer>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.com">Gatsby</a>
              </footer>
            </ScrollBar>
          <aside>
            <Bio />
          </aside>
        </SplitLayout>
      </StyledMain>
    </div>
  )
}

export default Layout
