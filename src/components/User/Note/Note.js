import React, { useContext, useState } from 'react'
import noteContext from '../../../context/note/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import generalContext from '../../../context/general/generalContext';
import Loader from '../../Loader'

const Note = () => {
    const { notes, updateTheNote } = useContext(noteContext)
    const { theme, loading } = useContext(generalContext)
    const [updateNoteValue, setUpdateNoteValue] = useState({ title: " ", description: " ", tag: " ", _id: '' })
    const [titleError, setTitleError] = useState(false)
    const [tagError, setTagError] = useState(false)
    const [updateNoteLoader, setupdateNoteLoader] = useState(false)
    const [show, setShow] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)

    const updateNote = (note) => {
        setShow(true)
        const { title, description, tag, _id } = note
        setUpdateNoteValue({ title, description, tag, _id })
    }

    const title = () => {
        if (updateNoteValue.title.length < 3) {
            setTitleError(true)
        }
        else {
            setTitleError(false)
        }
    }
    const tag = () => {
        if (updateNoteValue.tag.length < 3) {
            setTagError(true)
        }
        else {
            setTagError(false)
        }
    }
    const description = () => {
        if (updateNoteValue.description.length < 5) {
            setDescriptionError(true)
        }
        else {
            setDescriptionError(false)
        }
    }
    const handleChange = (e) => {
        if (e.target.name === 'title') { title() }
        if (e.target.name === 'tag') { tag() }
        if (e.target.name === 'description') { description() }
        setUpdateNoteValue({ ...updateNoteValue, [e.target.name]: e.target.value })
    }
    const submitData = async (event) => {
        event.preventDefault()
        title()
        tag()
        description()
        if (!((updateNoteValue.title.length < 3) || (updateNoteValue.tag.length < 3) || (updateNoteValue.description.length < 5))) {
            setupdateNoteLoader(true)
            await updateTheNote(updateNoteValue)
            setupdateNoteLoader(false)
            setShow(false);
        }
    }

    return (
        <>
            <AddNote />

            <Modal
                data-bs-theme={theme}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered show={show} onHide={() => { setShow(false); setDescriptionError(false); setTagError(false); setTitleError(false) }}
            >
                <Modal.Header closeButton className={` bg-body-tertiary text-${theme === 'dark' ? 'light' : 'dark'}-emphasis`}>
                    <Modal.Title>Update Note</Modal.Title>
                </Modal.Header >
                {updateNoteLoader ?
                    <Modal.Body className={` bg-body-tertiary text-${theme === 'dark' ? 'light' : 'dark'}-emphasis`}>
                        <Loader title='Updating Note' color='green' />
                    </Modal.Body>
                    :
                    <Modal.Body className={` bg-body-tertiary text-${theme === 'dark' ? 'light' : 'dark'}-emphasis`}>
                        <form onSubmit={submitData}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input name='title' type="text" className="form-control" style={{ borderColor: titleError ? '#dc3545' : '#ced4da' }} id="title" value={updateNoteValue.title} onChange={handleChange} />
                                <div style={{ height: '30px', color: '#dc3545' }} >{titleError ? 'Title length must be at least 3 characters.' : ''}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" name='tag' className="form-control" style={{ borderColor: tagError ? '#dc3545' : '#ced4da' }} id="tag" value={updateNoteValue.tag} onChange={handleChange} />
                                <div style={{ height: '30px', color: '#dc3545' }} >{tagError ? 'Tag length must be at least 3 characters.' : ''}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type='text' name='description' className="form-control" style={{ borderColor: descriptionError ? '#dc3545' : '#ced4da' }} id="description" value={updateNoteValue.description} onChange={handleChange} />
                                <div style={{ height: '30px', color: '#dc3545' }} >{descriptionError ? "Description length must be at least 5 characters." : ''}</div>
                            </div>
                        </form>
                    </Modal.Body>
                }
                <Modal.Footer className={` bg-body-tertiary text-${theme === 'dark' ? 'light' : 'dark'}-emphasis`}>
                    <Button variant="secondary" onClick={() => { setShow(false); setDescriptionError(false); setTagError(false); setTitleError(false) }}>
                        Close
                    </Button>
                    <button type="button" onClick={submitData} className="btn btn-primary" disabled={((updateNoteValue.title.length < 3) || (updateNoteValue.tag.length < 3) || (updateNoteValue.description.length < 5))}>Update Note</button>
                </Modal.Footer>
            </Modal>


            {loading ? <Loader title='featching Notes' color='green' /> : <div className='d-flex flex-wrap mb-5'  >
                {notes.length === 0 ? 'No Notes To Display' :
                    notes.map((item) => {
                        return <NoteItem key={item._id} updateNote={updateNote} note={item} />
                    })}
            </div>}
        </>
    )
}

export default Note