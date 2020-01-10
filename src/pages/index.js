import React from "react"
import { graphql } from "gatsby"

/** components */
import About from "../components/About"

// about page | frontpage
export default ({ data: { markdownRemark: aboutContent } }) => {
  return <About aboutContent={aboutContent}></About>
}

export const query = graphql`
  {
    markdownRemark(fileAbsolutePath: { regex: "/static/about/" }) {
      html
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
`
