import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useDispatch } from "react-redux"
import { TRIGGER_MOBILE_MENU } from "../../../../state/action"

/** components */
import { Container, Text, Anchor, List, Title, Subtitle } from "./Styled"
import LanguageButton from "../../../LanguageButton"

const Items = ({
  data: {
    site: {
      siteMetadata: { pages, title, subtitle },
    },
  },
}) => {
  const dispatch = useDispatch()
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <List>
        {pages.map((page, index) => (
          <Text key={index}>
            {page.type !== `button` ? (
              <Anchor
                onClick={() =>
                  dispatch({ type: TRIGGER_MOBILE_MENU, trigger: `closed` })
                }
                activeStyle={{ color: "white" }}
                className="bold"
                to={page.slug}
              >
                {page.name}
              </Anchor>
            ) : (
              <LanguageButton name={page.name}></LanguageButton>
            )}
          </Text>
        ))}
      </List>
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
            pages {
              name
              slug
              type
            }
          }
        }
      }
    `}
    render={data => <Items data={data} {...props}></Items>}
  ></StaticQuery>
)
