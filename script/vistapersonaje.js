
import {Vista} from './vista.js';
import {Controlador} from './controlador.js';
import {Modelo} from './modelo.js';
import {Personaje} from './personajes.js'

/**
*Clase para la creación de la VistaPersonaje, extiende de vista
*/
export class VistaPersonaje extends Vista{
	/**
	*Constructor parametrizado para la instancia de la VistaPersonaje, recibe como parametros un div y un controlador de la clase Controlador
	*@param {div}
	*@param {controlador}
	*/
	constructor(div,controlador){
		super(div)
		this.controlador=controlador
		this.modelo=this.controlador.getModelo();
		
	}
	/**
	*Método para la creación de la vistaPersonaje, recibe como parametro un personaje
	@param {personaje}
	*/
	detallesPersonaje(personaje){
		
		this.borrarDetallesPersonaje();
		
		let divVolver=document.createElement('div');
		this.div.appendChild(divVolver);
		
		let span=document.createElement('span');
		divVolver.appendChild(span);
		divVolver.id='divVolver';
		span.appendChild(document.createTextNode('⇜'));
		span.onclick=this.volver.bind(this);
		
		let divDetalle=document.createElement('div');
		this.div.appendChild(divDetalle);
		let campos=['Nombre: ','Descripcion: ','Aparición: ','Tipo: ','Mas información: ','imagen: '];
		let arrayPersonaje=[personaje.nombre,personaje.descripcion,personaje.aparicion,personaje.tipo,personaje.url,personaje.img]
		for(let i=0;i<campos.length;i++){
			let p=document.createElement('p');
			let campo='personaje.'+campos[i];
			p.appendChild(document.createTextNode(campos[i]));
			p.appendChild(document.createTextNode(arrayPersonaje[i]));
			divDetalle.appendChild(p);
		}
		let spanEditar=document.createElement('span');
		this.div.appendChild(spanEditar);
		spanEditar.appendChild(document.createTextNode('✏'));
		spanEditar.id='spanEditar';
		spanEditar.onclick=this.edicionPersonaje.bind(this,personaje)
		
		let spanEliminar=document.createElement('span');
		this.div.appendChild(spanEliminar);
		spanEliminar.appendChild(document.createTextNode('🗑'));
		spanEliminar.id='spanEliminar';
		spanEliminar.onclick=this.eliminarPersonaje.bind(this,personaje);
	}
	/**
	*Método para la vuelta a la vistaConsulta
	*/
	volver(){
		this.controlador.consultarPersonajes();
	}
	/**
	*Método para la estructuración de la vistaPersonaje a editar un personaje, recibe como parametro un personaje de la clase Personaje
	*@param {personaje}
	*/
	edicionPersonaje(personaje){
		
		this.borrarDetallesPersonaje();
		let divDetalle=document.createElement('div');
		this.div.appendChild(divDetalle);
		let campos=['Nombre: ','Descripcion: ','Aparición: ','Tipo: ','Mas información: ','Imagen: '];
		let arrayPersonaje=[personaje.nombre,personaje.descripcion,personaje.aparicion,personaje.tipo,personaje.url,personaje.img]
		let salto=document.createElement('br');
		
		for(let i=0;i<campos.length;i++){
			if(campos[i]=='Aparición: '){
				let label=document.createElement('label');
				label.appendChild(document.createTextNode(campos[i]));
				divDetalle.appendChild(label)
				let input=document.createElement('input');
				input.type='date';
				divDetalle.appendChild(input);
				input.value=arrayPersonaje[i];
			}
			else{
				if(campos[i]=='Imagen: '){
					let label=document.createElement('label');
					label.appendChild(document.createTextNode(campos[i]));
					divDetalle.appendChild(label)
					let input=document.createElement('input');
					input.type='file';
					divDetalle.appendChild(input);
					input.value=arrayPersonaje[i];
				}
				else{
					let label=document.createElement('label');
					label.appendChild(document.createTextNode(campos[i]));
					divDetalle.appendChild(label)
					let input=document.createElement('input');
					divDetalle.appendChild(input);
					input.value=arrayPersonaje[i];
				}
			}
		}
	
		divDetalle.appendChild(salto);
		
		let botonCancelarEdicion=document.createElement('button');
		botonCancelarEdicion.appendChild(document.createTextNode('Cancelar'));
		botonCancelarEdicion.id='botonCancelarEdicion';
		botonCancelarEdicion.onclick=this.detallesPersonaje.bind(this,personaje);
		this.div.appendChild(botonCancelarEdicion);
		
		let botonAceptarEdicion=document.createElement('button');
		botonAceptarEdicion.appendChild(document.createTextNode('Editar'));
		botonAceptarEdicion.id='botonAceptarEdicion';
		botonAceptarEdicion.onclick=this.editar.bind(this,personaje);
		this.div.appendChild(botonAceptarEdicion);
	}
	/**
	*Método para la eliminación de un personaje, recibe como parametro un personaje a eliminar de la clase Personaje
	*@param {personaje}
	*/
	eliminarPersonaje(personaje){
		this.controlador.eliminarPersonaje(personaje);
	}
	/**
	*Método para la eliminación de los elementos de la vistaPersonaje
	*/
	borrarDetallesPersonaje(){
		while (this.div.firstElementChild)
	        this.div.firstElementChild.remove()
	}
	/**
	*Método para la edición de un personaje, recibe como parámetro el personaje a modificar de la clase Personaje
	*@param {antiguoPersonaje}
	*/
	editar(antiguoPersonaje){
		
		let inputs=[]
		let nuevoPersonaje=new Personaje()
		for(let i=0;i<6;i++)
			inputs[i]=this.div.getElementsByTagName('input')[i].value;
		
		nuevoPersonaje.nombre=inputs[0]
		nuevoPersonaje.descripcion=inputs[1]
		nuevoPersonaje.aparicion=inputs[2]
		nuevoPersonaje.tipo=inputs[3]
		nuevoPersonaje.url=inputs[4]
		nuevoPersonaje.img=inputs[5]
	
		this.controlador.modificarRegistro(antiguoPersonaje,nuevoPersonaje);
	}
}