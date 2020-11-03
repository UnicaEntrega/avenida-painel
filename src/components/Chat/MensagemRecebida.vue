<template>
	<div class="">
		<div class="chat-bot-bubble">
			<div class="chat-icon">
				<q-icon name="person" color="primary" size="24px"></q-icon>
			</div>
			<div class="chat-bot-content q-gutter-y-sm">
				<div>
					Mensagem recebida 1
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