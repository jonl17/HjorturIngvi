import { Container, Image, Icon } from "./Styled"

import React, { useState } from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector } from "react-redux"

const DynamicImage = ({
  image: {
    childImageSharp: { fluid: imagesrc },
  },
  data: {
    plus: { fixed: plussrc },
    ex: { fixed: exsrc },
  },
}) => {
  const [minimized, setSize] = useState(true)
  const device = useSelector(state => state.reducer.device)
  return (
    <>
      <Container width={minimized && device === "browser" ? "40%" : "100%"}>
        <Image fluid={imagesrc}></Image>
        <Icon
          onClick={() => setSize(minimized ? false : true)}
          fixed={minimized ? plussrc : exsrc}
        ></Icon>
      </Container>
    </>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        plus: imageSharp(fluid: { originalName: { eq: "plus.png" } }) {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
        ex: imageSharp(fluid: { originalName: { eq: "ex.png" } }) {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    `}
    render={data => <DynamicImage data={data} {...props}></DynamicImage>}
  ></StaticQuery>
)
