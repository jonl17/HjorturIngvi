import styled from "styled-components"

export const Container = styled.div`
  ul {
    margin: 0;
  }
  li {
    color: gray;
    padding: 5px 0 5px 0;
  }
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ul {
      list-style: none;
      padding: 0;
    }
  }
`
