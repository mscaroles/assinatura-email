$(function () {
  // Máscaras
  $('#celular').mask('(00) 00000-0000');
  $('#fixo').mask('(00) 0000-0000');

  // Submissão do formulário: gerar prévia
  $('#assinatura-form').on('submit', function (e) {
    e.preventDefault();

    // Captura os valores
    const nome = $('#nome').val().trim();
    const funcao = $('#funcao').val().trim();
    const email = $('#email').val().trim();
    const celular = $('#celular').val().trim();
    const fixo = $('#fixo').val().trim();

    // Reset erros visuais
    $('.input-wrap').removeClass('erro');
    $('#erro-msg').remove();

    // Verifica obrigatórios
    if (!nome || !funcao || !email || !celular) {
      if (!nome) $('#nome').closest('.input-wrap').addClass('erro');
      if (!funcao) $('#funcao').closest('.input-wrap').addClass('erro');
      if (!email) $('#email').closest('.input-wrap').addClass('erro');
      if (!celular) $('#celular').closest('.input-wrap').addClass('erro');

      // Mensagem de erro
      $('#assinatura-form').after('<p id="erro-msg" style="color:#e74c3c; font-weight:700; margin-top:8px;">⚠️ Preencha os campos obrigatórios</p>');
      return;
    }

    // HTML da assinatura
    const assinaturaHTML = `
      <table style="font-family:'Nunito Sans',sans-serif; font-size:14px; color:#000000; border-collapse:collapse;">
        <tr>
          <!-- Logo -->
          <td style="padding:0 16px 0 0; vertical-align:middle; text-align:center;">
            <img src="https://github.com/mscaroles/assinatura-email/blob/main/logopvt.jpeg?raw=true"
                 alt="PVT" style="display:block; width:130px; height:auto;">
          </td>

          <!-- Texto -->
          <td style="vertical-align:middle; padding-right:16px; border-right:2px solid #ccc;">
            <div style="font-size:18px; font-weight:700; color:#00b5ff; line-height:1.25;">${nome}</div>
            <div style="font-size:16px; font-weight:700; color:#00b5ff; line-height:1.25;">${funcao}</div>

            <div style="margin-top:8px; line-height:1.4;">
              <a href="mailto:${email}" style="color:#000000; text-decoration:none;">${email}</a>
            </div>
            <div style="line-height:1.4;">
              Cel: ${celular}${fixo ? ` &nbsp;|&nbsp; Fixo: ${fixo}` : ''}
            </div>

            <!-- Social (texto puro com prefixo) -->
            <div style="margin-top:10px; font-size:13px; line-height:1.6; color:#000000;">
              <span style="display:block;">Site: <a href="https://pvtsoftware.com.br" target="_blank" style="color:#000000; text-decoration:none;">pvtsoftware.com.br</a></span>
              <span style="display:block;">Instagram: <a href="https://instagram.com/pvtsoftware" target="_blank" style="color:#000000; text-decoration:none;">@pvtsoftware</a></span>
              <span style="display:block;">LinkedIn: <a href="https://linkedin.com/company/pvtsoftware" target="_blank" style="color:#000000; text-decoration:none;">/pvtsoftware</a></span>
            </div>
          </td>

          <!-- Selo -->
          <td style="padding-left:16px; vertical-align:middle; text-align:right;">
            <img src="https://github.com/mscaroles/assinatura-email/blob/main/selopvt.png?raw=true"
                 alt="Selo PVT" style="display:block; height:60px; width:auto;">
          </td>
        </tr>
      </table>
    `;

    // Renderiza preview
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
