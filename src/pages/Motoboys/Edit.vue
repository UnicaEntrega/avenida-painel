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
						<q-input v-model="motoboy.nome" label="Nome*" :rules="[valRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="motoboy.email" label="E-mail*" :rules="[valRequired, valEmail]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="motoboy.senha" type="password" label="Senha*" :rules="[valRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-select v-model="motoboy.tipoVeiculo" label="Tipo de Veículo*" :options="tipoVeiculoOptions" :rules="[valRequired]" :readonly="showBool"></q-select>
					</div>
					<div class="col-3">
						<q-input v-model="motoboy.placa" label="Placa*" :rules="[valRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="motoboy.telefone" label="Telefone*" :rules="[valRequired]" :readonly="showBool"></q-input>
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
import { mapGetters } from "vuex"

export default {
	data: () => ({
		tipoVeiculoOptions: ["moto", "carro"],
		showBool: false,
		motoboy: {
			email: "",
			nome: "",
			senha: "",
			tipoVeiculo: "",
			placa: "",
			telefone: ""
		},
	}),
	computed: {
		...mapGetters({
			selectMotoboy: "selectMotoboy"
		}),
	},
	methods: {
		onSubmit() {
			this.$store.dispatch("adicionarMotoboy", this.motoboy);
			this.$router.push("/motoboys");
			this.$q.notify({
				message: "Motoboy cadastrado com sucesso.",
				type: "positive"
			})
		},
		onReset() {
			if(!this.showBool && this.motoboy.id) {
				this.showBool = true;
			} else {
				this.$router.push("/motoboys");
			}
		},
		removerMotoboy() {
			this.$q.dialog({
				title: "Confirmação",
				message: "Tem certeza que deseja remover este usuário? Esta ação é irreversível.",
				ok: "Sim",
				cancel: "Não"
			}).onOk(() => {
				this.$store.dispatch("removerMotoboy", this.motoboy.id);
				this.$q.notify({
					message: "Motoboy removido com sucesso",
					type: "positive"
				})
				this.$router.push("/motoboys")
			})
		},
		valEmail(val) {
			let index = val.indexOf("@");
			return (index > 0 && val.includes(".", index)) || "Este email é inválido."
		},
		valRequired(val) {
			return val !== null && val !== "" || "Este campo é obrigatório."
		}
	},
	created() {
		if(this.$route.params.id) {
			let selectedMotoboy = this.selectMotoboy(this.$route.params.id)
			if(selectedMotoboy) this.motoboy = {...selectedMotoboy[0]};
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

<style lang="sass">
</style>