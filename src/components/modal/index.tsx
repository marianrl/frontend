import React from 'react'
import './style.css'
import { RxCross2 } from 'react-icons/rx';

const Modal = () => {
    return (
        <div>
            <div className="Overlay">
                <div className="ContendorModal">
                    <div className="Encabezado">
                        <h3 className="TituloModal">Titulo</h3>
                    </div>

                    <button className="BotonCerrar">
                        <i className="Cruz"><RxCross2/></i>
                    </button>
                    <div className="Contenido">
                        <h1 className="TituloContenido">
                            Detalles Auditoria
                        </h1>
                        <p className ="Pe">
                            Este es el detalle de la auditoria
                        </p>
                        <button className ="Aceptar">
                            Aceptar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Modal;

