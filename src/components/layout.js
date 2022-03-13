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
  justify-content: center;
  width: 70%;
  margin: auto;
`

const ScrollBar = styled(SimpleBar)`
  max-height: 87vh;
  overflowX: hidden;
  min-width: 45vw;
  max-width: 45vw;
`

const ScrollContainer = styled.div`
  width: 95%;
`

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div>
      <StyledMain>
        <Header title={title}/>
        <SplitLayout>
          <div className="global-wrapper" data-is-root-path={isRootPath}>
            <ScrollBar>
              <ScrollContainer>
                <main>{children}</main>
              </ScrollContainer>
              <footer>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.com">Gatsby</a>
              </footer>
            </ScrollBar>
          </div>
          <aside>
            <Bio />
          </aside>
        </SplitLayout>
      </StyledMain>
    </div>
  )
}

export default Layout
