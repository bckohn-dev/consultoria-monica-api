// api/carrossel.js
import { storage } from './_firebaseAdmin.js';

res.setHeader('Access-Control-Allow-Origin', '*');

export default async function handler(req, res) {
  try {
    const bucket = storage.bucket();
    const [files] = await bucket.getFiles({ prefix: 'carrossel/' });

    const urls = await Promise.all(
      files.map(file =>
        file.getSignedUrl({
          action: 'read',
          expires: '03-01-2500',
        }).then(urls => urls[0])
      )
    );

    res.status(200).json(urls);
  } catch (error) {
    console.error('Erro ao buscar imagens do carrossel:', error);
    res.status(500).json({ erro: 'Erro ao buscar imagens' });
  }
  if (!files.length) {
    return res.status(200).json([]);
  }
}
// This API endpoint retrieves images from the 'carrossel' folder in Firebase Storage
// and returns their signed URLs for use in the frontend.
