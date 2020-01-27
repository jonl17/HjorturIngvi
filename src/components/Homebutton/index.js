import React from "react"
import { graphql, StaticQuery } from "gatsby"

/* components */
import { Container, Anchor } from "./Styled"

const Homebutton = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  return (
    <Container>
      <Anchor to="/" className="bold">
        {title}
      </Anchor>
    </Container>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <Homebutton data={data} {...props}></Homebutton>}
  ></StaticQuery>
)
