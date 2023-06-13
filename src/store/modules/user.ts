import { defineStore } from "pinia"; 
import {userForm} from '@/common/types/user'
import {storage} from '@/utils/storage'

let userStore = defineStore('user',{
  state:()=>{
    return{
      token:storage.get('TOKEN')
    }
  },
  actions:{
    async login(data:userForm){
      console.log('data:',data);
      this.token = ''
      storage.set('TOKEN',this.token)
    }
  },
  getters:{

  }
})

export default userStore