<template>
	<div>
		<q-card>
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
				<q-card-section class="row">
					<div class="col-6 text-h6 text-primary">Cadastro de Clientes</div>
					<div class="col-6 row justify-end">
						<q-btn v-if="showBool" label="Registrar Bloco" icon="receipt_long" @click="abrirModalBloco" color="primary" flat></q-btn>
						<q-btn v-if="showBool" label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat></q-btn>
						<q-btn v-if="showBool" label="Remover" icon="delete" color="negative" flat @click="removerCliente"></q-btn>
						<q-btn v-if="showBool" label="Editar" icon="edit" color="primary" @click="showBool = false"></q-btn>
						<q-btn v-if="!showBool" label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
						<q-btn v-if="!showBool" label="Salvar" icon="save" type="submit" color="primary"></q-btn>
					</div>
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section class="row q-col-gutter-sm">
					<div class="col-3">
						<q-input v-model="cliente.nome" label="Nome*" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="cliente.cpf_cnpj" label="CPF/CNPJ*" v-mask="['###.###.###-##', '##.###.###/####-##']" :rules="[validatorRequired, val => ((val.length == 14 && testarCpf(val)) || (val.length == 18 && testarCnpj(val))) || 'CPF/CNPJ inválido']" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="cliente.telefone" label="Telefone*" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[validatorRequired, val => val.length >= 14 || 'Telefone incompleto']" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="cliente.email" label="E-mail*" :rules="[validatorRequired, validatorEmail]" :readonly="showBool"></q-input>
					</div>
					<div class="col-12">
						<q-input v-model="cliente.observacao" type="textarea" label="Observações" :readonly="showBool"></q-input>
					</div>
				</q-card-section>
				<q-card-section class="row q-col-gutter-sm">
						<q-item-label class="col-12 text-h6 text-primary">
							Endereço
						</q-item-label>
						<div class="col-xl-1 col-xs-3">
							<q-input v-model="cliente.cep" label="CEP*" :loading="cepLoading" v-mask="'##.###-###'" :rules="[validatorRequired, val => val.length >= 10 || 'CEP inválido']" @blur="pesquisarCep" :readonly="showBool"></q-input>
						</div>
						<div class="col-xl-3 col-xs-3">
							<q-input v-model="cliente.endereco" label="Rua*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool"></q-input>
						</div>
						<div class="col-xl-1 col-xs-3">
							<q-input v-model="cliente.endereco_numero" label="Número" :loading="cepLoading" :readonly="showBool" ref="endereco_numero"></q-input>
						</div>
						<div class="col-xl-2 col-xs-3">
							<q-input v-model="cliente.complemento" label="Complemento" :loading="cepLoading" :readonly="showBool"></q-input>
						</div>
						<div class="col-xl-2 col-xs-3">
							<q-input v-model="cliente.bairro" label="Bairro*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool"></q-input>
						</div>
						<div class="col-xl-2 col-xs-3">
							<q-input v-model="cliente.cidade" label="Cidade*" :loading="cepLoading" :rules="[validatorRequired]" :readonly="showBool"></q-input>
						</div>
						<div class="col-xl-1 col-xs-3">
							<q-select v-model="cliente.estado" label="Estado*" :options="ufOptions" :loading="cepLoading" :rules="[validatorRequired]"></q-select>
						</div>
				</q-card-section>
				<q-card-section>
					<q-item-label class="text-h6 text-primary">
						Contatos
						<q-btn icon="add" color="primary" flat dense @click="adicionarContato"></q-btn>
					</q-item-label>
					<q-list separator>
						<transition-group enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
							<q-item v-for="(contato, index) in cliente.contatos" :key="'contato'+index">
								<q-item-section side class="text-primary text-h6 text-bold">
									{{index}} -
								</q-item-section>
								<q-item-section>
									<div class="row q-col-gutter-sm">
										<div class="col-4">
											<q-input v-model="contato.nome" label="Nome*" :rules="[validatorRequired]" :readonly="showBool"></q-input>
										</div>
										<div class="col-4">
											<q-input v-model="contato.telefone" label="Telefone*" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[validatorRequired, val => val.length >= 14 || 'Telefone incompleto']" :readonly="showBool"></q-input>
										</div>
										<div class="col-4">
											<q-input v-model="contato.email" label="E-mail*" :rules="[validatorRequired, validatorEmail]" :readonly="showBool"></q-input>
										</div>
									</div>
								</q-item-section>
								<q-item-section side>
									<q-btn icon="close" color="primary" flat @click="removerContato(index)"></q-btn>
								</q-item-section>
							</q-item>
						</transition-group>
					</q-list>
				</q-card-section>
				<q-card-section class="q-col-gutter-md row items-center">
					<div class="col-6 text-grey-6">
						*Campos obrigatórios
					</div>
					<div class="col-6 row justify-end">
						<q-btn v-if="!showBool" label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
						<q-btn v-if="!showBool" label="Salvar" icon="save" type="submit" color="primary"></q-btn>
					</div>
				</q-card-section>
			</q-form>
		</q-card>

		<q-dialog v-model="modalBloco">
			<q-card>
				<q-form @submit="salvarBloco" @reset="modalBloco=false" class="q-gutter-y-md">
					<q-card-section>
						<q-item-label class="text-h6 text-primary">Registrar Bloco</q-item-label>
					</q-card-section>
					<q-card-section class="row q-col-gutter-sm">
						<div class="col-12">
							<q-input type="number" v-model="bloco_numero" label="Número" :rules="[validatorRequired]"></q-input>
						</div>
					</q-card-section>
					<q-card-section class="q-col-gutter-md row items-center">
						<div class="col-12 row justify-end">
							<q-btn label="Cancelar" icon="close" color="negative" flat type="reset"></q-btn>
							<q-btn label="Salvar" icon="save" color="primary" type="submit"></q-btn>
						</div>
					</q-card-section>
				</q-form>
			</q-card>
		</q-dialog>
	</div>
</template>
<script>
export default {
	data () {
		return {
			cepLoading: false,
			showBool: false,
			cliente: {
				nome: "",
				cpf_cnpj: "",
				telefone: "",
				email: "",
				cep: "",
				endereco: "",
				endereco_numero: "",
				complemento: "",
				bairro: "",
				cidade: "",
				estado: "",
				contatos: [],
				observacao: ""
			},
			bloco_numero: '',
			modalBloco: false
		}
	},
	methods: {
		abrirModalBloco() {
			this.bloco_numero = ''
			this.modalBloco = true
		},
		async salvarBloco() {
			var response = await this.executeMethod({url:`api/Clientes/registrarBloco/${this.cliente.id}`,method:'post',data:{numero:this.bloco_numero}})
			if (response.status===200) this.modalBloco = false
		},
		adicionarContato() {
			this.cliente.contatos.push({
				nome: "",
				telefone: "",
				email: ""
			})
		},
		async onSubmit() {
			var response = await this.executeMethod({url:'api/Clientes'+(this.cliente.id ? '/'+this.cliente.id : ''),method:this.cliente.id ? 'put' : 'post',data:this.cliente})
			if (response.status===200) {
				if (this.usuarioPerfil==='cliente') this.$router.push("/");
				else this.$router.push("/cadastroClientes");
				this.$q.notify({
					message: "Cliente cadastrado com sucesso.",
					type: "positive"
				})
			}
			else {
				this.$q.notify({
					message: response.data.error.message,
					type: "negative"
				})
			}
		},
		onReset() {
			if (this.usuarioPerfil==='cliente') this.$router.push("/");
			else if (!this.showBool && this.cliente.id) this.showBool = true;
			else this.$router.push("/cadastroClientes");
		},
		async pesquisarCep() {
			this.cepLoading = true;
			let r = await this.buscarCep(this.cliente.cep)
			if (r) {
				this.cliente.endereco = r.logradouro
				this.cliente.bairro = r.bairro
				this.cliente.cidade = r.localidade
				this.cliente.estado = r.uf
				this.$refs.endereco_numero.focus()
			}
			this.cepLoading = false;
		},
		removerContato(index) {
			this.$q.dialog({title:'Confirmação',message:'Tem certeza que deseja remover este contato? Esta ação é irreversível.',ok:'Sim',cancel:'Não'}).onOk(()=>{
        this.cliente.contatos.splice(index, 1);
				this.$q.notify({
					message: "Contato removido com sucesso",
					type: "positive"
				})
			})
		},
		removerCliente() {
			this.$q.dialog({title:'Confirmação',message:'Tem certeza que deseja remover este cliente? Esta ação é irreversível.',ok:'Sim',cancel:'Não'}).onOk(async ()=>{
        var response = await this.executeMethod({url:'api/Clientes/'+this.cliente.id,method:'delete'})
				if (response.status===200) {
					this.$q.notify({
						message: "Cliente removido com sucesso",
						type: "positive"
					})
					this.$router.push("/cadastroClientes")
				}
			})
		}
	},
	async created() {
		if (this.usuarioPerfil==='cliente') {
			let response = await this.executeMethod({url:'api/Clientes/meusDados',method:'get'})
			if (response.status===200) {
				this.cliente = response.data
				this.cliente.contatos.sort(function(a,b){return a.id-b.id})
			}
			else {
				this.$q.notify({
					message: "Cliente não encontrado",
					type: "negative"
				})
				this.$router.push("/")
			}
			this.showBool = false
		}
		else if (this.$route.params.id) {
			let response = await this.executeMethod({url:`api/Clientes/show/${this.$route.params.id}`,method:'get'})
			if (response.status===200) {
				this.cliente = response.data
				this.cliente.contatos.sort(function(a,b){return a.id-b.id})
			}
			else {
				this.$q.notify({
					message: "Cliente não encontrado",
					type: "negative"
				})
				this.$router.push("/cadastroClientes")
			}
			this.showBool = this.$route.meta.show
		}
	}
}
</script>