import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector } from "react-redux"

/* components */
import { Container, Image } from "./Styled"

const ProfilePicture = ({
  data: {
    markdownRemark: {
      frontmatter: {
        forsidu_mynd: {
          childImageSharp: { fluid: profile_pic },
        },
        second_image: {
          childImageSharp: { fluid: concert_pic },
        },
      },
    },
  },
}) => {
  const currentPage = useSelector(state => state.reducer.currentPage)
  return (
    <Container>
      <Image
        fluid={
          currentPage === "/" ||
          currentPage === "/about" ||
          currentPage === undefined
            ? profile_pic
            : concert_pic
        }
      ></Image>
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
            second_image {
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
