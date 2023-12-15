import DashboardAdmin from "./DashboardAdmin"
import DashboardUser from "./DashboardUser"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

export default function Home(){
    const role = useSelector(state=>state?.user?.role)
    // const [state, setState] = useState('Active')
    // const [count, setCount] = useState(0)
    // const [remaining, setRemaining] = useState(0)
    // const [status, setStatus] = useState()

    // const onIdle = () => {
    //     setState('Idle')
    //     localStorage.clear()
    //     Cookies.remove()
    //     window.location.reload()
    //   }
    
    //   const onActive = () => {
    //     setState('Active')
    //   }
    
    //   const onAction = () => {
    //     setCount(count + 1)
    //   }
    
    //   const { getRemainingTime } = useIdleTimer({
    //     onIdle,
    //     onActive,
    //     onAction,
    //     timeout: 10_000,
    //     throttle: 500, 
    //     status: status
    //   })

    //   useEffect(() => {
    //     const interval = setInterval(() => {
    //       setRemaining(Math.ceil(getRemainingTime() / 1000))
    //     }, 500)
    
    //     return () => {
    //       clearInterval(interval)
    //     }
    //   })

    return(
        <>
        {
            role === "admin" ?
            <DashboardAdmin/>
            :
            <DashboardUser/>

        }
        </>
    )
}