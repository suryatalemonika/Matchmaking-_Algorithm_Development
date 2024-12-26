const connectDB = require('./config/db'); 
const { User } = require('./models/user'); 
const users = require('./mock_data/users.json'); 

(async () => {
    try {

        const existingUsers = await User.find();
        if (existingUsers.length > 0) {
            console.log('Users already exist in the database. Skipping insertion.');
        } else {
            const result = await User.insertMany(users.users);
            console.log(`${result.length} users inserted successfully`);
        }
    } catch (error) {
        console.error('Error during operation:', error.message);
    }
})();
