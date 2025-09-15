// Versão p/ depuração (Console)
const assinaturaPVT_VERSION = '6';
console.log('Assinatura PVT - JS version:', assinaturaPVT_VERSION);

$(function () {
  // Máscaras
  $('#celular').mask('(00) 00000-0000');
  $('#fixo').mask('(00) 0000-0000');

  // Gerar prévia
  $('#assinatura-form').on('submit', function (e) {
    e.preventDefault();

    const nome = $('#nome').val().trim();
    const funcao = $('#funcao').val().trim();
    const email = $('#email').val().trim();
    const celular = $('#celular').val().trim();
    const fixo = $('#fixo').val().trim();

    if (!nome || !funcao || !email || !celular) {
      alert('⚠️ Preencha os campos obrigatórios');
      return;
    }

    // Assinatura: tabela 3 colunas (logo | texto | selo+sociais)
    const assinaturaHTML = `
      <table style="font-family:'Nunito Sans',sans-serif; font-size:14px; color:#000000; border-collapse:collapse; width:100%; max-width:860px; table-layout:fixed;">
        <tr>

          <!-- ESQUERDA: LOGO -->
          <td style="width:200px; padding:0 16px 0 0; vertical-align:middle; text-align:center;">
            <img src="https://github.com/noamarketing/assinatura-email/blob/main/logopvt.jpeg?raw=true"
                 alt="PVT" style="display:block; width:140px; height:auto; margin:0 auto;">
          </td>

          <!-- CENTRO: TEXTO -->
          <td style="padding-right:16px; vertical-align:middle; border-right:2px solid #cfd6e0;">
            <div style="font-size:18px; font-weight:700; color:#00b5ff; line-height:1.25; word-break:break-word;">${nome}</div>
            <div style="font-size:16px; font-weight:400; color:#00b5ff; line-height:1.25; word-break:break-word;">${funcao}</div>

            <div style="margin-top:8px; line-height:1.5; word-break:break-word;">
              <a href="mailto:${email}" style="color:#000000; text-decoration:none;">${email}</a>
            </div>
            <div style="line-height:1.5; word-break:break-word;">
              Cel: ${celular}${fixo ? ` &nbsp;|&nbsp; Fixo: ${fixo}` : ''}
            </div>
          </td>

          <!-- DIREITA: SELO + SOCIAIS (abaixo do selo) -->
          <td style="width:260px; padding-left:16px; vertical-align:middle; text-align:left;">
            <img src="https://github.com/noamarketing/assinatura-email/blob/main/selopvt.png?raw=true"
                 alt="Selo PVT" style="display:block; height:74px; width:auto; margin-bottom:10px;">
            <div style="font-size:13px; line-height:1.5; color:#000000;">
              <div>Site: <a href="https://pvtsoftware.com.br" target="_blank" style="color:#000000; text-decoration:none;">pvtsoftware.com.br</a></div>
              <div>Instagram: <a href="https://instagram.com/pvtsoftware" target="_blank" style="color:#000000; text-decoration:none;">@pvtsoftware</a></div>
              <div>LinkedIn: <a href="https://linkedin.com/company/pvtsoftware" target="_blank" style="color:#000000; text-decoration:none;">/pvtsoftware</a></div>
            </div>
          </td>

        </tr>
      </table>
    `;

    $('#assinatura-preview').html(assinaturaHTML);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });

  // Copiar assinatura (HTML rico)
  $('#copiar-btn').on('click', async function () {
    const html = $('#assinatura-preview').html();
    if (!html || !html.trim()) { alert('Gere a assinatura primeiro.'); return; }

    // Tenta Clipboard API (HTML)
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const blob = new Blob([html], { type: 'text/html' });
        const item = new ClipboardItem({ 'text/html': blob });
        await navigator.clipboard.write([item]);
        alert('Assinatura copiada! Agora cole no campo de assinatura do Outlook.');
        return;
      }
    } catch (e) {
      // segue pro fallback
    }

    // Fallback: seleciona DOM e usa execCommand
    const range = document.createRange();
    const node = document.getElementById('assinatura-preview');
    range.selectNodeContents(node);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try {
      document.execCommand('copy');
      sel.removeAllRanges();
      alert('Assinatura copiada! Agora cole no campo de assinatura do Outlook.');
    } catch (err) {
      sel.removeAllRanges();
      alert('Não foi possível copiar automaticamente. Selecione e copie a assinatura manualmente.');
    }
  });

  // Download HTML
  $('#html-btn').on('click', function () {
    const html = $('#assinatura-preview').html();
    if (!html || !html.trim()) { alert('Gere a assinatura primeiro.'); return; }

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
