<template>
	<div class="column justify-center" style="height: 100vh">
		<div class="col-3 row justify-center">
			<q-card class="col-3">
				<q-card-section class="primary-gradient text-white text-h5 text-center">
					<div>ACESSE <b>SUA CONTA</b></div>
				</q-card-section>
				<q-card-section class="q-gutter-y-sm">
					<q-input label="CPF/CNPJ" standout></q-input>
					<q-input label="Senha" standout></q-input>
				</q-card-section>
				<q-card-section>
					<q-item>
						<q-item-section>
							<q-btn label="Primeiro acesso" align="left" flat no-caps dense></q-btn>
							<q-btn label="Esqueci minha senha" align="left" flat no-caps dense></q-btn>
						</q-item-section>
						<q-item-section side>
							<q-btn label="Entrar" color="primary" @click="login"></q-btn>
						</q-item-section>
					</q-item>
				</q-card-section>
			</q-card>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		login() {
			this.$store.dispatch("login");
			this.$router.push("/");
		}
	}
}
</script>