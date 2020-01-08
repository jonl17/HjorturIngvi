import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector } from "react-redux"

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
  return (
    <Container height={burgerWindow === "open" ? "100%" : "0%"}>
      {mobilePages.map((item, index) => (
        <Item device={device} key={index}>
          <Anchor to={item.slug}>{item.name}</Anchor>
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
