import React from "react"
import { graphql, StaticQuery } from "gatsby"

/** components */
import ContactComponent from "../components/ContactComponent"

const Contact = ({
  data: {
    markdownRemark: { frontmatter: contactInfo },
  },
}) => {
  return <ContactComponent contactInfo={contactInfo}></ContactComponent>
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        markdownRemark(fileAbsolutePath: { regex: "/contact/" }) {
          frontmatter {
            email
            telephone
          }
        }
      }
    `}
    render={data => <Contact data={data} {...props}></Contact>}
  ></StaticQuery>
)
