
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
			{ path: "motoboys", component: () => import("pages/Motoboys/List.vue"), children: [
				{ path: "edit", component: () => import("pages/Motoboys/Edit.vue")},
				{ path: "edit/:id", component: () => import("pages/Motoboys/Edit.vue")},
				{ path: "show/:id", component: () => import("pages/Motoboys/Edit.vue"), meta: { show: true }},
			] },
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
