import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import About from './components/About';
import Alert from './components/Alert';
import { useContext } from 'react';
import Login from './components/logs/Login';
import SignUp from './components/logs/SignUp';
import HomePage from './components/HomePage';
import ProfilePage from './components/User/Profile/ProfilePage';
import UserHome from './components/User/UserHome';
import alertContext from './context/alert/AlertContext';
import userContext from './context/user/UserContext';
import ResetPassword from './components/ResetPassword';
import LoadingBar from 'react-top-loading-bar'

function App() {
  const { alertState, progress, setProgress } = useContext(alertContext)
  const { iNoteBookUser } = useContext(userContext)

  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Nav />
      <div className='my-3' style={{height:'50px'}} >
        {alertState.status && <Alert key={alertState.msg} msg={alertState.msg} status={alertState.status} />}
      </div>
      <div className='container'>
        <Routes>
          <Route path='/forgot-password' element={<ResetPassword />} />
          {iNoteBookUser ?
            <>
              <Route path='/' exact element={<UserHome />} />
              <Route path='/profile' exact element={<ProfilePage />} />
              <Route path='/*' exact element={<UserHome />} />
            </>
            :
            <>
              <Route path='/' exact element={<HomePage />} />
              <Route path='/signup' element={<SignUp />} />

              <Route path='/login' element={<Login />} />
              <Route path='/*' exact element={<HomePage />} />
            </>
          }
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
