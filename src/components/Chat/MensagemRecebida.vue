<template>
	<div class="">
		<div class="chat-bot-bubble">
			<div class="chat-icon">
				<q-icon name="person" color="primary" size="24px"></q-icon>
			</div>
			<div class="chat-bot-content">
				<div>
					<div class="text-caption">{{item.usuario ? item.usuario.nome : ''}}</div>
					<div>{{item.mensagem}}</div>
				</div>
			</div>
			<div class="chat-time">{{formatarDataHora(item.created_at,'HH:mm')}}</div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['item'],
	data () {
		return {
		}
	}
}
</script>