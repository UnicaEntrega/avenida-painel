import { mapGetters } from "vuex"
import jsonpAdapter from 'axios-jsonp'
export default ({app, Vue}) => {
	Vue.mixin({
		computed: {
			...mapGetters({
				getLogin: "getLogin",
				getUsuario: "getUsuario",
				getChats: "getChats",
				getTotalNaoLidas: "getTotalNaoLidas",
				getMotoboysOnline: "getMotoboysOnline"
			}),
			ufOptions() {return ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']},
			tipoVeiculoOptions() {return ['Moto','Carro','Van','Caminhão']},
			coletaStatusOptions() {return ['Aberto','Encaminhado','Em Coleta','Em Entrega','Entregue','Finalizado','Cancelado']},
			tipoEntregaOptions() {return [{label:'Convencional (em até 30 minutos)',value:'Convencional'},{label:'Expresso (em até 20 minutos)',value:'Expresso'}]},
			formaPagamentoOptions() {return [{label:'Boletim de Transporte',value:'Boletim de Transporte'},{label:'Pix',value:'Pix'},{label:'Débito (na máquina)',value:'Débito'},{label:'Crédito (na máquina)',value:'Crédito'},{label:'Dinheiro',value:'Dinheiro'},{label:'Depósito',value:'Depósito'}]},
			simNaoOptions() {return [{label:'Sim',value:'1'},{label:'Não',value:'0'}]},
			usuarioPerfil() {return this.getUsuario.perfis && this.getUsuario.perfis.length>0 ? this.getUsuario.perfis[0].slug : ''},
			coordsDefault() {return {lat:-25.3994957,lng:-49.2386427}}
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
				try {
					if (this.$root.chat_ws) this.$root.chat_ws.close()
				}
				catch(e){}
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
			async buscarCep(cep) {
				cep = !this.isBlank(cep) ? cep.replace(/\D/g,'') : ''
				if (this.isBlank(cep)) return null
				try {
					let response = await this.$axios.request({url:`https://viacep.com.br/ws/${cep}/json/`,adapter:jsonpAdapter,method:'get'})
					if (response.status===200) {
						console.log(response)
						return response.data
					}
				}
				catch(e) {}
				return null
			},
			async buscarGeocode(address,latLng) {
				function resolver(opt) {
					return new Promise(resolve=>{
						Vue.$geocoder.send(opt,response=>resolve(response))
					})
				}
				Vue.$geocoder.setDefaultMode(address ? 'address' : 'lat-lng')
				let response = await resolver(address ? {address_line_1:address} : latLng)
				if (response.status==='OK' && response.results.length>0) {
					if (address) {
						let pos = {lat:0,lng:0}
						pos.lat = response.results[0].geometry.location.lat
						pos.lng = response.results[0].geometry.location.lng
						return pos
					}
					else return response.results[0].formatted_address
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
			formatarEndereco(item) {
				return item.endereco+', '+(item.endereco_numero || '')+(this.isBlank(item.complemento) ? '' : ', '+item.complemento)+' - '+item.bairro+' - '+item.cidade+' - '+item.estado
			},
			testarEndereco(item) {
				return item.cep && item.endereco && item.bairro && item.cidade && item.estado
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
			responseError(response) {
				if (response.data.error && response.data.error.message)
					this.$q.notify({message:(response.data.error.e ? response.data.error.e+'<br>' : '')+response.data.error.message,type:'negative',html:true})
				else
					this.$q.notify({message:'Não foi possível executar a solicitação!',type:'negative'})
			},
			getObjectValue(obj,arr,s) {
				s = s || ''
				if (this.isBlank(obj)) return s
				for (let item of arr) {
					obj = obj[item]
					if (this.isBlank(obj)) return s
				}
				return obj
			},
			validatorEmail(val) {
				let index = val.indexOf("@");
				return (index > 0 && val.includes(".", index)) || "Este email é inválido."
			},
			validatorRequired(val) {
				return !this.isBlank(val) || "Este campo é obrigatório."
			},
			validatorDate(val) {
				return val.length === 10 && Vue.moment(val, 'DD/MM/YYYY').isValid() || "Esta data é inválida"
			},
			validatorTime(val) {
				return val.length === 5 && Vue.moment('01/01/2000 '+val, 'DD/MM/YYYY HH:mm').isValid() || "Esta hora é inválida"
			},
			validatorBoletim(val) {
				return val!=='0' || "Este campo é obrigatório."
			},
			async carregarChats() {
				var response = await this.executeMethod({url:'api/Conversas',method:'get'})
				if (response.status===200) {
					let c = {}
					for (let item of response.data) {
						if (item.coleta_id) c['coleta'+item.coleta_id] = item
						else c['motoboy'+item.motoboy_id] = item
					}
					await this.$store.commit('setDados',{key:'chats',value:c})
				}
				this.$root.$emit('carregarTelaChat')
			},
			calcularTotalKm(pontos) {
				let self = this
				return new Promise(resolve=>{
					this.$gmapApiPromiseLazy().then(()=>{
						let origens = []
						let destinos = []
						for (let idx in pontos) {
							if (parseInt(idx)===0) origens.push(pontos[idx])
							else if (parseInt(idx)===pontos.length-1) destinos.push(pontos[idx])
							else {
								origens.push(pontos[idx])
								destinos.push(pontos[idx])
							}
						}
						destinos.unshift(origens[0])
						origens.unshift(self.coordsDefault)
						new google.maps.DistanceMatrixService().getDistanceMatrix({
							origins: origens,
							destinations: destinos,
							travelMode: 'DRIVING'
						},function(response,status){
							if (status!=='OK') resolve({total:0,maior_distancia:0})
							let total = 0
							let maior_distancia = 0
							for (let i in origens) {
								if (i==='0') {
									for (let item of response.rows[0].elements)
										if (item.distance.value>maior_distancia)
											maior_distancia = item.distance.value
								}
								else total += response.rows[i].elements[i].distance.value
							}
							resolve({total:total/1000,maior_distancia:maior_distancia/1000})
						})
					})
				})
			}
		}
	})
}