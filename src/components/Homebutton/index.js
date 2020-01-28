import React from "react"
import { graphql, StaticQuery } from "gatsby"

/* components */
import { Container, Anchor, Text } from "./Styled"

const Homebutton = ({
  pathname,
  data: {
    site: {
      siteMetadata: { title, subtitle },
    },
  },
}) => {
  console.log(pathname)
  return (
    <Container home={pathname === "/"}>
      <Anchor to="/" className="bold">
        <Text className="bold">{title}</Text>
        <Text subtitle>{subtitle}</Text>
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
            subtitle
          }
        }
      }
    `}
    render={data => <Homebutton data={data} {...props}></Homebutton>}
  ></StaticQuery>
)
