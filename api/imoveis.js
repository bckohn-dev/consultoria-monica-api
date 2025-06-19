// api/imoveis.js

export default function handler(req, res) {
  res.status(200).json([
    {
      id: "apto-centro-01",
      nome: "Apto Ouro Verde (teste)",
      preco: 400000,
      quartos: 2,
      foto: "https://via.placeholder.com/600x400"
    }
  ]);
}
