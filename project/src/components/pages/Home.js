import DashboardAdmin from "./DashboardAdmin"
import DashboardUser from "./DashboardUser"

export default function Home(){
    const role = sessionStorage.getItem('role')
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