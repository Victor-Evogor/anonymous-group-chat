import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import { Menu, Share } from '@mui/icons-material'
import { client } from '../feathers/client'
import { MouseEventHandler, useContext, useState } from 'react'
import { userContext } from '../contexts/User'
import { DialogBox } from './ChatHome'

const Header = () => {
  const [numberOfUsersOnline, setNumberOfUSersOnline] = useState(0)
  const { user } = useContext(userContext)!
  const { setIsShareModalOpen, setSnackBarMessage, setIsMenuOpen } = useContext(DialogBox)!
  client
    .service('room-membership')
    .getNumberOfUsers({
      groupId: user.groupId as string
    })
    .then((numberOfUsers) => {
      setNumberOfUSersOnline(numberOfUsers)
    })

  client.service('room-membership').on('new-user', (number: number) => {
    console.log(number < numberOfUsersOnline)
    console.log(number, numberOfUsersOnline)
    if (number < numberOfUsersOnline) {
      setSnackBarMessage('Someone left the group')
    } else {
      setSnackBarMessage('Someone joined the group')
    }
    setNumberOfUSersOnline(number)
  })

  const shareActionHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setIsShareModalOpen(true)
  }
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: 'space-between'
          }}
        >
          <Typography
            color="inherit"
            sx={{
              fontSize: 'small'
            }}
          >
            {numberOfUsersOnline === 1 ? (
              <span>
                You are the only one here,
                <br /> click the share icon to copy your chat group link
              </span>
            ) : (
              <span>{numberOfUsersOnline} people Online</span>
            )}
          </Typography>
          <Stack direction="row">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={shareActionHandler}
            >
              <Share />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setIsMenuOpen(true)
              }}
            >
              <Menu />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
