import { Box, Modal } from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'

import {closeModal} from '../../features/commonInfo/commonInfoSlice'
import {getModal} from '../../features/commonInfo/commonInfoSlice'

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

function Login() {

  const open = useSelector(getModal)
  const dispatch = useDispatch();
  const handleClose = ()=>{
    dispatch(closeModal())
  }
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          Please Log in
          <input type="text" />
        </Box>
      </Modal>
    </>
  )
}

export default Login