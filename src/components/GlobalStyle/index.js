import { createGlobalStyle } from "styled-components"

/** fonts */
import MaisonBook from "../../../static/assets/fonts/MaisonNeue-Book.otf"
import MaisonBold from "../../../static/assets/fonts/MaisonNeue-Bold.otf"

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: Maison Neue Book;
        src: url(${MaisonBook});
    }
    @font-face {
        font-family: Maison Neue Bd;
        src: url(${MaisonBold});
    }
    * {
        font-family: Maison Neue Book;
    }
    html, body {
        margin: 0;
    }
    .bold {
        font-family: Maison Neue Bd;
    }
    .selected { /** for links */
        opacity: 1 !important;
    }
`
