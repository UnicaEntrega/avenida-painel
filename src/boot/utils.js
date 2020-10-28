import { mapGetters } from "vuex"
export default ({app, Vue}) => {
	Vue.mixin({
		computed: {
			...mapGetters({
				getLogin: "getLogin",
				getUsuario: "getUsuario"
			}),
			ufOptions() {return ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']},
		},
		methods: {
			async executeMethod(data) {
				let response
				try {
					if (this.getLogin && this.getLogin.token)
						this.$axios.defaults.headers.common['Authorization'] = this.getLogin.type+' '+this.getLogin.token
					else delete this.$axios.defaults.headers.common['Authorization']
					response = await this.$axios.request(data)
				}
				catch(e) {response = e.response}
				console.log(response)
				return response
			},
			async efetuarLogout() {
				if (this.getLogin) await this.executeMethod({method:'post',url:'auth/logout',data:{refresh_token:this.getLogin.refreshToken}})
				await this.$store.dispatch('limparStore')
				this.$router.push('/login')
			},
			mostrarMsgErro(field) {
				for (let item in field.$params) {
					if (!field[item]) {
						if (item==='required') return 'Este campo precisa ser preenchido'
						else if (item==='email') return 'Este campo esta em formato inválido'
						else if (item==='minLength') return 'Este campo precisa conter pelo menos '+field.$params[item].min+' caracteres'
						else if (item==='maxLength') return 'Este campo precisa conter pelo no máximo '+field.$params[item].max+' caracteres'
						else if (item==='sameAs') return 'As senhas precisam ser iguais'
						else if (item==='testarTamanho') return 'Este campo esta em formato inválido'
						else if (item==='testarCpfCnpj') return 'CPF/CNPJ informado esta inválido'
					}
				}
			},
			formatarDataHora(d,f1,f2) {
				return f2 ? Vue.moment(d,f1).format(f2) : Vue.moment(d).format(f1)
			},
			getMoment() {
				return Vue.moment
			},
			isBlank(o) {
				return o===undefined || o===null || o===''
			},
			testarCpf(cpf) {
				cpf = (cpf || '').replace(/[^\d]+/g,'')
				if (cpf == '') return false
				if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") return false
				let add = 0
				for (let i=0; i < 9; i ++)
					add += parseInt(cpf.charAt(i)) * (10 - i)
				let rev = 11 - (add % 11)
				if (rev == 10 || rev == 11) rev = 0
				if (rev != parseInt(cpf.charAt(9))) return false
				add = 0
				for (let i = 0; i < 10; i ++)
					add += parseInt(cpf.charAt(i)) * (11 - i)
				rev = 11 - (add % 11)
				if (rev == 10 || rev == 11) rev = 0
				if (rev != parseInt(cpf.charAt(10))) return false
				return true
			},
			testarCnpj(cnpj) {
				cnpj = (cnpj || '').replace(/[^\d]+/g,'')
				if (cnpj == '') return false
				if (cnpj.length != 14) return false	
				if (cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" || cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" || cnpj == "66666666666666" || cnpj == "77777777777777" || cnpj == "88888888888888" || cnpj == "99999999999999") return false
				let tamanho = cnpj.length - 2
				let numeros = cnpj.substring(0,tamanho)
				let digitos = cnpj.substring(tamanho)
				let soma = 0
				let pos = tamanho - 7
				for (let i=tamanho; i >= 1; i--) {
					soma += numeros.charAt(tamanho - i) * pos--
					if (pos < 2) pos = 9
				}
				let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
				if (resultado != digitos.charAt(0)) return false		
				tamanho = tamanho + 1
				numeros = cnpj.substring(0,tamanho)
				soma = 0
				pos = tamanho - 7
				for (let i=tamanho; i >= 1; i--) {
					soma += numeros.charAt(tamanho - i) * pos--
					if (pos < 2) pos = 9
				}
				resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
				if (resultado != digitos.charAt(1)) return false;	
				return true
			},
			getObjectValue(obj,arr,s) {
				s = s || ''
				if (this.isBlank(obj)) return s
				for (let item of arr) {
					obj = obj[item]
					if (this.isBlank(obj)) return s
				}
				return obj
			}
		}
	})
}