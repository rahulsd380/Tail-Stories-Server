// group.model.ts
import { Schema, model } from 'mongoose';
import { TGroup } from './group.interface';

const GroupSchema = new Schema<TGroup>({
  name: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  members: { type: [String], default : [] },
  logo: { type: String, required: true },
  coverImage: { type: String, required: true },
  tagline: { type: String, required: true },
});

export const Group = model<TGroup>('Group', GroupSchema);
