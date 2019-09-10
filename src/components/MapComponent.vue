<template>
    <v-container>
        <v-layout
                text-center
                wrap
        >
            <v-flex xs12>
              <h2>{{message}}</h2>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "map-component",
        data() {
            return {
                message:"There will be map"
            }
        },
    }
</script>

<style scoped>

</style>