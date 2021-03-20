import React from "react"
import { Helmet } from "react-helmet"
import { graphql, StaticQuery } from "gatsby"

const SEO = ({
  projectTitle,
  data: {
    site: {
      siteMetadata: { title, subtitle: description, image },
    },
    favicon: { publicURL },
  },
}) => {
  return (
    <>
      <Helmet
        title={
          projectTitle !== undefined ? projectTitle + " | " + title : title
        }
      >
        <meta name="title" content={title}></meta>
        <meta name="description" content={description} />
        {title && <meta property="og:title" content={title} />}
        <meta property="og:description" content={description} />
        <meta property='og:image' content={image}>
        <link rel="icon" type="image/png" href={publicURL}></link>
      </Helmet>
    </>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            subtitle
            image
          }
        }
        favicon: file(name: { eq: "stop" }) {
          publicURL
        }
      }
    `}
    render={data => <SEO data={data} {...props}></SEO>}
  ></StaticQuery>
)
