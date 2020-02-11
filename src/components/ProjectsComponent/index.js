/* components */
import { Text, Anchor } from "./Styled"

/** tech */
import React from "react"
import slugify from "slugify"
import { useSelector } from "react-redux"

const ProjectsComponent = ({ projects }) => {
  const icelandic = useSelector(state => state.reducer.icelandic)
  return projects.map((project, index) => (
    <Text key={index}>
      <Anchor
        className="bold"
        to={
          "/projects/" +
          slugify(
            !icelandic && project.frontmatter.title_en
              ? project.frontmatter.title_en
              : project.frontmatter.title
          )
        }
      >
        {project.frontmatter.title}
      </Anchor>
    </Text>
  ))
}

export default ProjectsComponent
