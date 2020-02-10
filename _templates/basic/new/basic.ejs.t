---
to: src/components/<%=title%>/index.js
---
/* components */
import { Container } from "./Styled"

/* tech */
import React from 'react'


const <%= h.capitalize(title) %> = () => {
    return (
        <Container>
           <%= title %>
        </Container>
    )
}

export default <%= h.capitalize(title) %>





