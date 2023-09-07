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
    0: {
        0: 500,
        1: 5,
    },
    1: {
        0: 200,
        1: 15,
    },
    2: {
        0: 50,
        1: 35,
    },
    3: {
        0: 100,
        1: 40,
    },
    4: {
        0: 150,
        1: 15,
    },
    5: {
        0: 60,
        1: 37,
    },
    6: {
        0: 100,
        1: 3,
    },
    7: {
        0: 125,
        1: 9,
    },
    8: {
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
    } else {
        return 'Error';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mainForm');
    const mainSelect = document.getElementById('nombreBebida');
    const cantGrado = document.getElementById('cantAlcohol');
    const cantCheckbox = document.getElementById('alcoholCheckbox');
    const cantMl = document.getElementById('cantBebida');

    cantCheckbox.addEventListener('change', function(event) {
        if (event.target.checked) {
            cantMl.style.display = 'block';
            console.log("mostrar cant ml");
        } else {
            cantMl.style.display = 'none';
            console.log("no mostrar cant ml");
        }
    });

    mainSelect.addEventListener('change', function(event) {
        const bebida = event.target.value;
        if (bebida !== '88') {
            cantGrado.style.display = 'none';
            console.log("no mostrar grado");
        } else {
            cantGrado.style.display = 'block';
            console.log("mostrar cant ml");
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const pesoPersona = document.getElementById('peso').value;
        const sexoPersona = document.getElementById('sexo').value;
        const tipoCuerpo = document.getElementById('tipoCuerpo').value;
        const bebida = document.getElementById('nombreBebida').value;
        const responseDiv = document.getElementById('result');
        const RPersona = R_Values[sexoPersona][tipoCuerpo];

        if (!cantCheckbox.checked) {
            cantMl.value = infoBebidas[bebida][0];
        }

        if (mainSelect.value !== '88') {
            cantGrado.value = infoBebidas[bebida][1];
        }

        const alcoholemia = ((((cantMl.value * cantGrado.value) * 0.789) / 100) / (pesoPersona * RPersona)).toFixed(2);

        responseDiv.innerHTML = `
            <h1>La alcoholemia es de ${alcoholemia} g/l</h1>
            <p>${getAlcoholEffects(alcoholemia)}</p>
        `;
    });
});