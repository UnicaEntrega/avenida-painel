export function loginBool (state) {
	return state.loginBool
}
export function clientes (state) {
	return state.clientes
}
export function usuarios (state) {
	return state.usuarios
}
export function motoboys (state) {
	return state.motoboys
}

export function selectCliente (state) {
	return id => state.clientes.filter(val => val.id == id)
}

export function selectUsuario (state) {
	return id => state.usuarios.filter(val => val.id == id)
}
export function selectMotoboy (state) {
	return id => state.motoboys.filter(val => val.id == id)
}