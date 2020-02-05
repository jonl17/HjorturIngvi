import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useDispatch } from "react-redux"

/* components */
import { Container, Anchor, Text, Subtitle } from "./Styled"
import { SET_CURRENT_PAGE } from "../../state/action"

const Homebutton = ({
  pathname,
  data: {
    site: {
      siteMetadata: { title, subtitle },
    },
  },
}) => {
  const dispatch = useDispatch()
  dispatch({ type: SET_CURRENT_PAGE, page: pathname })
  return (
    <Container home={pathname === "/"}>
      <Anchor to="/" className="bold">
        <Text className="bold">{title}</Text>
        <Subtitle>{subtitle}</Subtitle>
      </Anchor>
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
            subtitle
          }
        }
      }
    `}
    render={data => <Homebutton data={data} {...props}></Homebutton>}
  ></StaticQuery>
)
