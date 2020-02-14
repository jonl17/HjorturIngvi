/* components */
import { Text, Anchor } from "./Styled"

/** tech */
import React from "react"
import slugify from "slugify"
import { useSelector } from "react-redux"

const ProjectsComponent = ({ projects }) => {
  const icelandic = useSelector(state => state.reducer.icelandic)

  if (projects.length > 1) {
    return projects.map((project, index) => (
      <Text key={index}>
        <Anchor
          className="bold"
          to={"/projects/" + slugify(project.frontmatter.title)}
        >
          {!icelandic && project.frontmatter.title_en
            ? project.frontmatter.title_en
            : project.frontmatter.title}
        </Anchor>
      </Text>
    ))
  } else return <h1>Coming soon...</h1>
}

export default ProjectsComponent
