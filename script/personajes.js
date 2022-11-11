/**
*Clase para la creación de personajes
*/
export class Personaje{
	/**
	*Constructor parametrizado para la instancia de personajes, recibe como parametros nombre,descripcion,aparicion y tipo para setearlo
	*/
	constructor(nombre,descripcion,aparicion,tipo){
		this.nombre=nombre
		this.descripcion=descripcion
		this.aparicion=aparicion
		this.tipo=tipo
	}
	/**
	*Método para el seteo de nombre para personaje, recibe como parametro un string
	*@param {nombre}
	*/
	setNombre(nombre){
		this.nombre=nombre
	}
	/**
	*Método que devuelve el nombre seteado anteriormente
	*@return {nombre}
	*/
	getNombre(){
		return this.nombre
	}
	/**
	*Método para el seteo de descripcion para personaje, recibe como parametro una string
	*@param {descripcion}
	*/
	setDescripcion(descripcion){
		this.descripcion=descripcion
	}
	/**
	*Método que devuelve la descripcion seteado anteriormente
	*@return {descripcion}
	*/
	getDescripcion(){
		return this.descripcion
	}
	/**
	*Método para el seteo de aparicion para personaje, recibe como parametro una fecha
	*@param {aparicion}
	*/
	setAparicion(aparicion){
		this.aparicion=aparicion
	}
	/**
	*Método que devuelve la aparicion seteado anteriormente
	*@return {aparicion}
	*/
	getAparicion(){
		return this.aparicion
	}
	/**
	*Método para el seteo de tipo para personaje, recibe como parametro una string
	*@param {tipo}
	*/
	setTipo(tipo){
		this.tipo=tipo
	}
	/**
	*Método que devuelve el tipo seteado anteriormente
	*@return {tipo}
	*/
	getTipo(){
		return this.tipo
	}
	/**
	*Método para el seteo de url para personaje, recibe como parametro un string
	*@param {url}
	*/
	setURL(url){
		this.url=url
	}
	/**
	*Método que devuelve la ur seteado anteriormente
	*@return {url}
	*/
	getURL(){
		return url
	}
	/**
	*Método para el seteo de img para personaje, recibe como parametro una imagen
	*@param {img}
	*/
	setImg(img){
		this.img=img
	}
	/**
	*Método que devuelve la img seteado anteriormente
	*@return {img}
	*/
	getImg(){
		return this.img
	}
}