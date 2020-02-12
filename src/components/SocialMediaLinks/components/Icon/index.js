import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

// ex. = name: Youtube | icon.childImageSharp.fluid.originalName: youtube.png
const clean = originalName => {
  return originalName.replace(".png", "").toLowerCase()
}
const getCorrectIcon = (name, icons) => {
  for (var i = 0; i < icons.length; i++) {
    if (clean(name) === clean(icons[i].childImageSharp.fluid.originalName))
      return icons[i].childImageSharp
  }
  return null
}

const Icon = ({
  name,
  data: {
    allFile: { nodes: icons },
  },
}) => {
  const icon = getCorrectIcon(name, icons)
  return icon ? (
    <Img style={{ height: "20px", width: "20px" }} fluid={icon.fluid}></Img>
  ) : (
    <></>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        allFile(filter: { absolutePath: { regex: "/icons/" } }) {
          nodes {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_tracedSVG
                originalName
              }
            }
          }
        }
      }
    `}
    render={data => <Icon data={data} {...props}></Icon>}
  ></StaticQuery>
)
