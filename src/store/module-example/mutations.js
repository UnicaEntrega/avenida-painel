export function adicionarCliente(state, data) {
	if(!data.id) data.id = state.clientes.length;
	state.clientes.push(data);
}
export function removerCliente(state, id) {
	let filter = state.clientes.filter(val => val.id == id);
	state.clientes.splice(state.clientes.indexOf(filter), 1);
}

export function adicionarUsuario(state, data) {
	if(!data.id) data.id = state.usuarios.length;
	state.usuarios.push(data);
}
export function removerUsuario(state, id) {
	let filter = state.usuarios.filter(val => val.id == id);
	state.usuarios.splice(state.usuarios.indexOf(filter), 1);
}

export function adicionarMotoboy(state, data) {
	if(!data.id) data.id = state.motoboys.length;
	state.motoboys.push(data);
}
export function removerMotoboy(state, id) {
	let filter = state.motoboys.filter(val => val.id == id);
	state.motoboys.splice(state.motoboys.indexOf(filter), 1);
}

export function login (state) {
	state.loginBool = true;
}
export function logout (state) {
	state.loginBool = false;
}
