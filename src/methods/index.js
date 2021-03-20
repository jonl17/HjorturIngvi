import hastToHyperscript from "hast-to-hyperscript"
import React from "react"

export const splitTextIntoLanguage = text => {
  const sep1 = "<p>-ENSKA-</p>"
  const sep2 = "<p>-ENSKA- </p>"
  if (text.includes(sep1)) {
    return text.split(sep1)
  } else if (text.includes(sep2)) {
    return text.split(sep2)
  } else return text
}

export const renderHtmlToReact = node => {
  return hastToHyperscript(React.createElement, node)
}
