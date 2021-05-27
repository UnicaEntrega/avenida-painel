<template>
	<q-layout>
		<q-page-container>
			<q-page class="grid-login">
				<div class="grid-a align-center bg-primary">
					<q-img src="images/avenida_web_marca_bco.png" width="150px" no-default-spinner></q-img>
				</div>
				<div class="grid-c q-px-xl bg-primary">
					<q-form @submit="onSubmit" class="q-gutter-y-md">
						<h1 class="text-center text-h6 text-white">Faça o seu Login</h1>
						<div class="q-gutter-y-sm">
							<q-input dark dense standout ref="email" type="email" v-model="form.email" label="E-mail" :rules="[validadorEmail, validadorRequerido]" @keyup.enter="$refs.password.focus()" autofocus></q-input>
							<q-input dark dense standout ref="password" type="password" v-model="form.password" label="Senha" :rules="[validadorRequerido]"></q-input>
							<div class="align-center q-mt-none">
								<q-btn label="Esqueci minha senha" color="white" no-caps flat dense @click="abrirModalEsqueceuSenha()"></q-btn>
							</div>
						</div>
						<div class="row align-center bg-primary">
							<div class="col-md-10 col-xs-12">
								<q-btn dark class="full-width q-px-lg" type="submit" label="LOGIN" color="white" text-color="primary" no-caps></q-btn>
							</div>
						</div>
						<div class="row align-center bg-primary">
							<div class="col-md-10 col-xs-12">
								<q-btn dark class="full-width q-px-lg" to="/cadastro" label="FAÇA SEU CADASTRO" color="white" no-caps outline></q-btn>
							</div>
						</div>
					</q-form>
				</div>
				<div class="grid-b bg-primary">
					<q-img class="fit" src="images/placeholder-login-bg.jpg">
						<div class="fit align-center" style="background-color: rgba(0,0,0, 0.6)"></div>
					</q-img>
				</div>
			</q-page>
		</q-page-container>
		<!-- <div class="col-4 row justify-center">
			<div class="col-10 offset-1 text-center text-h6 no-margin" v-if="expirado">O link usado está expirado!<br />Clique em "Esqueci minha senha" se ainda precisar recuperar ou criar sua senha.</div>
			<q-card class="col-3">
				<q-card-section class="primary-gradient text-white text-h5 text-center">
					<div>ACESSE <b>SUA CONTA</b></div>
				</q-card-section>
				<q-card-section class="q-gutter-y-sm">
					<q-input label="Login" v-model="form.email" type="email" ref="email" v-on:keyup.enter="$refs.password.focus()" bottom-slots :error-message="mostrarMsgErro($v.form.email)" @blur="$v.form.email.$touch" :error="$v.form.email.$error"></q-input>
					<q-input label="Senha" v-model="form.password" type="password" ref="password" v-on:keyup.enter="doLogin()" bottom-slots :error-message="mostrarMsgErro($v.form.password)" @blur="$v.form.password.$touch" :error="$v.form.password.$error"></q-input>
				</q-card-section>
				<q-card-section>
					<q-item>
						<q-item-section>
							<q-btn label="Esqueci minha senha" align="left" flat no-caps dense @click="abrirModalEsqueceuSenha()"></q-btn>
						</q-item-section>
						<q-item-section side>
							<q-btn label="Entrar" color="primary" @click="doLogin()"></q-btn>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-btn label="Faça seu cadastro" outline no-caps dense @click="$router.push('/cadastro')"></q-btn>
						</q-item-section>
					</q-item>
				</q-card-section>
			</q-card>
		</div> -->
		<!-- Modal Esqueceu Senha -->
		<q-dialog v-model="modalEsqueceuSenha" @show="$refs.esqueceuEmail.focus()">
			<q-card>
				<q-card-section class="row items-center">
					<div class="text-h6">Esqueceu sua senha</div>
					<q-space />
					<q-btn icon="close" flat round dense v-close-popup />
				</q-card-section>
				<q-separator />
				<q-card-section>
					<p>Informe seu e-mail de cadastro para que possamos lhe enviar uma nova senha.</p>
					<div class="row q-pa-md">
						<div class="col-12"><q-input v-model="esqueceu.email" label="Email" bottom-slots :rules="[validadorEmail, validadorRequerido]" ref="esqueceuEmail" @keyup.enter="enviarEsqueceuSenha()" /></div>
					</div>
				</q-card-section>
				<q-separator />
				<q-card-actions align="around">
					<q-btn flat no-caps label="Enviar" color="primary" icon="check" @click="enviarEsqueceuSenha()" />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</q-layout>
</template>
<script>
import { validadorEmail, validadorRequerido } from 'src/services/validador.js'
export default {
	name: 'Login',
	data() {
		return {
			form: {
				email: '',
				password: ''
			},
			modalEsqueceuSenha: false,
			esqueceu: {
				email: ''
			},
			expirado: false
		}
	},
	methods: {
		validadorEmail,
		validadorRequerido,
		async onSubmit() {
			// this.$v.form.$touch()
			// if (this.$v.form.$error) return
			this.$q.loading.show()
			await this.$store.dispatch('limparStore')
			var response = await this.executeMethod({ url: 'auth/login', method: 'post', data: this.form })
			if (response) {
				if (response.status === 200) {
					await this.$store.commit('setDados', { key: 'login', value: response.data.login })
					await this.$store.commit('setDados', { key: 'usuario', value: response.data.usuario })
					this.$router.push('/')
				} else {
					this.$q.notify({ message: this.getObjectValue(response, ['data', 'error', 'message'], 'Não foi possível executar a solicitação!'), type: 'negative' })
				}
			}
			this.$q.loading.hide()
		},
		abrirModalEsqueceuSenha() {
			this.modalEsqueceuSenha = true
			this.esqueceu.email = this.form.email
		},
		async enviarEsqueceuSenha() {
			// this.$v.esqueceu.$touch()
			// if (this.$v.esqueceu.$error) return
			this.$q.loading.show()
			var response = await this.executeMethod({ url: 'auth/forgot', method: 'post', data: { email: this.esqueceu.email } })
			if (response.status === 200) {
				this.$q.notify({ message: response.data.message, type: 'positive' })
				this.modalEsqueceuSenha = false
			} else {
				if (response.data.error && response.data.error.message) this.$q.notify({ message: (response.data.error.e ? response.data.error.e + '<br>' : '') + response.data.error.message, type: 'negative', html: true })
				else this.$q.notify({ message: 'Não foi possível executar a solicitação!', type: 'negative' })
			}
			this.$q.loading.hide()
		}
	},
	created() {
		if (!this.isBlank(this.getLogin.token)) this.$router.push('/')

		if (this.$route.query.expirado) this.$q.notify({ type: 'negative', message: 'O link utilizado está expirado! Clique em "Esqueci minha senha" se ainda precisar recuperar ou criar sua senha.' })
		else if (this.$route.query.sucesso) this.$q.notify({ type: 'positive', message: 'Sua senha foi alterada com sucesso' })
	}
}
</script>
