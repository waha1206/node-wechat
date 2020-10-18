<template>
  <div class="circle">
    <Header title="增加品項" btn_icon="camera" :isLeft="true"></Header>
    <div class="container" :style="{ fontSize: postFontSize + 'em' }">
      <div class="add">
        <form @submit.prevent="addNewTodo">
          <label for="new-todo">新增一個新品項</label>
          <br />
          <input
            type="text"
            id="now-todo"
            v-model="newTodoText"
            placeholder="請輸入品項名稱"
          />

          <button>新增品項</button>
        </form>
        <ul>
          <!--
						@largeFonts="postFontSize += $event"
						另外一種就是在 methods: 裡面給他一個函數，另外把子組件傳送過來的參數帶進去
						@largeFonts="functionName"
						functionName(參數) {}
					 -->
          <TodoItem
            v-for="(item, index) in todos"
            :key="item.id"
            :title="item.title"
            @remove="todos.splice(index, 1)"
            @largeFonts="postFontSize += $event"
          ></TodoItem>
        </ul>
      </div>
      <div class="checkbox">
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames" />
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
        <label for="mike">Mike</label>
        <br />
        <span>Checked names: {{ checkedNames }}</span>
      </div>
      <div class="select">
        <select v-model="selected">
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
            >{{ option.text }}</option
          >
        </select>
        <CustomizedInput v-model="searchText" />
        {{ searchText }}
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import CellView from '../components/CellView'
import TodoItem from '../components/TodoItem'
import CustomizedInput from '../components/CustomizedInput'

export default {
  name: 'todo',
  components: {
    Header,
    CellView,
    TodoItem,
    CustomizedInput
  },
  data() {
    return {
      selected: 'A',
      options: [
        {
          text: 'SS001',
          value: 'A'
        },
        { text: 'SS002', value: 'B' },
        { text: 'SS003', value: 'C' }
      ],
      newTodoText: '',
      nextTodoId: 4,
      todos: [
        { id: 1, title: '第一個' },
        { id: 2, title: '第二個' },
        { id: 3, title: '第三個' }
      ],
      checkedNames: [],
      postFontSize: 1,
      searchText: ''
    }
  },

  methods: {
    addNewTodo: function(e) {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      console.log(this.todos)
    }
  },
  created() {},
  computed: {}
}
</script>

<style scoped>
.title,
.checkbox,
.select {
  margin: 20px;
  text-align: center;
}

.add {
  margin: 20px;
  text-align: center;
}

.circle {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: calc(100% - 50px);
  padding-top: 50px;
  overflow: auto;
}
.head_wrapper {
  width: 100%;
  position: relative;
  height: 200px;
  background: url(../assets/cricle_bg.png) no-repeat;
  background-size: 100% 100%;
}
.head_wrapper .user_head {
  position: absolute;
  bottom: -30px;
  right: 16px;
}
.user_img {
  width: 60px;
  height: 60px;
  padding: 3px;
  border: 1px solid #c5c5c5;
  box-sizing: border-box;
}
.user_head img {
  width: 100%;
  height: 100%;
}
.user_head span {
  line-height: 30px;
  position: absolute;
  right: 76px;
  width: 200px;
  text-align: right;
  color: white;
}
</style>
