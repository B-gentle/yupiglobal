import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import { useEffect } from "react";
import { checkCredentials } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkCredentials())
  }, [])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
