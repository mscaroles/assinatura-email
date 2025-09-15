function gerarAssinatura() {
  const nome = document.getElementById('nome').value;
  const funcao = document.getElementById('funcao').value;
  const email = document.getElementById('email').value;
  const celular = document.getElementById('celular').value;
  const fixo = document.getElementById('fixo').value;

  if (!nome || !funcao || !email || !celular) {
    document.getElementById('preview').innerHTML = 'Preencha todos os campos obrigatórios.';
    return;
  }

  const assinatura = `
    <table cellpadding="0" cellspacing="0" style="font-family:'Nunito Sans', sans-serif; font-size:14px; color:#333; text-align:left;">
      <tr>
        <td style="vertical-align:top; padding-right:20px;">
          <img src="logopvt.jpeg" width="100" alt="Logo PVT" />
        </td>
        <td style="vertical-align:top; padding-right:20px;">
          <strong style="color:#00b5ff; font-size:16px;">${nome}</strong><br />
          <span style="color:#00b5ff; font-size:14px;">${funcao}</span><br /><br />
          <a href="mailto:${email}" style="color:#000; text-decoration:underline;">${email}</a><br />
          Cel: ${celular}<br />
          ${fixo ? `Tel: ${fixo}<br />` : ''}
        </td>
        <td style="width:1px; background-color:#ccc;"></td>
        <td style="vertical-align:top; padding-left:20px;">
          <img src="selopvt.png" width="140" alt="Canal Homologado TOTVS" style="margin-bottom:10px;" /><br />
          Site: <a href="https://pvtsoftware.com.br" style="color:#000; text-decoration:underline;">pvtsoftware.com.br</a><br />
          Instagram: <a href="https://instagram.com/pvtsoftware" style="color:#000; text-decoration:underline;">@pvtsoftware</a><br />
          LinkedIn: <a href="https://linkedin.com/company/pvtsoftware" style="color:#000; text-decoration:underline;">/pvtsoftware</a>
        </td>
      </tr>
    </table>
  `;

  document.getElementById('preview').innerHTML = assinatura;
}

function copiarAssinatura() {
  gerarAssinatura();
  const temp = document.createElement('textarea');
  temp.value = document.getElementById('preview').innerHTML;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);
  alert('Assinatura copiada para a área de transferência.');
}

function baixarHTML() {
  gerarAssinatura();
  const blob = new Blob([document.getElementById('preview').innerHTML], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'assinatura.html';
  link.click();
}

function baixarPNG() {
  gerarAssinatura();
  const preview = document.getElementById('preview');
  html2canvas(preview).then(canvas => {
    const link = document.createElement('a');
    link.download = 'assinatura.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input, select').forEach(field => {
    field.addEventListener('input', gerarAssinatura);
  });
});
