String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, "");
}

function clsNumeros(pasoTiempo, pasoPuntaje, semilla, balaInicial, numerossTope) {
	this.statusContinue = 1;
	this.nivel = 1;
	this.largoString = 0;
	this.arreglo = new Array();
	this.deltaTiempo = pasoTiempo;
	this.puntaje = pasoPuntaje;
	this.numeroRnd = semilla;
	this.disparador = balaInicial;
	this.maxNumeros = numerossTope;

}
clsNumeros.prototype.genRnd = function () {
	this.numeroRnd = Math.random() * 9;
	this.numeroRnd = Math.round(this.numeroRnd);
}

clsNumeros.prototype.addNumeros = function () {
	this.arreglo.push(this.numeroRnd);
}

clsNumeros.prototype.addPuntaje = function (addPuntos) {
	this.puntaje += addPuntos;
}

clsNumeros.prototype.increTime = function (dTiempo) {
	this.deltaTiempo += dTiempo;
}

clsNumeros.prototype.decreTime = function (dTiempo) {
	this.deltaTiempo -= dTiempo;
}

clsNumeros.prototype.muestraArr = function () {
	var mensaje = this.arreglo.join("");
	mensaje = mensaje.trim();

	this.largoString = mensaje.length;

	$('#aquiVaTexto').replaceWith('<p id="aquiVaTexto">' + mensaje + '</p>');
	$('#muestraNivel').replaceWith('<h2 id="muestraNivel">' + this.nivel + '</h2>');

	//$('#statusLargo').replaceWith('<h2 id="statusLargo">' + this.largoString + '</h2>');
}

clsNumeros.prototype.analizaNivel = function () {
	if (this.puntaje % 10 == 0) {
		this.nivel++;
	}

}


clsNumeros.prototype.sacaNumero = function () {
	for (var i = 0; i < this.arreglo.length; i++) {
		if (this.arreglo[i] == this.disparador) {
			delete this.arreglo[i];
			this.puntaje++;
			break;
		}
	}
}

clsNumeros.prototype.incrementaDisparador = function () {
	if (this.statusContinue == 0) return;
	if (this.disparador == 9) {
		this.disparador = 0;
	} else {
		this.disparador++;
	}
}



clsNumeros.prototype.muestraBala = function () {
	$('#Bala').replaceWith('<h3 id="Bala">' + this.disparador + '</h3>');
}

clsNumeros.prototype.muestraPuntaje = function () {
	$('#Puntaje').replaceWith('<h3 id="Puntaje">' + this.puntaje + '</h3>');
}

clsNumeros.prototype.elJuegoTermino = function () {
	if (this.largoString >= this.maxNumeros) {
		var mensajeFin = "Perdiste :-( ";
		$('#mensaje').replaceWith('<h4 id="mensaje">' + mensajeFin + '</h4>');
		this.statusContinue = 0;
		return;
	}
}

var ObjJuego = new clsNumeros(1500, 0, 0, 0, 10);

function colocaNumero() {
	if (ObjJuego.statusContinue == 1) {
		ObjJuego.genRnd();
		ObjJuego.addNumeros();
		ObjJuego.muestraArr();
		ObjJuego.elJuegoTermino();
	}
}


function escribe(paramPaso) {
	$("#paso").append(paramPaso + ", ")
}

function generaNumeros(cantidad) {
	var i = 0;
	for (var i = 0; i < cantidad; i++) {
		setTimeout('colocaNumero()', ObjJuego.deltaTiempo * i)
	}
}

function presionaTecla(valor) {
	let tp = valor.keyCode;
	if (tp == 43) {
		subeEbUno();
	} else {
		dispara();
	}
}

function subeEbUno() {
	if (this.statusContinue == 0) return;
	ObjJuego.incrementaDisparador();
	ObjJuego.muestraBala();
}

function dispara() {
	if (this.statusContinue == 0) return;
	ObjJuego.sacaNumero();
	ObjJuego.muestraPuntaje();
	ObjJuego.analizaNivel();
}


function numGenera() {
	Concurrent.Thread.create(generaNumeros, 1000);
}