import React from 'react';
import { Redirect } from 'react-router-dom';
import './Bienvenida.css'


class Bienvenida extends React.Component {
    state = {
        status: null
    }

    selected_yes = () => {
        const bienvenida = document.querySelector('.bienvenida');
        bienvenida.classList.add('fadeIn')

        setTimeout(

            function () {
                this.setState({
                    status: 'yes'
                });
            }
                .bind(this),
            500
        );
    }

    selected_no = () => {
        const modal_contenedor = document.querySelector('.modal_contenedor');
        modal_contenedor.classList.toggle('show_modal')
    }


    render() {
        if (this.state.status === 'yes') {
            return <Redirect to="/count" />
        }

        return (
            <section className="bienvenida">
                <div className="bienvenida_contenedor">
                    <div className="logofep"> </div>
                    <div>
                        <h2>¿ERES MAYOR DE 18 AÑOS?</h2>

                        <div className="mayor_edad" >
                            <div onClick={this.selected_yes}>SÍ</div>
                            <div onClick={this.selected_no}>NO</div>
                        </div>
                    </div>
                </div>

                <div className="modal_contenedor" onClick={this.selected_no}>
                   <div className="modal">
                   <p> Lo sentimos, debes ser mayor de edad para ingresar a esta página</p>
                   </div>
                </div>
            </section>
        )
    }
}

export default Bienvenida;