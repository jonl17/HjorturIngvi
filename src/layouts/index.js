import React from "react"
import { connect } from "react-redux"
import { setDevice } from "../state/action"
import { GlobalStyle } from "../components/GlobalStyle"

/** components */
import { Container } from "./Styled"
import Header from "../components/Header"
import Burger from "../components/Burger"
import BurgerMenu from "../components/BurgerMenu"

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.callBack = this.callBack.bind(this)
  }
  componentDidMount() {
    this.callBack()
    window.addEventListener("resize", this.callBack)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.callBack)
  }
  callBack() {
    const { dispatch } = this.props
    dispatch(setDevice(window.innerWidth))
  }
  render() {
    const { device } = this.props
    console.log(device)
    return (
      <>
        <GlobalStyle></GlobalStyle>
        <Header></Header>
        {device === `mobile` ? (
          <>
            <Burger></Burger>
          </>
        ) : (
          <></>
        )}
        <Container>{this.props.children}</Container>
      </>
    )
  }
}

const mapStateToProps = state => ({
  device: state.reducer.device,
})

export default connect(mapStateToProps)(Layout)
