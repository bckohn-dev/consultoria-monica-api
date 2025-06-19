// api/imoveis.js
import { db } from './_firebaseAdmin.js';

export default async function handler(req, res) {
  try {
    const snapshot = await db.collection('imoveis').get();

    const imoveis = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // ✅ Verificação extra
    if (!Array.isArray(imoveis)) {
      return res.status(500).json({ error: 'Dados inválidos: imóveis não é um array' });
    }

    return res.status(200).json(imoveis);
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
    return res.status(500).json({ error: 'Erro ao buscar imóveis' });
  }
}
// This API endpoint retrieves all properties from Firestore and returns them as JSON.
// It includes error handling and a check to ensure the data is in the expected format.