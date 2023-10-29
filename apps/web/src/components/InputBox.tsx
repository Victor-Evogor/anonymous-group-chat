import { Box, Button, Stack, TextField } from '@mui/material'
import { SendRounded, AddPhotoAlternate, Close } from '@mui/icons-material'
import { useContext, useRef, useState } from 'react'
import { userContext } from '../contexts/User'

const InputBox = () => {
  const {nickname, setNickName} = useContext(userContext)!
  const imageInput = useRef<HTMLInputElement>(null)
  const imagePreview = useRef<HTMLImageElement>(null)
  const [isPreviewOPen, setIsPreviewOpen] = useState(false)
  const [imagePreviewBase64, setImagePreviewBase64] = useState('')

  return (
    <Box>
      <TextField id="outlined-basic" label="nickname" variant="outlined" disabled={!!nickname} onBlur={e=> setNickName(e.target.value)}/>
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
        }} ref={imageInput} onChange={e => {
          const reader = new FileReader()
          if (!e.target.files){
            return
          }
          const imageFile = e.target.files[0];

          reader.readAsDataURL(imageFile)
          reader.onload = e => {
            const base64ImageFile = e.target?.result
            if(!imagePreview.current){
              throw new Error('Preview component hasn\'t been mounted yet')
            }
            setIsPreviewOpen(true)
            imagePreview.current.src = base64ImageFile as string
            setImagePreviewBase64(base64ImageFile as string)
          }
        }}/>
      <Button onClick={() => {
        imageInput.current?.click()
      }}>
        <AddPhotoAlternate />
      </Button>
      <TextField id="outlined-basic" variant="outlined" multiline maxRows={4} sx={{
        flexGrow: 1
      }}/>
      <Button onClick={()=>{

      }}>
        <SendRounded/>
      </Button>
      </Stack>
    </Box>
  )
}

export default InputBox
