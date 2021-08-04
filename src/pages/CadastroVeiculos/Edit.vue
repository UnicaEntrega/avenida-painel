<template>
	<div>
		<q-card>
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
				<q-card-section class="row">
					<div class="col-md-6 col-xs-12 text-h6 text-primary">Cadastro de Veículos</div>
					<div class="col-md-6 col-xs-12 row justify-end">
						<q-btn v-if="showBool" label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat></q-btn>
						<q-btn v-if="showBool" label="Remover" icon="delete" color="negative" flat @click="removerVeiculo"></q-btn>
						<q-btn v-if="showBool" label="Editar" icon="edit" color="primary" @click="showBool = false"></q-btn>
						<q-btn v-if="!showBool" label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
						<q-btn v-if="!showBool" label="Salvar" icon="save" type="submit" color="primary"></q-btn>
					</div>
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section class="row q-col-gutter-sm">
					<div class="col-md-3 col-xs-12">
						<q-select v-model="veiculo.tipo_veiculo" label="Tipo de Veículo*" :options="tipoVeiculoOptions" :rules="[validatorRequired]" :readonly="showBool"></q-select>
					</div>
					<div class="col-md-3 col-xs-12">
						<q-input v-model="veiculo.marca" label="Marca" :readonly="showBool"></q-input>
					</div>
					<div class="col-md-3 col-xs-12">
						<q-input v-model="veiculo.placa" label="Placa*" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
				</q-card-section>
				<q-card-section class="q-col-gutter-md row items-center">
					<div class="col-md-6 col-xs-12 text-grey-6">
						*Campos obrigatórios
					</div>
					<div class="col-md-6 col-xs-12 row justify-end">
						<q-btn v-if="!showBool" label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
						<q-btn v-if="!showBool" label="Salvar" icon="save" type="submit" color="primary"></q-btn>
					</div>
				</q-card-section>
			</q-form>
		</q-card>
	</div>
</template>
<script>
export default {
	data() {
		return {
			showBool: false,
			veiculo: {
				tipo_veiculo: '',
				placa: '',
				marca: ''
			}
		}
	},
	methods: {
		async onSubmit() {
			var response = await this.executeMethod({ url: 'api/Veiculos' + (this.veiculo.id ? '/' + this.veiculo.id : ''), method: this.veiculo.id ? 'put' : 'post', data: this.veiculo })
			if (response.status === 200) {
				this.$router.push('/cadastroVeiculos')
				this.$q.notify({
					message: 'Veículo cadastrado com sucesso.',
					type: 'positive'
				})
			} else this.responseError(response)
		},
		onReset() {
			if (!this.showBool && this.veiculo.id) {
				this.showBool = true
			} else {
				this.$router.push('/cadastroVeiculos')
			}
		},
		removerVeiculo() {
			this.$q.dialog({ title: 'Confirmação', message: 'Tem certeza que deseja remover este veículo? Esta ação é irreversível.', ok: 'Sim', cancel: 'Não' }).onOk(async () => {
				var response = await this.executeMethod({ url: 'api/Veiculos/' + this.veiculo.id, method: 'delete' })
				if (response.status === 200) {
					this.$q.notify({
						message: 'Veículo removido com sucesso',
						type: 'positive'
					})
					this.$router.push('/cadastroVeiculos')
				}
			})
		}
	},
	async created() {
		if (this.$route.params.id) {
			let response = await this.executeMethod({ url: `api/Veiculos/show/${this.$route.params.id}`, method: 'get' })
			if (response.status === 200) {
				this.veiculo = response.data
			} else {
				this.$q.notify({
					message: 'Veículo não encontrado',
					type: 'negative'
				})
				this.$router.push('/cadastroVeiculos')
			}
			this.showBool = this.$route.meta.show
		}
	}
}
</script>
