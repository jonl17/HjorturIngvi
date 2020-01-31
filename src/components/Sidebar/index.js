import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useSelector, useDispatch } from "react-redux"
import { changeLanguage } from "../../state/action"

/* components */
import { Container, Text, Anchor, Underline, Button, Lang } from "./Styled"

const SplitLanguageText = text => {
  return text.split("/")
}

const Sidebar = ({
  data: {
    site: {
      siteMetadata: { pages },
    },
  },
}) => {
  const icelandic = useSelector(state => state.reducer.icelandic)
  const device = useSelector(state => state.reducer.device)
  console.log(device)
  const dispatch = useDispatch()
  return (
    <Container>
      {pages.map((item, index) =>
        item.position === `sidebar` ? (
          <Text key={index}>
            {item.type !== `button` ? (
              <Anchor
                activeClassName="selected"
                className="bold"
                to={item.slug}
              >
                <Underline></Underline>
                {item.name}
              </Anchor>
            ) : (
              <Button
                onClick={() => dispatch(changeLanguage())}
                className="reg"
              >
                {SplitLanguageText(item.name).map((item, index) =>
                  index === 1 ? (
                    <span key={index}>
                      <Lang> / </Lang>{" "}
                      <Lang selected={!icelandic} key={index}>
                        {item}
                      </Lang>
                      {/* ENGLISH */}
                    </span>
                  ) : (
                    <Lang selected={icelandic} key={index}>
                      {item}
                    </Lang>
                    /* ICELANDIC */
                  )
                )}
              </Button>
            )}
          </Text>
        ) : (
          ""
        )
      )}
    </Container>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            pages {
              name
              slug
              position
              type
            }
          }
        }
      }
    `}
    render={data => <Sidebar data={data} {...props}></Sidebar>}
  ></StaticQuery>
)
