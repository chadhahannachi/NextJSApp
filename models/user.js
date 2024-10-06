import { Schema,model,models } from "mongoose";

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    prenom:{
        type:String,
        required: false,
        },


    dateDeNaissance:{
        type:Date,
        required: false,
    },

    adresse: {
        type:String,
        required: false,
    },
    numeroDeTelephone: {
        type:String,
        required: false,
    },
});

export default models.User || model('User',UserSchema)
