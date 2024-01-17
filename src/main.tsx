import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { ApiProvider } from '@reduxjs/toolkit/query/react'
// import { apiSlice } from './features/apiSlice.tsx'
import { Provider } from 'react-redux'
import { store } from './store.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
