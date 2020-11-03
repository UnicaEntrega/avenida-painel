<template>
	<div class="">
		<div class="chat-user-bubble">
			<div class="chat-time">{{formatarDataHora(dateTest, "HH:mm")}}</div>
			<div class="chat-user-content">
				<div>
					Mensagem enviada 1
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