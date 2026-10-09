import  mongoose from "mongoose"

const demoImageSchema = new mongoose.Schema(
    {
        fileName:{
            type:String,
            required:true
         },

         data:{
            type:Buffer, 
            required:true
         },
         contentType:{
            type:String, 
            required: true
         },
         user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
         }

    },
    {timestamps:true}
);

const DemoImage = mongoose.model("DemoImage", demoImageSchema)
export default DemoImage