<template>
	<div>
		<q-card>
			<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
				<q-card-section class="row">
					<div class="col-6 text-h6 text-primary">Cadastro de Usuarios</div>
					<div class="col-6 row justify-end">
						<q-btn v-if="showBool" label="Voltar" icon="keyboard_arrow_left" type="reset" color="primary" flat></q-btn>
						<q-btn v-if="showBool" label="Remover" icon="delete" color="negative" flat @click="removerUsuario"></q-btn>
						<q-btn v-if="showBool" label="Editar" icon="edit" color="primary" @click="showBool = false"></q-btn>
						<q-btn v-if="!showBool" label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
						<q-btn v-if="!showBool" label="Salvar" icon="save" type="submit" color="primary"></q-btn>
					</div>
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section class="row q-col-gutter-sm">
					<div class="col-3">
						<q-input v-model="usuario.nome" label="Nome*" :rules="[validatorRequired]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3">
						<q-input v-model="usuario.email" label="E-mail*" :rules="[validatorRequired, validatorEmail]" :readonly="showBool"></q-input>
					</div>
					<div class="col-3" v-if="!showBool">
						<q-input v-model="usuario.password" type="password"  label="Senha*" :rules="[validatorRequired]"></q-input>
					</div>
					<div class="col-3">
						<q-select v-model="usuario.perfil" label="Perfil" :options="perfilOptions" :rules="[validatorRequired]" map-options emit-value option-label="name" option-value="id" :readonly="showBool"></q-select>
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
			perfilOptions: [],
			showBool: false,
			usuario: {
				ativo: true,
				email: "",
				nome: "",
				password: "",
				perfil: ''
			}
		}
	},
	methods: {
		async onSubmit() {
			var response = await this.executeMethod({url:'api/Usuarios'+(this.usuario.id ? '/'+this.usuario.id : ''),method:this.usuario.id ? 'put' : 'post',data:this.usuario})
			if (response.status===200) {
				this.$router.push("/cadastroUsuarios");
				this.$q.notify({
					message: "Usuario cadastrado com sucesso.",
					type: "positive"
				})
			}
		},
		onReset() {
			if(!this.showBool && this.usuario.id) {
				this.showBool = true;
			} else {
				this.$router.push("/cadastroUsuarios");
			}
		},
		removerUsuario() {
			this.$q.dialog({title:'Confirmação',message:'Tem certeza que deseja remover este usuário? Esta ação é irreversível.',ok:'Sim',cancel:'Não'}).onOk(async ()=>{
        var response = await this.executeMethod({url:'api/Usuarios/'+this.usuario.id,method:'delete'})
				if (response.status===200) {
					this.$q.notify({
						message: "Usuario removido com sucesso",
						type: "positive"
					})
					this.$router.push("/cadastroUsuarios")
				}
			})
		}
	},
	async created() {
		var response = await this.executeMethod({url:'api/Usuarios/perfis',method:'get'})
		if (response.status===200) this.perfilOptions = response.data
		if (this.$route.params.id) {
			response = await this.executeMethod({url:`api/Usuarios/show/${this.$route.params.id}`,method:'get'})
			if (response.status===200) {
				if (response.data.perfis && response.data.perfis.length>0) response.data.perfil = response.data.perfis[0].id
				delete response.data.perfis
				this.usuario = response.data
			}
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