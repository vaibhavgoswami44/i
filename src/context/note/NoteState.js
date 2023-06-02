import { useState, useEffect, useContext } from "react";
import NoteContext from "./NoteContext";
import userContext from "../user/UserContext";
import generalContext from "../general/generalContext";
import alertContext from "../alert/AlertContext";

const NoteState = (props) => {
    const [notes, setNotes] = useState([])
    const { iNoteBookUser } = useContext(userContext)
    const { updateAlert } = useContext(alertContext)
    const { setLoading, setProgress } = useContext(generalContext)
    const host = process.env.REACT_APP_HOST
    useEffect(() => {
        if (iNoteBookUser) {
            featchNotes()
        }
        //eslint-disable-next-line
    }, [])
    //Get All Notes
    const featchNotes = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${host}/api/notes/getallnotes`, {
                method: "GET",
                headers: {
                    "auth-token": iNoteBookUser.authToken
                }
            });
            const data = await response.json()
            setNotes(data.reverse())
            setLoading(false)

        } catch (error) {
            updateAlert('danger', [`Can't connect to  Server  Please try Again After some time`])
            console.log(error);
        }
    }

    //Delete Notes
    const deleteNote = async (id) => {
        setProgress(10)
        try {
            setProgress(30)
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": iNoteBookUser.authToken
                }
            });
            setProgress(60)
            const data = await response.json()
            setProgress(80)
            // console.log(data);
            updateAlert(data.status, data.msg)
            const newNotes = notes.filter((note) => { return note._id !== id })
            setProgress(90)
            setNotes(newNotes)
            setProgress(100)


        } catch (error) {
            updateAlert('danger', [`Can't connect to  Server  Please try Again After some time`])
            console.log(error);
        }

    }
    //Add Note
    const addNewNote = async (note) => {
        setProgress(10)
        try {
            setProgress(30)
            let headersList = {
                "auth-token": iNoteBookUser.authToken,
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify(note);
            setProgress(50)
            let response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            setProgress(70)
            let data = await response.json();
            setProgress(90)
            console.log(data);
            updateAlert(data.status, data.msg)
            setNotes([...notes, data.createnote])
            setProgress(100)
        } catch (error) {
            updateAlert('danger', [`Can't connect to  Server  Please try Again After some time`])
            console.log(error);
        }
    }
    //Update Note
    const updateTheNote = async (note) => {
        setProgress(10)
        try {
            let headersList = {
                "auth-token": iNoteBookUser.authToken,
                "Content-Type": "application/json"
            }
            setProgress(30)
            let bodyContent = JSON.stringify({ title: note.title, tag: note.tag, description: note.description });

            let response = await fetch(`${host}/api/notes/updatenote/${note._id}`, {
                method: "PUT",
                body: bodyContent,
                headers: headersList
            });
            setProgress(50)
            let data = await response.json();
            setProgress(80)
            // console.log(data);
            updateAlert(data.status, data.msg)
            let newNotes = notes
            setProgress(90)
            // console.log(newNotes)
            for (let index = 0; index < newNotes.length; index++) {
                let element = newNotes[index]
                if (element._id === note._id) {
                    element.title = note.title
                    element.description = note.description
                    element.tag = note.tag
                }
            }
            setProgress(100)
        } catch (error) {
            updateAlert('danger', [`Can't connect to  Server  Please try Again After some time`])
            console.log(error);
        }
    }


    return (
        <NoteContext.Provider value={{ notes, deleteNote, addNewNote, updateTheNote,setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState