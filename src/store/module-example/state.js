export default function () {
	return {
		loginBool: false,
		clientes: [
			{
				id: 0,
				nome: "Cliente de test 1",
				cpf: "1234567890",
				telefone: "41987654321",
				email: "test1@email.com",
				cep: "87654321",
				rua: "Rua de test 1",
				número: "100",
				complemento: "Ap 2",
				bairro: "Bairro de test 1",
				cidade: "Cidade test 1",
				estado: "PR",
				contatos: [
					{
						nome: "Contato 1",
						telefone: "41987654321",
						email: "contato1@email.com"
					},
					{
						nome: "Contato 2",
						telefone: "41987654321",
						email: "contato2@email.com"
					},
					{
						nome: "Contato 3",
						telefone: "41987654321",
						email: "contato3@email.com"
					},
				],
				observações: "Texto de observações do cadastro de clientes do app Avenida.",
			},
			{
				id: 1,
				nome: "Cliente de test 2",
				cpf: "1234567890",
				telefone: "41987654321",
				email: "test2@email.com",
				cep: "87654321",
				rua: "Rua de test 2",
				número: "200",
				complemento: "Ap 1",
				bairro: "Bairro de test 2",
				cidade: "Cidade test 2",
				estado: "PR",
				contatos: [
					{
						nome: "Contato 3",
						telefone: "41987654321",
						email: "contato3@email.com"
					},
					{
						nome: "Contato 4",
						telefone: "41987654321",
						email: "contato4@email.com"
					},
					{
						nome: "Contato 5",
						telefone: "41987654321",
						email: "contato5@email.com"
					},
				],
				observações: "Texto de observações do cadastro de clientes do app Avenida.",
			},
		],
		usuarios: [
			{
				id: 0,
				nome: "Usuario de test 3",
				email: "test3@email.com",
				senha: "test3",
				perfil: "cliente",
				ativo: true
			},
			{
				id: 1,
				nome: "Usuario de test 4",
				email: "test4@email.com",
				senha: "test4",
				perfil: "motoboy",
				ativo: false
			}
		],
		motoboys: [
			{
				id: 0,
				nome: "Motoboy de test 1",
				email: "test3@email.com",
				senha: "test3",
				tipoVeiculo: "moto",
				placa: "nab-3900",
				telefone: "(34) 34234-2434"
			},
			{
				id: 1,
				nome: "Motoboy de test 2",
				email: "test4@email.com",
				senha: "test4",
				tipoVeiculo: "carro",
				placa: "jpa-9302",
				telefone: "(34) 4233-2434"
			}
		],
		coletas: [
			{
				id: "0",
				cliente: {
					nome: "Cliente de test 1"
				},
				enderecoColeta: {
					cep: "68486848",
					rua: "Rua teste",
					numero: 20,
					complemento: "",
					bairro: "Bairro teste",
					cidade: "Cidade de teste",
					estado: "PR",
				},
				responsavelColeta: {
					nome: "Nome do responsavel de coleta",
					telefone: "41987654321"
				},
				telefone: "41987654321",
				enderecosEntrega: [
					{
						cep: "68486848",
						rua: "Rua teste",
						numero: 20,
						complemento: "",
						bairro: "Bairro teste",
						cidade: "Cidade de teste",
						estado: "PR",
						destinatario: {
							nome: "Nome do destinatário de entrega",
							telefone: "41987654321"
						},
					},
					{
						cep: "87654321",
						rua: "Rua de exemplo",
						numero: 562,
						complemento: "",
						bairro: "Bairro teste",
						cidade: "Cidade de teste",
						estado: "PR",
						destinatario: {
							nome: "Nome do destinatário de entrega",
							telefone: "41987654321"
						},
					},
				],
				comRetorno: "Não",
				observacoes: "",
				tipoEntrega: "Expresso",
				valorEntrega: "300",
				formaPagamento: "Boleto",
				numeroBoleto: "234",
				motoboy: {
					nome: "Motoboy de test 2",
				},
				porcentagemComissao: "10"
			}
		]
	}
}
