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

const Layout = ({ children, location }) => {
  const device = useSelector(state => state.reducer.device)
  const mobileMenu = useSelector(state => state.reducer.mobileMenu)
  const dispatch = useDispatch()
  const callBack = () => {
    dispatch({ type: SET_DEVICE, width: window.innerWidth })
  }
  useEffect(() => {
    callBack()
    window.addEventListener("resize", callBack)
    console.log("callback")
    return () => {
      window.removeEventListener("resize", callBack)
    }
  })
  return (
    <>
      <SEO></SEO>
      <GlobalStyle></GlobalStyle>
      <Container device={device}>
        <Player></Player>
        <PageContainer mobileMenu={mobileMenu} device={device}>
          {children}
        </PageContainer>
        {device === `browser` ? (
          // only on browser
          <>
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
      </Container>
      {device === `browser` ? <Footer></Footer> : <></>}
    </>
  )
}

export default Layout
