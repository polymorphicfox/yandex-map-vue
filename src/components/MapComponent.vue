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
            <v-btn @click="addObjects">Add objects</v-btn>
            <v-btn @click="clear">Clear</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
    import ShopClusterParams from "../model/ShopClusterParams";
    import ShopService from "../service/ShopService";

    export default {
        name: "map-component",
        created() {
            ymaps.ready(this.initMap);
        },
        data() {
            return {
                leftBottom: null,
                rightTop: null,
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

                map.events.add('boundschange', this.onSizeChange);

                this.leftBottom = map.getBounds()[0];
                this.rightTop = map.getBounds()[1];
                this.updateShops();
                this.map = map;
            },
            addObjects() {
                this.map.geoObjects.add(new ymaps.Placemark([55.8, 37.8], {
                    balloonContent: 'Test'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }))
            },
            clear() {
                this.map.geoObjects.removeAll();
            },
            onSizeChange(e) {
                this.leftBottom = e.get('newBounds')[0];
                this.rightTop = e.get('newBounds')[1];
                this.updateShops()
            },

            updateShops() {
                let params = new ShopClusterParams(
                    this.leftBottom[0],
                    this.leftBottom[1],
                    this.rightTop[0],
                    this.rightTop[1],
                    null,
                    null,
                    null
                );
                ShopService.getShops(params)
                    .then(response=>{
                        console.log(response);
                        this.map.geoObjects.removeAll();
                        response.shops.forEach(shop=>{
                            let placemark= new ymaps.Placemark([shop.coordinates.lat, shop.coordinates.lon], {
                                balloonContent: shop.id +", lat: " +shop.coordinates.lat +", lon: " +shop.coordinates.lon
                            }, {
                                preset: 'islands#icon',
                                iconColor: '#0095b6'
                            });
                            this.map.geoObjects.add(placemark)
                        });
                        response.clusters.forEach(cluster=>{
                            let placemark= new ymaps.Placemark([cluster.coordinates.lat, cluster.coordinates.lon], {
                                iconCaption:cluster.shops.length,
                                balloonContent: this.getClusterBaloonTex(cluster)
                            }, {
                                preset: 'islands#icon',
                                iconColor: '#b62d2c'
                            });
                            this.map.geoObjects.add(placemark)
                        })
                    });
            },
            getClusterBaloonTex(cluster){
                let text = "";
                cluster.shops.forEach(shop=>{text = text+ shop.id +"<br/>"})
                return text
            }
        }
    }
</script>

<style scoped>

</style>