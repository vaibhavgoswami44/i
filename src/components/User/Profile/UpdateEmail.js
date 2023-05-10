import React, { useContext, useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import userContext from '../../../context/user/UserContext';
import { Link } from 'react-router-dom';
import alertContext from '../../../context/alert/AlertContext'


const UpdateEmail = () => {
    const { authenticateUser, getLoggedinUserData, updateEmailorPassword } = useContext(userContext)
    const { theme } = useContext(alertContext)
    const [showHidePassword, setshowHidePassword] = useState('password')
    //verify user
    const [password, setPassword] = useState('')
    //new email
    const [newEmail, setNewEmail] = useState('')
    //current email
    const [email, setEmail] = useState('')
    //if email already exits
    const [emailError, setEmailError] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)
    //change modal
    const [newEmailForm, setNewEmailForm] = useState(false)
    //modal title
    const [title, setTitle] = useState({ title: "Verify it's you" })
    //show modal
    const [show, setShow] = useState(false);


    const getdata = async () => {
        //get current email
        const a = await getLoggedinUserData();
        setEmail(a.email)
    };

    useEffect(() => {
        getdata();
        //eslint-disable-next-line
    }, []);

    const verifyPassword = async () => {
        let result = await authenticateUser(password)

        if (result.status === 'Failed') {
            setWrongPassword(true)
            setNewEmailForm(false)
        } else {
            setTitle({ title: "Enter New Email" })
            setWrongPassword(false)
            setNewEmailForm(true)
        }
    }
    const updateEmail = async () => {

        if (newEmail.length > 10) {
            const result = await updateEmailorPassword({ email: newEmail })
            if (result.status !== 'Failed') {
                setEmail(newEmail)
                setNewEmailForm(false)
                setTitle({ title: "Verify it's you" })
                setShow(false)
                setEmailError(false)
                setshowHidePassword('password');
            }
            else {
                setShow(true)
                setEmailError(true)
            }
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
                onHide={() => { setShow(false); setNewEmailForm(false); setTitle({ title: "Verify it's you" }); setEmailError(false); setshowHidePassword('password'); }}
            >
                <Modal.Header closeButton className={`bg-${theme}`}>
                    <Modal.Title>{title.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`bg-${theme}`} >
                    {newEmailForm ?
                        <form>
                            <label htmlFor="email" className="form-label">Enter New Email</label>
                            <input key='email' type='email' name='email' className="form-control" style={{ borderColor: emailError ? '#dc3545' : '#ced4da' }} id="email" onChange={(event) => setNewEmail(event.target.value)} />
                            <div style={{ height: '30px', color: '#dc3545' }} >{emailError ? 'Email Already Exists' : ''}</div>
                        </form>
                        : <form>
                            <label htmlFor="password" className="form-label">Enter Your Password</label>
                            <input key='emailVerifyPasswordKey' type={showHidePassword} name='password' className="form-control" style={{ borderColor: wrongPassword ? '#dc3545' : '#ced4da' }} id="password" onChange={(event) => setPassword(event.target.value)} />
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
                <Modal.Footer className={`bg-${theme}`}>
                    <Button variant="secondary" onClick={() => { setShow(false); setNewEmailForm(false); setTitle({ title: "Verify it's you" }); setEmailError(false); setshowHidePassword('password'); }}>
                        cancel
                    </Button>
                    {newEmailForm ?
                        <button onClick={updateEmail} type="button" className="btn btn-primary">Update Email</button>
                        :
                        <button onClick={verifyPassword} type="button" className="btn btn-primary">Verify</button>}
                </Modal.Footer>
            </Modal>

            <div className='mt-2'>
                <span className='d-block'>Email</span>
                <span className=' text-muted me-3' >{email}</span>
                <Button className={`mt-1 btn btn-${theme} `} variant="primary" onClick={() => setShow(true)}>
                    Change Email
                </Button>
            </div>
        </>
    )
}

export default UpdateEmail