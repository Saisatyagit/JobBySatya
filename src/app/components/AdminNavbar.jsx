import React from 'react'
import Link from 'next/link'
import JobPostForm from './ServerActions/Addjob'

function AdminNavbar() {
  return (
    <>
     <div className="navbar shadow-lg px-4 py-3 d-flex align-items-center justify-content-between bg-primary text-white">
      <div className="logo">
        <h1 className="m-0">Jobify</h1>
      </div>

      <div className="nav-links">
        <ul className="nav-list d-flex list-unstyled gap-4 m-0">
          <li className="nav-item">welcome: Admin</li>
          <Link href="/api/auth/signout" className="text-white text-decoration-none">
            <li className="nav-item">Logout</li>
          </Link>
        </ul>
      </div>
    
    </div>
    <div>
            <JobPostForm/>
          </div>
          </>
  )
}

export default AdminNavbar
