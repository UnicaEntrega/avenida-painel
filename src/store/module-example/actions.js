export function adicionarCliente(context, data) {
	context.commit("adicionarCliente", data);
}
export function removerCliente(context, id) {
	context.commit("removerCliente", id);
}
export function adicionarUsuario(context, data) {
	context.commit("adicionarUsuario", data);
}
export function removerUsuario(context, id) {
	context.commit("removerUsuario", id);
}
export function adicionarMotoboy(context, data) {
	context.commit("adicionarMotoboy", data);
}
export function removerMotoboy(context, id) {
	context.commit("removerMotoboy", id);
}
export function adicionarColeta(context, data) {
	context.commit("adicionarColeta", data);
}
export function removerColeta(context, id) {
	context.commit("removerColeta", id);
}

export function login (context) {
	context.commit("login");
}

export function logout (context) {
	context.commit("logout");
}
