document.addEventListener('DOMContentLoaded', () => {
    const formSenderismo = document.getElementById('formularioRegistroSenderismo');
    const formCena = document.getElementById('formularioRegistroCena');
    const formCabana = document.getElementById('formularioRegistroCabana');
    const formDisney = document.getElementById('formularioRegistroDisney');

    function registrarOcupacion(event, promocion) {
        event.preventDefault();
        const fecha = event.target.fecha.value;
        
        if (!fecha) {
            alert("Por favor, selecciona una fecha");
            return;
        }

        let registros = JSON.parse(localStorage.getItem('ocupaciones')) || {};
        
        if (!registros[promocion]) {
            registros[promocion] = [];
        }

        if (registros[promocion].includes(fecha)) {
            alert("Esta fecha ya está ocupada para esta promoción.");
        } else {
            registros[promocion].push(fecha);
            localStorage.setItem('ocupaciones', JSON.stringify(registros));
            alert("Ocupación registrada exitosamente para " + promocion + " en la fecha: " + fecha);
        }
    }

    if (formSenderismo) {
        formSenderismo.addEventListener('submit', (event) => registrarOcupacion(event, 'senderismo'));
    }
    if (formCena) {
        formCena.addEventListener('submit', (event) => registrarOcupacion(event, 'cena'));
    }
    if (formCabana) {
        formCabana.addEventListener('submit', (event) => registrarOcupacion(event, 'cabana'));
    }
    if (formDisney) {
        formDisney.addEventListener('submit', (event) => registrarOcupacion(event, 'disney'));
    }
});

function verRegistrosOcupacion() {
    let registros = JSON.parse(localStorage.getItem('ocupaciones')) || {};

    let mensaje = "Registros de Ocupación:\n";

    for (let promocion in registros) {
        mensaje += `\nPromoción: ${promocion.charAt(0).toUpperCase() + promocion.slice(1)}\n`;
        registros[promocion].forEach((fecha) => {
            mensaje += `  Fecha: ${fecha}\n`;
        });
    }

    if (mensaje === "Registros de Ocupación:\n") {
        mensaje = "No hay ocupaciones registradas.";
    }

    alert(mensaje);
}

function borrarRegistros() {
    if (confirm("¿Quieres borrar los registros que hay?")) {
        localStorage.removeItem('ocupaciones');
        alert("Todos tus registros han sido borrados.");
    }
}
