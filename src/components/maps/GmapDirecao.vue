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
		let { modo, origem, destino, pontosEntre } = this
		if (!modo || !origem || !destino) return
		if (!pontosEntre) pontosEntre = []
		new google.maps.DirectionsService().route(
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
})
</script>
