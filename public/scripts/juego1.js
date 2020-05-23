class clsNumeros {
	constructor() {
		this.MINTIEMPO = 300;
		this.MAXTTIEMPO = 1200;
		this.ADDPUNTOS = 2;
		this.MINUSPUNTOS = 1;
		this.PASONIVEL = 5;
		this.PREMIO = 5;
		this.aciertos = 0;
		this.statusContinue = 1;
		this.nivel = 1;
		this.largoString = 0;
		this.error = 0;
		this.premio = 0;
		this.arreglo = new Array();
		this.deltaTiempo = this.MAXTTIEMPO;
		this.puntaje = 0;
		this.numeroRnd = 0;
		this.disparador = 0;
		this.maxNumeros = 7;
		this.snd_dispara = new Audio('./asset/disparo_final.mp3');
		this.snd_inc = new Audio('./asset/incrementar_final.mp3');
		this.snd_premio = new Audio('./asset/premio.mp3');
	}

	trim = function () {
		return this.replace(/^\s+|\s+$/g, "");
	}

	genRnd() {
		this.numeroRnd = Math.random() * 9;
		this.numeroRnd = Math.round(this.numeroRnd);
	}

	addNumeros() {
		this.arreglo.push(this.numeroRnd);
	}

	addPuntaje() {
		this.puntaje += this.ADDPUNTOS;
		this.aciertos++;
	}

	restaPuntaje() {
		this.puntaje += this.MINUSPUNTOS;
	}

	subeNivel() {
		this.nivel++;
		if (this.nivel % 5 == 0 && this.error <= 3 && this.premio <= 3) {
			this.premio++;
			let idT = `p${this.premio}`;
			let strTemp = `<img id="${idT}" src="./asset/p${this.premio}.jpg">`;
			let strAtributo = "./asset/pf" + this.premio + ".jpg";
			document.getElementById(idT).setAttribute("src", strAtributo);
			this.snd_premio.play();
		}
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
				// El juego lo diste vuelta
				this.deltaTiempo = this.MAXTTIEMPO;
			}
		}

	}

	muestraArr() {
		var mensaje = this.arreglo.join("");
		mensaje = mensaje.trim();

		this.largoString = mensaje.length;

		document.getElementById('aquiVaTexto').innerHTML = mensaje;
		document.getElementById('muestraNivel').innerHTML = this.nivel;
		document.getElementById('Puntaje').innerHTML = this.puntaje;
		document.getElementById('muestraFallos').innerHTML = this.error;

	}

	analizaNivel() {
		if (this.aciertos % 5 == 0) {
			this.subeNivel();
			this.decreTime(20);
		}
	}

	sacaNumero() {
		for (var i = 0; i < this.arreglo.length; i++) {
			if (this.arreglo[i] == this.disparador) {
				delete this.arreglo[i];
				this.addPuntaje();
				break;
			}

			if (i == this.arreglo.length - 1) {
				this.error++;
				this.restaPuntaje();
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

function colocaNumero(myInterval) {
	if (ObjJuego.statusContinue == 1) {
		ObjJuego.genRnd();
		ObjJuego.addNumeros();
		ObjJuego.muestraArr();

		// Se analiza si GAME OVER
		if (ObjJuego.largoString > ObjJuego.maxNumeros) {
			const mensajeFin = `GAME OVER \nPuntaje : ${ObjJuego.puntaje} \nLevel : ${ObjJuego.nivel} \nDelta Tiempo : ${ObjJuego.deltaTiempo} `;
			alert(mensajeFin);
			ObjJuego.statusContinue = 0;
			clearInterval(myInterval);
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

	if (ObjJuego.statusContinue == 0) return;
	ObjJuego.incrementaDisparador();
	ObjJuego.snd_inc.play();
	//console.log(ObjJuego.disparador);
	let strTemp = `./asset/nf${ObjJuego.disparador}.jpg`;

	document.getElementById('Bala').setAttribute('src', strTemp);


}

function dispara() {
	if (ObjJuego.statusContinue == 0) return;

	ObjJuego.sacaNumero();
	ObjJuego.analizaNivel();
}

function numGenera() {
	//generaNumeros(15000);
	const elemIneterval = setInterval(function () {
		colocaNumero(elemIneterval);

		/*
		if (ObjJuego.statusContinue == 1) {
			console.log(ObjJuego.deltaTiempo);
		} else {
			console.log('Fin del juego');
		}
		*/

	}, ObjJuego.deltaTiempo);
}