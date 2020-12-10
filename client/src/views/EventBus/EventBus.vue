<template>
  <div class="event-bus">
    <div class="header">
      <Header
        @rightClick=""
        title="EventBus"
        btn_icon="file-upload"
        :isLeft="true"
      ></Header>
    </div>
    <div class="content">
      <DisplayNumber />
      <AddNumber />
      <div class="container">
        <!-- search bar -->
        <div class="search-box">
          <input type="text" placeholder="Search...." class="search-bar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
import AddNumber from '../../components/EventBus/AddNumber'
import DisplayNumber from '../../components/EventBus/DisplayNumber'

export default {
  name: 'event-bus',
  data() {
    return {}
  },
  components: {
    Header,
    AddNumber,
    DisplayNumber
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped>
.event-bus {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.content {
  width: 100%;
  height: calc(100% - 3.125rem);
  padding-top: 3.125rem;
  overflow: auto;
  margin: 0.625rem 0;
}
.btn-wrap {
  padding: 5px;
}

.btn {
  margin: 5px;
}

.search-box {
  width: 100%;
  margin-bottom: 35px;
}

.container {
  height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}

.search-box .search-bar {
  display: block;
  width: 80%;
  padding: 15px;
  transition: all 0.4s ease-in;
  border-radius: 0 16px 0 16px;
  font-size: 20px;
  border: none;
  outline: none;
  background: none;
  background-color: hsla(0, 0%, 100%, 0.5);
}
</style>
