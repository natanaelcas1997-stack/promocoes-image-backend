import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/remove-background', async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'imageUrl não enviado' });
    }

    return res.json({
      image: imageUrl,
      status: 'ok',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Erro interno no servidor',
    });
  }
});

app.get('/', (req, res) => {
  res.send('Backend Promoções Top 20 Pro ONLINE');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta', PORT);
});