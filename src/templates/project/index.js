/** components */
import { Container, Title } from "./Styled"
import Head from "./components/Head"
import Content from "../../components/Content"

/** tech */
import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { useSelector } from "react-redux"

// COMPLEX COMPONENT THAT NEEDS CLEANING

const Project = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, title_en },
    },
  },
}) => {
  const icelandic = useSelector(state => state.reducer.icelandic)
  return (
    <Container>
      <Head title={"Projects"} slug={"/projects/"}></Head>
      <Title className="bold">
        {!icelandic && title_en ? title_en : title}
      </Title>
      <Content html={html}></Content>
    </Container>
  )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        title_en
      }
    }
  }
`

export default Project
