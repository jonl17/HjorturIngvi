/* components */
import { Container } from "./Styled"
import Item from "./components/Item"

/** tech */
import React from "react"
import { graphql, StaticQuery } from "gatsby"

const NewsComponent = ({
  data: {
    news: { nodes },
  },
}) => {
  return nodes.map((frett, index) => (
    <Container key={index}>
      <Item frett={frett}></Item>
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
              title_en
              date(formatString: "DD.MM.YYYY")
              image {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <NewsComponent data={data} {...props}></NewsComponent>}
  ></StaticQuery>
)
