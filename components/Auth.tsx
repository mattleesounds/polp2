import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react";

const Auth = () => {
  const [data: session, status: loading] = useSession()
  return (
    <div>Auth</div>
  )
}

export default Auth