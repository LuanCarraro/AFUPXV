import React from 'react'

function Header() {
    return (
        <div className="header-box w-100">
            <div className="row d-flex ">
                <div className="col">
                    <i class="bi bi-person-circle" style={{ color: 'purple' }}></i>
                </div>
                <div className="col gap-3 d-flex justify-content-end">
                    <i className="bi bi-fire" style={{ color: 'red' }}></i>
                    <i className="bi bi-bell-fill" style={{ color: 'white' }}></i>
                    <i className="bi bi-gear" style={{ color: 'white' }}></i>
                </div>
            </div>
        </div>)
}

export default Header