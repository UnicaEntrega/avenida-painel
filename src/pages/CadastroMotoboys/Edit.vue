<template>
	<div>
		<q-card>
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
				<q-card-section class="row">
					<div class="col-6 text-h6 text-primary">Cadastro de Motoboys</div>
					<div class="col-6 row justify-end">
						<q-btn v-if="showBool" label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat></q-btn>
						<q-btn v-if="showBool" label="Remover" icon="delete" color="negative" flat @click="removerMotoboy"></q-btn>
						<q-btn v-if="showBool" label="Editar" icon="edit" color="primary" @click="showBool = false"></q-btn>
						<q-btn v-if="!showBool" label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
						<q-btn v-if="!showBool" label="Salvar" icon="save" type="submit" color="primary"></q-btn>
					</div>
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section class="row q-col-gutter-sm">
					<div class="col-3">
						<q-input v-model="motoboy.nome" label="Nome*" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="motoboy.email" label="E-mail*" :rules="[validatorRequired, validatorEmail]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="motoboy.password" type="password" :label="'Senha' + (isBlank(motoboy.id) ? '*' : '')" :rules="isBlank(motoboy.id) ? [validatorRequired] : []" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="motoboy.telefone" label="Telefone*" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-6">
						<q-select v-model="motoboy.veiculo_id" label="Veículo" :options="veiculoOptions" map-options emit-value option-label="placa" option-value="id" clearable :readonly="showBool"></q-select>
					</div>
					<div class="col-3">
						<q-input type="number" v-model="motoboy.limite_coleta" label="Limite de coletas*" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
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
	</div>
</template>
<script>
export default {
	data() {
		return {
			showBool: false,
			motoboy: {
				email: '',
				nome: '',
				password: '',
				veiculo_id: '',
				telefone: '',
				limite_coleta: 3
			},
			veiculoOptions: []
		}
	},
	methods: {
		async onSubmit() {
			var response = await this.executeMethod({ url: 'api/Motoboys' + (this.motoboy.id ? '/' + this.motoboy.id : ''), method: this.motoboy.id ? 'put' : 'post', data: this.motoboy })
			if (response.status === 200) {
				this.$router.push('/cadastroMotoboys')
				this.$q.notify({
					message: 'Motoboy cadastrado com sucesso.',
					type: 'positive'
				})
			} else this.responseError(response)
		},
		onReset() {
			if (!this.showBool && this.motoboy.id) {
				this.showBool = true
			} else {
				this.$router.push('/cadastroMotoboys')
			}
		},
		removerMotoboy() {
			this.$q.dialog({ title: 'Confirmação', message: 'Tem certeza que deseja remover este motoboy? Esta ação é irreversível.', ok: 'Sim', cancel: 'Não' }).onOk(async () => {
				var response = await this.executeMethod({ url: 'api/Motoboys/' + this.motoboy.id, method: 'delete' })
				if (response.status === 200) {
					this.$q.notify({
						message: 'Motoboy removido com sucesso',
						type: 'positive'
					})
					this.$router.push('/cadastroMotoboys')
				}
			})
		}
	},
	async created() {
		let response = await this.executeMethod({ url: 'api/Veiculos', method: 'get' })
		if (response.status === 200) this.veiculoOptions = response.data.data
		if (this.$route.params.id) {
			response = await this.executeMethod({ url: `api/Motoboys/show/${this.$route.params.id}`, method: 'get' })
			if (response.status === 200) this.motoboy = response.data
			else {
				this.$q.notify({
					message: 'Motoboy não encontrado',
					type: 'negative'
				})
				this.$router.push('/cadastroMotoboys')
			}
			this.showBool = this.$route.meta.show
		}
	}
}
</script>
