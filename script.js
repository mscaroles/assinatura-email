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
    <table style="font-family:'Nunito Sans', sans-serif; font-size:14px; color:#333;">
      <tr>
        <td style="padding-right:15px; border-right:1px dotted #999;">
          <img src="https://pvt-site-assinatura.s3.amazonaws.com/logo-pvt.png" width="100" alt="Logo PVT"/>
        </td>
        <td style="padding-left:15px;">
          <strong style="font-size:16px; color:#00b5ff;">${nome}</strong><br/>
          <span style="font-size:14px;">${funcao}</span><br/><br/>

          <a href="mailto:${email}" style="color:#00b5ff; text-decoration:none;">${email}</a><br/>
          <a href="tel:${celular}" style="color:#00b5ff; text-decoration:none;">${celular}</a><br/>
          ${fixo ? `<a href="tel:${fixo}" style="color:#00b5ff; text-decoration:none;">${fixo}</a><br/>` : ''}<br/>

          <img src="https://pvt-site-assinatura.s3.amazonaws.com/selo-totvs.png" width="150" alt="Canal Homologado TOTVS"/><br/><br/>

          <a href="https://pvtsoftware.com.br" target="_blank" style="color:#00b5ff;">🌐 Site</a> |
          <a href="https://www.instagram.com/pvtsoftware/" target="_blank" style="color:#00b5ff;">📸 Instagram</a> |
          <a href="https://www.linkedin.com/company/pvtsoftware/" target="_blank" style="color:#00b5ff;">💼 LinkedIn</a>
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

document.querySelectorAll('input, select').forEach(field => {
  field.addEventListener('input', gerarAssinatura);
});
