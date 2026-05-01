import mongoose from "mongoose"

const queryCacheSchema = new mongoose.Schema({

        query:String,
        expandedQuery:String,

        papers:Array,
        trials:Array,

        aiResponse:String,

        createdAt:{
            type:Date,
            default:Date.now
        }
})

const QueryCache = mongoose.model("QueryCache", queryCacheSchema)