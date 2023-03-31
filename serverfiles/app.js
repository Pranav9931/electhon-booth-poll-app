const express = require("express");
const app = express();
const firebase = require("firebase");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// Initialize Firebase app with your own config object
firebase.initializeApp({
  apiKey: process.env.API_KEY,
  //   authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
});

// Set up middleware to parse incoming JSON data
app.use(express.json());

// Define endpoint to create a new user
app.post("/v1/users/create", async (req, res) => {
  try {
    // Get user credentials from the request body
    const { firstName, lastName, dob, email, password } = req.body;

    // Generate a random salt string for password salting
    const salt = firebase.auth().generateRandomBytes(16).toString("base64");

    // Use Firebase's built-in password hashing function
    const hashedPassword = await firebase
      .auth()
      .createCustomToken(email + salt);

    // Create the user in Firebase Auth
    const userRecord = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, hashedPassword);

    // Generate a unique ID for the user
    const userId = uuidv4();

    // Create a user object with all the information
    const user = {
      id: userId,
      firstName,
      lastName,
      dob,
      email,
      password: hashedPassword, // Note that the actual password is not stored
      createdAt: new Date().toISOString(),
    };

    // Save the user object in your database
    // For example, using Firebase Realtime Database
    const dbRef = firebase.database().ref("users");
    await dbRef.child(userId).set(user);

    // Create a new account for the user
    const accountId = uuidv4();

    // Create an account object with account-related information
    const account = {
      id: accountId,
      userId: userId,
      accountBalance: 0, // New account starts with 0 balance
      createdAt: new Date().toISOString(),
      // Add some industry standard key-value pairs by your own
      accountType: "Savings",
      currency: "USD",
      status: "Active",
    };

    // Save the account object in your database
    // For example, using Firebase Realtime Database
    const accountRef = firebase.database().ref("accounts");
    await accountRef.child(accountId).set(account);

    // Return success response with user ID and account ID
    res.status(201).json({ userId: userId, accountId: accountId });
  } catch (err) {
    // Handle errors and send appropriate response codes
    if (err.code === "auth/email-already-exists") {
      res.status(409).json({ error: "Email already exists" });
    } else if (err.code === "auth/invalid-email") {
      res.status(400).json({ error: "Invalid email address" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
