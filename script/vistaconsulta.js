
import {Vista} from './vista.js';
import {Controlador} from './controlador.js';

/**
*Clase para la creación de la vistaConsulta, estiende de Vista
*/
export class VistaConsulta extends Vista{
	/**
	*Constructor parametrizado que recibe como parametros un div y un controlador de la clase Controlador para la instancia de una VistaConsulta
	*/
	constructor(div,controlador){
		super(div)
		
		this.controlador=controlador
	
		this.modelo=this.controlador.getModelo();
		
		this.modelo.registrar(this.actualizar.bind(this))
		
		this.modelo.leerBD()
		this.modelo.registrar(this.modelo.actualizarLista.bind(this.modelo))
		
		this.creacion();
	}
	/**
	*Método para la creación y estructuración de la VistaConsulta
	*/
	creacion(){
		this.iBuscador=document.createElement('input')
		let lBuscador=document.createElement('label')
		this.div.appendChild(lBuscador);
		this.div.appendChild(this.iBuscador);
		lBuscador.appendChild(document.createTextNode('Buscar personaje: '))
		
		let divAnhadir=document.createElement('div');
		this.div.appendChild(divAnhadir);
		divAnhadir.id='divAnhadir';
		let span=document.createElement('span');
		divAnhadir.appendChild(span);
		span.appendChild(document.createTextNode('➕'));
		span.onclick=this.controlador.altaPersonaje.bind(this.controlador);
		
		
	}
	/**
	*Método para el filtrado por nombre de la vista consulta, recibe como parámetro un evento
	*@param {e}
	*/
	filtrar(e){
		console.log('CAMBIA')
		let nombrePersonaje=this.iBuscador.value;
		console.log(nombrePersonaje);
		this.controlador.filtrar(nombrePersonaje)
	}
	/**
	*Método para la actualización de la VistaConsulta, vuelve a estructurarse
	*/
	actualizar(){
		
		this.borrarDivs();
		let listaPersonajes = this.modelo.getListaPersonajes()
		
		this.iBuscador=document.createElement('input')
		let lBuscador=document.createElement('label')
		lBuscador.id='lBuscador';
		this.div.appendChild(lBuscador);
		this.div.appendChild(this.iBuscador);
		lBuscador.appendChild(document.createTextNode('Buscar personaje: '))
		this.iBuscador.addEventListener('change',this.filtrar.bind(this));
		
		let divAnhadir=document.createElement('div');
		this.div.appendChild(divAnhadir);
		
		let span=document.createElement('span');
		divAnhadir.appendChild(span);
		divAnhadir.id='divAnhadir';
		span.appendChild(document.createTextNode('➕'));
		span.onclick=this.controlador.altaPersonaje.bind(this.controlador);
		for(let fila of listaPersonajes){
			
			console.log('PERSONAJE',fila)
			let divPersonaje=document.createElement('div');
			this.div.appendChild(divPersonaje);
			divPersonaje.onclick=this.controlador.detallesPersonaje.bind(this.controlador,fila);
			let ul=document.createElement('ul');
			divPersonaje.appendChild(ul);
			let liNombre=document.createElement('li');
			liNombre.appendChild(document.createTextNode(fila.nombre));
			ul.appendChild(liNombre);
			
			let liDescripcion=document.createElement('li');
			liDescripcion.appendChild(document.createTextNode(fila.descripcion));
			ul.appendChild(liDescripcion);
			
			let liAparicion=document.createElement('li');
			liAparicion.appendChild(document.createTextNode(fila.aparicion));
			ul.appendChild(liAparicion);
			
			
			
			let liTipo=document.createElement('li');
			liTipo.appendChild(document.createTextNode(fila.tipo));
			ul.appendChild(liTipo);
			
			let liURL=document.createElement('li');
			liURL.appendChild(document.createTextNode(fila.url));
			ul.appendChild(liURL);
			
			let liImg=document.createElement('li');
			liImg.appendChild(document.createTextNode(fila.img));
			ul.appendChild(liImg);
		}
		console.log(this.div)
		
	}
	/**
	*Método para la visualización de un personaje buscado por nombre
	*/
	mostrarPersonajeAlmacenado(personaje){
		this.borrarDivs();
		this.iBuscador=document.createElement('input')
		let lBuscador=document.createElement('label')
		this.div.appendChild(lBuscador);
		this.div.appendChild(this.iBuscador);
		lBuscador.appendChild(document.createTextNode('Buscar personaje: '))
		lBuscador.id='lBuscador';
		this.iBuscador.addEventListener('change',this.filtrar.bind(this));
		
		let divVolver=document.createElement('div');
		this.div.appendChild(divVolver);
		
		let span=document.createElement('span');
		divVolver.appendChild(span);
		divVolver.id='divVolver';
		span.appendChild(document.createTextNode('⇜'));
		span.onclick=this.volver.bind(this);
			
			let divPersonaje=document.createElement('div');
			this.div.appendChild(divPersonaje);
			divPersonaje.onclick=this.controlador.detallesPersonaje.bind(this.controlador,personaje);
			let ul=document.createElement('ul');
			divPersonaje.appendChild(ul);
			
			let liNombre=document.createElement('li');
			liNombre.appendChild(document.createTextNode(personaje.nombre));
			ul.appendChild(liNombre);
			
			let liDescripcion=document.createElement('li');
			liDescripcion.appendChild(document.createTextNode(personaje.descripcion));
			ul.appendChild(liDescripcion);
			
			let liAparicion=document.createElement('li');
			liAparicion.appendChild(document.createTextNode(personaje.aparicion));
			ul.appendChild(liAparicion);
			
			
			
			let liTipo=document.createElement('li');
			liTipo.appendChild(document.createTextNode(personaje.tipo));
			ul.appendChild(liTipo);
			
			let liURL=document.createElement('li');
			liURL.appendChild(document.createTextNode(personaje.url));
			ul.appendChild(liURL);
			
			let liImg=document.createElement('li');
			liImg.appendChild(document.createTextNode(personaje.img));
			ul.appendChild(liImg);
	}
	/**
	*Método usado para la ejecución de callbacks
	*/
	volver(){
		this.modelo.ejecutarCallBacks();
	}
	/**
	*Método paraa la eliminación de todos los elementos de la vistaConsulta
	*/
	borrarDivs(){
		   while (this.div.firstElementChild)
	        this.div.firstElementChild.remove()
	 
			
	}
}