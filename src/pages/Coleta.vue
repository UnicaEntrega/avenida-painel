<template>
	<q-page class="q-py-md">
		<div class="row q-col-gutter-y-sm q-mb-md q-px-xl">
			<div class="col-12 text-h6 text-primary q-px-md">Informações sobre a sua coleta</div>
			
			<div class="col-12 row q-col-gutter-x-sm">
				<div class="col-4">
					<q-item class="bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Cliente</q-item-label>
							<q-item-label class="">Nome do cliente da coleta</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-4">
					<q-item class="bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Status</q-item-label>
							<q-item-label class="">Status</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-4">
					<q-item class="bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Motoboy</q-item-label>
							<q-item-label class="">Nome do motoboy</q-item-label>
						</q-item-section>
					</q-item>
				</div>
			</div>

			<div class="col-12 row q-col-gutter-x-sm">
				<div :class="c_enderecoColeta">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Endereço - Coleta</q-item-label>
							<q-item-label class="">{{formatEndereco(coleta)}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-3" key="comQuemColeta" v-if="verMais">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Com quem coleta</q-item-label>
							<q-item-label>Pessoa pra coletar da silva</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-3" key="telefoneColeta" v-if="verMais">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Telefone de coleta</q-item-label>
							<q-item-label>(41) 98765-4321</q-item-label>
						</q-item-section>
					</q-item>
				</div>
			</div>

			<div class="col-12 row q-col-gutter-sm" v-for="(endereco, index) in coleta.enderecosEntregas" :key="'endereco'+index">
				<div :class="c_enderecoEntrega" v-if="verMaisEnderecoEntrega(index)">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Endereço - Entrega {{index+1}}</q-item-label>
							<q-item-label class="">{{formatEndereco(coleta)}}</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-lg-3 col-xs-4" v-if="verMais">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Com quem entrega</q-item-label>
							<q-item-label>Pessoa pra entregar da silva</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-xl-3 col-lg-2 col-xs-4" v-if="verMais">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Telefone de entrega</q-item-label>
							<q-item-label>(41) 98765-4321</q-item-label>
						</q-item-section>
					</q-item>
				</div>
				<div class="col-xl-1 col-lg-2 col-xs-4" v-if="verMais">
					<q-item class="full-height bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Com retorno?</q-item-label>
							<q-item-label>Sim</q-item-label>
						</q-item-section>
					</q-item>
				</div>
			</div>
			
			<div class="col-12 row q-col-gutter-x-sm" v-if="verMais">
				<div class="col-12">
					<q-item class="bg-grey-2 rounded-borders">
						<q-item-section>
							<q-item-label class="text-primary" caption>Observações</q-item-label>
							<q-item-label>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</q-item-label>
						</q-item-section>
					</q-item>
				</div>
			</div>

			<div class="col-12 row q-col-gutter-x-sm">
				<div class="col-4">
					<q-btn class="full-width" label="Mais informações" icon="add" color="primary" no-caps @click="toggleVerMais"></q-btn>
				</div>
				<div class="col-4">
					<q-btn class="full-width" label="Cancelar coleta" icon="close" color="negative" no-caps flat></q-btn>
				</div>
				<div class="col-4">
					<q-btn to="/chat" class="full-width" label="Chat" icon="chat" color="positive" no-caps></q-btn>
				</div>
			</div>
		</div>
		<div>
			<iframe frameborder="0" style="border:0; width: 100%; height: 52vh" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ5VtrTX_m3JQRO23oqkx9i_s&key=AIzaSyCWTvPGIC5ZBhjuhpkKavofii0mkTQwZIo" allowfullscreen></iframe>
		</div>
	</q-page>
</template>

<script>
export default {
	data: () => ({
		coleta: {
			cliente_id: '',
			cep: '',
			endereco: 'Rua da pedreira',
			endereco_numero: '5461',
			complemento: 'Ap 34',
			bairro: 'Campo pequeno',
			cidade: 'Colombo',
			estado: 'PR',
			quem: '',
			telefone: '',
			observacao: '',
			tipo_entrega: '',
			valor_entrega: 0,
			forma_pagamento: '',
			numero_boleto: '',
			motoboy_id: '',
			comissao: 0,
			status: '',
			enderecosEntregas: [
				{
					endereco: 'Rua da pedreira',
					endereco_numero: '5461',
					complemento: 'Ap 34',
					bairro: 'Campo pequeno',
					cidade: 'Colombo',
					estado: 'PR',
				},
				{
					endereco: 'Rua da pedreira',
					endereco_numero: '5461',
					complemento: 'Ap 34',
					bairro: 'Campo pequeno',
					cidade: 'Colombo',
					estado: 'PR',
				},
			]
		},
		verMais: false,
	}),
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
		formatEndereco(coleta) {
			return coleta.endereco + ", " + coleta.endereco_numero + ", " + coleta.complemento + " - " + coleta.bairro + ", " + coleta.cidade + " - " + coleta.estado
		},
		toggleVerMais() {
			this.verMais = !this.verMais;
		}
	}
}
</script>

<style lang="sass">
</style>