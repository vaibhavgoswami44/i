import AlertState from "./alert/AlertState";
import NoteState from './note/NoteState';
import UserState from "./user/UserState";

const CombinedState = (props) => {
  return (
    <AlertState>
      <UserState>
        <NoteState>
          {props.children}
        </NoteState>
      </UserState>
    </AlertState>
  )
}

export default CombinedState