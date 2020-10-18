<template>
  <div>
    <!--
	父組件 改值的話，子組件呼叫即可
<button @click="$emit('largeFonts')">放大整個網頁的字體大小</button>
	如果要由子組件拋出，則父組件要使用 $event 承接
<button @click="$emit('largeFonts',0.1)">放大整個網頁的字體大小</button>

 -->

    <li>
      {{ title }} <button @click="$emit('remove')">移除這個品項</button
      ><button @click="$emit('largeFonts', 0.1)">放大整個網頁的字體大小</button>
    </li>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: ['title']
}
</script>

<style scoped></style>
