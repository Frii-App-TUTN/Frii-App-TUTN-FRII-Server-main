import { Schema, model } from 'mongoose';
export interface GroupSchema {
    id: number;
    name: string;
    members: string[];
    


}
const GroupSchema = new Schema<GroupSchema>({
    
});
export const Group = model('Group', GroupSchema);