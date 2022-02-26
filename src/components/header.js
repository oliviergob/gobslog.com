import * as React from "react"
import { Link } from "gatsby"

import styled from "styled-components"


const StyledHeader = styled.div`
  margin: 1px 0px;
  padding: 4px 6%;
  width: 100%;
  box-shadow: 1px 1px #EAE7E0;
  background-color: #fffefd;
`


const Header = (props) => {
  return (
    <StyledHeader >
      <h1 className="main-heading">
        <Link to="/">{props.title}</Link>
      </h1>
    </StyledHeader>
  )

}

export default Header