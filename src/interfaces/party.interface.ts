import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export interface IPartyCreateBody {
  id: ObjectId
  name: string
  id_creator: string
  id_player: string
  nb_player: number
  amount: number
  type: string
  finish: boolean
}

const createPartySchema = new mongoose.Schema<IPartyCreateBody>({
name: {
  type: String,
  required: true,
},
id_creator: {
  type: String,
  required: true,
},
id_player: {
  type: String,
  required: false,
},
nb_player: {
  type: Number,
  required: true,
  default: 1
},
amount: {
  type: Number,
  required: false
},
type: {
  type: String,
  required: false,
},
finish: {
  type: Boolean,
  required: true,
  default: false,
}
})

export const CreateParty = mongoose.model<IPartyCreateBody>('IPartyCreateBody', createPartySchema);


