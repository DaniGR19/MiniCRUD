
import{Vista} from './vista.js';
import{Personaje} from './personajes.js';

/**
*Clase para la creacion de la vistaAlta, extiende de Vista
*/
export class VistaAlta extends Vista{
	/**
	*Constructor parametrizado para la instancia de las vista, recibe como parametro un div y un controlador de la clase Controlador
	*/
	constructor(div,controlador){
		super(div)
		this.controlador=controlador
		this.creacionFormulario();
	}
	/**
	*Método para la creación de la vistaAlta
	*/
	creacionFormulario(){
		let salto=document.createElement('br');
		
		let formulario=document.createElement('form');
		this.div.appendChild(formulario);
		this.iNombre=document.createElement('input');
		this.iNombre.pattern='/[A-Z][a-z]+[^0-9]/';
		let lNombre=document.createElement('label');
		lNombre.appendChild(document.createTextNode('Nombre'));
		formulario.appendChild(lNombre);
		formulario.appendChild(this.iNombre);
		this.div.appendChild(salto);
		
		let lDescripcion=document.createElement('label');
		lDescripcion.appendChild(document.createTextNode('Descripción'));
		formulario.appendChild(lDescripcion)
		this.tDescripcion=document.createElement('textarea');
		formulario.appendChild(this.tDescripcion);
		this.tDescripcion.style.rows='20';
		this.tDescripcion.style.cols='50';
		
		let lFech=document.createElement('label');
		lFech.appendChild(document.createTextNode('Fecha de aparicion'));
		formulario.appendChild(lFech);
		this.iFech=document.createElement('input');
		this.iFech.type="date";
		formulario.appendChild(this.iFech);
		
		let lTipo=document.createElement('label');
		lTipo.appendChild(document.createTextNode('Tipo de ser'));
		formulario.appendChild(lTipo);
		this.iTipo=document.createElement('input');
		formulario.appendChild(this.iTipo);
		
		let lInfo=document.createElement('label');
		lInfo.appendChild(document.createTextNode('URL con mas información'));
		formulario.appendChild(lInfo);
		this.iInfo=document.createElement('input');
		formulario.appendChild(this.iInfo);
		
		let lImg=document.createElement('label');
		lImg.appendChild(document.createTextNode('Imagen del personaje'));
		formulario.appendChild(lImg);
		this.iImg=document.createElement('input');
		this.iImg.type="file";
		formulario.appendChild(this.iImg);
		
		this.botonAlta=document.createElement('button');
		this.botonAlta.appendChild(document.createTextNode('DAR DE ALTA'));
		this.botonAlta.id='botonAlta';
		this.div.appendChild(this.botonAlta);
		this.botonAlta.onclick=this.alta.bind(this);
	}
	/**
	*Método para el evento de alta de un nuevo personaje, envia a un nuevo personaje a almacenar en la base de datos
	*/
	alta(){
		try{
			this.validar()
			let personaje=new Personaje(this.iNombre.value,this.tDescripcion.value,this.iFech.value,this.iTipo.value);
			personaje.setURL(this.iInfo.value);
			personaje.setImg(this.iImg.value);
			this.controlador.guardarPersonaje(personaje);
			console.log('NUEVO PERSONAJE',personaje)
		}catch(excepcion){
			window.alert('Algo falló: '+excepcion);
			//this.limpiar();
		}
	}
	/**
	*Método para la validacion de los datos de entrada
	*/
	validar(){
		console.log('Validandos')
		
		let nombre=this.iNombre.value
		if(!this.iNombre.value||!this.tDescripcion.value)
				throw 'Falta por rellenar alguno de los campos obligatorios';
	}
	/**
	*Método para devolver los inputs de la vista a valor inicial
	*/
	limpiar(){
		this.iNombre.value='';
		this.tDescripcion.value='';
		this.iFech.value='';
		this.iTipo.value='';
		this.iInfo.value='';
		this.iImg.value='';
	}
	
}