import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector, useDispatch } from "react-redux"

/* components */
import { Container, Item, Anchor } from "./Styled"

const Header = ({
  data: {
    site: {
      siteMetadata: { pages, title },
    },
  },
}) => {
  const device = useSelector(state => state.reducer.device)
  return (
    <Container device={device}>
      {pages.map((item, index) => (
        <Item device={device} home={item.name === title} key={index}>
          <Anchor device={device} activeClassName="selected" to={item.slug}>
            {item.name}
          </Anchor>
        </Item>
      ))}
    </Container>
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
