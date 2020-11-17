<template>
	<div class="">
		<div class="chat-user-bubble">
			<div class="chat-time">
				<q-icon name="done_all" color="primary" size="20px" />
				{{formatarDataHora(item.created_at, "HH:mm")}}
			</div>
			<div class="chat-user-content">
				<div>
					<div class="text-caption">{{item.usuario ? item.usuario.nome : ''}}</div>
					<div v-html="mensagem"></div>
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
	props: ['item'],
	data () {
		return {
		}
	},
	computed: {
		mensagem() {return this.isBlank(this.item.mensagem) ? '' : this.item.mensagem.replace(/\n/g,'<br>').trim()}
	}
}
</script>