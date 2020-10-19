<template>
	<div>
		<q-card>
			<q-card-section>
				<q-item-label class="text-h6 text-primary">Cadastro de Usuarios</q-item-label>
			</q-card-section>
			<q-separator></q-separator>
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
				<q-card-section class="row q-col-gutter-sm">
					<div class="col-3">
						<q-input v-model="usuario.nome" label="Nome*" :rules="[valRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="usuario.email" label="E-mail*" :rules="[valRequired, valEmail]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="usuario.senha" type="password"  label="Senha*" :rules="[valRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-select v-model="usuario.perfil" :options="perfilOptions" :rules="[valRequired]" :readonly="showBool"></q-select>
					</div>
					<div class="col-3">
						<q-checkbox v-model="usuario.ativo" label="Ativo" color="primary" :disable="showBool"></q-checkbox>
					</div>
				</q-card-section>
				<q-card-section class="q-col-gutter-md row items-center">
					<div class="col-6 text-grey-6">
						*Campos obrigatórios
					</div>
					<div class="col-6 row justify-end">
						<q-btn v-if="showBool" label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat></q-btn>
						<q-btn v-if="showBool" label="Remover" icon="delete" color="negative" flat @click="removerUsuario"></q-btn>
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
		perfilOptions: ["admin", "motoboy", "cliente"],
		showBool: false,
		usuario: {
			ativo: true,
			email: "",
			nome: "",
			senha: "",
			perfil: ""
		},
	}),
	computed: {
		...mapGetters({
			selectUsuario: "selectUsuario"
		}),
	},
	methods: {
		onSubmit() {
			this.$store.dispatch("adicionarUsuario", this.usuario);
			this.$router.push("/cadastroUsuarios");
			this.$q.notify({
				message: "Usuario cadastrado com sucesso.",
				type: "positive"
			})
		},
		onReset() {
			if(!this.showBool && this.usuario.id) {
				this.showBool = true;
			} else {
				this.$router.push("/cadastroUsuarios");
			}
		},
		removerUsuario() {
			this.$q.dialog({
				title: "Confirmação",
				message: "Tem certeza que deseja remover este usuário? Esta ação é irreversível.",
				ok: "Sim",
				cancel: "Não"
			}).onOk(() => {
				this.$store.dispatch("removerUsuario", this.usuario.id);
				this.$q.notify({
					message: "Usuario removido com sucesso",
					type: "positive"
				})
				this.$router.push("/cadastroUsuarios")
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
			let selectedUsuario = this.selectUsuario(this.$route.params.id)
			if(selectedUsuario) this.usuario = {...selectedUsuario[0]};
			else {
				this.$q.notify({
					message: "Usuario não encontrado",
					type: "negative"
				})
				this.$router.push("/cadastroUsuarios")
			}

			this.showBool = this.$route.meta.show
		}
	}
}
</script>

<style lang="sass">
</style>