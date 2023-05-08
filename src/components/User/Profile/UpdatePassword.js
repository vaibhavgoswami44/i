import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import userContext from '../../../context/user/UserContext';
import { Link } from 'react-router-dom';


const UpdatePassword = () => {
    const { authenticateUser, getLoggedinUserData, updateEmailorPassword } = useContext(userContext)
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
    //show and hide modal
    const [show, setShow] = useState(false);
    //when was password changed
    const [lastPasswordChangedDate, setLastPasswordChangedDate] = useState('')
    // check password length 
    const [newPasswordLengthError, setNewPasswordLengthError] = useState(false)
    //check new password and new confirm password is same or note
    const [matchPasswordCPasswordError, setMatchPasswordCPasswordError] = useState(false)

    const getdata = async () => {
        //get when was password changed
        const a = await getLoggedinUserData();
        //converting date into readable string
        let date = new Date(a.lastPasswordChangedDate)
        let readableDate = date.toString()
        setLastPasswordChangedDate(readableDate)
    };

    useEffect(() => {
        getdata();
        //eslint-disable-next-line
    }, []);


    const verifyPassword = async () => {
        let result = await authenticateUser(password)

        if (result.status === 'Failed') {
            setWrongPassword(true)
            setNewPasswordForm(false)
        } else {
            setTitle({ title: "Enter New Password" })
            setWrongPassword(false)
            setNewPasswordForm(true)
            setshowHidePassword('password')
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
    const updateNewPassword = () => {
        handleNewPasswordLength()
        matchNewPassword()
        if (newPassword.length >= 8 && newPassword === newCPassword) {
            updateEmailorPassword({ password: newPassword })
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
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={() => { setShow(false); setNewPasswordForm(false); setTitle({ title: "Verify it's you" }); setshowHidePassword('password'); }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {newPasswordForm ?
                        <form>
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
                        : <form>
                            <label htmlFor="password" className="form-label">Enter Your Password</label>
                            <input key='oldPassword' type={showHidePassword} name='password' className="form-control" style={{ borderColor: wrongPassword ? '#dc3545' : '#ced4da' }} id="password" onChange={(event) => setPassword(event.target.value)} />
                            <div style={{ height: '30px', color: '#dc3545' }} >{wrongPassword ? 'Wrong Password' : ''}</div>
                            <div className="form-check">
                                <input onClick={() => showHidePassword === 'password' ? setshowHidePassword('text') : setshowHidePassword('password')} className="form-check-input" type="checkbox" value="" id="showPassword" />
                                <label className="form-check-label" htmlFor="showPassword">
                                    Show Password
                                </label>
                            </div>
                            <Link to='/forgot-password'> <span>Forgot Your Password?</span></Link>
                        </form>
                    }
                </Modal.Body>
                <Modal.Footer>
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
                <span className=' text-muted' >Last Changed on {lastPasswordChangedDate.slice(0, 25)}</span>
                <Button className='mx-3 btn btn-light border' variant="primary" onClick={() => setShow(true)}>
                    Change Password
                </Button>
            </div>
        </>
    )
}

export default UpdatePassword