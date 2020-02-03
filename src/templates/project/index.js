import React from "react"
import { graphql } from "gatsby"

/** components */
import { Container, Content, Title } from "./Styled"

const Project = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title },
    },
  },
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Content dangerouslySetInnerHTML={{ __html: html }}></Content>
    </Container>
  )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Project
