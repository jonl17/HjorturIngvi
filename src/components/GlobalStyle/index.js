import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        height: 100%;
    }
    .readText {
        color: gray;
    }
    ::selection {
        background: lightgray;
        color: white;
    }
`
