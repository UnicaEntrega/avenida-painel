<template>
	<div>
		<q-card>
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
				<q-card-section class="row">
					<div class="col-6 text-h6 text-primary">Cadastro de Tabela de Valores</div>
					<div class="col-6 row justify-end">
						<q-btn v-if="showBool" label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat></q-btn>
						<q-btn v-if="showBool" label="Remover" icon="delete" color="negative" flat @click="removerTabela"></q-btn>
						<q-btn v-if="showBool" label="Editar" icon="edit" color="primary" @click="showBool = false"></q-btn>
						<q-btn v-if="!showBool" label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
						<q-btn v-if="!showBool" label="Salvar" icon="save" type="submit" color="primary"></q-btn>
					</div>
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section class="row q-col-gutter-sm">
					<div class="col-3">
						<q-input v-model="tabela.bairro" label="Bairro*" :rules=[validatorRequired] :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="tabela.valor" label="Valor*" :rules="[validatorRequired]" :readonly="showBool" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
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
	data () {
		return {
			showBool: false,
			tabela: {
				bairro: "",
				valor: 0
			}
		}
	},
	methods: {
		async onSubmit() {
			var response = await this.executeMethod({url:'api/TabelaValores'+(this.tabela.id ? '/'+this.tabela.id : ''),method:this.tabela.id ? 'put' : 'post',data:this.tabela})
			if (response.status===200) {
				this.$router.push("/cadastroTabelaValores");
				this.$q.notify({
					message: "Tabela de valor cadastrado com sucesso.",
					type: "positive"
				})
			}
			else this.responseError(response)
		},
		onReset() {
			if(!this.showBool && this.veiculo.id) {
				this.showBool = true;
			} else {
				this.$router.push("/cadastroTabelaValores");
			}
		},
		removerVeiculo() {
			this.$q.dialog({title:'Confirmação',message:'Tem certeza que deseja remover esta tabela de valor? Esta ação é irreversível.',ok:'Sim',cancel:'Não'}).onOk(async ()=>{
			var response = await this.executeMethod({url:'api/TabelaValores/'+this.tabela.id,method:'delete'})
				if (response.status===200) {
					this.$q.notify({
						message: "Tabela de valor removida com sucesso",
						type: "positive"
					})
					this.$router.push("/cadastroTabelaValores")
				}
			})
		}
	},
	async created() {
		if (this.$route.params.id) {
			let response = await this.executeMethod({url:`api/TabelaValores/show/${this.$route.params.id}`,method:'get'})
			if (response.status===200) {
				this.tabela = response.data
			}
			else {
				this.$q.notify({
					message: "Tabela de valor não encontrada",
					type: "negative"
				})
				this.$router.push("/cadastroTabelaValores")
			}
			this.showBool = this.$route.meta.show
		}
	}
}
</script>