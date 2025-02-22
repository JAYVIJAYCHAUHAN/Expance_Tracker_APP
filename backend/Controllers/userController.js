const bcrypt = require("bcryptjs");
const User = require("../Models/User");

exports.signup = async (req, res) => {
  const { userName, email, password } = req.body;

  console.log(req.body);  // To check if the data is being received

  if (!userName || !email || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

  try {
    const userExist = await User.findOne({
      $or: [{ userName }, { email }],
    });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      userName,
      email,
      password,
    });

    await user.save();
    res.status(201).json({
      message: "User created successfully",
      user: { userName: user.userName, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login=async(req,res)=>{
  const { email, password } = req.body;
  console.log(req.body);
  if(!email || !password){
    return res.status(400).json({message:"Please fill all feilds"});
  }
   try{
    const user = await User.findOne({email});
    console.log("fined user",user)
    if(!user){
      return res.status(400).json({message:"User does not exists"});
    }
    // const isMatch = await bcrypt.compare(password,user.password);
    console.log("Stored Password:", user.password);
    if(password!==user.password){
      return res.status(400).json({message:"Invalid Credentials"});
    }
    res.status(200).json({
      message:"Login successful",
      user:{id:user._id,
        email:user.email,
        userName:user.userName,
      },
    })
    }catch(error){
       console.log(error);
      return res.status(500).json({message:"server error"});
        
    }

   }
  