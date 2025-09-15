$(function () {
  // Máscaras
  $('#celular').mask('(00) 00000-0000');
  $('#fixo').mask('(00) 0000-0000');

  // Submissão do formulário: gerar prévia
  $('#assinatura-form').on('submit', function (e) {
    e.preventDefault();

    const nome = $('#nome').val().trim();
    const funcao = $('#funcao').val().trim();
    const email = $('#email').val().trim();
    const celular = $('#celular').val().trim();
    const fixo = $('#fixo').val().trim();

    if (!nome || !funcao || !email || !celular) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    // HTML da assinatura
    const assinaturaHTML = `
      <table style="font-family:'Nunito Sans', sans-serif; font-size:14px; color:#000000;">
        <tr>
          <td style="padding-right:15px; vertical-align:top;">
            <img src="https://github.com/mscaroles/assinatura-email/blob/main/logopvt.jpeg?raw=true" width="100" alt="Logo PVT">
          </td>
          <td>
            <div style="font-size:16px; font-weight:700; color:#00b5ff;">${nome}</div>
            <div style="font-size:14px; font-weight:700; color:#00b5ff;">${funcao}</div>
            <div style="font-size:14px; font-weight:400; margin-top:4px;">
              <a href="mailto:${email}" style="color:#000000; text-decoration:none;">${email}</a>
            </div>
            <div style="font-size:14px; font-weight:400; margin-top:2px;">
              Cel: ${celular}${fixo ? ` | Fixo: ${fixo}` : ''}
            </div>
            <div style="margin-top:8px;">
              <img src="https://github.com/mscaroles/assinatura-email/blob/main/selopvt.png?raw=true" width="90" alt="Selo PVT">
            </div>
          </td>
        </tr>
      </table>
    `;

    $('#assinatura-preview').html(assinaturaHTML);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });

  // Download do HTML
  $('#html-btn').on('click', function () {
    const html = $('#assinatura-preview').html();
    if (!html) { alert('Gere a assinatura primeiro.'); return; }

    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'assinatura-pvt.html';
    a.click();
  });

  // Download PNG do preview
  $('#baixar-btn').on('click', function () {
    const el = document.querySelector('#assinatura-preview');
    if (!el || !el.innerHTML.trim()) { alert('Gere a assinatura primeiro.'); return; }

    html2canvas(el, { backgroundColor: null, scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'assinatura-pvt.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });
});
