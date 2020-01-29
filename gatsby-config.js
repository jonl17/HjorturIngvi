/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Hjörtur Ingvi Jóhannsson`,
    subtitle: `Pianist/Composer/Arranger`,
    pages: [
      { name: `Hjörtur Ingvi Jóhannsson`, slug: `/about`, position: `header` },
      { name: `News`, slug: `/news`, position: `header` },
      { name: `Concerts`, slug: `/concerts`, position: `header` },
      { name: `Curriculum vitae`, slug: `/cv`, position: `header` },
      { name: `Projects`, slug: `/projects`, position: `sidebar` },
      { name: `Contact`, slug: `/contact`, position: `sidebar` },
      { name: `ISL/ENG`, position: `sidebar`, type: `button` },
    ],
    socialMedia: [
      { name: `Youtube`, link: `https://www.youtube.com/` },
      { name: `Facebook`, link: `www.visir.is` },
      { name: `Spotify`, link: `www.mbl.is` },
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `news`,
        path: `${__dirname}/static/news`,
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
