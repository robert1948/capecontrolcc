const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    
    // TODO: Add password hashing
    const user = await prisma.user.create({
      data: {
        email,
        name,
        // password: hashedPassword
      },
    });

    res.status(201).json({ 
      message: 'User created successfully', 
      userId: user.id 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // TODO: Add password verification and JWT token generation
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ 
      message: 'Login successful',
      userId: user.id,
      // token: jwtToken
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
