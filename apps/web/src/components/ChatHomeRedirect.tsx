import { useParams, useNavigate, Navigate} from 'react-router-dom'
import { client, socket } from '../feathers/client';
import { useContext } from 'react';
import { userContext } from '../contexts/User';

export const ChatHomeRedirect = () =>{
  const {id} = useParams();
  const  navigate = useNavigate()
  const { setUser, user } = useContext(userContext)!
  if (id){
    client.service('room-membership').join({
      groupId: id
    }).then(({successful, error})=>{
      if(successful){
        setUser({
          ...user,
          id: socket.id,
          groupId: id
        })
        navigate('/chat-group')
      }else {
        console.error(error)
        navigate('/')
      }
    })
  } else {
    return <Navigate to='/'/>
  }
  return <div>{id}</div>
}
