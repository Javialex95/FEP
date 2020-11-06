import React from 'react';
import './conteo.css'
import Formulario from '../formulario/Formulario'

class Conteo extends React.Component {

    show_formulario = () => {
        const contenedor = document.querySelector('.contenedor');
        const contenedor_form = document.querySelector('.contenedor_form');
        const content_colombia = document.querySelector('.content_colombia');
        contenedor.classList.toggle('fadeOut');
        contenedor_form.classList.toggle('fadeIn_form');
        content_colombia.classList.toggle('fadeOut');
    }

    render() {
        // Set the date we're counting down to
        var countDownDate = new Date("Dec 11, 2020 15:00:00").getTime();

        // Update the count down every 1 second
        var x = setInterval(function () {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            document.getElementById("demo").innerHTML = "<div> <div>" + days + "<p>días</p></div> <span > : </span>  <div>" + hours + "<p>Horas</p></div> <span >:</span>  <div>" + minutes + "<p>Minutos</p></div> <span >:</span>  <div>" + seconds + "<p>Segundos</p></div> </div>";

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "EXPIRED";
            }
        }, 1000);
        return (
            <section className="conteo">
                <div className="logofep_conteo"></div>
                <div className="contador">
                    <div id="demo"></div>
                </div>

                <div className="contenedor">
                    <div className="validar" onClick={this.show_formulario}>VÁLIDA TU CÓDIGO VIP</div>
                    <div className="acceder_tienda">ACCEDE A LA TIENDA LIVE</div>
                </div>

                <div className="content_colombia">EL CONTENIDO SOLO ESTARÁ DISPONIBLE PARA COLOMBIA</div>


                <div className="contenedor_form">
                    <Formulario />
                </div>

            </section>
        )
    }
}

export default Conteo;