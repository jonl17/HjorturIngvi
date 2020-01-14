import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        height: 100%;
    }
    #selected { /** for links */
        span {
            background: black;
        }
    }
    .readText {
        color: gray;
    }
`
