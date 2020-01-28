import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector } from "react-redux"

/* components */
import { Container, Content } from "./Styled"

const splitTextIntoLanguage = text => {
  return text.split("-ENSKA-")
}

const AboutComponent = ({
  data: {
    markdownRemark: { html },
  },
}) => {
  const bothLanguages = splitTextIntoLanguage(html)
  const icelandic = useSelector(state => state.reducer.icelandic)
  return (
    <Container>
      <Content
        dangerouslySetInnerHTML={{
          __html: icelandic ? bothLanguages[0] : bothLanguages[1],
        }}
      ></Content>
    </Container>
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
