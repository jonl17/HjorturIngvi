import React from "react"
import { graphql, StaticQuery } from "gatsby"

/* components */
import { Container, Text, Anchor, Underline } from "./Styled"

const Sidebar = ({
  data: {
    site: {
      siteMetadata: { pages, title },
    },
  },
}) => {
  return (
    <Container>
      {pages.map((item, index) =>
        item.position === `sidebar` ? (
          <Text key={index}>
            <Anchor activeClassName="selected" className="bold" to={item.slug}>
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
            title
            pages {
              name
              slug
              position
            }
          }
        }
      }
    `}
    render={data => <Sidebar data={data} {...props}></Sidebar>}
  ></StaticQuery>
)
