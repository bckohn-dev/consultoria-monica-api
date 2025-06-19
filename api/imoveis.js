// api/imoveis.js
export default function handler(req, res) {
  res.status(200).json([
    {
      id: "1",
      nome: "Apartamento Teste",
      preco: 300000,
      quartos: 2,
      foto: "https://via.placeholder.com/600x400"
    }
  ]);
}
