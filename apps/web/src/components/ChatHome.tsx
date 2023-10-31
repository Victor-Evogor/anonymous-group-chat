import Header from './Header'
import Messages from './Messages'
import InputBox from './InputBox'
import Div100vh from '@alminde/react-div-100vh'
import css from '../css/app.module.css'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Button,
  Typography,
  Tooltip,
  Snackbar,
  Alert,
  Link,
} from '@mui/material'
import { ContentCopy, Favorite, LinkRounded } from '@mui/icons-material'
import { createContext, useContext, useState } from 'react'
import { userContext } from '../contexts/User'
import {
  copyToClipboard,
  copyToClipboardFallback
} from '../utils/copyToClipboard'
import { SetStateType } from '../../../../types/SetStateType'

interface DialogBoxContextType {
  isShareModalOpen: boolean
  setIsShareModalOpen: SetStateType<boolean>
  snackBarMessage: string
  setSnackBarMessage: SetStateType<string>
  isMenuOpen: boolean
  setIsMenuOpen: SetStateType<boolean>
}
export const DialogBox = createContext<DialogBoxContextType | null>(null)

export const ChatHome = () => {
  const { user } = useContext(userContext)!
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const { Provider } = DialogBox

  return (
    <Div100vh className={css.homeContainer}>
      <Provider
        value={{
          isShareModalOpen,
          setIsShareModalOpen,
          snackBarMessage,
          setSnackBarMessage,
          isMenuOpen,
          setIsMenuOpen
        }}
      >
        <Header />
      </Provider>
      <Messages />
      <InputBox />
      <Dialog
        open={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false)
        }}
      >
        <DialogTitle align="center">Share group with friends</DialogTitle>
        <DialogContent>
          <List
            subheader={
              <Stack direction="row" alignItems="center">
                <Typography variant="caption">
                  Group id: <strong>{user.groupId}</strong>
                </Typography>
                <Tooltip title="Copy group chat id">
                  <Button
                    onClick={async () => {
                      if (
                        (await copyToClipboard(user.groupId as string)) ===
                        false
                      ) {
                        await copyToClipboardFallback(user.groupId as string)
                      }
                      setIsShareModalOpen(false)
                    }}
                  >
                    <ContentCopy />
                  </Button>
                </Tooltip>
              </Stack>
            }
          >
            <ListItem>
              <ListItemButton
                onClick={async () => {
                  const groupLink = `${window.location.href}/join/${user.groupId}`
                  if ((await copyToClipboard(groupLink)) === false) {
                    await copyToClipboardFallback(groupLink)
                  }
                  setIsShareModalOpen(false)
                }}
              >
                <ListItemIcon>
                  <LinkRounded />
                </ListItemIcon>
                <ListItemText primary="Copy group link to clipboard" />
              </ListItemButton>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={!!snackBarMessage}
        autoHideDuration={3000}
        onClose={() => {
          setSnackBarMessage('')
        }}
      >
        <Alert
          onClose={() => {
            setSnackBarMessage('')
          }}
          severity={
            snackBarMessage === 'Someone left the group' ? 'error' : 'success'
          }
          sx={{ width: '100%' }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <DialogTitle align="center">
          <span>Made With </span>
          <Favorite color="error" /> <br />
          <Link component="a" href="https://linktr.ee/victorevogor" target='_blank'>
            &copy;Victor Evogor
          </Link>
          <span> {new Date().getFullYear()}</span><br/>
          <span>Thank you for visiting</span>
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemButton LinkComponent='a' href='https://forms.gle/Qb5LsGqskfNGwoUK6' target='_blank'>
                <ListItemText primary="Feeling generous? Be my hero by sponsoring me" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton LinkComponent='a' href='https://wa.me/+2349133240345?text=Hello,+I+have+a+contribution+to+the+anonymous+chat+project' target='_blank'>
                <ListItemText primary="Have a feature or noticed a bug? Make a report" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton LinkComponent='a' href='https://wa.me/+2349133240345?text=Hello,+I+would+like+to+book+a+consultation+with+you' target='_blank'>
                <ListItemText primary="Impressed? You can get a 1-2hr consultation on how to get started or level up your skills in tech" />
              </ListItemButton>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </Div100vh>
  )
}
