import mongoose from "mongoose";
const Dbconnect= async()=>{
    try{
    await mongoose.connect(process.env.MONGOURI)
    console.log("connected to database")

}
    catch(err){
        console.log("error connecting to database",err)
    }
}
export default Dbconnect;