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
    <table cellpadding="0" cellspacing="0" style="font-family:'Nunito Sans', sans-serif; font-size:14px; color:#333;">
      <tr>
        <!-- Logo PVT -->
        <td style="vertical-align:top; padding-right:20px;">
          <img src="https://pvt-site-assinatura.s3.amazonaws.com/logo-pvt.png" width="100" alt="Logo PVT" />
        </td>

        <!-- Informações pessoais -->
        <td style="vertical-align:top; padding-right:20px;">
          <strong style="color:#00b5ff; font-size:16px;">${nome}</strong><br />
          <span style="color:#00b5ff; font-size:14px;">${funcao}</span><br /><br />
          <a href="mailto:${email}" style="color:#000; text-decoration:underline;">${email}</a><br />
          Cel: ${celular}<br />
          ${fixo ? `Tel: ${fixo}<br />` : ''}
        </td>

        <!-- Divisor -->
        <td style="width:1px; background-color:#ccc;"></td>

        <!-- Selo e links -->
        <td style="vertical-align:top; padding-left:20px;">
          <img src="https://pvt-site-assinatura.s3.amazonaws.com/selo-totvs.png" width="140" alt="Canal Homologado TOTVS" style="margin-bottom:10px;" /><br />
          Site: <a href="https://pvtsoftware.com.br" style="color:#000; text-decoration:underline;">pvtsoftware.com.br</a><br />
          Instagram: <a href="https://instagram.com/pvtsoftware" style="color:#000; text-decoration:underline;">@pvtsoftware</a><br />
          LinkedIn: <a href="https://linkedin.com/company/pvtsoftware" style="color:#000; text-decoration:underline;">/pvtsoftware</a>
        </td>
      </tr>
    </table>
  `;

  document.getElementById('preview').innerHTML = assinatura;
}
