import {Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'

const DashLayout = () => {
    return (
        <>
            {/*This header will be on the protected pages of our site */}
            <DashHeader />
            <div className="dash-contanier">
                <Outlet />
            </div>
            {/*A footer section for the protected part of the site */}
        </>
    )
}

export default DashLayout