import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (<>
        {/* It tells the parent component: "If there are any child routes matching the URL, render them right here."*/}
        <Outlet />
        </>
    )
}

export default Layout