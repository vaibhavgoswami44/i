import { useState, useEffect, useContext } from "react";
import userContext from './UserContext'
import alertContext from "../alert/AlertContext";

const UserState = (props) => {
    const { updateAlert, setProgress, theme, setTheme } = useContext(alertContext)
    const [iNoteBookUser, setiNoteBookUser] = useState(JSON.parse(localStorage.getItem('iNoteBookUserDetails')))
    const host = 'http://192.168.205.145:8080'

    useEffect(() => {
        if (iNoteBookUser) {
            setTheme(iNoteBookUser.theme)
        }
        else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
                setTheme('dark')
            }
            else {
                setTheme('light')
            }
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (iNoteBookUser) {
            getLoggedinUserData()
        }
        //eslint-disable-next-line
    }, [])


    //Create User signUp
    const signUp = async (loginCredentials) => {
        try {

            setProgress(10)
            let headersList = {
                "Content-Type": "application/json"
            }

            setProgress(30)
            let bodyContent = JSON.stringify(loginCredentials, theme);

            setProgress(50)
            let response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            setProgress(70)
            let data = await response.json();

            setProgress(90)   // console.log(data);
            if (data.status === 'Failed') {
                updateAlert(data.status, data.msg)
            }
            else {
                updateAlert(data.status, data.msg)
                const userDetails = { authToken: data.authToken, profilePicture: data.profilePicture, name: data.name, theme: data.theme }
                localStorage.setItem('iNoteBookUserDetails', JSON.stringify(userDetails))
                setiNoteBookUser(userDetails)
            }
            setProgress(100)
            return data
        } catch (error) {
            console.log(error);
        }
    }

    //Login 
    const login = async (loginCredentials) => {
        try {

            setProgress(10)
            let headersList = {
                "Content-Type": "application/json"
            }

            setProgress(30)
            let bodyContent = JSON.stringify(loginCredentials);
            setProgress(50)
            let response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            setProgress(70)
            let data = await response.json();

            setProgress(90)
            // console.log(data);
            if (data.status === 'Failed') {
                updateAlert(data.status, data.msg)
            }
            else {
                updateAlert(data.status, data.msg)
                // console.log(data);
                const userDetails = { authToken: data.authToken, profilePicture: data.profilePicture, name: data.name, theme: data.theme }
                localStorage.setItem('iNoteBookUserDetails', JSON.stringify(userDetails))
                setiNoteBookUser(userDetails)
            }
            setProgress(100)
            return data
        } catch (error) {
            console.log(error);
        }
    }

    //Get Logged in user Data 
    const getLoggedinUserData = async () => {
        try {
            setProgress(20)
            let headersList = {
                "auth-token": iNoteBookUser.authToken
            }

            setProgress(50)
            let response = await fetch(`${host}/api/auth/getuser`, {
                method: "POST",
                headers: headersList
            });

            setProgress(80)
            let data = await response.json();
            setProgress(90)
            // console.log(data);
            const userDetails = { authToken: iNoteBookUser.authToken, profilePicture: data.profilePicture, name: data.name, theme: data.theme }
            localStorage.removeItem('iNoteBookUserDetails')
            localStorage.setItem('iNoteBookUserDetails', JSON.stringify(userDetails))
            setiNoteBookUser(userDetails)
            setProgress(100)
            return { ...data }
        } catch (error) {
            console.log(error);
        }

    }

    //Update User Details
    const updateUserDetails = async (user) => {
        setProgress(10)
        const formData = new FormData()
        formData.append("profilePicture", user.profilePicture)
        formData.append("birthDate", user.birthDate)
        formData.append("gender", user.gender)
        formData.append("name", user.name)

        try {
            setProgress(30)
            let headersList = {
                "auth-token": iNoteBookUser.authToken
            }
            setProgress(50)
            let response = await fetch(`${host}/api/auth/updateUserDetails`, {
                method: "PUT",
                headers: headersList,
                body: formData
            });
            setProgress(70)
            let data = await response.json();
            // console.log(data);
            setProgress(90)
            updateAlert(data.status, data.msg)
            const userDetails = { authToken: iNoteBookUser.authToken, profilePicture: data.profilePicture, name: data.name, theme: iNoteBookUser.theme }
            localStorage.removeItem('iNoteBookUserDetails')
            localStorage.setItem('iNoteBookUserDetails', JSON.stringify(userDetails))
            setiNoteBookUser(userDetails)
            setProgress(100)
        } catch (error) {
            console.log(error);
        }

    }

    //authenticate user for update email or password or delete account
    const authenticateUser = async (password) => {
        setProgress(10)
        try {
            let headersList = {
                "Content-Type": "application/json",
                'auth-token': iNoteBookUser.authToken
            }
            setProgress(30)

            let bodyContent = JSON.stringify({ password });
            setProgress(50)
            let response = await fetch(`${host}/api/auth/authenticate`, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            setProgress(70)
            let data = await response.json();
            // console.log(data);
            setProgress(100)
            return data
        } catch (error) {
            console.log(error);
        }
    }

    //update email or password
    const updateEmailorPassword = async (credentials) => {
        try {
            setProgress(10)
            let headersList = {
                "Content-Type": "application/json",
                'auth-token': iNoteBookUser.authToken
            }
            setProgress(50)
            let bodyContent = JSON.stringify(credentials);
            setProgress(70)
            let response = await fetch(`${host}/api/auth/updateEmailorPassword`, {
                method: "PUT",
                body: bodyContent,
                headers: headersList
            });
            setProgress(90)
            let data = await response.json();
            updateAlert(data.status, data.msg)
            // console.log(data);
            setProgress(100)
            return data
        } catch (error) {
            console.log(error);
        }
    }


    //Delete uaer
    const deleteUser = async () => {
        try {
            setProgress(30)
            const response = await fetch(`${host}/api/auth/deleteUser`, {
                method: "DELETE",
                headers: {
                    "auth-token": iNoteBookUser.authToken
                }
            });
            setProgress(60)
            const data = await response.json()
            // console.log(data);
            setProgress(90)
            updateAlert(data.status, data.msg)
            setProgress(100)
        } catch (error) {
            console.log(error);
        }

    }

    //get OTP for resting password
    const generateOTP = async (email) => {
        setProgress(10)
        try {
            let headersList = {
                "Content-Type": "application/json",
            }
            setProgress(30)
            let bodyContent = JSON.stringify({ email });
            setProgress(50)
            let response = await fetch(`${host}/api/auth/forgot-password`, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            setProgress(70)
            let data = await response.json();
            setProgress(90)
            updateAlert(data.status, data.msg)
            // console.log(data);
            setProgress(100)
            return data
        } catch (error) {
            console.log(error);
        }
    }
    //verify OTP for resting password
    const verifyOTP = async (otp, email) => {
        try {
            setProgress(10)
            let headersList = {
                "Content-Type": "application/json",
            }

            setProgress(50)
            let bodyContent = JSON.stringify({ otp, email });
            setProgress(60)
            let response = await fetch(`${host}/api/auth/verify-otp`, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            setProgress(80)
            let data = await response.json();
            setProgress(90)
            updateAlert(data.status, data.msg)
            // console.log(data);
            setProgress(100)
            return data
        } catch (error) {
            console.log(error);
        }
    }

    //reset password
    const resetPassword = async (email, password) => {
        try {
            setProgress(10)
            let headersList = {
                "Content-Type": "application/json",
            }

            setProgress(30)
            let bodyContent = JSON.stringify({ password, email });
            setProgress()
            let response = await fetch(`${host}/api/auth/reset-password`, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            setProgress(50)
            let data = await response.json();
            updateAlert(data.status, data.msg)
            setProgress(70)
            // console.log(data);
            setProgress(100)
            return data
        } catch (error) {
            console.log(error);
        }
    }

    //update theme
    const updateTheme = async (theme) => {
        try {
            let headersList = {
                "auth-token": iNoteBookUser.authToken,
                "Content-Type": "application/json"
            }
            let bodyContent = JSON.stringify(theme);
            let response = await fetch(`${host}/api/auth/update-theme`, {
                method: "PUT",
                headers: headersList,
                body: bodyContent
            });
            let data = await response.json();
            // console.log(data);
            const userDetails = { authToken: iNoteBookUser.authToken, profilePicture: iNoteBookUser.profilePicture, name: iNoteBookUser.name, theme: data.theme }
            // console.log(userDetails)
            localStorage.removeItem('iNoteBookUserDetails')
            localStorage.setItem('iNoteBookUserDetails', JSON.stringify(userDetails))
            setiNoteBookUser(userDetails)
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <userContext.Provider value={{ login, signUp, getLoggedinUserData, iNoteBookUser, setiNoteBookUser, updateUserDetails, authenticateUser, updateEmailorPassword, deleteUser, generateOTP, verifyOTP, resetPassword, updateTheme }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState