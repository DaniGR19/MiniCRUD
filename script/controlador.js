

import{Modelo} from './modelo.js'
import{Vista} from './vista.js'
import {VistaConsulta} from './vistaconsulta.js';
import {VistaAlta} from './vistaalta.js';
import {VistaPersonaje} from './vistapersonaje.js';

/**
*Clase controlador, clase para la creacion MVC, instanciamiento de las vistas y modelo, ejecucion de las distintas vistas
*/
export class Controlador{
	/**
	*Constructor de la clase controlador para la instancia del mismo, creacion de las vistas
	*/
	constructor(){
		window.onload=this.crear.bind(this)
	}
	/**
	*Método para la creación de la clase y elementos
	*/
	crear(){
	
			/*Instancia del modelo a usar*/
		this.modelo=new Modelo(this);
		
		/*Creacion e instancia del elemento div como vistaConsulta*/
		this.divConsulta=document.getElementById('divConsulta');
		this.divConsulta=new VistaConsulta(this.divConsulta,this);
		this.divConsulta.mostrar(false);
		
		/*Creacion e instancia del elemento divPersonaje como VistaPersonaje*/
		this.divPersonaje=document.getElementById('divPersonaje')
		this.divPersonaje=new VistaPersonaje(this.divPersonaje,this)
		
		
		this.botonConsultar=document.getElementById('consulta');
		this.botonConsultar.onclick=this.consultarPersonajes.bind(this);
		
		/*Creacion de formulario para dar de alta*/
		this.divAlta=document.getElementById('divAlta');
		this.divAlta=new VistaAlta(this.divAlta,this);
		
		
		this.divAlta.mostrar(false);
		this.divPersonaje.mostrar(false)
	}
	/**
	*Método para dar paso a la vista que muestra el personaje, recibe como parámetro un personaje de la clase Personajes
	*@param {personaje}
	*/
	mostrarPersonajeAlmacenado(personaje){
		this.divConsulta.mostrarPersonajeAlmacenado(personaje);
	}
	/**
	*Método para la visualizacion de la vistaPersonaje
	*/
	consultarPersonajes(){
		this.divConsulta.mostrar(true);
		this.divAlta.mostrar(false);
		this.divPersonaje.mostrar(false);
	}
	/**
	*Método para la visualización de la vista altaPersonaje
	*/
	altaPersonaje(){
		this.divConsulta.mostrar(false);
		this.divAlta.mostrar(true);
		this.divPersonaje.mostrar(false);
	}
	/**
	*Método para dar paso al modelo que guardará un personaje de la clase Personaje, recibe un personaje y da paso a la vistaConsulta
	*@param {personaje}
	*/
	guardarPersonaje(personaje){
		this.modelo.insertar(personaje);
		let lista=this.modelo.getListaPersonajes()
	
		this.divConsulta.mostrar(true);
		this.divAlta.mostrar(false);
		this.divAlta.limpiar();
	}
	/**
	*Método para la visualización de un personaje, recibe un personaje de la clase personaje, da paso a la vistaPersonaje
	*@param {personaje}
	*/
	detallesPersonaje(personaje){
		
		this.divPersonaje.mostrar(true);
		this.divConsulta.mostrar(false);
		this.divAlta.mostrar(false);
		this.divPersonaje.detallesPersonaje(personaje)
	}
	/**
	*Método para la modificación de un personaje, recibe como parametro el personaje almacenado y el personaje modificado de la clase Personaje, da paso a la vistaConsulta
	*@param {antiguoPersonaje}
	*@param {nuevoPersonaje}
	*/
	modificarRegistro(antiguoPersonaje,nuevoPersonaje){
		this.modelo.modificarRegistro(antiguoPersonaje,nuevoPersonaje)
		this.divConsulta.mostrar(true);
		this.divPersonaje.mostrar(false);
	}
	/**
	*Método para la eliminación de un personaje en la base de datos, recibe como parametro un personaje de la clase personaje almacenado, da paso a la vistaConsulta
	*@param {personaje}
	*/
	eliminarPersonaje(personaje){
		this.modelo.eliminarPersonaje(personaje);
		this.divConsulta.mostrar(true);
		this.divPersonaje.mostrar(false);
	}
	/**
	*Método para la busqueda de un personaje, recibe como parámetro un personaje de la clase personaje
	*@param {personaje}
	*/
	filtrar(personaje){
		this.modelo.filtrar(personaje);
	}
	/**
	*Método para la obtención de la lista de personajes almacenados en el modelo
	*/
	getLista(){
		this.modelo.getListaPersonajes();
		
	}
	/**
	*Método para la obtención del modelo completo por parte del controlador
	*/
	getModelo(){
		return this.modelo
	}
}
const app = new Controlador()