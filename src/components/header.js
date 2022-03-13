import * as React from "react"
import { Link } from "gatsby"

import styled from "styled-components"


const StyledHeader = styled.div`
  margin: 5px 0px;
  padding: 4px 8%;
  width: 100%;
  
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