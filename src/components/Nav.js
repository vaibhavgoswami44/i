import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../App.css'
import userContext from '../context/user/UserContext'

const Nav = () => {
    const { iNoteBookUser, setiNoteBookUser } = useContext(userContext)

    const active = useLocation()
    const navigate = useNavigate()
    const hideNav = () => {
        if (window.innerWidth <= 991) {
            const a = document.getElementsByClassName("navbar-toggler")
            a[0].click()
        }
    }
    const logout = () => {
        navigate('/')
        setiNoteBookUser(null)
        hideNav();
        localStorage.removeItem('iNoteBookUserDetails')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={iNoteBookUser ? `/profile` : '/'}>{iNoteBookUser ? <><img height='30px' style={{ borderRadius: '30px' }} src={iNoteBookUser.profilePicture} alt={iNoteBookUser.name} /><span className='mx-1'>{iNoteBookUser.name}</span></> : <i className="bi bi-journal-bookmark-fill "><span className='mx-1' >iNoteBook</span></i>}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"  >
                            <div className='list-div'>
                                <li className="nav-item list-div-first-li">
                                    <Link onClick={hideNav} className={`nav-link ${active.pathname === '/' ? 'active' : ''} `} aria-current="page" to="/">Home</Link>
                                </li>
                                {iNoteBookUser ? <li className="nav-item">
                                    <Link onClick={hideNav} className={`nav-link ${active.pathname === `/profile` ? 'active' : ''} `} to={'/profile'}>Profile</Link>
                                </li> : ''}
                                <li className="nav-item">
                                    <Link onClick={hideNav} className={`nav-link ${active.pathname === '/about' ? 'active' : ''} `} to="/about">About</Link>
                                </li>
                            </div>
                        </ul>
                        {iNoteBookUser ? <button onClick={logout} className="btn btn-primary mx-1"  >Logout</button> : ''}
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Nav