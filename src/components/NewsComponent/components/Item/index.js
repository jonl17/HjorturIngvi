/** components */
import { Date, Title, Content } from "./Styled"

/** tech */
import React from "react"
import { useSelector } from "react-redux"
import { splitTextIntoLanguage } from "../../../../methods"

const Item = ({ frett }) => {
  const icelandic = useSelector(state => state.reducer.icelandic)
  const bothLanguages = splitTextIntoLanguage(frett.html)
  return (
    <>
      <Date className="bold">{frett.frontmatter.date}</Date>
      <Title className="bold">
        {!icelandic && frett.frontmatter.title_en
          ? frett.frontmatter.title_en
          : frett.frontmatter.title}
      </Title>
      <Content
        dangerouslySetInnerHTML={{
          __html:
            !icelandic && bothLanguages.length > 1
              ? bothLanguages[1] // english
              : bothLanguages[0], // icelandic
        }}
      ></Content>
    </>
  )
}

export default Item
