import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import Modal from "../components/Modal"
import { useAppStore } from "../stores/useAppStore"
import { useEffect } from "react"
import NotificationComponent from "../components/Notification"

export const Layout = () => {
  const loadFromLocalStorage=useAppStore(state=>state.loadFromLocalStorage)
  useEffect(()=>{
    loadFromLocalStorage()
  },[])
  return (
    <>
        <Header/>
        <main className="cotainer mx-auto py-16">
            <Outlet/>
        </main>
        <Modal/>
        <NotificationComponent/>
    </>
  )
}
