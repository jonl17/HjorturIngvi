/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Hjörtur Jóhannsson`,
    subtitle: `Pianist/Composer/Arranger`,
    pages: [
      { name: `Hjörtur Jóhannsson`, slug: `/about`, position: `header` },
      { name: `News`, slug: `/news`, position: `header` },
      { name: `Concerts`, slug: `/concerts`, position: `header` },
      { name: `Curriculum vitae`, slug: `/cv`, position: `header` },
      { name: `Projects`, slug: `/projects`, position: `sidebar` },
      { name: `Contact`, slug: `/contact`, position: `sidebar` },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `about`,
        path: `${__dirname}/static/about`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1080,
            },
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-layout`,
  ],
}
