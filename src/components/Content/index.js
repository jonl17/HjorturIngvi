// components
import { Container } from "./Styled"

// tech
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { splitTextIntoLanguage } from "../../methods"
import { graphql, StaticQuery } from "gatsby"

const Content = ({
  html,
  title,
  data: {
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

  const [imageSize, setImageSize] = useState("small")

  const icelandic = useSelector(state => state.reducer.icelandic)
  const bothLanguages = splitTextIntoLanguage(html)

  const triggerImage = target => {
    // first strip off the plusfor in plusforimageX & get correct image ID
    let imageID = target.id.replace("plusfor", "")
    // find image with that ID
    let theImage = document.getElementById(imageID)

    // change from plus to ex
    if (imageSize === "small") {
      setImageSize("large")
      console.log(document.getElementById("image1"))
      theImage.style.width = "100% !important"
      // maximize
    } else {
      // minimize
      // set image style
      setImageSize("small")
      theImage.style.width = "40% !important"
    }
  }

  useEffect(() => {
    setImages(document.getElementsByClassName("gatsby-resp-image-wrapper"))
  }, [])

  if (images !== undefined) {
    for (var i = 0; i < images.length; i++) {
      // add id attr to image
      let id = title + (i + 1)
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
  // useEffect(() => {
  //   if (pluses !== undefined) {
  //     for (var i = 0; i < pluses.length; i++) {
  //       pluses[i].addEventListener("click", e => triggerImage(e.target))
  //     }
  //   }
  // })

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

export default props => (
  <StaticQuery
    query={graphql`
      {
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
    `}
    render={data => <Content data={data} {...props}></Content>}
  ></StaticQuery>
)
