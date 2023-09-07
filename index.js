const R_Values = {
    0: {
        0: 0.85,
        1: 0.76,
        2: 0.64,
        3: 0.75,
    },
    1: {
        0: 0.76,
        1: 0.67,
        2: 0.58,
        3: 0.67,
    }
}

const infoBebidas = {
    "Cerveza": {
        0: 500,
        1: 5,
    },
    "Vino": {
        0: 200,
        1: 15,
    },
    "Vodka": {
        0: 50,
        1: 35,
    },
    "Whisky": {
        0: 100,
        1: 40,
    },
    "Sake": {
        0: 150,
        1: 15,
    },
    "Tequilla": {
        0: 60,
        1: 37,
    },
    "Sidra": {
        0: 100,
        1: 3,
    },
    "Champagne": {
        0: 125,
        1: 9,
    },
    "Ginebra": {
        0: 50,
        1: 37,
    }
}

const infoAlcoholemia = {
    0 : `Se afectan los centros corticales:
    Memoria, atención y juicio están perturbados. Dificultad para asociar ideas.
    Falta de compostura y de autocrítica.
    La depresión de los centros corticales superiores, inhibe los centros corticales inferiores, que resultan ser los regulan el comportamiento, si se liberan se pierden los "buenos modales" (conducta más espontánea e infantil).`,
    1: `Se afectan los centros subcorticales, que intervienen
    en la postura y movimientos voluntarios.
    Hay alteraciones en el habla, en la postura, en la marcha y diplopía (visión doble).
    La falta de autocontrol puede llevar a agresividad y a actos de violencia.`,
    2: `Se deprimen los centros espinales (los más internos).
    Sueño profundo que puede llevar a inconciencia, estupor y coma.`,
    3: `Se deprimen los centros bulbares, éstos controlan
    la respiración y la función cardiovascular.
    El coma puede ser profundo y desencadenarse una parálisis respiratoria.`,
    4: `No deberias poder estar usando esto`
}

const carritoBebidas = []

const getAlcoholEffects = (alcoholemia) => {
    if (alcoholemia > 0 && alcoholemia < 1) {
        return infoAlcoholemia[0];
    } else if (alcoholemia >= 1 && alcoholemia < 2) {
        return infoAlcoholemia[1];
    } else if (alcoholemia >= 2 && alcoholemia < 3) {
        return infoAlcoholemia[2];
    } else if (alcoholemia >= 3 && alcoholemia < 4) {
        return infoAlcoholemia[3];
    } else if (alcoholemia >= 4){
        return infoAlcoholemia[4];
    } else if (alcoholemia === 0) {
        return "Estas bien, tomate algo"
    } else {
        return 'Error';
    }
};

const checkIfRegisterIsInCarrito = (registro) => {
    for (let i = 0; i < carritoBebidas.length; i++) {
        if (carritoBebidas[i].bebida === registro.bebida && carritoBebidas[i].volumen === registro.volumen && carritoBebidas[i].alcoholemia === registro.alcoholemia) {
            carritoBebidas[i].cantidad += registro.cantidad;
            return;
        }
    }
    carritoBebidas.push(registro);
    return;
};

const discountRegister = (index) => {
    if (carritoBebidas[index].cantidad === 1) {
        removeRegister(index);
    } else {
        carritoBebidas[index].cantidad -= 1;
        refreshList();
    }
}

const removeRegister = (index) => {
    carritoBebidas.splice(index, 1);
    refreshList();
};

const refreshList = () => {
    const checkoutList = document.getElementById('bebidasList');
    checkoutList.innerHTML = '';
    for (let i = 0; i < carritoBebidas.length; i++) {
        const li = document.createElement('li');
        li.classList.add('register-item');
        li.innerHTML = `
            <div class="register-info">
                <p>${carritoBebidas[i].cantidad} ${carritoBebidas[i].bebida} de ${carritoBebidas[i].volumen}ml</p>
            </div>
            <div class="register-actions">
                <button onclick="discountRegister(${i})">-</button>
                <button onclick="removeRegister(${i})">Eliminar</button>
            </div>
        `;
        checkoutList.appendChild(li);
    }
};

const verifyMainForm = () => {
    const responseDiv = document.getElementById('result');
    const cantGrado = document.getElementById('cantAlcohol').value;
    const cantMl = document.getElementById('cantBebida').value;
    const pesoPersona = document.getElementById('peso').value;
    let errorMessage = '';

    if (cantGrado === '') {
        errorMessage = 'Por favor, ingresar graduacion alcoholica';
    } else if (cantMl === '') {
        errorMessage = 'Por favor, ingresar cantidad de bebida';
    } else if (pesoPersona === '') {
        errorMessage = 'Por favor, ingresar peso';
    }

    if (errorMessage !== '') {
        responseDiv.innerHTML = `
            <h2>Error</h2>
            <p>${errorMessage}</p>
        `;
        return false;
    } else {
        return true;
    }
};

const VerifyCheckoutForm = () => {
    const responseDiv = document.getElementById('result');

    if (carritoBebidas.length === 0) {
        responseDiv.innerHTML = `
            <h2>Error</h2>
            <p>Por favor, ingresar al menos una bebida</p>
        `;
        return false;
    } else {
        return true;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mainForm');
    const mainSelect = document.getElementById('nombreBebida');
    const cantGrado = document.getElementById('cantAlcohol');
    const cantCheckbox = document.getElementById('alcoholCheckbox');
    const cantMl = document.getElementById('cantBebida');
    const checkoutForm = document.getElementById("checkoutForm");

    cantCheckbox.addEventListener('change', function(event) {
        if (event.target.checked) {
            cantMl.style.display = 'block';
        } else {
            cantMl.style.display = 'none';
        }
    });

    mainSelect.addEventListener('change', function(event) {
        const bebida = event.target.value;
        if (bebida !== 'Otro') {
            cantGrado.style.display = 'none';
        } else {
            cantGrado.style.display = 'block';
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!verifyMainForm()) {
            return;
        }

        const pesoPersona = document.getElementById('peso').value;
        const sexoPersona = document.getElementById('sexo').value;
        const tipoCuerpo = document.getElementById('tipoCuerpo').value;
        const bebida = document.getElementById('nombreBebida').value;
        const RPersona = R_Values[sexoPersona][tipoCuerpo];

        if (!cantCheckbox.checked) {
            cantMl.value = infoBebidas[bebida][0];
        }

        if (mainSelect.value !== 'Otro') {
            cantGrado.value = infoBebidas[bebida][1];
        }

        const alcoholemia = ((((cantMl.value * cantGrado.value) * 0.789) / 100) / (pesoPersona * RPersona));
        const volumen = cantMl.value;
        const cantidad = 1;

        const registroBebida = {
            bebida,
            volumen,
            alcoholemia,
            cantidad
        }

        checkIfRegisterIsInCarrito(registroBebida);
        refreshList();

        console.log(carritoBebidas);
    });

    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if (!VerifyCheckoutForm()) {
            return;
        }

        console.log(carritoBebidas[0].alcoholemia);
        const responseDiv = document.getElementById('result');
        let alcoholemiaFinal = 0;

        for (let i = 0; i < carritoBebidas.length; i++) {
            alcoholemiaFinal += (carritoBebidas[i].alcoholemia) * carritoBebidas[i].cantidad;
        }

        const effects = getAlcoholEffects(alcoholemiaFinal);

        responseDiv.innerHTML = `
            <h2>Alcoholemia Final: ${alcoholemiaFinal.toFixed(2)}</h2>
            <p>${effects}</p>
        `;
    });
});