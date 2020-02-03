import React from "react"
import { graphql, StaticQuery } from "gatsby"

/** components */
import ProjectsComponent from "../components/ProjectsComponent"

const Projects = ({
  data: {
    allMarkdownRemark: { nodes: projects },
  },
}) => {
  /** only using the titles in the Projects component */
  return <ProjectsComponent projects={projects}></ProjectsComponent>
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/projects/" } }
        ) {
          nodes {
            frontmatter {
              title
            }
          }
        }
      }
    `}
    render={data => <Projects data={data} {...props}></Projects>}
  ></StaticQuery>
)
