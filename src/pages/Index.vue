<template>
  <q-page class="flex bg-grey-4">
    <div style="width:200px;" v-if="motoboySelecionado">
      <q-list separator>
        <q-item
          v-for="(item, index) in motoboySelecionado.coletas"
          :key="index"
          clickable
        >
          <q-item-section>
            <q-item-label> Coleta {{ index + 1 }} </q-item-label>
            <q-item-label caption>
              {{ formatarEndereco(item) }}<br />
              {{ item.status }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <gmap-map
      :center="coordsCenter"
      :zoom="15"
      style="height:92vh;"
      :style="motoboySelecionado ? 'width:calc(100% - 200px);' : 'width:100%;'"
    >
      <gmap-marker
        v-for="(item, index) in pontos"
        :key="index"
        :position="item.coords"
        :label="item.label"
        :icon="item.icon"
        :clickable="true"
        @click="clickMarker(item)"
      />
    </gmap-map>
    <q-dialog v-model="modalMarker">
      <q-card>
        <q-card-section>
          <div class="col-12 text-center">{{ itemMarker.label }}</div>
          <div class="col-12 q-pb-sm">{{ itemMarker.endereco }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  name: "PageIndex",
  data() {
    return {
      modalMarker: false,
      motoboySelecionado: null,
      pontos: [],
      coordsCenter: this.coordsDefault,
      itemMarker: {}
    };
  },
  methods: {
    async buscar() {
      this.motoboySelecionado = null;
      this.pontos = [];
      let coordsCenter;
      for (let item of this.getMotoboysOnline) {
        if (
          this.isBlank(this.$route.params.id) ||
          item.id.toString() === this.$route.params.id.toString()
        ) {
          if (!this.isBlank(this.$route.params.id))
            this.motoboySelecionado = item;
          coordsCenter = {
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude)
          };
          this.pontos.push({
            endereco: await this.buscarGeocode(null, coordsCenter),
            coords: coordsCenter,
            label: item.nome + " - " + (item.veiculo ? item.veiculo.placa : ""),
            icon: {
              url: "http://maps.gstatic.com/mapfiles/markers2/icon_green.png",
              size: { width: 27, height: 43, f: "px", b: "px" }
            }
          });
          if (this.motoboySelecionado) {
            this.coordsCenter = coordsCenter;
            for (let idx in item.coletas) {
              let item2 = item.coletas[idx];
              this.pontos.push({
                endereco: this.formatarEndereco(item2),
                coords: {
                  lat: parseFloat(item2.latitude),
                  lng: parseFloat(item2.longitude)
                },
                label: "Coleta " + (parseInt(idx) + 1),
                icon: {
                  url:
                    "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png",
                  size: { width: 27, height: 43, f: "px", b: "px" }
                }
              });
            }
            break;
          }
        }
      }
    },
    clickMarker(item) {
      this.itemMarker = item;
      this.modalMarker = true;
    }
  },
  created() {
    this.coordsCenter = this.coordsDefault;
    if (this.isBlank(this.getLogin.token)) this.$router.push("/login");
    else this.buscar();
  },
  watch: {
    $route: function(a, b) {
      if (a.path !== b.path) this.buscar();
    }
  }
};
</script>
