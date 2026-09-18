import mongoose from "mongoose";


const connectDB = async () => {

    try {

        const mongoURI =
            "mongodb+srv://vmiitadmin:Vmiit123456@cluster0.vnc8vcu.mongodb.net/vmiit?appName=Cluster0";


        await mongoose.connect(mongoURI);


        console.log(
            "MongoDB Atlas connected successfully"
        );


    } catch (error) {

        console.error(
            "MongoDB connection error:",
            error.message
        );

        process.exit(1);

    }

};


export default connectDB;
