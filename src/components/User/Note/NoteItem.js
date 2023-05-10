import React, { useContext } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import noteContext from '../../../context/note/NoteContext';
import alertContext from '../../../context/alert/AlertContext';

const NoteItem = (props) => {
    const { tag, title, description, _id } = props.note;
    const { deleteNote } = useContext(noteContext);
    const { theme } = useContext(alertContext)

    return (
        <>
            <div className={`demo `} ></div>
            <div className='card m-1' style={{ width: '18rem' }}>
                <div className={`card-body bg-${theme}`}>
                    <h5 className='card-title'>
                        {title}
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id={`tooltip-delete-${_id}`}>Delete Note</Tooltip>}>
                            <i className='bi bi-trash3 mx-1' onClick={() => { deleteNote(_id) }}></i>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id={`tooltip-edit-${_id}`}>Edit Note</Tooltip>}>
                            <i className='bi bi-pencil-square mx-1' onClick={() => { props.updateNote(props.note) }} ></i>
                        </OverlayTrigger>
                    </h5>
                    <h6 className='card-subtitle mb-2 text-muted'>{tag}</h6>
                    <p className='card-text'>{description}</p>
                </div>
            </div>
        </>
    );
};

export default NoteItem;