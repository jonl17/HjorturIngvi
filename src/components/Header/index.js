import React from "react"
import { graphql, StaticQuery } from "gatsby"

/* components */
import { Container, Text, Anchor, Underline } from "./Styled"

const Header = ({
  data: {
    site: {
      siteMetadata: { pages },
    },
  },
}) => {
  return (
    <Container>
      {pages.map((item, index) =>
        item.position === `header` ? (
          <Text key={index}>
            <Anchor className="bold" activeClassName="selected" to={item.slug}>
              <Underline></Underline>
              {item.name}
            </Anchor>
          </Text>
        ) : (
          ""
        )
      )}
    </Container>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            pages {
              name
              slug
              position
            }
          }
        }
      }
    `}
    render={data => <Header data={data} {...props}></Header>}
  ></StaticQuery>
)
