<template>
  <div id="homeRecommand">
    <div class="homeRecommand_item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeRecommand",
  props: {
    recommends: {
      type: Array
    }
  }
}
</script>

<style scoped>
#homeRecommand {
  display: flex;
  margin-top: 10px;
  font-size: 14px;
  padding-bottom: 30px;
  border-bottom: 10px solid #eee;
}

.homeRecommand_item {
  flex: 1;
  text-align: center;
}

.homeRecommand_item a{
  text-decoration: none;
  color: black;
}

.homeRecommand_item img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

</style>