import React from "react"
import slugify from "slugify"

/* components */
import { Text, Anchor } from "./Styled"

const ProjectsComponent = ({ projects }) => {
  return projects.map((project, index) => (
    <Text key={index}>
      <Anchor to={"/projects/" + slugify(project.frontmatter.title)}>
        {project.frontmatter.title}
      </Anchor>
    </Text>
  ))
}

export default ProjectsComponent
