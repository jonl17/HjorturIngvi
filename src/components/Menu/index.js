import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { graphql, StaticQuery } from "gatsby"
import { triggerBurgerWindow } from "../../state/action"

/* components */
import { Container, Item, Anchor } from "./Styled"

const Menu = ({
  data: {
    site: {
      siteMetadata: { pages },
    },
  },
}) => {
  const burgerWindow = useSelector(state => state.reducer.burgerWindow)
  const dispatch = useDispatch()
  return (
    <Container status={burgerWindow}>
      {pages.map(page => (
        <Item>
          <Anchor
            activeStyle={{ color: "white" }}
            onClick={() => dispatch(triggerBurgerWindow("closed"))}
            to={page.slug}
          >
            {page.name}
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
            pages {
              name
              slug
            }
          }
        }
      }
    `}
    render={data => <Menu data={data} {...props}></Menu>}
  ></StaticQuery>
)
