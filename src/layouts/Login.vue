<template>
	<div class="column justify-center" style="height: 100vh">
		<div class="col-3 row justify-center">
			<q-card class="col-3">
				<q-card-section class="primary-gradient text-white text-h5 text-center">
					<div>ACESSE <b>SUA CONTA</b></div>
				</q-card-section>
				<q-card-section class="q-gutter-y-sm">
					<q-input label="Login" v-model="form.email" type="email" ref="email" bottom-slots :error-message="mostrarMsgErro($v.form.email)" @blur="$v.form.email.$touch" :error="$v.form.email.$error"></q-input>
					<q-input label="Senha" v-model="form.password" type="password" v-on:keyup.enter="doLogin()" bottom-slots :error-message="mostrarMsgErro($v.form.password)" @blur="$v.form.password.$touch" :error="$v.form.password.$error"></q-input>
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
				</q-card-section>
			</q-card>
		</div>
		<!-- Modal Esqueceu Senha -->
		<q-dialog v-model="modalEsqueceuSenha" @show="$refs.esqueceuEmail.focus()">
			<q-card>
				<q-card-section class="row items-center">
					<div class="text-h6">Esqueceu sua senha</div>
					<q-space/>
					<q-btn icon="close" flat round dense v-close-popup/>
				</q-card-section>
				<q-separator/>
				<q-card-section>
					<p>Informe seu e-mail de cadastro para que possamos lhe enviar uma nova senha.</p>
					<div class="row q-pa-md">
						<div class="col-12"><q-input v-model="esqueceu.email" label="Email" bottom-slots :error-message="mostrarMsgErro($v.esqueceu.email)" @blur="$v.esqueceu.email.$touch" :error="$v.esqueceu.email.$error" ref="esqueceuEmail" v-on:keyup.enter="enviarEsqueceuSenha()"/></div>
					</div>
				</q-card-section>
				<q-separator/>
				<q-card-actions align="around">
					<q-btn flat no-caps label="Enviar" color="primary" icon="check" @click="enviarEsqueceuSenha()"/>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
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
			}
		}
	},
	validations: {
		form: {
			email: {required,email},
			password: {required}
		},
		esqueceu: {email: {required,email}}
	},
	methods: {
		async doLogin() {
			this.$v.form.$touch()
			if (this.$v.form.$error) return
			this.$q.loading.show()
			await this.$store.dispatch('limparStore')
			var response = await this.executeMethod({url:'auth/login',method:'post',data:this.form})
			if (response) {
				if (response.status===200) {
					await this.$store.commit('setDados',{key:'login',value:response.data.login})
					await this.$store.commit('setDados',{key:'usuario',value:response.data.usuario})
					this.$router.push('/')
				}
				else {
					this.$q.notify({message:this.getObjectValue(response,['data','error','message'],'Não foi possível executar a solicitação!'),type:'negative'})
				}
			}
			this.$q.loading.hide()
		},
		abrirModalEsqueceuSenha() {
			this.modalEsqueceuSenha = true
			this.esqueceu.email = this.form.email
			this.$v.esqueceu.$reset()
		},
		async enviarEsqueceuSenha() {
			this.$v.esqueceu.$touch()
			if (this.$v.esqueceu.$error) return
			this.$q.loading.show()
			var response = await this.executeMethod({url:'auth/forgot',method:'post',data:{email:this.esqueceu.email}})
			if (response.status===200) {
				this.$q.notify({message:response.data.message,type:'positive'})
				this.modalEsqueceuSenha = false
			}
			else {
				if (response.data.error && response.data.error.message)
					this.$q.notify({message:(response.data.error.e ? response.data.error.e+'<br>' : '')+response.data.error.message,type:'negative',html:true})
				else
					this.$q.notify({message:'Não foi possível executar a solicitação!',type:'negative'})
			}
			this.$q.loading.hide()
		}
	},
	mounted() {
		this.$refs.email.focus()
	},
	created() {
		if (!this.isBlank(this.getLogin.token)) this.$router.push('/')
	}
}
</script>