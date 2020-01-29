import React from "react"
import { graphql, StaticQuery } from "gatsby"

/* components */
import { Container, Image } from "./Styled"

const ProfilePicture = ({
  data: {
    markdownRemark: {
      frontmatter: {
        forsidu_mynd: {
          childImageSharp: { fluid },
        },
      },
    },
  },
}) => {
  return (
    <Container>
      <Image fluid={fluid}></Image>
    </Container>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        markdownRemark(frontmatter: { title: { eq: "About" } }) {
          frontmatter {
            forsidu_mynd {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => <ProfilePicture data={data} {...props}></ProfilePicture>}
  ></StaticQuery>
)
