import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret'; // Mantenha isso em um lugar seguro e nunca exposto

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  // Validação simples de credenciais
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
};
