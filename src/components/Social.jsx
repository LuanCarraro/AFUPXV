import React from 'react'

function Social() {
    return (
        <div>
            <h6 className="mb-3">O que iremos estudar hoje?</h6>
            <div className="d-flex overflow-auto gap-5 py-4" style={{ whiteSpace: 'nowrap' }}>
                <div className="d-flex flex-column align-items-center">
                    <img src="assets/img/materia.png" className="carrosel-materias rounded-circle" alt="materia" />
                    <span className='pt-2'>Materia</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <img src="assets/img/materia.png" className="carrosel-materias rounded-circle" alt="materia" />
                    <span className='pt-2'>Materia</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <img src="assets/img/materia.png" className="carrosel-materias rounded-circle" alt="materia" />
                    <span className='pt-2'>Materia</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <img src="assets/img/materia.png" className="carrosel-materias rounded-circle" alt="materia" />
                    <span className='pt-2'>Materia</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <img src="assets/img/materia.png" className="carrosel-materias rounded-circle" alt="materia" />
                    <span className='pt-2'>Materia</span>
                </div>
            </div>
        </div>
    )
}

export default Social