// components
import { Container } from "./Styled"

// tech
import React from "react"
import { useSelector } from "react-redux"
import { splitTextIntoLanguage } from "../../methods"

const Content = ({ html }) => {
  const icelandic = useSelector(state => state.reducer.icelandic)
  const bothLanguages = splitTextIntoLanguage(html)

  return (
    <Container
      dangerouslySetInnerHTML={{
        __html:
          !icelandic && bothLanguages.length > 1
            ? bothLanguages[1]
            : bothLanguages[0],
      }}
    ></Container>
  )
}

export default Content
