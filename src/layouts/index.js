import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_DEVICE } from "../state/action"
import { GlobalStyle } from "../components/GlobalStyle"
import { useEffect } from "react"
import "./fonts.css"

/** components */
import { Container, PageContainer, SidebarContainer } from "./Styled"
import SEO from "../components/SEO"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Homebutton from "../components/Homebutton"
import Footer from "../components/Footer"
import ProfilePicture from "../components/ProfilePicture"
import Player from "../components/Player"
import Burger from "../components/Burger"
import MobileMenu from "../components/MobileMenu"
import MobilePageContainer from "./components/MobilePageContainer"

const Layout = ({ children, location, pageContext }) => {
  const device = useSelector(state => state.reducer.device)
  const dispatch = useDispatch()
  const callBack = () => {
    dispatch({ type: SET_DEVICE, width: window.innerWidth })
  }
  useEffect(() => {
    callBack()
    window.addEventListener("resize", callBack)
    return () => {
      window.removeEventListener("resize", callBack)
    }
  }, [])
  return (
    <>
      <SEO projectTitle={pageContext.name}></SEO>
      <GlobalStyle></GlobalStyle>
      <Container device={device}>
        {device === `browser` ? (
          // only on browser
          <>
            <Player></Player>
            <Header></Header>
            <ProfilePicture></ProfilePicture>
            <SidebarContainer>
              <Sidebar></Sidebar>
              <Homebutton pathname={location.pathname}></Homebutton>
            </SidebarContainer>
          </>
        ) : (
          // only on tablet & mobile
          <>
            <Burger></Burger>
            <MobileMenu></MobileMenu>
          </>
        )}
        {device === `browser` ? (
          <PageContainer device={device}>{children}</PageContainer>
        ) : (
          <MobilePageContainer location={location}>
            {children}
          </MobilePageContainer>
        )}
      </Container>
      {device === `browser` ? <Footer></Footer> : <></>}
    </>
  )
}

export default Layout
