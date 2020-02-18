import hastToHyperscript from "hast-to-hyperscript"
import React from "react"

export const splitTextIntoLanguage = text => {
  return text.split("<p>-ENSKA-</p>")
}

export const renderHtmlToReact = node => {
  return hastToHyperscript(React.createElement, node)
}
