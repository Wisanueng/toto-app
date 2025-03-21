<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->


<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const tasks = ref([]);
const newTask = ref("");

const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    tasks.value = res.data;
};

const addTask = async () => {
    if (!newTask.value) return;
    const res = await axios.post("http://localhost:5000/tasks", { title: newTask.value });
    tasks.value.push(res.data);
    newTask.value = "";
};

const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    tasks.value = tasks.value.filter(task => task.id !== id);
};

onMounted(fetchTasks);
</script>

<template>
  <div class="container">
    <h1>📝 To-Do List</h1>
    <input v-model="newTask" @keyup.enter="addTask" placeholder="เพิ่มงานใหม่..." />
    <button @click="addTask">➕ เพิ่ม</button>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }} <button @click="deleteTask(task.id)">❌</button>
      </li>
    </ul>
  </div>
</template>

<style>
.container { max-width: 400px; margin: auto; text-align: center; }
input { width: 80%; padding: 8px; margin: 8px 0; }
button { padding: 8px 12px; margin: 5px; cursor: pointer; }
ul { list-style: none; padding: 0; }
li { background: #eee; padding: 10px; margin: 5px 0; display: flex; justify-content: space-between; }
</style>
