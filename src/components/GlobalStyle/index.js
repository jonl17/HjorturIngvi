import { createGlobalStyle } from "styled-components"
import { COLORS } from "../../constants"

export const GlobalStyle = createGlobalStyle`
    html, body, #___gatsby, #gatsby-focus-wrapper {
        margin: 0;
        height: 100%;
        background: #E5E5E5;
    }

    .readText {
        color: gray;
    }
   
    h1 {
        font-size: 23px;
    }
    p {
        font-size: 14px;
    }
`
