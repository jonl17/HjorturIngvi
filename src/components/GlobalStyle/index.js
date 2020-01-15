import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        height: 100%;
    }
    #selected { /** for links */
        img {
            display: block !important;
        }
    }
    .readText {
        color: gray;
    }
    ::selection {
        background: lightgray;
        color: white;
    }
`
