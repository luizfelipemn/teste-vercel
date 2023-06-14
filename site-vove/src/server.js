const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

// Configuração do middleware para upload de arquivos
app.use(fileUpload());

// Rota para salvar o arquivo temporário
app.post('/arquivos/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
  }

  // O arquivo temporário enviado pelo cliente
  const tempFile = req.files.arquivo;

  // Salvar o arquivo temporário em uma pasta temporária no servidor
  const tempFolderPath = '/caminho/para/pasta/temporaria';
  tempFile.mv(`${tempFolderPath}/${tempFile.name}`, (err) => {
    if (err) {
      console.error('Erro ao salvar o arquivo temporário:', err);
      return res.status(500).json({ message: 'Erro ao salvar o arquivo temporário.' });
    }

    return res.json({ message: 'Arquivo temporário salvo com sucesso.' });
  });
});

// Resto da configuração do servidor...

app.listen(8080, () => {
  console.log('Servidor está ouvindo na porta 8080');
});
