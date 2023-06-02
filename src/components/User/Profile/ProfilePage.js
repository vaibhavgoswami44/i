import React, { useContext, useEffect, useState } from 'react';
import DeleteAccount from './DeleteAccount';
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import userContext from '../../../context/user/UserContext';
import alertContext from '../../../context/alert/AlertContext';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Loader from '../../Loader';
import generalContext from '../../../context/general/generalContext';

const ProfilePage = () => {
  const { getLoggedinUserData, updateUserDetails } = useContext(userContext);
  const { updateAlert } = useContext(alertContext)
  const { theme, loading, setLoading } = useContext(generalContext)
  //user details
  const [user, setUser] = useState({ profilePicture: '', birthDate: '', gender: '', name: '' });
  const [imageSrc, setImageSrc] = useState(undefined);

  const getdata = async () => {
    setLoading(true)
    const a = await getLoggedinUserData();
    setLoading(false)
    const dateString = a.birthDate ? a.birthDate.slice(0, 10) : ''
    setUser({ ...a, birthDate: birthDate ? '' : dateString });
    setImageSrc(a.profilePicture);
  };

  useEffect(() => {
    getdata();
    //eslint-disable-next-line
  }, []);

  const { birthDate, gender, name } = user;

  //Profile Image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    //check if uploaded file is not image
    if (file && file.type.includes('image/')) {
      //show image 
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        const mimeType = reader.result.split(",")[0].split(":")[1].split(";")[0];
        const base64String = `data:${mimeType};base64,${base64}`;
        setImageSrc(base64String)
      };
      reader.readAsDataURL(file);

      setUser({ ...user, profilePicture: event.target.files[0] });
    } else {
      updateAlert('danger', 'Please Select Image File')
      setUser({ ...user, profilePicture: imageSrc });
    }
  };

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateProfile = (event) => {
    event.preventDefault()
    updateUserDetails(user)
  }

  return (
    <>{loading ?
      <Loader title='Getting Your Details' color='green' />
      :
      <>
        <h4 className='mb-0' >Profile</h4>
        <span className='d-block text-muted mt-0' >Your Personal information</span>
        <div className='border p-3 m-3'>
          <form className='mt-2' onSubmit={updateProfile}>
            <div className="mb-1 d-flex align-items-center flex-column ">
              <div>
                <img className='rounded-circle' style={{ height: '110px', width: '110px' }} src={imageSrc} alt='Profile' />
                <div className='d-flex justify-content-end' >
                  <label htmlFor="profilePicture" className="form-label">
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id={`tooltip-edit`}>Select New Image</Tooltip>}>
                      <i className="bi bi-images"></i>
                    </OverlayTrigger>
                  </label>
                </div>
                <input name='profilePicture' type='file' accept='image/*' className="form-control d-none" id="profilePicture" onChange={handleImageUpload} />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">User Name</label>
              <input type='text' name='name' className="form-control" value={name} id="name" onChange={handleOnChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="birthDate" className="form-label">Birth Date</label>
              <input type='date' name='birthDate' className="form-control" value={birthDate} id="birthDate" onChange={handleOnChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label d-block">Gender</label>
              <input className="form-check-input me-1" type="radio" name="gender" id="Male" onChange={() => setUser({ ...user, gender: 'male' })} checked={gender === 'male'} />
              <label className="me-2 form-label">Male</label>
              <input className="form-check-input" type="radio" name="gender" id="Female" onChange={() => setUser({ ...user, gender: 'female' })} checked={gender === 'female'} />
              <label className="ms-1 form-label">Female</label>
            </div>
            <div className=' d-flex align-items-center flex-column' >
              <button type="submit" className={`btn btn-${theme} `}>Update Profile</button>
            </div>
          </form>
        </div>

        <h4 className='mt-2 mb-0'>Security</h4>
        <span className='d-block text-muted mt-0' >Update your Email and Password</span>
        <div className='border p-3 m-3'>
          <UpdateEmail key='updatEmail' />
          <UpdatePassword key='updatePassword' />
        </div>
        <DeleteAccount />
      </>
    }
    </>
  );
};

export default ProfilePage;