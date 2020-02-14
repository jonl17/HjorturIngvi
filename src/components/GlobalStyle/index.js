import { createGlobalStyle } from "styled-components"
import { COLORS } from "../../constants"

export const GlobalStyle = createGlobalStyle`
    html, body, #___gatsby, #gatsby-focus-wrapper {
        margin: 0;
        height: 100%;
        background: ${COLORS.background};
    }
    .readText {
        color: gray;
    }
    h1 {
        font-size: 23px;
        letter-spacing: -.2px;
    }
    p {
        font-size: 14px;
    }
    @media only screen and (min-width: 1600px) {
        p {
            font-size: 18px;
            line-height: 145%;
        }
    }
    @media only screen and (max-width: 600px) {
        p {
            font-size: 16px;
        }
  
}
`
