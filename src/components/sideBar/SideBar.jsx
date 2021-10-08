import React from 'react'
import './style.scss'
import { BoxArrowDown, BugFill, ChatLeftText, Check2Square, HddNetwork, HouseDoor, QuestionCircle, Reddit } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom'

function SideBar() {
    return (

        <div className='sidebar'>
            <div className="sidebar__wrapper">
                <div className="sidebar__wrapper-top">
                    <span className='icon-bar icon-bar-active'><BugFill size={19} /></span>
                </div>
                <div className="sidebar__wrapper-center">
                    <ul className="list-icon">
                        <li>
                            <NavLink exact={true} to='/'>
                                <span className='icon-bar'><HouseDoor /></span>
                            <p></p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/Chat'>
                                <span className='icon-bar'><ChatLeftText /></span>
                                <p></p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/Guide'>
                                <span className='icon-bar'><QuestionCircle /></span>
                                <p></p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="sidebar__wrapper-bottom">
                    <span className='icon-bar'><BoxArrowDown size={19} /></span>
                </div>
            </div>
        </div>
    )
}

export default SideBar
