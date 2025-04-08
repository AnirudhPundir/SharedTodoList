import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "../firestore";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | {email: string}
    }),
    actions: {
        async login(email: string, password: string){
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            this.user = {email: userCredential.user.email!}
        },

        async singup(email: string, password: string){
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            this.user = {email: userCredential.user.email!}
        },

        logout(){
            auth.signOut();
            this.user = null;
        }
    }
}); 

