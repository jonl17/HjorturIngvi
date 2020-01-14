import React from "react"
import { Helmet } from "react-helmet"
import { graphql, StaticQuery } from "gatsby"

const SEO = ({
  data: {
    site: {
      siteMetadata: { title, subtitle: description },
    },
  },
}) => {
  return (
    <>
      <Helmet title={title}>
        <meta name="title" content={title}></meta>
        <meta name="description" content={description} />
        {title && <meta property="og:title" content={title} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        <link rel="stylesheet" type="text/css" href="fonts/fonts.css" />
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
          }
        }
      }
    `}
    render={data => <SEO data={data} {...props}></SEO>}
  ></StaticQuery>
)
