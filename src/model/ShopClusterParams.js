export default class ShopClusterParams {
    constructor(southWestLat, southWestLon, northEastLat, northEastLon, zoom, categoryId, partnerId, halal){
        this.southWestLat=southWestLat;
        this.southWestLon=southWestLon;
        this.northEastLat=northEastLat;
        this.northEastLon=northEastLon;
        this.zoom = zoom;
        this.categoryId = categoryId;
        this.partnerId=partnerId;
        this.halal=halal;
    }

}