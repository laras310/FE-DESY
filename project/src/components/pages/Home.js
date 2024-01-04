import DashboardAdmin from "./DashboardAdmin"
import DashboardUser from "./DashboardUser"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

export default function Home(){
    const role = useSelector(state=>state?.user?.role)
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