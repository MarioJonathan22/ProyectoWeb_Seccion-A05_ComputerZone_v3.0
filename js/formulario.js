const formulario = document.getElementById("formulario"); /*accede al formulario con el id="formulario*/
const input = document.querySelectorAll("#formulario input"); /*accede a los arreglos de los inputs del formulario*/

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}


const campos = /* OBJETO:  valores que representan si un campo es valido o no*/
{
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}


const validarFormulario = (e) =>
{
	switch (e.target.name) /*este codigo solo se ejecute cuando el name del input sea "usuario"*/
	{
		/*case "usuario":
			/*console.log("Funciona!"); CON ESTO se comprueba que en el caso de contraseña no aparesca nada
		break;*/
		case "usuario":
				validarCampo(expresiones.usuario, e.target, "usuario");  /*validar formulario sobre usuario*/
		break;
		case "nombre":
				validarCampo(expresiones.nombre, e.target, "nombre");
		break;
		case "password":
			validarCampo(expresiones.password, e.target, "password");
			validarPassword2() /*para verificar si se cambia  o modifica la contraseña en el primer password para  que ambas sean iguales*/
		break;
		case "password2": /* en este caso, creamos una funcion validarPassword2 para comparar con el primer password*/
			validarPassword2()
		break;
		case "correo":
				validarCampo(expresiones.correo, e.target, "correo");
		break;
		case "telefono":
				validarCampo(expresiones.telefono, e.target, "telefono");
		break;
	}
}


/* para que todo de abajo cumpla con usuario, nombre, password, password2, correo, etc, y usaremos funcion validar campo arriba*/
const validarCampo = (expresion, input, campo) => 
{
	if (expresion.test(input.value)) /*para actualizar cada ves que se escribe correcto o no, usuario, nombre, etc*/
			{/*Todo esto estaba en "case "usuario":, pero para no estar repitiendo en cada case, usamos funcion validar campo*/
			document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
			document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
			document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
			document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");

			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");

			campos[campo] = true; /*para acceder a usuarios, nombre, cotraseñas,etc*/
			}
			else /* poniendo lo contrario de arriba para que el error en el password 2 desaparezca cuando se corrige contraseña*/
			{
			document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
			document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
			document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
			document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");

			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");

			campos[campo] = false;
			}
}


const validarPassword2 = () => /*acceder a los 2 input de pasword*/
{
	const inputPassword1 = document.getElementById("password");
	const inputPassword2 = document.getElementById("password2");

	/* condicional if para preguntar si la contraseña no es igual*/
	if (inputPassword1.value !== inputPassword2.value) /*copiamos solo la parte ELSE de arriba "if (expresion.test(input.value))" porque es lo contrario*/
	{
		document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto");
		document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto");
		document.querySelector(`#grupo__password2 i`).classList.add("fa-times-circle");
		document.querySelector(`#grupo__password2 i`).classList.remove("fa-check-circle");

		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo");

		campos["password"] = false;
	}
	else
	{
		document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto");
		document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto");
		document.querySelector(`#grupo__password2 i`).classList.remove("fa-times-circle");
		document.querySelector(`#grupo__password2 i`).classList.add("fa-check-circle");

		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo");

		campos["password"] = true;
	}
}


input.forEach( (input) => /*esta funcion se ejecutara por cada input de la pagina*/
{
	input.addEventListener("keyup", validarFormulario); /*cuando se levante la tecla, se ejecuta la funcion validarFormulario*/
	input.addEventListener("blur", validarFormulario); /* tambien hace la comprobacion cuando se hce click afuera*/
} );


formulario.addEventListener("submit", (e) =>
{
	e.preventDefault(); /*al presionar "enviar" con el form vacio, no pasara nada, evita que se envien datos incompletossin llenar todas las casillas*/

	const terminos = document.getElementById("terminos");
	if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) /* comprobar que todos los campos y los terminos se encuentren correctos*/
	{
		formulario.reset();

		document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
		setTimeout( () =>
		{
			document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
		}, 5000);

		document.querySelectorAll(".formulario__grupo-correcto").forEach( (icono) =>
		{
			icono.classList.remove("formulario__grupo-correcto");
		});
	}
	else
	{
		document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
	}
});

