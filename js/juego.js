// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [document.querySelector("#img-1"), document.querySelector("#img-2"), document.querySelector("#img-3")],
  [document.querySelector("#img-4"), document.querySelector("#img-5"), document.querySelector("#img-6")],
  [document.querySelector("#img-7"), document.querySelector("#img-8"), document.querySelector("#img-9")]
];

var grillaGanadora = [
  [document.querySelector("#img-1"), document.querySelector("#img-2"), document.querySelector("#img-3")],
  [document.querySelector("#img-4"), document.querySelector("#img-5"), document.querySelector("#img-6")],
  [document.querySelector("#img-7"), document.querySelector("#img-8"), document.querySelector("#img-9")]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila: 2,
  columna: 2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano() {
  var contador = 0;
  for (var fila = 0; fila <= grilla.length - 1; fila++) {
    for (var columna = 0; columna <= grilla[0].length - 1; columna++) {
      contador++;
      if (grilla[fila][columna].getAttribute("id") != grillaGanadora[fila][columna].getAttribute("id") && contador < 9) {
        return false;
      } else if (grilla[fila][columna].getAttribute("id") === grillaGanadora[fila][columna].getAttribute("id") && contador == 9) {
        mostrarCartelGanador(chequearSiGano);
        return true;
      }
    }
  }
}

// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(chequearSiGano) {
  let cartel = chequearSiGano;

  let fondoOscuro = document.querySelector("#dark-background");
  let cartelGanador = document.querySelector("#cartel-ganador");
  let botonCerrar = document.querySelector("#cerrar");
  let botonVolverJugar = document.querySelector("#jugar");

  if (cartel) {
    fondoOscuro.setAttribute("style", "transition: 1s; display:block;");
    cartelGanador.setAttribute("style", "transition: 1s; display:block;");

    botonCerrar.addEventListener("click", function() {
      fondoOscuro.setAttribute("style", "transition: .5s; display:none;");
      cartelGanador.setAttribute("style", "transition: .5s; display:none;");
      location.reload();
    });

    botonVolverJugar.addEventListener("click", function() {
      fondoOscuro.setAttribute("style", "transition: .5s; display:none;");
      cartelGanador.setAttribute("style", "transition: .5s; display:none;");
      location.reload();
    });
  }
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  let pizarra = document.querySelector("#juego");

  let piezaUno = grilla[fila1][columna1];
  let clonPiezaUno = piezaUno.cloneNode();

  let piezaDos = grilla[fila2][columna2];
  let clonPiezaDos = piezaDos.cloneNode();

  grilla[fila1][columna1] = clonPiezaDos;
  grilla[fila2][columna2] = clonPiezaUno;

  pizarra.replaceChild(clonPiezaDos, piezaUno);
  pizarra.replaceChild(clonPiezaUno, piezaDos);
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}

// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
  if ((fila >= 0 & columna >= 0) && (fila <= 2 & columna <= 2)) {
    return true;
  } else {
    return false;
  }
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion) {

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if (direccion == 40) {
    nuevaFilaPiezaVacia = posicionVacia.fila + 1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila - 1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna + 1;
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna - 1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
      nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}

// Extras, ya vienen dadas

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
    mezclarPiezas(veces - 1);
  }, 100);
}

function capturarTeclas() {
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if (gano) {
      setTimeout(function() {
        mostrarCartelGanador();
      }, 500);
    }
    evento.preventDefault();
  })
}

function iniciar() {
  mezclarPiezas(60);
  capturarTeclas();
}


iniciar();
