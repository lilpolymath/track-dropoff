import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/all', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/products', async (req, res) => {
  const products = await prisma.products.findMany();
  res.json(products);

  res.json([]);
});

app.get('/cart', async (req, res) => {
  const { email, product } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      cart: true,
    },
  });
});

app.post(`/cart`, async (req, res) => {
  const { email, product } = req.body;
  const cart = await prisma.user.update({
    where: {
      email,
    },
    data: {
      cart: product,
    },
  });
  res.json(cart);
});

app.delete(`/cart`, async (req, res) => {
  const { email, product } = req.body;
  const cart = await prisma.user.delete({
    where: {
      email,
      cart: {
        id: product.id,
      },
    },
  });
  res.json(cart);
});

app.get('/ip-address', async (req, res) => {
  res.json({ ipAddress: req.ip });
});

const server = app.listen(3001, () =>
  console.log('🚀 Server ready at: http://localhost:3001')
);
