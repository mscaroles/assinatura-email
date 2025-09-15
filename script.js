$(document).ready(function() {
  $('#celular').mask('(00) 00000-0000');
  $('#fixo').mask('(00) 0000-0000');

  $('#formulario').on('submit', function(e) {
    e.preventDefault();
    const nome = $('#nome').val();
    const funcao = $('#funcao').val();
    const email = $('#email').val();
    const celular = $('#celular').val();
    const fixo = $('#fixo').val();

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
  });

  $('#download-html').on('click', function() {
    const assinaturaHTML = document.getElementById('assinatura-preview').innerHTML;
    const blob = new Blob([assinaturaHTML], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'assinatura-pvt.html';
    a.click();
  });

  $('#baixar-imagem').on('click', function() {
    html2canvas(document.querySelector('#assinatura-preview')).then(canvas => {
      const link = document.createElement('a');
      link.download = 'assinatura-pvt.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  });
});
