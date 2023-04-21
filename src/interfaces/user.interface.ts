import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export interface IUserRegisterBody {
  username: string
  email: string
  password: string
}

const userRegisterSchema = new mongoose.Schema<IUserRegisterBody>({
username: {
  type: String,
  required: true,
},
email: {
  type: String,
  required: true,
},
password: {
  type: String,
  required: true,
},
})

export const UserRegisterModel = mongoose.model<IUserRegisterBody>('IUserRegisterBody', userRegisterSchema);


export interface IUserLoginBody {
  username: string
  password: string
}

export interface IUserConnectedFriendBody {
  id_connected: string
}

const IUserConnectedFriendSchema = new mongoose.Schema<IUserConnectedFriendBody>({
  id_connected: {
    type: String,
    required: true,
  }
  })


export const userConnectedFriendModel = mongoose.model<IUserConnectedFriendBody>('IUserConnectedFriendBody', IUserConnectedFriendSchema);



export interface IUserLoginBody {
  username: string
  password: string
}

export interface IUserRequestFriendBody {
  id_request: ObjectId
}

const IUserRequestFriendSchema = new mongoose.Schema<IUserRequestFriendBody>({
  id_request: {
    type: ObjectId,
    required: true,
  }
  })


export const IUserRequestFriendModel = mongoose.model<IUserRequestFriendBody>('IUserRequestFriendBody', IUserRequestFriendSchema);



  export interface IUserGetFriendBody {
    pseudo: string
  }
  
  const userFindWithPsuedo = new mongoose.Schema<IUserGetFriendBody>({
    pseudo: {
      type: String,
      required: true,
    },
    })
  
  
    export const userFindWithModel = mongoose.model<IUserGetFriendBody>('IUserGetFriendBody', userFindWithPsuedo);