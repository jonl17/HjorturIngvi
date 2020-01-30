import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector } from "react-redux"

/* components */
import { Container, Title, Venue, Date, TicketLink } from "./Styled"

const ConcertsComponent = ({
  data: {
    concerts: { nodes },
  },
}) => {
  const icelandic = useSelector(state => state.reducer.icelandic)
  return nodes.map((concert, index) => (
    <Container key={index}>
      <Title className="bold">{concert.frontmatter.title}</Title>
      <Venue>{concert.frontmatter.venue}</Venue>
      <Date className="bold">{concert.frontmatter.date}</Date>
      {concert.frontmatter.ticketsrequired ? (
        <TicketLink
          target="_blank"
          href={concert.frontmatter.buyticketlink}
          className="bold"
        >
          {icelandic ? "Kaupa miða" : "Buy tickets"}
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
