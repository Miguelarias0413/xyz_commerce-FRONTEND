import {create} from 'zustand'
import type {User} from '../types/index'
type UserState = {
    user: User|null,
    isAuthenticated : boolean,
    setUser: (user:User) => void,
}

const useUser = create<UserState>(set => ({
    user:null,
    isAuthenticated: false,
    isAdmin: false,

    setUser : (user) => set({user, isAuthenticated: true})
}))


export default useUser