import React from "react"

/* components */
import { AboutContainer, Content, ImageContainer, Image } from "./Styled"

const About = ({ aboutContent }) => {
  return (
    <AboutContainer>
      <Content
        dangerouslySetInnerHTML={{ __html: aboutContent.html }}
      ></Content>
      <ImageContainer>
        <Image
          imgStyle={{ objectFit: "contain" }}
          fluid={aboutContent.frontmatter.forsidu_mynd.childImageSharp.fluid}
        ></Image>
      </ImageContainer>
    </AboutContainer>
  )
}

export default About
