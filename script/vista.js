
/**
*Clase para la creacion de vistas
*/
export class Vista{
	/**
	*Constructor parametrizado para la instancia de las vistas
	*/
	constructor(div){
		this.div=div
	}
	/**
	*Metodo para la visualización de las vistas, recibe como parametro visualizar de tipo bit
	*@param {visualizar}
	*/
	mostrar(visualizar){
		if(visualizar)
			this.div.style.display='block'
		else
			this.div.style.display='none'
	}
}