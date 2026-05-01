import mongoose from "mongoose";

const researchSchema = new mongoose.Schema({
        query:{
        type:String,
        required:true
        },

        publications:[
        {
            title:String,
            authors:[String],
            year:Number,
            source:String,
            url:String,
            abstract:String
        }
        ],

        clinicalTrials:[
        {
            title:String,
            status:String,
            location:String
        }
        ],

        cachedAt:{
        type:Date,
        default:Date.now
        }

})


const ResarchCatch = mongoose.model("researchSchema", researchSchema)

export default ResarchCatch