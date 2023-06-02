import React, { useContext, useState } from 'react'
import noteContext from '../../../context/note/NoteContext'
import Loader from '../../Loader'

const AddNote = () => {
    const { addNewNote } = useContext(noteContext)
    const [addnote, setAddNote] = useState({ title: " ", description: " ", tag: " " })
    const [titleError, setTitleError] = useState(false)
    const [tagError, setTagError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [display, setDisplay] = useState('none')
    const [color, setColor] = useState('')
    const [loadingTitle, setLoadingTitle] = useState('')


    const title = () => {
        if (addnote.title.length < 3) {
            setTitleError(true)
        }
        else {
            setTitleError(false)
        }
    }
    const tag = () => {
        if (addnote.tag.length < 3) {
            setTagError(true)
        }
        else {
            setTagError(false)
        }
    }
    const description = () => {
        if (addnote.description.length < 5) {
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
        setAddNote({ ...addnote, [e.target.name]: e.target.value })
    }
    const submitData = async (e) => {
        e.preventDefault();
        title()
        tag()
        description()
        if (!((addnote.title.length < 3) || (addnote.tag.length < 3) || (addnote.description.length < 5))) {
            setLoadingTitle('Adding New Note')
            setColor('green')
            setDisplay('flex')
            await addNewNote(addnote)
            setDisplay('none')
            setLoadingTitle('')
            setColor('')
            setAddNote({ title: " ", description: " ", tag: " " })
        }
    };
    return (
        <>
            <h3 className='mt-2' >Add New Note</h3>
            <hr />
            <form onSubmit={submitData}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input name='title' value={addnote.title} type="text" className="form-control" style={{ borderColor: titleError ? '#dc3545' : '#ced4da' }} id="title" onChange={handleChange} />
                    <div style={{ height: '30px', color: '#dc3545' }} >{titleError ? 'Title length must be at least 3 characters.' : ''}</div>
                </div>
                <div id='loader' className='container' style={{ position: 'absolute', display: display, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: '1055', }}>
                    <Loader title={loadingTitle} color={color} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" value={addnote.tag} name='tag' className="form-control" style={{ borderColor: tagError ? '#dc3545' : '#ced4da' }} id="tag" onChange={handleChange} />
                    <div style={{ height: '30px', color: '#dc3545' }} >{tagError ? 'Tag length must be at least 3 characters.' : ''}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" value={addnote.description} name='description' className="form-control" style={{ borderColor: descriptionError ? '#dc3545' : '#ced4da' }} id="description" onChange={handleChange} />
                    <div style={{ height: '30px', color: '#dc3545' }} >{descriptionError ? "Description length must be at least 5 characters." : ''}</div>
                </div>
                <hr />
                <button type="submit" className="btn btn-primary" disabled={((addnote.title.length < 3) || (addnote.tag.length < 3) || (addnote.description.length < 5))}>Add Note</button>
                <hr />
            </form>
        </>
    )
}

export default AddNote