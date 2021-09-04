import React, { useEffect } from 'react';
import Imessage from './components/imessage/Imessage';
import Login from './components/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from './firebase';

function App() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    
    useEffect(() =>{
        auth.onAuthStateChanged(authUser =>{
            if(authUser){
                // user is logged in
                dispatch(login({
                    uid:authUser.uid,
                    photo:authUser.photoURL,
                    email: authUser.email,
                    displayName : authUser.displayName
                }))
            }else{
                // user is logged out
                dispatch(logout())
            }
        })
    },[dispatch])

  return (
    <div>
      {user ? <Imessage/> : <Login/>}
    </div>
  );
}

export default App;
