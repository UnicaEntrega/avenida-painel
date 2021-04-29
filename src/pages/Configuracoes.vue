<template>
	<q-page class="q-pa-lg bg-grey-4">
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<q-card>
				<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
					<q-card-section class="row">
						<div class="col-6 text-h6 text-primary">Configurações</div>
						<div class="col-6 row justify-end">
							<q-btn label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
							<q-btn label="Salvar" icon="save" type="submit" color="primary"></q-btn>
						</div>
					</q-card-section>
					<q-separator></q-separator>
					<q-card-section class="row q-col-gutter-sm">
						<q-card class="col-12 q-mb-md">
							<q-card-section class="row">
								<div class="col-12 text-primary">Entrega Convencional</div>
							</q-card-section>
							<q-card-section class="row q-col-gutter-sm">
								<div class="col-3">
									<q-input v-model="configuracao.entrega_convencional_valor_minimo" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
								<div class="col-3">
									<q-input v-model="configuracao.entrega_convencional_km_minimo" label="KM mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
								<div class="col-3">
									<q-input v-model="configuracao.entrega_convencional_km_moto" label="KM Moto" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
								<div class="col-3">
									<q-input v-model="configuracao.entrega_convencional_km_carro" label="KM Carro" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
								<div class="col-3">
									<q-input v-model="configuracao.entrega_convencional_km_van" label="KM Van" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
								<div class="col-3">
									<q-input v-model="configuracao.entrega_convencional_km_caminhao" label="KM Caminhão" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
								<div class="col-3">
									<q-input v-model="configuracao.entrega_convencional_retorno_minimo" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
							</q-card-section>
						</q-card>
						<q-card class="col-12">
							<q-card-section class="row">
								<div class="col-12 text-primary">Entrega Expresso</div>
							</q-card-section>
							<q-card-section class="row q-col-gutter-sm">
								<div class="col-3">
									<q-input v-model="configuracao.entrega_expresso_valor_minimo" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
								<div class="col-3">
									<q-input v-model="configuracao.entrega_expresso_km_minimo" label="KM mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
								<div class="col-3">
									<q-input v-model="configuracao.entrega_expresso_km_moto" label="KM Moto" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
								<div class="col-3">
									<q-input v-model="configuracao.entrega_expresso_km_carro" label="KM Carro" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
								<div class="col-3">
									<q-input v-model="configuracao.entrega_expresso_km_van" label="KM Van" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
								<div class="col-3">
									<q-input v-model="configuracao.entrega_expresso_km_caminhao" label="KM Caminhão" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
								<div class="col-3">
									<q-input v-model="configuracao.entrega_expresso_retorno_minimo" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
								</div>
							</q-card-section>
						</q-card>
					</q-card-section>
					<q-card-section class="q-col-gutter-md row items-center">
						<div class="col-6 text-grey-6">
							*Campos obrigatórios
						</div>
						<div class="col-6 row justify-end">
							<q-btn label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
							<q-btn label="Salvar" icon="save" type="submit" color="primary"></q-btn>
						</div>
					</q-card-section>
				</q-form>
			</q-card>
		</transition>
	</q-page>
</template>
<script>
export default {
	data() {
		return {
			configuracao: {
				entrega_convencional_valor_minimo: 0,
				entrega_convencional_km_minimo: 0,
				entrega_convencional_km_moto: 0,
				entrega_convencional_km_carro: 0,
				entrega_convencional_km_van: 0,
				entrega_convencional_km_caminhao: 0,
				entrega_convencional_retorno_minimo: 0,
				entrega_expresso_valor_minimo: 0,
				entrega_expresso_km_minimo: 0,
				entrega_expresso_km_moto: 0,
				entrega_expresso_km_carro: 0,
				entrega_expresso_km_van: 0,
				entrega_expresso_km_caminhao: 0,
				entrega_expresso_retorno_minimo: 0
			}
		}
	},
	methods: {
		async onSubmit() {
			var response = await this.executeMethod({ url: 'api/Configuracoes', method: 'post', data: this.configuracao })
			if (response.status === 200) {
				this.$router.push('/')
				this.$q.notify({
					message: 'Configuração alterada com sucesso.',
					type: 'positive'
				})
			} else this.responseError(response)
		},
		onReset() {
			if (!this.showBool && this.veiculo.id) {
				this.showBool = true
			} else {
				this.$router.push('/')
			}
		}
	},
	async created() {
		let response = await this.executeMethod({ url: 'api/Configuracoes', method: 'get' })
		if (response.status === 200) this.configuracao = response.data
	}
}
</script>
