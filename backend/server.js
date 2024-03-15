import app from "./app.js";
import '../backend/config/config.env'

// Define the port number to listen on
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
