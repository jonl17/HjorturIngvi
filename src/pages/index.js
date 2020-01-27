import React from "react"
import { graphql } from "gatsby"

/** components */
import Frontpage from "../components/Frontpage"

const index = ({
  data: {
    site: {
      siteMetadata: { title, subtitle },
    },
  },
}) => {
  return <Frontpage title={title} subtitle={subtitle}></Frontpage>
}

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`

export default index
