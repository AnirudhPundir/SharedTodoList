<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { auth } from '@/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoginView from '@/views/LoginView.vue';
import TaskListView from '@/views/TaskListView.vue';

const user = ref(null);

// Check authentication state on app load
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });
});

// Logout function
const handleLogout = async () => {
  await signOut(auth);
  user.value = null;
};
</script>

<template>
  <div>
    <header v-if="user">
      <h1>Shared To-Do List</h1>
      <button @click="handleLogout">Logout</button>
    </header>

    <main>
      <LoginView v-if="!user" />
      <TaskListView v-else />
    </main>
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #42b983;
  color: white;
}
</style>
