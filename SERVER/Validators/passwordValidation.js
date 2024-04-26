
const validatePasswordInput = (req, res, next) => {
    const { password,confirmPassword} = req.body;
  
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const confirmPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


  
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Invalid password. Must be at least 8 characters, including uppercase, lowercase, and numeric characters' });
 
    }
    if (!confirmPassword || ! confirmPasswordRegex.test(password)) {
        return res.status(400).json({ error: 'Invalid password. Must be at least 8 characters, including uppercase, lowercase, and numeric characters' });
      }

  
   next();
  };
  
  module.exports = validatePasswordInput;