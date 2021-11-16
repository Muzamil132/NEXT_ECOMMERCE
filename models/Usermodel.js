import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
   username:{
      type:String,
      required:true,
      
   },
   email:{
       type:String,
       required:true,
    
   },
   password:{
       type:String,
       required:true,
        minlength:[6,'Must be 6 characters length']
   },
   createdAt: {
      type: Date,
      default: Date.now
  },
 

})




module.exports =mongoose.models.User || mongoose.model('User',userSchema)