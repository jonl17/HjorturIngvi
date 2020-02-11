import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useDispatch } from "react-redux"
import { TRIGGER_MOBILE_MENU } from "../../../../state/action"

/** components */
import { Container, Text, Anchor, List, SocialMediaContainer } from "./Styled"
import LanguageButton from "../../../LanguageButton"
import SocialMediaLinks from "../../../SocialMediaLinks"

const Items = ({
  data: {
    site: {
      siteMetadata: { pages },
    },
  },
}) => {
  const dispatch = useDispatch()
  return (
    <Container>
      <List>
        {pages.map((page, index) => (
          <Text key={index}>
            {page.type !== `button` ? (
              <Anchor
                onClick={() =>
                  dispatch({ type: TRIGGER_MOBILE_MENU, trigger: `closed` })
                }
                activeStyle={{ color: "white" }}
                partiallyActive={true}
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
        <SocialMediaContainer>
          <SocialMediaLinks></SocialMediaLinks>
        </SocialMediaContainer>
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
