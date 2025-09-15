let logoNatH = null;
let seloNatW = null;

const LOGO_TARGET_H = 80;
const SELO_TARGET_W = 140;

function medirImagens() {
  return new Promise((resolve) => {
    let pendentes = 2;

    const logo = new Image();
    logo.onload = () => {
      logoNatH = logo.naturalHeight || null;
      if (--pendentes === 0) resolve();
    };
    logo.onerror = () => {
      if (--pendentes === 0) resolve();
    };
    logo.src = 'logopvt.jpeg';

    const selo = new Image();
    selo.onload = () => {
      seloNatW = selo.naturalWidth || null;
      if (--pendentes === 0) resolve();
    };
    selo.onerror = () => {
      if (--pendentes === 0) resolve();
    };
    selo.src = 'selopvt.png';
  });
}

const medirPromessa = medirImagens();

async function gerarAssinatura() {
  await medirPromessa;

  const nome = document.getElementById('nome').value;
  const funcao = document.getElementById('funcao').value;
  const email = document.getElementById('email').value;
  const celular = document.getElementById('celular').value;
  const fixo = document.getElementById('fixo').value;

  if (!nome || !funcao || !email || !celular) {
    document.getElementById('preview').innerHTML = 'Preencha todos os campos obrigatórios.';
    return;
  }

  const logoRenderH = Math.min(LOGO_TARGET_H, logoNatH || LOGO_TARGET_H);
  const seloRenderW = Math.min(SELO_TARGET_W, seloNatW || SELO_TARGET_W);

  const assinatura = `
    <table cellpadding="0" cellspacing="0" style="display:table; font-family:'Nunito Sans', sans-serif; font-size:14px; color:#333; text-align:left; line-height:1.35;">
      <tr>
        <td style="display:table-cell; vertical-align:middle; padding-right:20px;">
          <img
            src="logopvt.jpeg"
            alt="Logo PVT"
            height="${logoRenderH}"
            style="height:${logoRenderH}px; width:auto; display:block; -ms-interpolation-mode:bicubic; image-rendering:-webkit-optimize-contrast;"
          />
        </td>

        <td style="display:table-cell; vertical-align:middle; padding-right:20px;">
          <strong style="color:#00b5ff; font-size:16px;">${nome}</strong><br />
          <span style="color:#00b5ff; font-size:14px;">${funcao}</span><br /><br />
          <a href="mailto:${email}" style="color:#000; text-decoration:underline;">${email}</a><br />
          Cel: ${celular}<br />
          ${fixo ? `Tel: ${fixo}<br />` : ''}
        </td>

        <td style="display:table-cell; vertical-align:middle; border-left:1px solid #ccc; padding-left:20px;">
          <img
            src="selopvt.png"
            alt="Canal Homologado TOTVS"
            width="${seloRenderW}"
            style="width:${seloRenderW}px; height:auto; margin-bottom:10px; display:block; -ms-interpolation-mode:bicubic; image-rendering:-webkit-optimize-contrast;"
          /><br />
          Site: <a href="https://pvtsoftware.com.br" style="color:#000; text-decoration:underline;">pvtsoftware.com.br</a><br />
          Instagram: <a href="https://instagram.com/pvtsoftware" style="color:#000; text-decoration:underline;">@pvtsoftware</a><br />
          LinkedIn: <a href="https://linkedin.com/company/pvtsoftware" style="color:#000; text-decoration:underline;">/pvtsoftware</a>
        </td>
      </tr>
    </table>
  `;

  document.getElementById('preview').innerHTML = assinatura;
}

async function copiarAssinatura() {
  await gerarAssinatura();
  const preview = document.getElementById('preview');

  navigator.clipboard.write([
    new ClipboardItem({
      'text/html': new Blob([preview.innerHTML], { type: 'text/html' }),
      'text/plain': new Blob([preview.innerText], { type: 'text/plain' })
    })
  ]).then(() => {
    alert('Assinatura copiada com sucesso! Agora vá até o Outlook ;)');
  }).catch(() => {
    alert('Não foi possível copiar automaticamente. Copie manualmente.');
  });
}

async function baixarHTML() {
  await gerarAssinatura();
  const blob = new Blob([document.getElementById('preview').innerHTML], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'assinatura.html';
  link.click();
}

async function baixarPNG() {
  await gerarAssinatura();
  const preview = document.getElementById('preview');
  const escala = Math.max(3, window.devicePixelRatio || 1);
  html2canvas(preview, {
    scale: escala,
    useCORS: true
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'assinatura.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  await gerarAssinatura();
  document.querySelectorAll('input, select').forEach(field => {
    field.addEventListener('input', () => { gerarAssinatura(); });
  });
});
