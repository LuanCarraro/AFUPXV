import React from 'react'

function Sidebar() {
  return (
    <section className="sidebar d-flex flex-column align-items-center h-100 py-3" style={{ width: '105px', backgroundColor: '#1F2225' }}>
      <div className="logo">
        <img src="assets/img/logo.jpg" alt="logo" className="rounded-circle" width={60} height={60} />
      </div>
    </section>
  )
}

export default Sidebar