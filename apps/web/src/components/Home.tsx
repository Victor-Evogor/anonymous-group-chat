import { Button, Container, Paper, Stack, TextField } from '@mui/material'
import Div100vh from '@alminde/react-div-100vh'
import { MouseEventHandler, useContext, useRef } from 'react'
import { socket, client } from '../feathers/client'
import { userContext } from '../contexts/User'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()
  const inputFieldRef = useRef<HTMLInputElement>()
  const { setUser, user } = useContext(userContext)!

  const createGroupHandler: MouseEventHandler<HTMLButtonElement> = () => {
    client.service('room-membership').create({}).then(groupId => {
      setUser({
        ...user,
        id: socket.id,
        groupId
      })
      navigate('/chat-group')
    })
  }

  const joinGroupHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (!inputFieldRef.current) return
    if (inputFieldRef.current.value.length < 5) return
    const groupId = inputFieldRef.current.value
    client.service('room-membership').join({
      groupId
    }).then(({successful, error})=>{
      if(successful){
        setUser({
          ...user,
          id: socket.id,
          groupId
        })
        navigate('/chat-group')
      }else {
        console.error(error)
      }
    })
  }

  return (
    <Div100vh>
      <Container
        sx={{
          height: '100%',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <Paper
          sx={{
            paddingY: 2
          }}
        >
          <Container>
            <Stack spacing={2}>
              <TextField label="Group ID" inputRef={inputFieldRef} />
              <Button variant="outlined" onClick={joinGroupHandler}>
                Join Group Chat
              </Button>
              <Button variant="contained" onClick={createGroupHandler}>
                Create New Group Chat
              </Button>
            </Stack>
          </Container>
        </Paper>
      </Container>
    </Div100vh>
  )
}
