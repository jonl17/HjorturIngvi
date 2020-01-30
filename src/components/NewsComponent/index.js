import React from "react"
import { graphql, StaticQuery } from "gatsby"

/* components */
import { Container, Date, Title, Content } from "./Styled"

const NewsComponent = ({
  data: {
    news: { nodes },
  },
}) => {
  return nodes.map((frett, index) => (
    <Container key={index}>
      <Date className="bold">{frett.frontmatter.date}</Date>
      <Title className="bold">{frett.frontmatter.title}</Title>
      <Content dangerouslySetInnerHTML={{ __html: frett.html }}></Content>
    </Container>
  ))
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        news: allMarkdownRemark(
          sort: { fields: frontmatter___date, order: DESC }
          filter: { fileAbsolutePath: { regex: "/news/" } }
        ) {
          nodes {
            html
            frontmatter {
              title
              date(formatString: "DD.MM.YYYY")
            }
          }
        }
      }
    `}
    render={data => <NewsComponent data={data} {...props}></NewsComponent>}
  ></StaticQuery>
)
