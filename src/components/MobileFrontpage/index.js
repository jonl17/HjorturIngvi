/* components */
import { Image } from "./Styled"

/** tech */
import React from "react"
import { useSelector } from "react-redux"
import { StaticQuery, graphql } from "gatsby"

const MobileFrontpage = ({
  data: {
    about: {
      frontmatter: {
        forsidu_mynd: {
          childImageSharp: { fluid: featured_image_fluid },
        },
      },
    },
  },
}) => {
  const device = useSelector(state => state.reducer.device)
  return device !== `browser` ? (
    <Image
      imgStyle={{ width: "70%", right: 0, left: "auto" }}
      fluid={featured_image_fluid}
    ></Image>
  ) : (
    <></>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        about: markdownRemark(fileAbsolutePath: { regex: "/about/" }) {
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
    render={data => <MobileFrontpage data={data} {...props}></MobileFrontpage>}
  ></StaticQuery>
)
