import React, { useContext, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import noteContext from '../../../context/note/NoteContext';
import generalContext from '../../../context/general/generalContext';
import Loader from '../../Loader';

const NoteItem = (props) => {
    const { tag, title, description, _id } = props.note;
    const { deleteNote } = useContext(noteContext);
    const { theme } = useContext(generalContext)
    const [display, setDisplay] = useState('none')
    const [color, setColor] = useState('')
    const [loadingTitle, setLoadingTitle] = useState('')

    const deleteNoteIcon = async () => {
        setLoadingTitle('Deleting')
        setColor('red')
        setDisplay('flex')

        await deleteNote(_id)
        
        setDisplay('none')
        setLoadingTitle('')
        setColor('')

    }

    const updateNoteIcon = () => {

        props.updateNote(props.note);

    }

    return (
        <>
            <div className={`text-${theme==='dark'?'light':'dark'}-emphasis card m-1 bg-body-tertiary`} style={{ width: '18rem' }} data-bs-theme={theme}>
                <div id='loader' style={{ position: 'absolute', height: '100%', width: '100%', display: display, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: '1055' }}>
                    <Loader title={loadingTitle} color={color} />
                </div>
                <div className={`card-body`}>
                    <div className='card-title d-flex justify-content-between'>
                        <h5>
                            {title}
                        </h5>
                        <h5>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id={`tooltip-delete-${_id}`}>Delete Note</Tooltip>}>
                                <i className='bi bi-trash3 mx-1' onClick={deleteNoteIcon}></i>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id={`tooltip-edit-${_id}`}>Edit Note</Tooltip>}>
                                <i className='bi bi-pencil-square mx-1' onClick={updateNoteIcon} ></i>
                            </OverlayTrigger>
                        </h5>
                    </div>
                    <h6 className='card-subtitle mb-2 text-muted'>{tag}</h6>
                    <p className='card-text'>{description}</p>
                </div>
            </div>
        </>
    );
};

export default NoteItem;