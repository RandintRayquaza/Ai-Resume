import React from 'react'
import AppRouter from './routes/app.routes'
import { AuthProvider } from './Features/auth/state/auth.context'

const App = () => {
  return (
    <>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
    </>
  )
}

export default App