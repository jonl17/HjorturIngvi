import React from "react"

/* components */
import { AboutContainer, Content } from "./Styled"

const About = ({ aboutContent }) => {
  return (
    <AboutContainer>
      <Content
        className="readText"
        dangerouslySetInnerHTML={{ __html: aboutContent.html }}
      ></Content>
    </AboutContainer>
  )
}

export default About
