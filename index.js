import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/remove-background', async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'imageUrl é obrigatório' });
    }

    const response = await axios.post(
      'https://api.remove.bg/v1.0/removebg',
      {
        image_url: imageUrl,
        size: 'auto',
        bg_color: 'white'
      },
      {
        headers: {
          'X-Api-Key': process.env.REMOVE_BG_API_KEY
        },
        responseType: 'arraybuffer'
      }
    );

    const base64 = Buffer.from(response.data).toString('base64');

    res.json({
      image: `data:image/png;base64,${base64}`
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao processar imagem' });
  }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () =>
  console.log(`🚀 Backend rodando na porta ${PORT}`)
);