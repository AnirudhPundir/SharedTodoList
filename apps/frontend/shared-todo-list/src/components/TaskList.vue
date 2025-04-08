<template>
    <div>
        <h2>Task List</h2>
        <ul>
            <li v-for="task in taskStore.tasks" :key="task.id">
                {{ task.title }} - {{ task.description }}
                <button @click="taskStore.deleteTask(task.id)">Delete</button>
            </li>
        </ul>
        <input v-model="title" placeholder="Task Title" />
        <input v-model="description" placeholder="Task Description" />
        <button @click="addTask">Add Task</button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import { useTaskStore } from '../store/task'

    const taskStore = useTaskStore();

    const title = ref('');

    const description = ref('');

    const addTask = async() => {
        await taskStore.createTask(title.value, description.value);

        title.value = '';

        description.value = '';
    }

    taskStore.fetchTasks()
</script>