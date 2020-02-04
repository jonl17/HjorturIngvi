import React from "react"
import { graphql, StaticQuery } from "gatsby"

/* components */
import { Container, Text, Anchor, Underline } from "./Styled"
import LanguageButton from "../LanguageButton"

const Sidebar = ({
  data: {
    site: {
      siteMetadata: { pages },
    },
  },
}) => {
  return (
    <Container>
      {pages.map((item, index) =>
        item.position === `sidebar` ? (
          <Text key={index}>
            {item.type !== `button` ? (
              <Anchor
                partiallyActive={true}
                activeClassName="selected"
                className="bold"
                to={item.slug}
              >
                <Underline></Underline>
                {item.name}
              </Anchor>
            ) : (
              <LanguageButton name={item.name}></LanguageButton>
            )}
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
              type
            }
          }
        }
      }
    `}
    render={data => <Sidebar data={data} {...props}></Sidebar>}
  ></StaticQuery>
)
