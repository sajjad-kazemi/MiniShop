import {Typography} from '@mui/material'
import {DoNotDisturbOnOutlined} from '@mui/icons-material'
function NotFound() {
  return (
    <section>
      <DoNotDisturbOnOutlined color='error' sx={{mx:'auto',width:'100%',fontSize:150}}/>
      <Typography textAlign="center" color="error.light" variant="h3">
        Error 404
        <br />
        page not found!
      </Typography>
    </section>
  )
}

export default NotFound