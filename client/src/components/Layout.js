import React from 'react'
import { adminMenu,controllerMenu,userMenu } from '../Data/data'
import '../styles/LayoutStyles.css'
import {Link ,useLocation,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {message} from 'antd'
import {logout} from '../redux/features/userSlice';
import { submit } from '../redux/features/machineSlice'

function Layout({ children }) {
    const { user } = useSelector(state => state.user)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //logout function
    const handleLogout = () => {
        localStorage.clear()
        dispatch(logout())
        message.success('Logged Out Successfully')
        navigate('/login')
    }

    // rendering menu list
    const SidebarMenu = user?.type === "admin" ? adminMenu : user?.type === "user" ? userMenu : controllerMenu ;

    return (
        <>
            <div className='main'>
                <div className='layout'>
                    <div className='sidebar'>
                        <div className='logo'>
                            <h6>LAB APPOINTMENT PORTAL</h6>
                            <hr />
                        </div>
                        <div className='menu'>
                            {SidebarMenu.map((menu,i) => {
                                const isActive = location.pathname === menu.path
                                return (
                                    <>
                                        <div className={`menu-item ${isActive && "active"}`}>
                                            <i className={menu.icon}></i>
                                            <Link to={menu.path}>{menu.name}</Link>
                                        </div>
                                    </>
                                )
                            })}
                            {/* logout button */}
                            <div className={`menu-item`} onClick={handleLogout}>
                                <i className='fa-solid fa-right-from-bracket'></i>
                                <Link to='/login'>Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='header'>
                            <div className='logo1'>
                                <h2>INDIAN INSTITUTE OF TECHNOLOGY PATNA</h2>
                            </div>
                            <div className='header-content'>
                                <i className='fa-solid fa-bell'></i>
                                <Link to='/profile'>{user?.name}</Link>
                            </div>
                        </div>
                        <div className='body'>{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout