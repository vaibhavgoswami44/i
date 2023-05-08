import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import userContext from '../../../context/user/UserContext';
import { Link } from 'react-router-dom';

const DeleteAccount = () => {
  const { authenticateUser, deleteUser, setiNoteBookUser } = useContext(userContext)
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [showHidePassword, setshowHidePassword] = useState('password')
  const [wrongPassword, setWrongPassword] = useState(false)
  const [deleteUserForm, setDeleteUserForm] = useState(false)
  const [title, setTitle] = useState({ title: "Verify it's you" })
  const [show, setShow] = useState(false);

  const verifyPassword = async () => {
    let result = await authenticateUser(password)

    if (result.status === 'Failed') {
      setWrongPassword(true)
      setDeleteUserForm(false)
    } else {
      setTitle({ title: "Confirm" })
      setWrongPassword(false)
      setDeleteUserForm(true)
    }
  }
  const deleteAccount = () => {
    deleteUser()
    navigate('/')
    setiNoteBookUser(null)
    localStorage.removeItem('iNoteBookUserDetails')
  }
  return (
    <>

      {/* Modal */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={() => {
          setShow(false);
          setDeleteUserForm(false);
          setTitle({ title: "Verify it's you" });
          setshowHidePassword('password');
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteUserForm ?
            <>
              <h2 className="fs-5">Are you sure you want delete your account</h2>
              <label className='d-block text-muted ' >You wil lost all your notes and you will never retrieve back your notes</label>
            </>
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
              <Link to='/forgot-password'> <span>Forgot Your Password?</span></Link>
            </form>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"
            onClick={() => {
              setShow(false);
              setDeleteUserForm(false);
              setTitle({ title: "Verify it's you" });
            }}>
            cancel
          </Button>
          {deleteUserForm ?
            <button onClick={deleteAccount} type="button" className='btn btn-danger'>Delete User</button>
            :
            <button onClick={verifyPassword} type="button" className="btn btn-primary">Verify</button>}
        </Modal.Footer>
      </Modal>

      <h4 className='mb-0'>Danger Zone</h4>
      <label className='d-block text-muted mt-0' >Irreversible and destructive actions</label>
      <div className='border p-3 m-3'>
        <h5>Delete user</h5>
        <label className='d-block text-muted ' >Once you Deleted your user,  there is no going back.<br />Please be certain.</label>
        <hr />
        <Button className='btn btn-danger mt-2' variant="primary" onClick={() => setShow(true)}>
          Delete user
        </Button>
      </div>
    </>
  )
}

export default DeleteAccount