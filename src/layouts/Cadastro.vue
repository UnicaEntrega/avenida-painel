<template>
	<q-layout view="hHh Lpr lFf">
		<q-page-container>
			<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
				<q-card>
					<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
						<q-card-section class="row">
							<div class="col-3"><q-btn label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat /></div>
							<div class="col-6 text-center text-h6 text-primary"><q-img src="images/avenida_web_simbolo.png" style="width: 50px" /><br />Cadastro de novo cliente</div>
							<div class="col-3 text-right"><q-btn :label="step === 1 ? 'Avançar' : 'Concluir'" :icon-right="step === 1 ? 'keyboard_arrow_right' : ''" :icon="step === 1 ? '' : 'save'" type="submit" color="primary"></q-btn></div>
						</q-card-section>
						<q-separator></q-separator>
						<q-card-section class="row q-col-gutter-sm" v-show="step === 1">
							<div class="col-3">
								<q-input v-model="cliente.nome" label="Nome*" :rules="[validatorRequired]"></q-input>
							</div>
							<div class="col-3">
								<q-input v-model="cliente.cpf_cnpj" label="CPF/CNPJ*" v-mask="['###.###.###-##', '##.###.###/####-##']" :rules="[validatorRequired, val => (val.length == 14 && testarCpf(val)) || (val.length == 18 && testarCnpj(val)) || 'CPF/CNPJ inválido']"></q-input>
							</div>
							<div class="col-3">
								<q-input v-model="cliente.telefone" label="Telefone*" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[validatorRequired, val => val.length >= 14 || 'Telefone incompleto']"></q-input>
							</div>
							<div class="col-3">
								<q-input v-model="cliente.email" label="E-mail*" :rules="[validatorRequired, validatorEmail]"></q-input>
							</div>
						</q-card-section>
						<q-card-section class="row q-col-gutter-sm" v-show="step === 1">
							<q-item-label class="col-12 text-h6 text-primary">
								Endereço
							</q-item-label>
							<div class="col-xl-1 col-xs-3">
								<q-input v-model="cliente.cep" label="CEP*" :loading="cepLoading" v-mask="'##.###-###'" :rules="[validatorRequired, val => val.length >= 10 || 'CEP inválido']" @blur="pesquisarCep"></q-input>
							</div>
							<div class="col-xl-3 col-xs-6">
								<q-input v-model="cliente.endereco" label="Rua*" :loading="cepLoading" :rules="[validatorRequired]"></q-input>
							</div>
							<div class="col-xl-1 col-xs-3">
								<q-input v-model="cliente.endereco_numero" label="Número" :loading="cepLoading" ref="endereco_numero"></q-input>
							</div>
							<div class="col-xl-2 col-xs-3">
								<q-input v-model="cliente.complemento" label="Complemento" :loading="cepLoading"></q-input>
							</div>
							<div class="col-xl-2 col-xs-3">
								<q-input v-model="cliente.bairro" label="Bairro*" :loading="cepLoading" :rules="[validatorRequired]"></q-input>
							</div>
							<div class="col-xl-2 col-xs-3">
								<q-input v-model="cliente.cidade" label="Cidade*" :loading="cepLoading" :rules="[validatorRequired]"></q-input>
							</div>
							<div class="col-xl-1 col-xs-3">
								<q-select v-model="cliente.estado" label="Estado*" :options="ufOptions" :loading="cepLoading" :rules="[validatorRequired]"></q-select>
							</div>
						</q-card-section>
						<q-card-section class="row q-col-gutter-sm" v-if="step === 2">
							<div class="col-6">
								<q-input type="password" v-model="password" label="Senha*" :rules="[validatorRequired]"></q-input>
							</div>
							<div class="col-6">
								<q-input
									type="password"
									v-model="password2"
									label="Repita a senha*"
									:rules="[
										validatorRequired,
										val => {
											return val === password || 'As senhas não são iguais'
										}
									]"
								></q-input>
							</div>
						</q-card-section>
					</q-form>
				</q-card>
			</transition>
		</q-page-container>
	</q-layout>
</template>
<script>
export default {
	name: 'Login',
	data() {
		return {
			cepLoading: false,
			showBool: false,
			cliente: {
				nome: '',
				cpf_cnpj: '',
				telefone: '',
				email: '',
				cep: '',
				endereco: '',
				endereco_numero: '',
				complemento: '',
				bairro: '',
				cidade: '',
				estado: ''
			},
			password: '',
			password2: '',
			step: 1
		}
	},
	methods: {
		async pesquisarCep() {
			this.cepLoading = true
			let r = await this.buscarCep(this.cliente.cep)
			if (r) {
				this.cliente.endereco = r.logradouro
				this.cliente.bairro = r.bairro
				this.cliente.cidade = r.localidade
				this.cliente.estado = r.uf
				this.$refs.endereco_numero.focus()
			}
			this.cepLoading = false
		},
		onReset() {
			if (this.step === 1) this.$router.push('/login')
			else this.step = 1
		},
		async onSubmit() {
			this.$q.loading.show()
			if (this.step === 1) {
				var response = await this.executeMethod({ url: 'api/Clientes/cadastro', method: 'post', data: this.cliente })
				if (response.status === 200) this.step = 2
				else this.$q.notify({ message: 'Email já foi utilizado antes, por favor escolha outro.', type: 'negative' })
			} else {
				let d = { ...this.cliente }
				d.password = this.password
				var response = await this.executeMethod({ url: 'api/Clientes/cadastro', method: 'post', data: d })
				if (response.status === 200) {
					await this.$store.dispatch('limparStore')
					response = await this.executeMethod({ url: 'auth/login', method: 'post', data: { email: this.cliente.email, password: this.password } })
					if (response) {
						if (response.status === 200) {
							await this.$store.commit('setDados', { key: 'login', value: response.data.login })
							await this.$store.commit('setDados', { key: 'usuario', value: response.data.usuario })
							this.$router.push('/')
						} else this.$q.notify({ message: 'Email já foi utilizado antes, por favor escolha outro.', type: 'negative' })
					}
				} else this.responseError(response)
			}
			this.$q.loading.hide()
		}
	}
}
</script>
