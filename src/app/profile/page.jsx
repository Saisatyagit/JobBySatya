

import React from 'react'
import { auth } from '../auth'
import Link from 'next/link'

export default async function Page() {
  const session = await auth()

  if (!session) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">Please sign in to view your profile.</div>
      </div>
    )
  }

  const { name, email } = session.user

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-3">👤 <strong>User Profile</strong></h2>

        <p className="mb-2">
          <strong>Name:</strong> {name}
        </p>
        <p className="mb-3">
          <strong>Email:</strong> {email}
        </p>

        <Link href="/api/auth/signout">
          <button className="btn btn-danger">Logout</button>
        </Link>
      </div>
    </div>
  )
}
