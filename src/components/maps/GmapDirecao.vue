<script>
import { MapElementFactory } from 'vue2-google-maps'
export default MapElementFactory({
	name: 'GmapDirecao',
	ctr() {
		return google.maps.DirectionsRenderer
	},
	events: [],
	mappedProps: {},
	props: {
		modo: { type: String },
		origem: { type: Object },
		destino: { type: Object },
		pontosEntre: { type: Array }
	},
	afterCreate(directionsRenderer) {
		let directionsService = new google.maps.DirectionsService()
		this.carregar(directionsRenderer, directionsService)
		this.$watch(
			() => [this.modo, this.origem, this.destino, this.pontosEntre],
			() => this.carregar(directionsRenderer, directionsService)
		)
	},
	methods: {
		carregar(directionsRenderer, directionsService) {
			let { modo, origem, destino, pontosEntre } = this
			if (!modo || !origem || !destino) return
			if (!pontosEntre) pontosEntre = []
			directionsService.route(
				{
					travelMode: modo,
					origin: origem,
					destination: destino,
					waypoints: pontosEntre
				},
				(response, status) => {
					if (status !== 'OK') return
					directionsRenderer.setDirections(response)
				}
			)
		}
	}
})
</script>
