/** components */
import CVcomponent from "../components/CVcomponent"

import React from "react"
import { graphql } from "gatsby"

const CV = ({ data: { cv } }) => {
  return <CVcomponent cv={cv}></CVcomponent>
}

export const query = graphql`
  {
    cv: markdownRemark(fileAbsolutePath: { regex: "/cv/" }) {
      html
    }
  }
`

export default CV
