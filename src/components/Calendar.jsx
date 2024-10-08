import React from 'react'

function Calendar() {
    return (
        <div className="events d-flex flex-grow-1 rounded-4 p-4" style={{ backgroundColor: '#251F4A' }}>
            <div className="row justify-content-between">
                <div className="col-6">
                    <img src="assets/img/calendar.png" alt="calendar" className='w-100' />
                </div>
                <div className="col-5">
                    <div className="w-100 h-100 rounded-4 mx-2 p-3" style={{ backgroundColor: 'white' }}>
                        <div style={{ color: 'purple' }}>
                            <span>Próximos eventos</span>
                            <ul>
                                <li>21/09 - Prova de POO</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default Calendar