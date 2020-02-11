import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector } from "react-redux"
import { splitTextIntoLanguage } from "../../methods"

/* components */
import { Content } from "./Styled"

const AboutComponent = ({
  data: {
    markdownRemark: { html },
  },
}) => {
  const bothLanguages = splitTextIntoLanguage(html)
  const icelandic = useSelector(state => state.reducer.icelandic)
  return (
    <Content
      dangerouslySetInnerHTML={{
        __html: icelandic ? bothLanguages[0] : bothLanguages[1],
      }}
    ></Content>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        markdownRemark(frontmatter: { title: { eq: "About" } }) {
          html
        }
      }
    `}
    render={data => <AboutComponent data={data} {...props}></AboutComponent>}
  ></StaticQuery>
)
