String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, "");
}

class clsNumeros {
	constructor() {
		this.MINTIEMPO = 300;
		this.MAXTTIEMPO = 1200;
		this.statusContinue = 1;
		this.nivel = 1;
		this.largoString = 0;
		this.error = 0;
		this.arreglo = new Array();
		this.deltaTiempo = this.MAXTTIEMPO;
		this.puntaje = 0;
		this.numeroRnd = 0;
		this.disparador = 0;
		this.maxNumeros = 10;
		this.snd_dispara = new Audio('./asset/disparar_final.wav');
		this.snd_inc = new Audio('./asset/incrementa_final.wav');
	}

	genRnd() {
		this.numeroRnd = Math.random() * 9;
		this.numeroRnd = Math.round(this.numeroRnd);
	}

	addNumeros() {
		this.arreglo.push(this.numeroRnd);
	}

	addPuntaje() {
		this.puntaje += addPuntos;
	}

	increTime() {
		this.deltaTiempo += dTiempo;
	}

	decreTime(dTiempo) {
		if (this.deltaTiempo > this.MINTIEMPO) {
			this.deltaTiempo -= dTiempo;
		} else {
			if (this.deltaTiempo > 10) {
				this.deltaTiempo -= 2;
			} else {
				this.deltaTiempo = this.MAXTTIEMPO;
			}
		}

	}

	muestraArr() {
		var mensaje = this.arreglo.join("");
		mensaje = mensaje.trim();

		this.largoString = mensaje.length;

		$('#aquiVaTexto').replaceWith('<p id="aquiVaTexto">' + mensaje + '</p>');
		$('#muestraNivel').replaceWith('<h2 id="muestraNivel">' + this.nivel + '</h2>');
	}

	analizaNivel() {
		if (this.puntaje % 5 == 0) {
			this.nivel++;
			this.decreTime(20);
		}
	}

	sacaNumero() {
		for (var i = 0; i < this.arreglo.length; i++) {
			if (this.arreglo[i] == this.disparador) {
				delete this.arreglo[i];
				this.puntaje++;
				break;
			}
		}
	}

	incrementaDisparador() {
		if (this.statusContinue == 0) return;
		if (this.disparador == 9) {
			this.disparador = 0;
		} else {
			this.disparador++;
		}
	}
}





var ObjJuego = new clsNumeros();

function colocaNumero() {
	if (ObjJuego.statusContinue == 1) {
		ObjJuego.genRnd();
		ObjJuego.addNumeros();
		ObjJuego.muestraArr();

		// Se analiza si GAME OVER
		if (ObjJuego.largoString >= ObjJuego.maxNumeros) {
			const mensajeFin = `GAME OVER \nPuntaje : ${ObjJuego.puntaje} \nLevel : ${ObjJuego.nivel} \nDelta Tiempo : ${ObjJuego.deltaTiempo} `;
			alert(mensajeFin);
			ObjJuego.statusContinue = 0;
			return;
		}

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
		ObjJuego.snd_dispara.play();
	}
}

function subeEbUno() {

	if (this.statusContinue == 0) return;
	ObjJuego.incrementaDisparador();
	ObjJuego.snd_inc.play();


	// Mostramos BALA
	$('#Bala').replaceWith('<h3 id="Bala">' + ObjJuego.disparador + '</h3>');

}

function dispara() {
	if (this.statusContinue == 0) return;


	// oOstramos puntaje
	$('#Puntaje').replaceWith('<h3 id="Puntaje">' + ObjJuego.puntaje + '</h3>');
	ObjJuego.sacaNumero();

	ObjJuego.analizaNivel();
}

function numGenera() {
	generaNumeros(15000);
}