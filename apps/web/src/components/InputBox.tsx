import { Box, Button, Stack, TextField } from '@mui/material'
import { SendRounded, AddPhotoAlternate, Close } from '@mui/icons-material'
import { ChangeEventHandler, MouseEventHandler, useContext, useRef, useState } from 'react'
import { userContext } from '../contexts/User'
import { Message } from '../../../../types/Message'
import { client } from '../feathers/client'

const InputBox = () => {
  const {nickname, setNickName} = useContext(userContext)!
  const imageInput = useRef<HTMLInputElement>(null)
  const imagePreview = useRef<HTMLImageElement>(null)
  const messageBox = useRef<HTMLInputElement>(null)
  const [isPreviewOPen, setIsPreviewOpen] = useState(false)
  const {user} = useContext(userContext)!
  const [imagePreviewBase64, setImagePreviewBase64] = useState('')
  const max_username_length = 15

  const handleFileInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const reader = new FileReader()
          if (!e.target.files){
            return
          }
          const imageFile = e.target.files[0];

          reader.readAsDataURL(imageFile)
          reader.onload = ev => {
            const base64ImageFile = ev.target?.result
            if(!imagePreview.current){
              throw new Error('Preview component hasn\'t been mounted yet')
            }
            setIsPreviewOpen(true)
            imagePreview.current.src = base64ImageFile as string
            setImagePreviewBase64(base64ImageFile as string)
            e.target.files = null
          }
  }

  const sendMessage: MouseEventHandler<HTMLButtonElement> = () => {
    if(!user.id || !messageBox.current || !user.groupId){
      return ;
    }

    if(!messageBox.current.value && !imagePreviewBase64){
      return;
    }
    const message: Message = {
      authorId: user.id,
      id: user.id,
      message: messageBox.current.value,
      image: imagePreviewBase64,
      authorName: !nickname? 'Anonymous User': nickname,
      timestamp: (new Date()).toString(),
      color: user.color
    }
    console.log('sending message')
    client.service('room-membership').sendMessage({
      groupId: user.groupId,
      body: message
    })
    messageBox.current.value = ''
    setImagePreviewBase64('')
    setIsPreviewOpen(false)
    if(imageInput.current){
      imageInput.current.files = null
      imageInput.current.value = ''
    }
  }

  return (
    <Box>
      <TextField id="outlined-basic" label="nickname" variant="outlined" disabled={!!nickname} onBlur={e=> setNickName(e.target.value)} onChange={e => {
        if(e.target.value.length >= max_username_length){
          e.target.value = e.target.value.slice(0, max_username_length + 1)
        }
      }}/>
      <Stack direction='row' sx={{
        display: isPreviewOPen? 'flex' : 'none'
      }}>
      <img src='' alt='' style={{
        width: '5rem',
        height: '5rem'
      }} ref={imagePreview}/>
      <Button onClick={()=>{
        setImagePreviewBase64('')
        setIsPreviewOpen(false)
      }}>
        <Close/>
      </Button>
      </Stack>
      <Stack direction='row' width='100%'>
      <input type='file' accept='image/*' style={{
          display: 'none'
        }} ref={imageInput} onChange={handleFileInput} />
      <Button onClick={() => {
        imageInput.current?.click()
      }}>
        <AddPhotoAlternate />
      </Button>
      <TextField id="outlined-basic" variant="outlined" multiline maxRows={4} sx={{
        flexGrow: 1
      }} inputRef={messageBox}/>
      <Button onClick={sendMessage}>
        <SendRounded/>
      </Button>
      </Stack>
    </Box>
  )
}

export default InputBox
