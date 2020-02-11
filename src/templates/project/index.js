/** components */
import { Container, Content, Title } from "./Styled"
import Head from "./components/Head"

/** tech */
import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { useSelector } from "react-redux"
import { splitTextIntoLanguage } from "../../methods"

// COMPLEX COMPONENT THAT NEEDS CLEANING

const Project = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, title_en },
    },
    plus: {
      fluid: { src: plussrc },
    },
    ex: {
      fluid: { src: exsrc },
    },
  },
}) => {
  const [images, setImages] = useState(undefined)
  const [pluses, setPluses] = useState(undefined)

  const triggerImage = target => {
    // first strip off the plusfor in plusforimageX & get correct image ID
    let imageID = target.id.replace("plusfor", "")
    // find image with that ID
    let theImage = document.getElementById(imageID)

    // change from plus to ex
    if (target.src.includes(plussrc)) {
      // maximize
      target.src = exsrc
      // set image style
      theImage.style.width = "100%"
    } else {
      // minimize
      target.src = plussrc
      // set image style
      theImage.style.width = "40%"
    }
  }
  useEffect(() => {
    setImages(document.getElementsByClassName("gatsby-resp-image-wrapper"))
  }, [])

  if (images !== undefined) {
    for (var i = 0; i < images.length; i++) {
      // add id attr to image
      let id = "image" + (i + 1)
      images[i].setAttribute("id", id)
      // append plus next to each image & prefix id of that plus with plusfor, resulting in id=plusforimageX
      id = "plusfor" + id
      images[i].insertAdjacentHTML(
        "afterend",
        "<Image class='plus' id=" + id + "  src=" + plussrc + "></Image>"
      )
    }
  }
  // get pluses
  useEffect(() => {
    setPluses(document.getElementsByClassName("plus"))
  }, [])
  // add click listen to both pluses
  useEffect(() => {
    if (pluses !== undefined) {
      for (var i = 0; i < pluses.length; i++) {
        pluses[i].addEventListener("click", e => triggerImage(e.target))
      }
    }
  })

  const icelandic = useSelector(state => state.reducer.icelandic)
  const bothLanguages = splitTextIntoLanguage(html)
  return (
    <Container>
      <Head title={"Projects"} slug={"/projects/"}></Head>
      <Title className="bold">
        {!icelandic && title_en ? title_en : title}
      </Title>
      <Content
        dangerouslySetInnerHTML={{
          __html:
            !icelandic && bothLanguages.length > 1
              ? bothLanguages[1]
              : bothLanguages[0],
        }}
      ></Content>
    </Container>
  )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        title_en
      }
    }
    plus: imageSharp(fluid: { originalName: { eq: "plus.png" } }) {
      fluid {
        src
      }
    }
    ex: imageSharp(fluid: { originalName: { eq: "ex.png" } }) {
      fluid {
        src
      }
    }
  }
`

export default Project
