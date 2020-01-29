import React from "react"
import { graphql, StaticQuery } from "gatsby"

/* components */
import { Container, Title, Venue, Date, TicketLink } from "./Styled"

const ConcertsComponent = ({
  data: {
    concerts: { nodes },
  },
}) => {
  console.log(nodes)
  return nodes.map((concert, index) => (
    <Container key={index}>
      <Title>{concert.frontmatter.title}</Title>
      <Venue>{concert.frontmatter.venue}</Venue>
      <Date className="bold">{concert.frontmatter.date}</Date>
      {concert.frontmatter.ticketsrequired ? (
        <TicketLink
          target="_blank"
          href={concert.frontmatter.buyticketlink}
          className="bold"
        >
          Kaupa miða
        </TicketLink>
      ) : (
        ""
      )}
    </Container>
  ))
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        concerts: allMarkdownRemark(
          sort: { fields: frontmatter___date, order: ASC }
          filter: { fileAbsolutePath: { regex: "/concerts/" } }
        ) {
          nodes {
            frontmatter {
              title
              date(formatString: "DD.MM.YYYY")
              venue
              ticketsrequired
              buyticketlink
            }
          }
        }
      }
    `}
    render={data => (
      <ConcertsComponent data={data} {...props}></ConcertsComponent>
    )}
  ></StaticQuery>
)
