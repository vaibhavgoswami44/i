import { useState, useEffect, useContext } from "react";
import NoteContext from "./NoteContext";
import userContext from "../user/UserContext";
import alertContext from "../alert/AlertContext";

const NoteState = (props) => {
    const [notes, setNotes] = useState([])
    const { iNoteBookUser } = useContext(userContext)
    const { updateAlert, setProgress } = useContext(alertContext)
    const host = 'http://192.168.205.145:8080'
    useEffect(() => {
        if (iNoteBookUser) {
            featchNotes()
        }
        //eslint-disable-next-line
    }, [iNoteBookUser])
    //Get All Notes
    const featchNotes = async () => {
        try {
            setProgress(10)
            const response = await fetch(`${host}/api/notes/getallnotes`, {
                method: "GET",
                headers: {
                    "auth-token": iNoteBookUser.authToken
                }
            });
            setProgress(50)
            const data = await response.json()
            setProgress(80)
            setNotes(data.reverse())
            setProgress(100)
        } catch (error) {
            console.log(error);
        }
    }

    //Delete Notes
    const deleteNote = async (id) => {
        try {
            setProgress(10)
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": iNoteBookUser.authToken
                }
            });
            setProgress(50)
            const data = await response.json()
            // console.log(data);
            setProgress(80)
            updateAlert(data.status, data.msg)
            featchNotes()
            setProgress(100)
        } catch (error) {
            console.log(error);
        }

    }
    //Add Note
    const addNewNote = async (note) => {
        try {
            let headersList = {
                "auth-token": iNoteBookUser.authToken,
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify(note);

            setProgress(10)
            let response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            setProgress(50)
            let data = await response.json();

            setProgress(80) // console.log(data);
            updateAlert(data.status, data.msg)
            featchNotes()
            setProgress(100)
        } catch (error) {
            console.log(error);
        }
    }
    //Update Note
    const updateTheNote = async (note) => {
        try {
            let headersList = {
                "auth-token": iNoteBookUser.authToken,
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({ title: note.title, tag: note.tag, description: note.description });

            setProgress(10)
            let response = await fetch(`${host}/api/notes/updatenote/${note._id}`, {
                method: "PUT",
                body: bodyContent,
                headers: headersList
            });

            setProgress(50)
            let data = await response.json();

            setProgress(70) // console.log(data);
            updateAlert(data.status, data.msg)
            featchNotes()
            setProgress(100)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <NoteContext.Provider value={{ notes, deleteNote, addNewNote, updateTheNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState