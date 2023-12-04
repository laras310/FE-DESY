import DashboardAdmin from "./DashboardAdmin"
import DashboardUser from "./DashboardUser"

export default function Home(){
    const role = localStorage.getItem('role')
    return(
        <>
        {
            role === "user" ?
            <DashboardUser/>
            :
            <DashboardAdmin/>

        }</>
    )
}