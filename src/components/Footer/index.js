import React from "react"
import { graphql, StaticQuery } from "gatsby"

/* components */
import { Container, Anchor, Text, Circle } from "./Styled"

const Footer = ({
  data: {
    site: {
      siteMetadata: { socialMedia },
    },
  },
}) => {
  return (
    <Container>
      {socialMedia.map((item, index) => (
        <Anchor key={index} target="_blank" href={item.link}>
          <Circle></Circle>
          <Text className="bold">{item.name}</Text>
        </Anchor>
      ))}
    </Container>
  )
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
    render={data => <Footer data={data} {...props}></Footer>}
  ></StaticQuery>
)
