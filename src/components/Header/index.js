import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector } from "react-redux"

/* components */
import { Container, Anchor, Name, BlackKey } from "./Styled"

const isActive = ({ isCurrent }) => {
  console.log(isCurrent)
  return isCurrent ? { id: "selected" } : null
}

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
      <Name>{title}</Name>
      <Container columns={pages.length} device={device}>
        {pages.map((item, index) => (
          <Anchor
            getProps={isActive}
            key={index}
            device={device}
            to={item.slug}
          >
            {item.name}
            <BlackKey></BlackKey>
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
