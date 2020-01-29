import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    html, body, #___gatsby, #gatsby-focus-wrapper {
        margin: 0;
        height: 100%;
        background: #E5E5E5;
    }

    .readText {
        color: gray;
    }
    ::selection {
        background: lightgray;
        color: white;
    }
    h1 {
        font-size: 22px;
    }
`
