import React from "react"

/* components */
import { Container, Name, Content, ImageContainer, Image } from "./Styled"

const About = ({ aboutContent }) => {
  return (
    <Container>
      <Name>Hjörtur Ingvi Jóhannsson</Name>
      <Content
        className="readText"
        dangerouslySetInnerHTML={{ __html: aboutContent.html }}
      ></Content>
      <ImageContainer>
        <Image
          fluid={aboutContent.frontmatter.forsidu_mynd.childImageSharp.fluid}
        ></Image>
      </ImageContainer>
    </Container>
  )
}

export default About
