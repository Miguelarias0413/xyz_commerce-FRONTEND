import {create} from 'zustand'
import type {User} from '../types/index'
import {BACKEND_URL_API} from "../constants/index"


type UserState = {
    user: User|null,
    isAuthenticated : boolean,
    isAdmin: boolean,
    setUser: (user:User) => void,
    checkAuthStatus: () => void;
}

const useUser = create<UserState>(set => ({
    user:null,
    isAuthenticated: false,
    isAdmin: false,

    setUser : (user) => set({user, isAuthenticated: true}),

    checkAuthStatus: async () => {
        try {
          const response = await fetch(`${BACKEND_URL_API}/user`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error('No autenticado');
          }
    
          const userData = await response.json();
        
          
         
          set({ user: userData , isAuthenticated: true, isAdmin: userData.is_admin});
        } catch (error) {
          set({ user: null ,isAdmin:false ,isAuthenticated:false});
        }
      },
}))


export default useUser