<template>
  <div class="Tabbarcontrol">
    <div class="Tabbarcontrol_item" v-for="(item,index) in titles"
         @click="itemclick(index)"
         :class="{active:currentIndex === index}">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabbarcontrol",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return ['流行', '新款', '精选']
      }
    }
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index;
      this.$emit('Tabbarclick',index)
    }
  }
}
</script>

<style scoped>
.Tabbarcontrol {
  display: flex;
  text-align: center;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}

.Tabbarcontrol_item {
  flex: 1;
}

.Tabbarcontrol_item span {
  padding-bottom: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 2px solid var(--color-high-text);
}
</style>