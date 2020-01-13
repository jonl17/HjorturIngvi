import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        height: 100%;
    }
    .bold {
        font-family: Maison Neue Bd;
    }
    #selected { /** for links */
        span {
            background: #323232;
        }
    }
`
