
const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/Index.vue') },
			{ path: "cadastroClientes", component: () => import("pages/CadastroClientes/List.vue"), children: [
				{ path: "edit", component: () => import("pages/CadastroClientes/Edit.vue")},
				{ path: "edit/:id", component: () => import("pages/CadastroClientes/Edit.vue")},
				{ path: "show/:id", component: () => import("pages/CadastroClientes/Edit.vue"), meta: { show: true }},
			] },
			{ path: "cadastroUsuarios", component: () => import("pages/CadastroUsuarios/List.vue"), children: [
				{ path: "edit", component: () => import("pages/CadastroUsuarios/Edit.vue")},
				{ path: "edit/:id", component: () => import("pages/CadastroUsuarios/Edit.vue")},
				{ path: "show/:id", component: () => import("pages/CadastroUsuarios/Edit.vue"), meta: { show: true }},
			] },
			{ path: "cadastroColetas", component: () => import("pages/CadastroColetas/List.vue"), children: [
				{ path: "edit", component: () => import("pages/CadastroColetas/Edit.vue")},
				{ path: "edit/:id", component: () => import("pages/CadastroColetas/Edit.vue")},
				{ path: "show/:id", component: () => import("pages/CadastroColetas/Edit.vue"), meta: { show: true }},
			] },
			{ path: "cadastroMotoboys", component: () => import("pages/CadastroMotoboys/List.vue"), children: [
				{ path: "edit", component: () => import("pages/CadastroMotoboys/Edit.vue")},
				{ path: "edit/:id", component: () => import("pages/CadastroMotoboys/Edit.vue")},
				{ path: "show/:id", component: () => import("pages/CadastroMotoboys/Edit.vue"), meta: { show: true }},
			] },
			{ path: "cadastroVeiculos", component: () => import("pages/CadastroVeiculos/List.vue"), children: [
				{ path: "edit", component: () => import("pages/CadastroVeiculos/Edit.vue")},
				{ path: "edit/:id", component: () => import("pages/CadastroVeiculos/Edit.vue")},
				{ path: "show/:id", component: () => import("pages/CadastroVeiculos/Edit.vue"), meta: { show: true }},
			] },
			{ path: 'coleta/:id', component: () => import('pages/Coleta.vue') },
			{ path: "meusDados", component: () => import("pages/CadastroClientes/List.vue"), children: [
				{ path: "/", component: () => import("pages/CadastroClientes/Edit.vue")}
			] },
			{ path: "minhasColetas", component: () => import("pages/CadastroColetas/Minhas.vue") },
			{ path: 'chat', component: () => import('pages/Chat.vue') },
			{ path: 'chat/:id', component: () => import('pages/Chat.vue') },
			{ path: 'relatorios', component: () => import('pages/Relatorio.vue') },
			{ path: 'motoboy/:id', component: () => import('pages/Index.vue') }
		]
	},
	{
		path: "/login",
		component: () => import("layouts/Login.vue")
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue')
	}
]

export default routes
