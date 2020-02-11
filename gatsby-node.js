const { fmImagesToRelative } = require("gatsby-remark-relative-images")
const path = require("path")
const slugify = require("slugify")

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}

/*** create project pages */
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const projectTemplate = path.resolve(`src/templates/project/index.js`)
  const result = await graphql(`
    {
      projects: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/projects/" } }
      ) {
        nodes {
          id
          html
          frontmatter {
            title
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query!`)
    return
  }
  result.data.projects.nodes.forEach(project => {
    createPage({
      path: "/projects/" + slugify(project.frontmatter.title),
      component: projectTemplate,
      context: {
        id: project.id,
        name: project.frontmatter.title,
      },
    })
  })
}
