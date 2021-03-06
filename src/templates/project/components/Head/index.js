import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector } from "react-redux"

/** components */
import { Title, Image, Anchor } from "./Styled"

const Head = ({
  data: {
    imageSharp: { fluid },
  },
  title, // title of page
  slug, // where to go back
}) => {
  // Template page title + back button to main page
  const device = useSelector(state => state.reducer.device)
  return device === `browser` ? (
    <Anchor device={device} to={slug}>
      <Image fluid={fluid}></Image>
      <Title className="bold">{title}</Title>
    </Anchor>
  ) : (
    <></>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        imageSharp(fluid: { originalName: { eq: "back.png" } }) {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    `}
    render={data => <Head data={data} {...props}></Head>}
  ></StaticQuery>
)
