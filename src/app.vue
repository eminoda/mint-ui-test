<template>
  <div>
    <div class="title">mint-ui pagination test</div>
    <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" class="page-wraper">
      <mt-loadmore
        class="page-innter-wraper"
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        @translate-change="myTranslate"
        @client-change="myClient"
        topDropText="正在加载数据"
        ref="loadmore"
      >
        <div :style="{ 'min-height': wrapperHeight-1 + 'px' }" ref="item" class="item-wrapper">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="item"
          >{{item}}-{{$refs.item.clientHeight}}</div>
        </div>
      </mt-loadmore>
    </div>
    <div class="tip">
      <div>[translate] {{translate}}</div>
      <div>[body_scrollTop] {{doc.body_scrollTop}}</div>
      <div>[documentElement_scrollTop] {{Math.round(doc.documentElement_scrollTop)}}</div>
      <div>[documentElement_clientHeight] {{doc.documentElement_clientHeight}}</div>
      <div>[window_innerHeight] {{doc.window_innerHeight}}</div>
      <div>[total scroll]{{Math.round((doc.body_scrollTop||doc.documentElement_scrollTop))+doc.documentElement_clientHeight-doc.body_scrollHeight}}</div>
      <div>[body_scrollHeight] {{doc.body_scrollHeight}}</div>
      <div>[pageY] {{doc.pageY}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      page: 1,
      pageSize: 10,
      allLoaded: false, //true 不加载
      wrapperHeight: 0,
      list: [],
      translate: 0,
      doc: {
        body_scrollTop: 0,
        documentElement_scrollTop: 0,
        documentElement_clientHeight: 0,
        window_innerHeight: 0,
        body_scrollHeight: 0,
        pageY: 0
      },
      current: {
        initHeight: 0,
        clientHeight: 0,
        maxHeight: 0
      }
    };
  },
  methods: {
    myClient(doc) {
      this.doc.body_scrollTop = doc.body.scrollTop;
      this.doc.documentElement_scrollTop = doc.documentElement.scrollTop;
      this.doc.documentElement_clientHeight = doc.documentElement.clientHeight;
      this.doc.documentElement_innerHeight = doc.documentElement.innerHeight;
      this.doc.window_innerHeight = window.innerHeight;
      this.doc.body_scrollHeight = doc.body.scrollHeight;
      this.doc.pageY = doc.pageY;
    },
    myTranslate(data) {
      this.translate = Math.round(data);
    },
    buildList(page) {
      var data = [];
      for (var i = 0; i < 60; i++) {
        data.push(
          `id:${page * i + 1};page:${page};` +
            `${Math.round(
              document.body.scrollTop || document.documentElement.scrollTop
            ) +
              document.documentElement.clientHeight >=
              document.body.scrollHeight}`
        );
      }
      this.list = this.list.concat(data);
    },
    loadTop() {
      let self = this;
      self.allLoaded = true;
      this.list = [];
      this.page = 1;
      this.buildList(self.page);
      self.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      let self = this;
      self.allLoaded = true;
      setTimeout(function() {
        self.buildList(self.page);
        self.page = self.page + 1;
        self.allLoaded = false;
        self.$refs.loadmore.onBottomLoaded();
        // console.log(self.$refs.item.clientHeight);
      }, 1000);
    },
    count() {
      let self = this;
      setInterval(function() {
        if (self.current.maxHeight < window.innerHeight) {
          console.log("over write");
          self.current.maxHeight = window.innerHeight;
          console.log("max屏高", self.current.maxHeight);
        }
        console.log("当前屏高", window.innerHeight);
      }, 1000);
    }
  },
  created() {
    // console.log(navigator.appCodeName, navigator.appVersion);
  },
  mounted: function() {
    this.current.maxHeight = window.innerHeight;
    this.current.initHeight = window.innerHeight;
    this.myClient(document);
    console.log("初始高度", this.current.initHeight);
    this.count();
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  }
};
</script>

<style lang="scss">
.tip {
  position: fixed;
  top: 40%;
  min-width: 40%;
  background: #333;
  color: white;
}
body {
  margin: 0;
}
.title {
  position: fixed;
  z-index: 10;
  width: 100%;
  padding: 5px;
  text-align: center;
  background-color: #97e9ce;
}
.page-wraper {
  background-color: #45ecac;
  padding-top: 30px;
  border-bottom: rgb(77, 75, 75);
  .page-innter-wraper {
    .item {
      background-color: #cc8454;
      // margin-bottom: 3px;
      font-size: 16px;
      // padding: 5px;
    }
  }
}
</style>
