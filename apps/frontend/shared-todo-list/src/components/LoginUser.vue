<script setup lang="ts">
import { ref } from 'vue';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const isSignUp = ref(false);
const errorMessage = ref('');

const handleAuth = async () => {
  try {
    if (isSignUp.value) {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
    } else {
      await signInWithEmailAndPassword(auth, email.value, password.value);
    }
  } catch (error) {
    errorMessage.value = (error as Error).message;
  }
};
</script>

<template>
  <div class="auth-container">
    <h2>{{ isSignUp ? 'Sign Up' : 'Login' }}</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleAuth">{{ isSignUp ? 'Sign Up' : 'Login' }}</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p @click="isSignUp = !isSignUp" class="toggle">
      {{ isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up" }}
    </p>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: auto;
  text-align: center;
}
input {
  padding: 8px;
  font-size: 1rem;
}
button {
  padding: 8px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
}
.toggle {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>
