/* components */
import { Anchor, Text } from "./Styled"

/* tech */
import React from "react"
import { graphql, StaticQuery } from "gatsby"

const Socialmedialinks = ({
  data: {
    site: {
      siteMetadata: { socialMedia },
    },
  },
}) => {
  return socialMedia.map((item, index) => (
    <Anchor key={index} target="_blank" href={item.link}>
      <Text className="bold">{item.name}</Text>
    </Anchor>
  ))
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            socialMedia {
              name
              link
            }
          }
        }
      }
    `}
    render={data => (
      <Socialmedialinks data={data} {...props}></Socialmedialinks>
    )}
  ></StaticQuery>
)
