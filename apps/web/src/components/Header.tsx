import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { Share } from '@mui/icons-material'
import { client } from '../feathers/client'
import { MouseEventHandler, useContext, useState } from 'react'
import { userContext } from '../contexts/User'

const Header = () => {
  const [numberOfUsersOnline, setNumberOfUSersOnline] = useState(0)
  const { user } = useContext(userContext)!
  client.service('room-membership').getNumberOfUsers({
    groupId: user.groupId as string
  }).then(numberOfUsers => {
    setNumberOfUSersOnline(numberOfUsers)
  })



  client.service('room-membership').on('new-user', (number: number) => {
    console.log('new user')
    setNumberOfUSersOnline(number)
  })

  const shareActionHandler:MouseEventHandler<HTMLButtonElement> = () => {
    console.log(user.groupId)
  }
  return (
    <Box>
      <AppBar position="static" >
        <Toolbar sx={{
          justifyContent: 'space-between'
        }}>
        <Typography color="inherit" sx={{
          fontSize: 'small'
        }}>{numberOfUsersOnline === 1? <span>You are the only one here,<br/> click the share icon to copy your chat group link</span>: <span>{numberOfUsersOnline} people Online</span>}</Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={shareActionHandler}
          >
            <Share/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
