<template>
    <v-container>
        <v-layout
                text-center
                wrap
        >
            <v-flex offset-xs1 xs10>
                <div id="map" style="width: auto; height: 500px"></div>
            </v-flex>
            <v-flex xs6>
                <v-text-field
                        :value="leftBottom"
                        readonly
                        label="Left bottom corner:">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field
                        :value="rightTop"
                        readonly
                        label="Right top corner:">
                </v-text-field>
            </v-flex>
            <v-flex xs5>
                <v-text-field
                        v-model="selectedPoint"
                        label="Selected point:">
                </v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-text-field
                        v-model="precision"
                        label="Precision:">
                </v-text-field>
            </v-flex>
            <v-btn @click="addObjects">Add objects</v-btn>
            <v-btn @click="clear">Clear</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
    import ShopClusterParams from "../model/ShopClusterParams";
    import ShopService from "../service/ShopService";

    export default {
        name: "yandex-map-component",
        created() {
            ymaps.ready(this.initMap);
        },
        data() {
            return {
                leftBottom: null,
                rightTop: null,
                selectedPoint: [],
                precision: 23,
                map: {},
                message: "There will be map",
            }
        },
        methods: {
            initMap() {
                let map = new ymaps.Map("map", {
                    center: [55.76, 37.64],
                    zoom: 7,
                });

                map.events.add('boundschange', this.onBoundsChange);

                this.leftBottom = map.getBounds()[0];
                this.rightTop = map.getBounds()[1];
                this.map = map;
                this.updateShops();
            },
            addObjects() {
                console.log(this.map.zoomRange.getCurrent());

                this.updateShops();
            },
            clear() {
                this.map.geoObjects.removeAll();
            },
            onBoundsChange(e) {
                this.leftBottom = e.get('newBounds')[0];
                this.rightTop = e.get('newBounds')[1];
                this.updateShops();
                console.log(this.map.getZoom())
            },

            updateShops() {
                // let params = new ShopClusterParams(
                //     this.leftBottom[0],
                //     this.leftBottom[1],
                //     this.rightTop[0],
                //     this.rightTop[1],
                //     null,
                //     null,
                //     null
                // );
                let params = new ShopClusterParams(
                    this.leftBottom[0],
                    this.leftBottom[1],
                    this.rightTop[0],
                    this.rightTop[1],
                    this.map.getZoom(),
                    null,
                    null,
                    null
                );
                console.log(params);
                ShopService.getShops(params)
                    .then(response => {
                        console.log(response);
                        this.map.geoObjects.removeAll();
                        response.shops.forEach(shop => {
                            let placemark = new ymaps.Placemark([shop.coordinates.lat, shop.coordinates.lon], {
                                balloonContent: shop.id + ", lat: " + shop.coordinates.lat + ", lon: " + shop.coordinates.lon
                            }, {
                                preset: 'islands#icon',
                                iconColor: '#0095b6'
                            });
                            this.map.geoObjects.add(placemark)
                        });
                        response.clusters.forEach(cluster => {
                            let iconColor = '#b62d2c';
                            if (!this.isClusterSeparable(cluster)) {
                                iconColor = '#95b614';
                            }
                            let placemark = new ymaps.Placemark([cluster.coordinates.lat, cluster.coordinates.lon], {
                                iconCaption: cluster.shops_count,
                                balloonContent: this.getClusterBalloonText(cluster)
                            }, {
                                preset: 'islands#icon',
                                iconColor: iconColor
                            });
                            this.map.geoObjects.add(placemark)
                        })
                    });
            },
            getClusterBalloonText(cluster) {
                let text = "";
                if (!this.isClusterSeparable(cluster)) {
                    cluster.shops.forEach(shopId => {
                        text = text + shopId + "<br/>"
                    })
                } else
                    text = "Cluster is separable!"
                return text
            },
            isClusterSeparable(cluster) {
                return cluster.shops.length == 0
            }
        }
    }
</script>

<style scoped>

</style>