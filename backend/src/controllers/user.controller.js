import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { username, email, password } = req.body;

    //basic validation
    if(!username || !email || !password){
      console.log("Validation failed");
      return res.status(400).json({ error: 'All fields are required' });
    }

    //check if user exist already
    console.log("Checking for existing user");
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("User already exists");
      return res.status(400).json({ error: 'User already exists' });
    }

    //create user
    console.log("Creating user");
    const user = await User.create({ 
      username, 
      email : email.toLowerCase(), 
      password,
    }
    );
    console.log("User created:", user);

    res.status(201).json({ 
      message: 'User registered successfully',
      user: {id: user.id, email: user.email, username: user.username} 
    });  
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const loginUser = async (req, res) => {
  try {
    //checking if the user already exist
    const{email, password} = req.body;
    
    if(!email || !password){
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.findOne({ 
      email: email.toLowerCase()
    });

    if(!user) return res.status(404).json({ 
      message: 'User not found' 
    });

    //compare passwords
    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(401).json({ 
      message: 'Invalid credentials' 
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
          id: user.id,
          email: user.email, 
          username: user.username
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export{
  registerUser,
  loginUser
}