<template>
	<q-page class="flex flex-center bg-grey-4">
		<iframe frameborder="0" style="border:0; width: 100vw; height: 92vh" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ5VtrTX_m3JQRO23oqkx9i_s&key=AIzaSyCWTvPGIC5ZBhjuhpkKavofii0mkTQwZIo" allowfullscreen></iframe>
	</q-page>
</template>

<script>
export default {
	name: 'PageIndex',
	created() {
		if (this.isBlank(this.getLogin.token)) this.$router.push('/login');
	}
}
</script>
