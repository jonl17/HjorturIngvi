/** components */
import {
  Container,
  PageName,
  TitleBox,
  Underline,
  Anchor,
  Image,
} from "./Styled"
import HomeTitle from "./components/HomeTitle"

/** tech */
import React from "react"
import { graphql, StaticQuery } from "gatsby"

const isLink = pathname => {
  // returns true if path is something like /projects/hjaltalín
  return pathname.split("/projects/").length > 1
}

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const filterPageName = pathname => {
  if (isLink(pathname)) {
    return "Projects"
  }
  return pathname
    .replace("/", "")
    .replace("/", "")
    .replace("-", " ")
}

const MobilePageContainer = ({
  children,
  location,
  data: {
    imageSharp: { fluid },
  },
}) => {
  const name = filterPageName(location.pathname)
  return (
    <Container>
      <HomeTitle></HomeTitle>
      <TitleBox>
        <PageName className="bold">
          {isLink(location.pathname) ? (
            <Anchor to="/projects" className="bold">
              <Image fluid={fluid}></Image>
              {capitalizeFirstLetter(name)} <Underline></Underline>
            </Anchor>
          ) : (
            <>
              {capitalizeFirstLetter(name)}
              <Underline></Underline>
            </>
          )}
        </PageName>
      </TitleBox>
      {children}
    </Container>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        imageSharp(fluid: { originalName: { eq: "back.png" } }) {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    `}
    render={data => (
      <MobilePageContainer data={data} {...props}></MobilePageContainer>
    )}
  ></StaticQuery>
)
