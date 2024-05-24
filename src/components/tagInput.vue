<template>
  <div class="friendSearchContainer">

    <van-row type="flex" justify="center">
      <van-col span="16">
        <van-field readonly clickable label="Tags" label-width="10vw"
                   @click="init" v-model="tags" placeholder=""/>
      </van-col>
    </van-row>

    <van-row type="flex">
      <van-col span="16" offset="4">
        <van-search v-model="input" :placeholder="placeholder" data-toggle="tooltip"
                    @click="init" @blur="onBlur"/>
        <div class="showField">
          <van-field v-show="searching" v-for="item in filteredChoices"
                     @click.stop="clickOne(item)" :label="item" readonly/>
        </div>
      </van-col>

      <van-col span="4">
        <van-button color="#8CC7B5" @click="onAddTag"> 添加
        </van-button>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import PinyinMatch from 'pinyin-match'
import {showFailToast} from "vant";

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
      input: '',
      searching: false,
      tags: '',
    }
  },
  methods: {
    init() {
      this.searching = true
    },
    clickOne(item) {
      this.input = item
      this.searching = false
      this.$emit('input', this.tags)
    },
    onBlur() {
      // 这里延迟是为了让点击事件先触发
      setTimeout(() => {
        this.searching = false
        this.$emit('input', this.tags)
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
      this.$emit('input', this.tags)
    },
    clear() {
      this.input = ''
      this.tags = ''
    },
    checkBeforeSubmit() {
      if (this.input !== '') {
        showFailToast('有未添加的tag')
        return false
      }
      return true
    },
  },
  computed: {
    filteredChoices() {
      if (this.input === '') {
        return this.allChoices.slice(0, 10)
      }
      return this.allChoices
          // .filter((k) => k.includes(this.input))
          .filter((k) => PinyinMatch.match(k, this.input)) // 拼音首字母匹配
          .slice(0, 10) // 截取前10个
    },
  },
}
</script>

<style>

.showField .van-field:hover {
  background-color: #36bc7f;
}

</style>