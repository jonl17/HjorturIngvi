import React from "react"
import { connect } from "react-redux"
import { setDevice } from "../state/action"
import { GlobalStyle } from "../components/GlobalStyle"
import "./fonts.css"

/** components */
import { Container } from "./Styled"
import SEO from "../components/SEO"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.callBack = this.callBack.bind(this)
  }
  componentDidMount() {
    this.callBack()
    window.addEventListener("resize", this.callBack)
    /** register current page */
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.callBack)
  }
  callBack() {
    const { dispatch } = this.props
    dispatch(setDevice(window.innerWidth))
  }
  render() {
    return (
      <>
        <SEO></SEO>
        <GlobalStyle></GlobalStyle>
        <Container>
          <Header></Header>
          {this.props.children}
          <Sidebar></Sidebar>
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => ({
  device: state.reducer.device,
})

export default connect(mapStateToProps)(Layout)
