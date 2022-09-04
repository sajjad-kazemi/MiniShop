import App from './App'
// !!!!!!!!!!
import './main.css'
import {CssBaseline} from '@mui/material'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './features/store'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </Provider>
    </React.StrictMode>
)
