import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../App.css'
import userContext from '../context/user/UserContext'
import alertContext from '../context/alert/AlertContext'

const Nav = () => {
    const { iNoteBookUser, setiNoteBookUser, updateTheme } = useContext(userContext)
    const { theme, setTheme } = useContext(alertContext)

    const active = useLocation()
    const navigate = useNavigate()
    const hideNav = () => {
        if (window.innerWidth <= 991) {
            const a = document.getElementsByClassName("navbar-toggler")
            a[0].click()
        }
    }
    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        updateTheme({ theme: theme === 'dark' ? 'light' : 'dark' })
    }
    const logout = () => {
        setiNoteBookUser(null)
        hideNav();
        localStorage.removeItem('iNoteBookUserDetails')
        navigate('/')
    }
    return (
        <>
            <nav className={`navbar navbar-${theme} navbar-expand-lg shadow`}>
                <div className="container-fluid ">
                    <div className='d-flex flex-row align-items-center'>
                        <div className='d-flex flex-row align-items-center justify-content-center'>
                            <Link className="navbar-brand" to={iNoteBookUser ? `/profile` : '/'}>
                                {iNoteBookUser ?
                                    <>
                                        <img src={iNoteBookUser.profilePicture} alt={iNoteBookUser.name} width="32" height="32" class="d-inline-block align-text-top rounded-circle" />
                                        <span> {iNoteBookUser.name}</span>
                                    </>
                                    :
                                    <i className="bi bi-journal-bookmark-fill ">
                                        <span className='mx-1' >iNoteBook</span>
                                    </i>
                                }
                            </Link>
                        </div>
                        <div>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id={`tooltip-edit-theme`} style={{ marginTop: '-8px', zIndex: '1300' }}>Enable {theme === 'dark' ? 'light' : 'dark'} mode</Tooltip>}>
                                <div>
                                    <input type="checkbox" className="checkbox" onChange={changeTheme} id="chk" checked={theme === 'dark'} />
                                    <label className="label" htmlFor="chk">
                                        <i className="bi bi-moon-stars"></i>
                                        <i className="bi bi-brightness-high"></i>
                                        <div className="ball"></div>
                                    </label>
                                </div>
                            </OverlayTrigger>
                        </div>
                    </div >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" style={{ flexGrow: '0' }} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"  >
                            <li className="nav-item ">
                                <Link onClick={hideNav} className={`nav-link ${active.pathname === '/' ? 'active' : ''} `} aria-current="page" to="/">Home</Link>
                            </li>
                            {iNoteBookUser ? <li className="nav-item">
                                <Link onClick={hideNav} className={`nav-link ${active.pathname === `/profile` ? 'active' : ''} `} to={'/profile'}>Profile</Link>
                            </li> : ''}
                            <li className="nav-item">
                                <Link onClick={hideNav} className={`nav-link ${active.pathname === '/about' ? 'active' : ''} `} to="/about">About</Link>
                            </li>
                        </ul>
                        {iNoteBookUser ? <button onClick={logout} className="btn btn-primary mx-1"  >Logout</button> : ''}
                    </div>
                </div >
            </nav >
        </>
    )
}

export default Nav