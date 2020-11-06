import React from 'react';
import './Formulario.css'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator'

// Imagenes
import iconocheck from '../../assets/img/generales/iconocheckok.png'
import iconoerror from '../../assets/img/generales/iconoerror.png'

class Formulario extends React.Component {

    codigoRef = React.createRef();
    operatorRef = React.createRef();

    state = {
        codigo: {},
        status: null,
        codefinal: ''
    }

    constructor(props) {
        super(props);
        // Se carga el objeto para validar el formulario
        // En el curso utiliza el componentWillMount
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio',
                min: 'El código debe de tener al menos 16 dígitos'
            }
        });
    }

    changeState = () => {
        this.setState({
            codigo: {
                "eventId": "-MLKB-tNAxfOLRiJ3cmZ",
                "code": this.codigoRef.current.value,
                "operator": this.operatorRef.current.value
            }
        })
    }

    ingresarCodigo = async (e) => {
        e.preventDefault();

        // Rellenar el state con formulario
        this.changeState();

        if (this.validator.allValid()) {
            // Petición http por post para el código
            await axios.post('https://api-v5.rebustech.io/custom/validate-token-to-estereo-picnic-movistar', this.state.codigo, {
                headers: {
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6Ii1NS3BqWk0xSTVsalNqYnFqcDQ3In0.GHGAyYxGIgJtx9fGiwsh97sq_nxwblMTzuf6RoJ81BU'
                }
            })
                .then(res => {
                    console.log(res)
                    this.setState({
                        message: res.data.message,
                        codefinal: this.codigoRef.current.value,
                        status: 'success'
                    })
                })
                .catch(err =>
                    this.setState({
                        message: err.response.data.message,
                        codefinal: this.codigoRef.current.value,
                        status: 'failed',
                        codigo: {
                            "code": '',
                        }
                    })
                );
        } else {
            this.validator.showMessages();
            this.forceUpdate()
            this.setState({
                status: 'No success'
            })
        }
    }

    returnForm = () => {
        
        const failed_form = document.querySelector('.failed_form');
        const realForm = document.querySelector('#realForm');
        realForm.classList.remove('fadeOut');
        failed_form.classList.remove('fadeIn_form');
        this.setState({
            status: null
        })
    }

    render() {

        const realForm = document.querySelector('#realForm');
        const success_form = document.querySelector('.success_form');
        const failed_form = document.querySelector('.failed_form');

        if (this.state.status === 'success') {
            realForm.classList.add('fadeOut')
            success_form.classList.add('fadeIn_form')
        }

        if (this.state.status === 'failed') {
            realForm.classList.add('fadeOut')
            failed_form.classList.add('fadeIn_form')
        }

        return (
            <section className="formulario">
                <div className="form">
                    <form id={"realForm"} onSubmit={this.ingresarCodigo}>
                        <div>
                            <label htmlFor="codigo">INGRESA TU CÓDIGO DE ACCESO</label> <br />
                            <input type="text" name="codigo" ref={this.codigoRef} onChange={this.changeState} value={this.state.codigo.code} />

                            {this.validator.message('codigo', this.state.codigo.code, 'required|min:16')}

                        </div>


                        <div>
                            <label htmlFor="operator">¿CUÁL ES TU OPERADOR DE TELEFONÍA MÓVIL?</label> <br />
                            <select name="operator" id="operador" ref={this.operatorRef} onChange={this.changeState}>
                                <option value="Movistar">Movistar</option>
                                <option value="Claro">Claro</option>
                                <option value="Avantel">Avantel</option>
                                <option value="Tigo">Tigo</option>
                                <option value="Virgin Mobile">Virgin Mobile</option>
                            </select>
                        </div>


                        <input type="submit" value="INGRESAR" />
                    </form>


                </div>
                {/* MENSAJE CUANDO SEA EXITOSO EL CÓDIGO */}
                <div className="success_form">
                    <p>{this.state.codefinal}</p>
                    Tu código ha sido validado correctamente.
                    Podrás usarlo del 11 al 13 de diciembre en
                    esta misma página para acceder al
                    contenido VIP del festival.
                    <img src={iconocheck} alt="check" />
                    <div className="acceder_tienda">ACCEDE A LA TIENDA LIVE</div>
                </div>

                {/* MENSAJE CUANDO SEA EXITOSO EL CÓDIGO */}
                <div className="failed_form">
                    <p>{this.state.codefinal}</p>
                    Tu código está mal escrito o es inválido.
                    ¡Por favor inténtalo nuevamente!
                    <img src={iconoerror} alt="error" />
                    <div onClick={this.returnForm} className="acceder_tienda">REINTENTAR</div>
                </div>
            </section>
        )
    }
}

export default Formulario;