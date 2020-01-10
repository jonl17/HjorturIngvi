import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import { triggerBurgerWindow } from "../../state/action"

/* components */
import { Container, Item, Anchor } from "./Styled"

const Burgermenu = ({
  data: {
    site: {
      siteMetadata: { mobilePages },
    },
  },
}) => {
  const burgerWindow = useSelector(state => state.reducer.burgerWindow)
  const device = useSelector(state => state.reducer.device)
  const dispatch = useDispatch()
  return (
    <Container height={burgerWindow === "open" ? "100vh" : "0vh"}>
      {mobilePages.map((item, index) => (
        <Item head={index === 0 ? true : false} device={device} key={index}>
          <Anchor
            className="bold"
            onClick={() => dispatch(triggerBurgerWindow("closed"))}
            activeClassName="selected"
            to={item.slug}
          >
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
            mobilePages {
              name
              slug
            }
          }
        }
      }
    `}
    render={data => <Burgermenu data={data} {...props}></Burgermenu>}
  ></StaticQuery>
)
