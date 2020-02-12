/* components */
import { Anchor, Text } from "./Styled"
import Icon from "./components/Icon"

/* tech */
import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector } from "react-redux"

const Socialmedialinks = ({
  data: {
    externallinks: {
      frontmatter: { services },
    },
  },
}) => {
  const device = useSelector(state => state.reducer.device)
  return services.map((service, index) => (
    <Anchor key={index} target="_blank" href={service.serviceurl}>
      <Icon name={service.servicename}></Icon>
      {device === `browser` ? (
        <Text className="bold">{service.servicename}</Text>
      ) : (
        <></>
      )}
    </Anchor>
  ))
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        externallinks: markdownRemark(
          fileAbsolutePath: { regex: "/externallinks/" }
        ) {
          frontmatter {
            services {
              servicename
              serviceurl
            }
          }
        }
      }
    `}
    render={data => (
      <Socialmedialinks data={data} {...props}></Socialmedialinks>
    )}
  ></StaticQuery>
)
