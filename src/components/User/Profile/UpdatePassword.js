import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import userContext from '../../../context/user/UserContext';
import { Link } from 'react-router-dom';
import generalContext from '../../../context/general/generalContext';
import Loader from '../../Loader';


const UpdatePassword = () => {
    const { authenticateUser, getLoggedinUserData, updateEmailorPassword } = useContext(userContext)
    const { theme } = useContext(generalContext)
    const [showHidePassword, setshowHidePassword] = useState('password')
    //old password
    const [password, setPassword] = useState('')
    //new password
    const [newPassword, setNewPassword] = useState('')
    //confirm new password
    const [newCPassword, setNewCPassword] = useState('')
    //if user enter wrong password for updating new password 
    const [wrongPassword, setWrongPassword] = useState(false)
    //change modal 
    const [newPasswordForm, setNewPasswordForm] = useState(false)
    //modal title
    const [title, setTitle] = useState({ title: "Verify it's you" })
    const [email, setEmail] = useState('')
    //show and hide modal
    const [show, setShow] = useState(false);
    //when was password changed
    const [lastPasswordChangedDate, setLastPasswordChangedDate] = useState('')
    // check password length 
    const [newPasswordLengthError, setNewPasswordLengthError] = useState(false)
    //check new password and new confirm password is same or note
    const [matchPasswordCPasswordError, setMatchPasswordCPasswordError] = useState(false)


    const [loader, setLoader] = useState()
    const [loaderTitle, setLoaderTitle] = useState()
    const [loaderTextColor, setLoaderTextColor] = useState()

    const getdata = async () => {
        //get when was password changed
        const a = await getLoggedinUserData();
        //converting date into readable string
        let date = new Date(a.lastPasswordChangedDate)
        let readableDate = date.toString()
        setEmail(a.email)
        setLastPasswordChangedDate(readableDate)
    };

    useEffect(() => {
        getdata();
        //eslint-disable-next-line
    }, []);


    const verifyPassword = async (event) => {
        event.preventDefault()
        setLoader(true)
        setLoaderTitle('Verifying Password')
        setLoaderTextColor('green')
        let result = await authenticateUser(password)

        if (result.status === 'Failed') {
            setWrongPassword(true)
            setNewPasswordForm(false)
            setLoader(false)
            setLoaderTitle('')
            setLoaderTextColor('')
        } else {
            setTitle({ title: "Enter New Password" })
            setWrongPassword(false)
            setNewPasswordForm(true)
            setshowHidePassword('password')
            setLoader(false)
            setLoaderTitle('')
            setLoaderTextColor('')
        }
    }

    const handleNewPasswordLength = () => {
        if (newPassword.length >= 8) {
            setNewPasswordLengthError(false)
        }
        else {
            setNewPasswordLengthError(true)
        }
    }
    const matchNewPassword = () => {
        if (newPassword === newCPassword) {
            setMatchPasswordCPasswordError(false)
        }
        else {
            setMatchPasswordCPasswordError(true)
        }
    }
    const updateNewPassword = async (event) => {
        event.preventDefault()
        handleNewPasswordLength()
        matchNewPassword()
        if (newPassword.length >= 8 && newPassword === newCPassword) {
            setLoader(true)
            setLoaderTitle('Updating Password')
            setLoaderTextColor('green')
            await updateEmailorPassword({ password: newPassword })
            setLoader(false)
            setLoaderTitle('')
            setLoaderTextColor('')
            setLastPasswordChangedDate(Date())
            setNewPasswordForm(false)
            setTitle({ title: "Verify it's you" })
            setShow(false)
            setshowHidePassword('password')
        }
    }

    return (
        <>
            {/* Modal */}
            <Modal
                data-bs-theme={theme}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={() => { setShow(false); setNewPasswordForm(false); setTitle({ title: "Verify it's you" }); setshowHidePassword('password'); }}
            >
                <Modal.Header closeButton className={` bg-body-tertiary text-${theme === 'dark' ? 'light' : 'dark'}-emphasis`}>
                    <Modal.Title>{title.title}</Modal.Title>
                </Modal.Header>
                {loader ?
                    <Modal.Body className={` bg-body-tertiary text-${theme === 'dark' ? 'light' : 'dark'}-emphasis`}>
                        <Loader title={loaderTitle} color={loaderTextColor} />
                    </Modal.Body>
                    :
                    <Modal.Body className={` bg-body-tertiary text-${theme === 'dark' ? 'light' : 'dark'}-emphasis`}>
                        {newPasswordForm ?
                            <form onSubmit={updateNewPassword}>
                                <label htmlFor="password" className="form-label">Enter Your New Password</label>
                                <input key='newPassword' style={{ borderColor: newPasswordLengthError || matchPasswordCPasswordError ? '#dc3545' : '#ced4da' }} type={showHidePassword} name='password' className="form-control" id="password" onChange={(event) => setNewPassword(event.target.value)} />
                                <div style={{ height: '30px', color: '#dc3545' }} >{newPasswordLengthError ? 'Password length must be at least 8 characters.' : ''}</div>
                                <label htmlFor="cpassword" className="form-label">Confirm Your New Password</label>
                                <input type={showHidePassword} name='cpassword' className="form-control" style={{ borderColor: matchPasswordCPasswordError ? '#dc3545' : '#ced4da' }} id="cpassword" onChange={(event) => setNewCPassword(event.target.value)} />
                                <div style={{ height: '30px', color: '#dc3545' }} >{matchPasswordCPasswordError ? 'Password Not Match' : ''}</div>
                                <div className="form-check">
                                    <input onClick={() => showHidePassword === 'password' ? setshowHidePassword('text') : setshowHidePassword('password')} className="form-check-input" type="checkbox" value="" id="showPassword" />
                                    <label className="form-check-label" htmlFor="showPassword">
                                        Show Password
                                    </label>
                                </div>
                            </form>
                            : <form onSubmit={verifyPassword}>
                                <label htmlFor="password" className="form-label">Enter Your Password</label>
                                <input key='oldPassword' type={showHidePassword} name='password' className="form-control" style={{ borderColor: wrongPassword ? '#dc3545' : '#ced4da' }} id="password" onChange={(event) => setPassword(event.target.value)} />
                                <div style={{ height: '30px', color: '#dc3545' }} >{wrongPassword ? 'Wrong Password' : ''}</div>
                                <div className="form-check">
                                    <input onClick={() => showHidePassword === 'password' ? setshowHidePassword('text') : setshowHidePassword('password')} className="form-check-input" type="checkbox" value="" id="showPassword" />
                                    <label className="form-check-label" htmlFor="showPassword">
                                        Show Password
                                    </label>
                                </div>
                                <Link to='/forgot-password' state={email}> <span>Forgot Your Password?</span></Link>
                            </form>
                        }
                    </Modal.Body>
                }
                <Modal.Footer className={` bg-body-tertiary text-${theme === 'dark' ? 'light' : 'dark'}-emphasis`}>
                    <Button variant="secondary" onClick={() => { setShow(false); setNewPasswordForm(false); setTitle({ title: "Verify it's you" }); setshowHidePassword('password');; }}>
                        cancel
                    </Button>
                    {newPasswordForm ?
                        <button onClick={updateNewPassword} type="button" className="btn btn-primary">Change Password</button>
                        :
                        <button onClick={verifyPassword} type="button" className="btn btn-primary">Verify</button>}
                </Modal.Footer>
            </Modal>

            <div className='mt-2'>
                <span className='d-block'>Password</span>
                <span className=' text-muted me-3' >Last changed &nbsp;{lastPasswordChangedDate.slice(3, 15)}</span>
                <Button className={`mt-1 btn btn-light `} variant="primary" onClick={() => setShow(true)}>
                    Change Password
                </Button>
            </div>
        </>
    )
}

export default UpdatePassword