/**
*Clase para la creación del modelo en MVC
*/

export class Modelo{
	/**
	*Constructor parametrizado para la instancia del modelo, recibe como parametro un controlador de la clase Controlador
	*@param {controlador}
	*/
	constructor(controlador){
		this.controlador=controlador
		this.baseDatos = null
		
		this.listaPersonajes=[]
		this.callBacks=[];
		this.db
		
	}
	/**
	*Método para la inserción de un nuevo personaje en la base de datos y en la lista de personajes del modelo, recibe como parametro un personanje de la clase Personajes
	*@param {personaje}
	*/
	insertar(personaje){
		this.listaPersonajes.push(personaje);
		
		const almacenar=this.baseDatos.transaction('personajes','readwrite').objectStore('personajes');
		let obj={
			nombre:personaje.nombre,
			descripcion:personaje.descripcion,
			aparicion:personaje.aparicion,
			tipo:personaje.tipo,
			url:personaje.url,
			img:personaje.img
		}
		almacenar.add(obj);
		this.ejecutarCallBacks();
			
		}	
	/**
	*Método que devuelve la lista de personajes almacenado
	*@return {listaPersonajes}
	*/
	getListaPersonajes(){
		
		return this.listaPersonajes;
	}
	/**
	*Método para la creacion de la base de datos indexedDB y para la primera lectura de la misma 
	*/
	leerBD(){
		let lista=[]
		
		const bd=window.indexedDB
		let baseDatos
		if(window.indexedDB){
			
			const respuesta=indexedDB.open("Personajes",1);
			
			respuesta.onsuccess=()=>{
				
				this.baseDatos=respuesta.result
				let almacen=this.baseDatos.transaction('personajes','readonly').objectStore('personajes')
				let peticion=almacen.openCursor()
				peticion.onsuccess=(evt)=>{
					const cursor=peticion.result
					if(cursor){
						cursor.value.id=cursor.key
						this.listaPersonajes.push(cursor.value)
						cursor.continue();
					}
					else{
						this.ejecutarCallBacks();
					}
				}
			}
			respuesta.onerror=()=>{
				console.log('ERROR');
			}
			respuesta.onupgradeneeded=(evt)=>{
				
				this.baseDatos=evt.target.result
				const objAlmacen=this.baseDatos.createObjectStore('personajes',{autoIncrement:true})
			}
		}
		//this.registrar(this.actualizarLista.bind(this))
		
	}
	/**
	*Método para la actualización de la lista de Personajes del modelo con respecto a la base de datos indexedDB
	*/
	actualizarLista(){
		console.log('ACTUALIZANDO LISTA')
		this.listaPersonajes=[];
		const almacen=this.baseDatos.transaction('personajes','readonly').objectStore('personajes');
		const peticion=almacen.openCursor();
		peticion.onsuccess=(evt)=>{
			const cursor=peticion.result
			if(cursor){
				
				cursor.value.id=cursor.key
				this.listaPersonajes.push(cursor.value);
				cursor.continue()
			}
			else{
			
			}
		}
	}
	/**
	*Método para la modificación de un registro de la base de datos, recibe como parametros el personaje a modificar y el modificado de la clase Personajes
	*@param {aPersonaje}
	*@param {nPersonaje}
	*/
	modificarRegistro(aPersonaje,nPersonaje){
		
		let key=0;
		for(let i=0;i<this.listaPersonajes.length;i++){
			if(this.listaPersonajes[i].nombre==aPersonaje.nombre && this.listaPersonajes[i].descripcion==aPersonaje.descripcion)
				key=this.listaPersonajes[i].id;
		}
		const almacen=this.baseDatos.transaction('personajes','readwrite').objectStore('personajes');
		const peticion=almacen.get(key);
		
		peticion.onerror=(evt)=>{
			console.log('FALLOOOOO');
		}
		peticion.onsuccess=(evt)=>{
			const personajeAlmacenado=evt.target.result
			
			personajeAlmacenado.nombre=nPersonaje.nombre;
			personajeAlmacenado.descripcion=nPersonaje.descripcion;
			personajeAlmacenado.aparicion=nPersonaje.aparicion;
			personajeAlmacenado.tipo=nPersonaje.tipo;
			personajeAlmacenado.url=nPersonaje.url;
			personajeAlmacenado.img=nPersonaje.img;
			
			const modificar=almacen.put(personajeAlmacenado,key);
		}
		
		this.ejecutarCallBacks();
	}
	/**
	*Método para la eliminación de un registro de la base de datos en indexedDB, recibe como parametro el personaje a eliminar de la clase Personajes
	*@param {personaje}
	*/
	eliminarPersonaje(personaje){
		console.log(personaje);
		let key=0;
		const almacen=this.baseDatos.transaction('personajes','readwrite').objectStore('personajes');
		for(let i=0;i<this.listaPersonajes.length;i++)
			if(personaje.nombre==this.listaPersonajes[i].nombre && personaje.descripcion==this.listaPersonajes[i].descripcion)
				key=this.listaPersonajes[i].id;
			
		almacen.delete(key);
		this.ejecutarCallBacks();
	}
	/**
	*Método para la filtración por busqueda de un nuevo personaje, recibe como parametro un personaje de la clase Personajes
	*@param {personaje}
	*/
	filtrar(personaje){
		for(let i=0;i<this.listaPersonajes.length;i++){
			if(personaje==this.listaPersonajes[i].nombre){
				this.controlador.mostrarPersonajeAlmacenado(this.listaPersonajes[i]);
			}
		}
	}
	/**
	*Método para el registro de callbacks para avisar a la vistas según el patron observador, recibe como parametro un callbacks
	*@param {callback}
	*/
	registrar(callBack){
		this.callBacks.push(callBack);
		
	}
	/**
	*Método para la ejecución de los callbacks almacenados
	*/
	ejecutarCallBacks(){
		for(let llamada of this.callBacks){
			llamada();
			console.log(llamada)
			
		}
	}
}                                                              