import React from 'react';
import "./sidebar.css";

import category from "../../Images/category.png"
import message from "../../Images/message.png";
import task from "../../Images/task-square.png";
import user from "../../Images/user.png";
import setting from "../../Images/setting.png";
import arrow from "../../Images/sidebar-arrow.png";
import logo from "../../Images/sidebar-logo.png";
import add from "../../Images/add-square.png";

const Sidebar = () => {

    const sidebarMenu = [
        { title: "Home", icon: category, cName: "nav-text" },
        { title: "Message", icon: message, cName: "nav-text" },
        { title: "Task", icon: task, cName: "nav-text" },
        { title: "Member", icon: user, cName: "nav-text" },
        { title: "Setting", icon: setting, cName: "nav-text" },
    ]

    const [sidebar, setSidebar] = React.useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div className='app_sidebar'>
                <div className='app_sidebar_menu-bars'>
                    <img src={arrow} alt="sidebar arrow" onClick={showSidebar} />
                    {/* <RxHamburgerMenu onClick={showSidebar} /> */}
                    {sidebarMenu.map((item, index) => {
                        return (
                            <div className='app_sidebar-collapse-icons'>
                                <li key={index} >
                                    <img src={item.icon} alt="" />
                                </li>
                            </div>
                        )
                    })}
                </div>
            </div>
            <nav className={sidebar ? "nav-menu active" : 'nav-menu'}>
                <ul className="nav-menu-items">
                    <li className="nav-toggle">
                        <img src={logo} alt="logo" />
                        <img src={arrow} alt="arrow" onClick={showSidebar} />
                    </li>
                    {sidebarMenu.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <div className="nav-item">
                                    <img src={item.icon} alt="" />
                                    <span>{item.title}</span>
                                </div>

                            </li>
                        )
                    })}
                </ul>

                <div className="sidebar_projects">
                    <div className="sidebar_projects-heading">
                        <p className='project_heading'>MY PROJECTS</p>
                        <img src={add} alt="add project" />
                    </div>

                    <ul className='project_list'>
                        <li>Mobile App</li>
                        <li>Website Redesign</li>
                        <li>Design System</li>
                        <li>Wireframes</li>
                    </ul>
                </div>

            </nav>
        </>
    )
}

export default Sidebar
