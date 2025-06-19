// api/index.js
import { db } from './_firebaseAdmin.js';

export default async function handler(req, res) {
  try {
    const { quartos, precoMin, precoMax } = req.query;

    let query = db.collection('imoveis');

    if (quartos) query = query.where('quartos', '==', parseInt(quartos));
    if (precoMin) query = query.where('preco', '>=', parseFloat(precoMin));
    if (precoMax) query = query.where('preco', '<=', parseFloat(precoMax));

    const snapshot = await query.get();
    const imoveis = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(imoveis);
  } catch (error) {
    console.error('Erro ao acessar Firestore:', error);
    res.status(500).json({ error: 'Erro no servidor', details: error.message });
  }
}
// This API endpoint retrieves properties from Firestore based on query parameters.