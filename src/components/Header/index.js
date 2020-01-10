import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector } from "react-redux"

/* components */
import { Container, Anchor } from "./Styled"

const Header = ({
  data: {
    site: {
      siteMetadata: { pages, title },
    },
  },
}) => {
  const device = useSelector(state => state.reducer.device)
  return (
    <>
      <Container columns={pages.length} device={device}>
        {pages.map((item, index) => (
          <Anchor
            key={index}
            device={device}
            activeClassName="selected"
            to={item.slug}
          >
            {item.name}
          </Anchor>
        ))}
      </Container>
    </>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            pages {
              name
              slug
            }
          }
        }
      }
    `}
    render={data => <Header data={data} {...props}></Header>}
  ></StaticQuery>
)
