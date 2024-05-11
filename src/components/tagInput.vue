<template>
  <div class="friendSearchContainer">

    <van-row type="flex" justify="center">
      <van-col span="16">
        <van-field readonly clickable label="Tags" label-width="10vw"
                   @click="init" v-model="tags" placeholder="输入tag"/>
      </van-col>
    </van-row>

    <van-row type="flex">
      <van-col span="16" offset="4">
        <van-search v-model="input" :placeholder="placeholder" data-toggle="tooltip"
                    @click="init" @keydown="search" @blur="onBlur"/>
        <div class="showField">
          <van-field v-show="searching" v-for="item in filtered" @click.stop="clickOne(item)" :label="item" readonly />
        </div>
      </van-col>

      <van-col span="4">
        <van-button type="primary" @click="onAddTag"> 添加
        </van-button>
      </van-col>
    </van-row>

  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '输入',
    },
    allChoices: Array,
  },
  data() {
    return {
      input: '0',
      searching: false,
      filtered: [],
      tags: '',
    }
  },
  methods: {
    init() {
      this.searching = true
      this.filtered = this.allChoices
    },
    search() {
      console.log('search')
    },
    clickOne(item) {
      this.input = item
      this.searching = false
      this.$emit('input', this.input)
    },
    onBlur() {
      // 这里延迟是为了让点击事件先触发
      setTimeout(() => {
        this.searching = false
        this.$emit('input', this.input)
      }, 200)
    },
    onAddTag() {
      if (this.input === '') {
        return
      }

      if (this.tags === '') {
        this.tags = this.input
      } else {
        this.tags += process.env.VUE_APP_TAG_SEP + this.input
      }

      this.input = ''
    },
  }
}
</script>

<style>

.showField .van-field:hover {
  background-color: #36bc7f;
}

</style>