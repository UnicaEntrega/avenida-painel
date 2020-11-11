<template>
	<div class="">
		<div class="chat-bot-bubble">
			<div class="chat-icon">
				<q-icon name="person" color="primary" size="24px"></q-icon>
			</div>
			<div class="chat-bot-content">
				<div>
					<div class="text-caption">Nome do usuario 1</div>
					<div>Mensagem recebida 1</div>
				</div>
			</div>
			<div class="chat-time">{{formatarDataHora(dateTest,'HH:mm')}}</div>
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