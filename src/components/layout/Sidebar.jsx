import React from 'react'

function Sidebar() {
  return (
    <div className="row me-1">
      <div id="sidebar" className="align-items-center d-flex flex-column" style={{ height: '100vh', width: '105px', backgroundColor: '#1F2225', overflowY: 'auto' }}>
        <div className="logo pt-4">
          <img src="assets/img/logo.jpg" alt="logo" className='rounded-circle' width={60} height={60} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar