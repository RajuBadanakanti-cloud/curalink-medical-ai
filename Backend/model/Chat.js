import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({

            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },

            disease:{
                type:String,
                required:true
            },

            query:{
                type:String,
                required:true
            },

            expandedQuery:{
                type:String
            },

            aiResponse:{
                type:String,
            
            },

            publications:[
                {
                    title:String,
                    authors:[String],
                    year:Number,
                    source:String,
                    url:String,
                    summary:String
                }
            ],

            clinicalTrials:[
                {
                    title:String,
                    status:String,
                    location:String,
                    eligibility:String,
                    contact:String
                }
            ],

            createdAt:{
                type:Date,
                default:Date.now
            }

})

const Chat = mongoose.model("Chat", chatSchema)
export default Chat