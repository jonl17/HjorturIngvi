import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { CHANGE_LANGUAGE } from "../../state/action"

/* components */
import { Button, Lang } from "./Styled"

const SplitLanguageText = text => {
  return text.split("/")
}

const Languagebutton = ({ name }) => {
  const dispatch = useDispatch()
  const icelandic = useSelector(state => state.reducer.icelandic)
  return (
    <Button onClick={() => dispatch({ type: CHANGE_LANGUAGE })} className="reg">
      {SplitLanguageText(name).map((item, index) =>
        index === 1 ? (
          <span key={index}>
            <Lang> / </Lang>{" "}
            <Lang className={!icelandic ? "bold" : ""} key={index}>
              {item}
            </Lang>
            {/* ENGLISH */}
          </span>
        ) : (
          <Lang className={icelandic ? "bold" : ""} key={index}>
            {item}
          </Lang>
          /* ICELANDIC */
        )
      )}
    </Button>
  )
}

export default Languagebutton
