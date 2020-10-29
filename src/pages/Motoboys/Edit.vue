<template>
	<div>
		<q-card>
			<q-card-section>
				<q-item-label class="text-h6 text-primary">Cadastro de Motoboys</q-item-label>
			</q-card-section>
			<q-separator></q-separator>
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
				<q-card-section class="row q-col-gutter-sm">
					<div class="col-3">
						<q-input v-model="motoboy.nome" label="Nome*" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="motoboy.email" label="E-mail*" :rules="[validatorRequired, validatorEmail]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="motoboy.password" type="password" label="Senha*" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-select v-model="motoboy.tipo_veiculo" label="Tipo de Veículo*" :options="tipoVeiculoOptions" map-options emit-value :rules="[validatorRequired]" :readonly="showBool"></q-select>
					</div>
					<div class="col-3">
						<q-input v-model="motoboy.placa" label="Placa*" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="motoboy.telefone" label="Telefone*" v-mask="['(##) ####-####', '(##) #####-####']" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
				</q-card-section>
				<q-card-section class="q-col-gutter-md row items-center">
					<div class="col-6 text-grey-6">
						*Campos obrigatórios
					</div>
					<div class="col-6 row justify-end">
						<q-btn v-if="showBool" label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat></q-btn>
						<q-btn v-if="showBool" label="Remover" icon="delete" color="negative" flat @click="removerMotoboy"></q-btn>
						<q-btn v-if="showBool" label="Editar" icon="edit" color="primary" @click="showBool = false"></q-btn>
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
	data () {
		return {
			showBool: false,
			motoboy: {
				email: "",
				nome: "",
				password: "",
				tipo_veiculo: "",
				placa: "",
				telefone: ""
			}
		}
	},
	methods: {
		async onSubmit() {
			var response = await this.executeMethod({url:'api/Motoboys'+(this.motoboy.id ? '/'+this.motoboy.id : ''),method:this.motoboy.id ? 'put' : 'post',data:this.motoboy})
			if (response.status===200) {
				this.$router.push("/motoboys");
				this.$q.notify({
					message: "Motoboy cadastrado com sucesso.",
					type: "positive"
				})
			}
		},
		onReset() {
			if(!this.showBool && this.motoboy.id) {
				this.showBool = true;
			} else {
				this.$router.push("/motoboys");
			}
		},
		removerMotoboy() {
			this.$q.dialog({title:'Confirmação',message:'Tem certeza que deseja remover este motoboy? Esta ação é irreversível.',ok:'Sim',cancel:'Não'}).onOk(async ()=>{
        var response = await this.executeMethod({url:'api/Motoboys/'+this.motoboy.id,method:'delete'})
				if (response.status===200) {
					this.$q.notify({
						message: "Motoboy removido com sucesso",
						type: "positive"
					})
					this.$router.push("/motoboys")
				}
			})
		}
	},
	async created() {
		if (this.$route.params.id) {
			let response = await this.executeMethod({url:`api/Motoboys/show/${this.$route.params.id}`,method:'get'})
			if (response.status===200) {
				this.motoboy = response.data
			}
			else {
				this.$q.notify({
					message: "Motoboy não encontrado",
					type: "negative"
				})
				this.$router.push("/motoboys")
			}
			this.showBool = this.$route.meta.show
		}
	}
}
</script>