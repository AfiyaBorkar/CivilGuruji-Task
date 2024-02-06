import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Afiya',
    email: 'afiyaborkar@gmail.com',
    password: bcrypt.hashSync('BrkrAfi@345', 10),
    isAdmin: true,
  },
  {
    name: 'test2',
    email: 'afiyaborkar34@gmail.com',
    password: bcrypt.hashSync('BrkrAfi@123', 10),
  },
  
]

export default users
