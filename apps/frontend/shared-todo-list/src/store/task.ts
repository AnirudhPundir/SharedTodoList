import axios from "axios";
import { defineStore } from "pinia";

type Task = { id: string; title: string; description: string }
export const taskStore = defineStore('task', {
    state: () => ({
        tasks: [] as Task[]
    }),
    actions: {
        async fetchTasks() {
            const response = await axios.get('/api/tasks');
            this.tasks = response.data;
        },

        async createTask(title: string, description: string) {
            const response = await axios.post('/api/tasks', {title, description});
            this.tasks.push(response.data);
        },

        async deleteTask(id: string){
            await axios.delete(`/api/tasks/${id}`);
            this.tasks = this.tasks.filter(task => task.id !== id)
        }
    }
})