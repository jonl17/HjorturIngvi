/** components */
import { Date, Title } from "./Styled"
import Content from "../../../Content"
import DynamicImage from "../../../DynamicImage"

/** tech */
import React from "react"
import { useSelector } from "react-redux"

const Item = ({ frett }) => {
  const icelandic = useSelector(state => state.reducer.icelandic)
  return (
    <>
      <Date className="bold">{frett.frontmatter.date}</Date>
      <Title className="bold">
        {!icelandic && frett.frontmatter.title_en
          ? frett.frontmatter.title_en
          : frett.frontmatter.title}
      </Title>
      {frett.frontmatter.image ? (
        <DynamicImage image={frett.frontmatter.image}></DynamicImage>
      ) : null}
      <Content
        htmlAst={frett.htmlAst}
        title={frett.frontmatter.title}
        html={frett.html}
      ></Content>
    </>
  )
}

export default Item
