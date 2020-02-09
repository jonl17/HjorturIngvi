/** components */
import { Title, Subtitle, Anchor, Box } from "./Styled"

/** tech */
import React from "react"
import { useDispatch } from "react-redux"
import { TRIGGER_MOBILE_MENU } from "../../../../../state/action"
import { StaticQuery, graphql } from "gatsby"

const HomeTitle = ({
  data: {
    site: {
      siteMetadata: { title, subtitle },
    },
  },
}) => {
  const dispatch = useDispatch()
  return (
    <Box>
      <Title>
        <Anchor
          onClick={() =>
            dispatch({ type: TRIGGER_MOBILE_MENU, trigger: `closed` })
          }
          to="/"
        >
          {title}
        </Anchor>
      </Title>
      <Subtitle>{subtitle}</Subtitle>
    </Box>
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
    render={data => <HomeTitle data={data} {...props}></HomeTitle>}
  ></StaticQuery>
)
