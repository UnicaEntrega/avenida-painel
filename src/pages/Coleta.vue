<template>
	<q-page class="q-pt-md">
		<div class="row q-col-gutter-y-sm q-mb-md q-px-xl">
			<div class="col-12 text-h6 text-primary q-px-md">Informações sobre a sua coleta</div>
			
			<div class="col-12 row q-col-gutter-x-sm">
				<div class="col-4">
					<q-item class="bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Cliente</q-item-label>
							<q-item-label class="">{{coleta.cliente ? coleta.cliente.nome : ''}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-4">
					<q-item class="bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Status</q-item-label>
							<q-item-label class="">{{coleta.status}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-4">
					<q-item class="bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Motoboy</q-item-label>
							<q-item-label class="">{{coleta.motoboy ? coleta.motoboy.nome : ''}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
			</div>

			<div class="col-12 row q-col-gutter-x-sm">
				<div :class="c_enderecoColeta">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Endereço - Coleta</q-item-label>
							<q-item-label class="">{{formatarEndereco(coleta)}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-3" key="comQuemColeta" v-if="verMais">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Com quem coleta</q-item-label>
							<q-item-label>{{coleta.quem}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-3" key="telefoneColeta" v-if="verMais">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Telefone de coleta</q-item-label>
							<q-item-label>{{coleta.telefone}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
			</div>

			<div class="col-12 row q-col-gutter-sm" v-for="(endereco,index) in coleta.enderecosEntregas" :key="'endereco'+index">
				<div :class="c_enderecoEntrega" v-if="verMaisEnderecoEntrega(index)">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Endereço - Entrega {{index+1}}</q-item-label>
							<q-item-label class="">{{formatarEndereco(endereco)}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-lg-3 col-xs-4" v-if="verMais">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Com quem entrega</q-item-label>
							<q-item-label>{{endereco.quem}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-xl-3 col-lg-2 col-xs-4" v-if="verMais">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Telefone de entrega</q-item-label>
							<q-item-label>{{endereco.telefone}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-xl-1 col-lg-2 col-xs-4" v-if="verMais">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Com retorno?</q-item-label>
							<q-item-label>{{endereco.retorno==='0' ? 'Não' : 'Sim'}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
			</div>
			
			<div class="col-12 row q-col-gutter-x-sm" v-if="verMais">
				<div class="col-12">
					<q-item class="bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Observações</q-item-label>
							<q-item-label>{{coleta.observacao}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
			</div>

			<div class="col-12 row q-col-gutter-x-sm">
				<div class="col-4">
					<q-btn class="full-width" label="Mais informações" icon="add" color="primary" no-caps @click="toggleVerMais"></q-btn>
				</div>
				<div class="col-4">
					<q-btn class="full-width" label="Cancelar coleta" icon="close" color="negative" no-caps flat @click="confirmarCancelamento" v-if="['Aberto','Encaminhado'].indexOf(coleta.status)>-1"></q-btn>
				</div>
				<div class="col-4">
					<q-btn to="/chat" class="full-width" label="Chat" icon="chat" color="positive" no-caps></q-btn>
				</div>
			</div>
		</div>

		<div>
			<iframe frameborder="0" style="border:0; width: 100%; height: 100vh" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ5VtrTX_m3JQRO23oqkx9i_s&key=AIzaSyCWTvPGIC5ZBhjuhpkKavofii0mkTQwZIo" allowfullscreen></iframe>
		</div>

		<q-dialog v-model="cancelamentoModal">
			<q-card style="min-width: 700px">
				<q-card-section class="text-body1 text-primary text-bold">
					Confirmação
				</q-card-section>
				<q-separator></q-separator>
				<q-card-section>
					<q-input v-model="motivoCancelamento" type="textarea" label="Motivo" :rules="[validatorRequired]"></q-input>
				</q-card-section>
				<q-card-section class="row justify-end">
					<q-btn label="Cancelar" color="negative" flat no-caps v-close-popup></q-btn>
					<q-btn label="Confirmar" color="positive" no-caps @click="cancelar()"></q-btn>
				</q-card-section>
			</q-card>
		</q-dialog>
	</q-page>
</template>
<script>
export default {
	data () {
		return {
			coleta: {
				enderecosEntregas: []
			},
			verMais: false,
			motivoCancelamento: "",
			cancelamentoModal: false,
		}
	},
	computed: {
		c_enderecoColeta() {
			return this.verMais ? "col-6" : "col-12"
		},
		c_enderecoEntrega() {
			return this.verMais ? "col-lg-5 col-xs-12" : "col-12"
		},
		verMaisEnderecoEntrega() {
			return (index) => this.verMais ? true : index == 0;
		}
	},
	methods: {
		confirmarCancelamento() {
			this.motivoCancelamento = "";
			this.cancelamentoModal = true;
		},
		async cancelar() {
			if (!this.isBlank(this.motivoCancelamento)) {
				var response = await this.executeMethod({url:`api/Coletas/cancelar/${this.$route.params.id}`,method:'post',data:{motivo:this.motivoCancelamento}})
				if (response.status===200) this.$router.push('/')
			}
		},
		formatarEndereco(item) {
			return item.endereco+', '+(item.endereco_numero || '')+(this.isBlank(item.complemento) ? '' : ', '+item.complemento)+' - '+item.bairro+' - '+item.cidade+' - '+item.estado
		},
		toggleVerMais() {
			this.verMais = !this.verMais;
		},
		async carregar() {
			var response = await this.executeMethod({url:`api/Coletas/show/${this.$route.params.id}`,method:'get'})
			if (response.status===200) this.coleta = response.data
		}
	},
	created() {
		this.carregar()
	},
	watch: {
		'$route': function(a,b) {
			if (a.path!==b.path) this.carregar()
		}
	}
}
</script>