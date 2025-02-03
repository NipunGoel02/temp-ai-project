import mongoose from "mongoose";


function connect() {

    mongoose.connect('mongodb+srv://nipungoel15:qahxnwKHzNPGrUwF@cluster0.p7n6x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {  // Use your MongoDB connection URL
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => console.log('Connected to MongoDB'))
      .catch((error) => console.error('MongoDB connection error:', error));
    
}
export default connect;