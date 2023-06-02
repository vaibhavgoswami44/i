import AlertState from "./alert/AlertState";
import GeneralState from "./general/generalState";
import NoteState from './note/NoteState';
import UserState from "./user/UserState";

const CombinedState = (props) => {
  return (
    <GeneralState>
      <AlertState>
        <UserState>
          <NoteState>
            {props.children}
          </NoteState>
        </UserState>
      </AlertState>
    </GeneralState>
  )
}

export default CombinedState