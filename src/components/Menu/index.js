import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { graphql, StaticQuery } from "gatsby"
import { triggerBurgerWindow } from "../../state/action"

/* components */
import { Container, Item, Anchor, ItemContainer, ArrowImage } from "./Styled"
import Arrow from "../../../static/assets/images/arrow.png"

const isActive = ({ isCurrent }) => {
  return isCurrent ? { id: "selected" } : null
}

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
        <ItemContainer>
          <Item>
            <Anchor
              getProps={isActive}
              onClick={() => dispatch(triggerBurgerWindow("closed"))}
              to={page.slug}
            >
              {page.name}
              <ArrowImage src={Arrow}></ArrowImage>
            </Anchor>
          </Item>
        </ItemContainer>
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
