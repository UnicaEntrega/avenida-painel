<template>
	<q-page class="q-pa-lg bg-grey-4">
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<q-card>
				<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
					<q-card-section class="row">
						<div class="col-md-6 col-xs-12 text-h6 text-primary">Configurações</div>
						<div class="col-md-6 col-xs-12 row justify-end">
							<q-btn label="Cancelar" icon="close" type="reset" color="negative" flat></q-btn>
							<q-btn label="Salvar" icon="save" type="submit" color="primary"></q-btn>
						</div>
					</q-card-section>
					<q-separator></q-separator>
					<q-card-section class="row q-col-gutter-sm">
						<div class="col-12 text-h6 text-center text-primary">Entrega Convencional</div>
						<q-card class="col-12">
							<q-card-section class="row q-col-gutter-sm">
								<div class="col-md-3 col-xs-12">
									Moto
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_km_moto" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_valor_minimo_moto" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_convencional_km_minimo_moto" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_retorno_minimo_moto" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
								<div class="col-md-3 col-xs-12">
									Carro
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_km_carro" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_valor_minimo_carro" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_convencional_km_minimo_carro" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_retorno_minimo_carro" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
								<div class="col-md-3 col-xs-12">
									Van
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_km_van" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_valor_minimo_van" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_convencional_km_minimo_van" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_retorno_minimo_van" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
								<div class="col-md-3 col-xs-12">
									Caminhão
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_km_caminhao" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_valor_minimo_caminhao" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_convencional_km_minimo_caminhao" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_retorno_minimo_caminhao" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
							</q-card-section>
						</q-card>
						<div class="col-12 text-h6 text-center text-primary">Entrega Expresso</div>
						<q-card class="col-12">
							<q-card-section class="row q-col-gutter-sm">
								<div class="col-md-3 col-xs-12">
									Moto
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_km_moto" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_valor_minimo_moto" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_expresso_km_minimo_moto" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_retorno_minimo_moto" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
								<div class="col-md-3 col-xs-12">
									Carro
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_km_carro" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_valor_minimo_carro" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_expresso_km_minimo_carro" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_retorno_minimo_carro" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
								<div class="col-md-3 col-xs-12">
									Van
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_km_van" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_valor_minimo_van" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_expresso_km_minimo_van" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_retorno_minimo_van" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
								<div class="col-md-3 col-xs-12">
									Caminhão
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_km_caminhao" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_valor_minimo_caminhao" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_expresso_km_minimo_caminhao" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_retorno_minimo_caminhao" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
							</q-card-section>
						</q-card>
						<div class="col-12 text-h6 text-center text-primary">Entrega Convencional Metropolitana</div>
						<q-card class="col-12">
							<q-card-section class="row q-col-gutter-sm">
								<div class="col-md-3 col-xs-12">
									Moto
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_metropolitana_km_moto" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_metropolitana_valor_minimo_moto" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_convencional_metropolitana_km_minimo_moto" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_metropolitana_retorno_minimo_moto" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
								<div class="col-md-3 col-xs-12">
									Carro
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_metropolitana_km_carro" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_metropolitana_valor_minimo_carro" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_convencional_metropolitana_km_minimo_carro" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_metropolitana_retorno_minimo_carro" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
								<div class="col-md-3 col-xs-12">
									Van
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_metropolitana_km_van" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_valor_minimo_van" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_convencional_km_minimo_van" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_retorno_minimo_van" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
								<div class="col-md-3 col-xs-12">
									Caminhão
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_metropolitana_km_caminhao" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_metropolitana_valor_minimo_caminhao" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_convencional_metropolitana_km_minimo_caminhao" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_convencional_metropolitana_retorno_minimo_caminhao" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
							</q-card-section>
						</q-card>
						<div class="col-12 text-h6 text-center text-primary">Entrega Expresso Metropolitana</div>
						<q-card class="col-12">
							<q-card-section class="row q-col-gutter-sm">
								<div class="col-md-3 col-xs-12">
									Moto
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_metropolitana_km_moto" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_metropolitana_valor_minimo_moto" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_expresso_metropolitana_km_minimo_moto" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_metropolitana_retorno_minimo_moto" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
								<div class="col-md-3 col-xs-12">
									Carro
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_metropolitana_km_carro" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_metropolitana_valor_minimo_carro" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_expresso_metropolitana_km_minimo_carro" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_metropolitana_retorno_minimo_carro" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
								<div class="col-md-3 col-xs-12">
									Van
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_metropolitana_km_van" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_metropolitana_valor_minimo_van" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_expresso_metropolitana_km_minimo_van" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_metropolitana_retorno_minimo_van" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
								<div class="col-md-3 col-xs-12">
									Caminhão
								</div>
								<div class="col-md-9 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_metropolitana_km_caminhao" label="KM" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_metropolitana_valor_minimo_caminhao" label="Valor mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input type="number" v-model="configuracao.entrega_expresso_metropolitana_km_minimo_caminhao" label="KM mínimo" :rules="[validatorRequired]"></q-input>
									</div>
									<div class="col-md-3 col-xs-6">
										<q-input v-model="configuracao.entrega_expresso_metropolitana_retorno_minimo_caminhao" label="Retorno mínimo" :rules="[validatorRequired]" mask="#,##" fill-mask="0" reverse-fill-mask prefix="R$"></q-input>
									</div>
								</div>
							</q-card-section>
						</q-card>

						<q-card class="col-12 q-mt-md">
							<q-card-section class="row q-col-gutter-sm">
								<div class="col-md-4 col-xs-12">
									<q-input type="number" v-model="configuracao.raio_km_entrega_metropolitana" label="Raio de KM Entrega Metropolitana" :rules="[validatorRequired]"></q-input>
								</div>
								<div class="col-md-4 col-xs-12">
									<q-input type="number" v-model="configuracao.raio_km_viagem" label="Raio de KM Viagem" :rules="[validatorRequired]"></q-input>
								</div>
								<div class="col-md-4 col-xs-12">
									<q-input type="number" v-model="configuracao.espaco_minimo_agendamento_pedido" label="Espaço mínimo entre pedido e agendamento (em horas)" :rules="[validatorRequired]"></q-input>
								</div>
							</q-card-section>
						</q-card>

						<q-card class="col-12 q-mt-md">
							<q-card-section class="row">
								<div class="col-md-6 col-xs-12 text-primary">Horários de Agendamento</div>
								<div class="col-md-6 col-xs-12 text-right text-primary"><q-btn label="Adicionar horário" icon="add" color="primary" no-caps @click="adicionarAgendamento()"></q-btn></div>
							</q-card-section>
							<q-card-section class="row items-center q-col-gutter-sm" v-for="(item, index) in configuracao.agendamentos" :key="'horario' + index">
								<div class="col-12 text-body1 text-primary">Início</div>
								<div class="col-md-6 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-4 col-xs-12">
										<q-input v-model="item.inicio_domingo" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Domingo" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'inicio_domingo' + index">
												<q-card>
													<q-time v-model="item.inicio_domingo" format24h @input="$refs['inicio_domingo' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
									<div class="col-md-4 col-xs-12">
										<q-input v-model="item.inicio_segunda" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Segunda" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'inicio_segunda' + index">
												<q-card>
													<q-time v-model="item.inicio_segunda" format24h @input="$refs['inicio_segunda' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
									<div class="col-md-4 col-xs-12">
										<q-input v-model="item.inicio_terca" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Terça" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'inicio_terca' + index">
												<q-card>
													<q-time v-model="item.inicio_terca" format24h @input="$refs['inicio_terca' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
								</div>
								<div class="col-md-6 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-12">
										<q-input v-model="item.inicio_quarta" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Quarta" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'inicio_quarta' + index">
												<q-card>
													<q-time v-model="item.inicio_quarta" format24h @input="$refs['inicio_quarta' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
									<div class="col-md-3 col-xs-12">
										<q-input v-model="item.inicio_quinta" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Quinta" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'inicio_quinta' + index">
												<q-card>
													<q-time v-model="item.inicio_quinta" format24h @input="$refs['inicio_quinta' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
									<div class="col-md-3 col-xs-12">
										<q-input v-model="item.inicio_sexta" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Sexta" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'inicio_sexta' + index">
												<q-card>
													<q-time v-model="item.inicio_sexta" format24h @input="$refs['inicio_sexta' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
									<div class="col-md-3 col-xs-12">
										<q-input v-model="item.inicio_sabado" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Sábado" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'inicio_sabado' + index">
												<q-card>
													<q-time v-model="item.inicio_sabado" format24h @input="$refs['inicio_sabado' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
								</div>
								<div class="col-12 text-body1 text-primary">Término</div>
								<div class="col-md-6 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-4 col-xs-12">
										<q-input v-model="item.termino_domingo" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Domingo" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'termino_domingo' + index">
												<q-card>
													<q-time v-model="item.termino_domingo" format24h @input="$refs['termino_domingo' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
									<div class="col-md-4 col-xs-12">
										<q-input v-model="item.termino_segunda" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Segunda" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'termino_segunda' + index">
												<q-card>
													<q-time v-model="item.termino_segunda" format24h @input="$refs['termino_segunda' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
									<div class="col-md-4 col-xs-12">
										<q-input v-model="item.termino_terca" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Terça" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'termino_terca' + index">
												<q-card>
													<q-time v-model="item.termino_terca" format24h @input="$refs['termino_terca' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
								</div>
								<div class="col-md-6 col-xs-12 row q-col-gutter-sm">
									<div class="col-md-3 col-xs-12">
										<q-input v-model="item.termino_quarta" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Quarta" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'termino_quarta' + index">
												<q-card>
													<q-time v-model="item.termino_quarta" format24h @input="$refs['termino_quarta' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
									<div class="col-md-3 col-xs-12">
										<q-input v-model="item.termino_quinta" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Quinta" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'termino_quinta' + index">
												<q-card>
													<q-time v-model="item.termino_quinta" format24h @input="$refs['termino_quinta' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
									<div class="col-md-3 col-xs-12">
										<q-input v-model="item.termino_sexta" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Sexta" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'termino_sexta' + index">
												<q-card>
													<q-time v-model="item.termino_sexta" format24h @input="$refs['termino_sexta' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
									<div class="col-md-3 col-xs-12">
										<q-input v-model="item.termino_sabado" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Sábado" color="primary">
											<q-icon slot="prepend" name="schedule"></q-icon>
											<q-popup-proxy :ref="'termino_sabado' + index">
												<q-card>
													<q-time v-model="item.termino_sabado" format24h @input="$refs['termino_sabado' + index][0].hide()"></q-time>
												</q-card>
											</q-popup-proxy>
										</q-input>
									</div>
								</div>
								<div class="col-12"><q-btn class="full-width" label="Remover" icon="delete" color="negative" no-caps @click="removerAgendamento(index)"></q-btn></div>
							</q-card-section>
						</q-card>

						<q-card class="col-12">
							<q-card-section class="row">
								<div class="col-md-6 col-xs-12 text-primary">Datas de Exceção de Agendamento</div>
								<div class="col-md-6 col-xs-12 text-right text-primary"><q-btn label="Adicionar exceção" icon="add" color="primary" no-caps @click="adicionarDataExcecao()"></q-btn></div>
							</q-card-section>
							<q-card-section class="row items-center q-col-gutter-sm" v-for="(item, index) in configuracao.datasExcecoes" :key="'datasExcecoes' + index">
								<div class="col-md-3 col-xs-12">
									<q-input v-model="item.data" label="Data*" v-mask="'##/##/####'" :rules="[validatorRequired, validatorDate]">
										<q-icon slot="prepend" name="event"></q-icon>
										<q-popup-proxy>
											<q-card>
												<q-date v-model="item.data" mask="DD/MM/YYYY">
													<q-btn label="Ok" color="primary" flat no-caps v-close-popup></q-btn>
												</q-date>
											</q-card>
										</q-popup-proxy>
									</q-input>
								</div>
								<div class="col-md-3 col-xs-12">
									<q-input v-model="item.hora_inicio" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Início" color="primary">
										<q-icon slot="prepend" name="schedule"></q-icon>
										<q-popup-proxy :ref="'hora_inicio' + index">
											<q-card>
												<q-time v-model="item.hora_inicio" format24h @input="$refs['hora_inicio' + index][0].hide()"></q-time>
											</q-card>
										</q-popup-proxy>
									</q-input>
								</div>
								<div class="col-md-3 col-xs-12">
									<q-input v-model="item.hora_termino" class="full-width" v-mask="'##:##'" :rules="[validatorTime]" label="Término" color="primary">
										<q-icon slot="prepend" name="schedule"></q-icon>
										<q-popup-proxy :ref="'hora_termino' + index">
											<q-card>
												<q-time v-model="item.hora_termino" format24h @input="$refs['hora_termino' + index][0].hide()"></q-time>
											</q-card>
										</q-popup-proxy>
									</q-input>
								</div>
								<div class="col-md-3 col-xs-12">
									<q-btn class="full-width" label="Remover" icon="delete" color="negative" no-caps @click="removerDataExcecao(index)"></q-btn>
								</div>
							</q-card-section>
						</q-card>
					</q-card-section>
					<q-card-section class="q-col-gutter-md row items-center">
						<div class="col-md-6 col-xs-12 text-grey-6">
							*Campos obrigatórios
						</div>
						<div class="col-md-6 col-xs-12 row justify-end">
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
				entrega_convencional_valor_minimo_moto: 0,
				entrega_convencional_km_minimo_moto: 0,
				entrega_convencional_retorno_minimo_moto: 0,
				entrega_convencional_km_moto: 0,
				entrega_convencional_valor_minimo_carro: 0,
				entrega_convencional_km_minimo_carro: 0,
				entrega_convencional_retorno_minimo_carro: 0,
				entrega_convencional_km_carro: 0,
				entrega_convencional_valor_minimo_van: 0,
				entrega_convencional_km_minimo_van: 0,
				entrega_convencional_retorno_minimo_van: 0,
				entrega_convencional_km_van: 0,
				entrega_convencional_valor_minimo_caminhao: 0,
				entrega_convencional_km_minimo_caminhao: 0,
				entrega_convencional_retorno_minimo_caminhao: 0,
				entrega_convencional_km_caminhao: 0,
				entrega_expresso_valor_minimo_moto: 0,
				entrega_expresso_km_minimo_moto: 0,
				entrega_expresso_retorno_minimo_moto: 0,
				entrega_expresso_km_moto: 0,
				entrega_expresso_valor_minimo_carro: 0,
				entrega_expresso_km_minimo_carro: 0,
				entrega_expresso_retorno_minimo_carro: 0,
				entrega_expresso_km_carro: 0,
				entrega_expresso_valor_minimo_van: 0,
				entrega_expresso_km_minimo_van: 0,
				entrega_expresso_retorno_minimo_van: 0,
				entrega_expresso_km_van: 0,
				entrega_expresso_valor_minimo_caminhao: 0,
				entrega_expresso_km_minimo_caminhao: 0,
				entrega_expresso_retorno_minimo_caminhao: 0,
				entrega_expresso_km_caminhao: 0,
				entrega_convencional_metropolitana_valor_minimo_moto: 0,
				entrega_convencional_metropolitana_km_minimo_moto: 0,
				entrega_convencional_metropolitana_retorno_minimo_moto: 0,
				entrega_convencional_metropolitana_km_moto: 0,
				entrega_convencional_metropolitana_valor_minimo_carro: 0,
				entrega_convencional_metropolitana_km_minimo_carro: 0,
				entrega_convencional_metropolitana_retorno_minimo_carro: 0,
				entrega_convencional_metropolitana_km_carro: 0,
				entrega_convencional_metropolitana_valor_minimo_van: 0,
				entrega_convencional_metropolitana_km_minimo_van: 0,
				entrega_convencional_metropolitana_retorno_minimo_van: 0,
				entrega_convencional_metropolitana_km_van: 0,
				entrega_convencional_metropolitana_valor_minimo_caminhao: 0,
				entrega_convencional_metropolitana_km_minimo_caminhao: 0,
				entrega_convencional_metropolitana_retorno_minimo_caminhao: 0,
				entrega_convencional_metropolitana_km_caminhao: 0,
				entrega_expresso_metropolitana_valor_minimo_moto: 0,
				entrega_expresso_metropolitana_km_minimo_moto: 0,
				entrega_expresso_metropolitana_retorno_minimo_moto: 0,
				entrega_expresso_metropolitana_km_moto: 0,
				entrega_expresso_metropolitana_valor_minimo_carro: 0,
				entrega_expresso_metropolitana_km_minimo_carro: 0,
				entrega_expresso_metropolitana_retorno_minimo_carro: 0,
				entrega_expresso_metropolitana_km_carro: 0,
				entrega_expresso_metropolitana_valor_minimo_van: 0,
				entrega_expresso_metropolitana_km_minimo_van: 0,
				entrega_expresso_metropolitana_retorno_minimo_van: 0,
				entrega_expresso_metropolitana_km_van: 0,
				entrega_expresso_metropolitana_valor_minimo_caminhao: 0,
				entrega_expresso_metropolitana_km_minimo_caminhao: 0,
				entrega_expresso_metropolitana_retorno_minimo_caminhao: 0,
				entrega_expresso_metropolitana_km_caminhao: 0,
				raio_km_entrega_metropolitana: 0,
				raio_km_viagem: 0,
				espaco_minimo_agendamento_pedido: 0,
				agendamentos: [],
				datasExcecoes: []
			}
		}
	},
	methods: {
		async onSubmit() {
			var response = await this.executeMethod({ url: 'api/Configuracoes', method: 'post', data: this.configuracao })
			if (response.status === 200) {
				this.$router.push('/')
				this.$q.notify({ message: 'Configuração alterada com sucesso.', type: 'positive' })
			} else this.responseError(response)
		},
		onReset() {
			this.$router.push('/')
		},
		adicionarDataExcecao() {
			this.configuracao.datasExcecoes.push({ data: '', hora_inicio: '00:00', hora_termino: '00:00' })
		},
		removerDataExcecao(index) {
			this.$q.dialog({ title: 'Confirmação', message: 'Tem certeza que deseja remover esta exceção? Esta ação é irreversível.', ok: 'Sim', cancel: 'Não' }).onOk(async () => {
				this.configuracao.datasExcecoes.splice(index, 1)
			})
		},
		adicionarAgendamento() {
			this.configuracao.agendamentos.push({
				inicio_domingo: '00:00',
				inicio_segunda: '00:00',
				inicio_terca: '00:00',
				inicio_quarta: '00:00',
				inicio_quinta: '00:00',
				inicio_sexta: '00:00',
				inicio_sabado: '00:00',
				termino_domingo: '00:00',
				termino_segunda: '00:00',
				termino_terca: '00:00',
				termino_quarta: '00:00',
				termino_quinta: '00:00',
				termino_sexta: '00:00',
				termino_sabado: '00:00'
			})
		},
		removerAgendamento(index) {
			this.$q.dialog({ title: 'Confirmação', message: 'Tem certeza que deseja remover este horário? Esta ação é irreversível.', ok: 'Sim', cancel: 'Não' }).onOk(async () => {
				this.configuracao.agendamentos.splice(index, 1)
			})
		}
	},
	async created() {
		if (this.usuarioPerfil === 'cliente') this.$router.push('/')
		let response = await this.executeMethod({ url: 'api/Configuracoes', method: 'get' })
		if (response.status === 200) {
			for (let item of response.data.datasExcecoes) item.data = this.formatarDataHora(item.data, 'DD/MM/YYYY')
			this.configuracao = response.data
		}
	}
}
</script>
