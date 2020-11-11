<template>
	<div class="">
		<div class="chat-user-bubble">
			<div class="chat-time">
				<!-- REMOVER COMENTÁRIOS APÓS IMPLEMENTAÇÃO -->
				<!-- Ícone de mensagem não enviada (ou não recebida) -->
				<!-- <q-icon name="schedule" color="grey-7" size="16px" /> -->

				<!-- Ícone de mensagem enviada mas não lida -->
				<!-- <q-icon name="done" color="grey-7" size="20px" /> -->

				<!-- Ícone de mensagem enviada e lida -->
				<q-icon name="done_all" color="primary" size="20px" />
				{{formatarDataHora(dateTest, "HH:mm")}}
			</div>
			<div class="chat-user-content">
				<div>
					<div class="text-caption">Nome do usuario 1</div>
					<div>Mensagem recebida 1</div>
				</div>
			</div>
			<div class="chat-icon">
				<q-icon name="person" color="primary" size="24px"></q-icon>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		dateTest: new Date()
	}),
	methods: {
	}
}
</script>

<style>

</style>