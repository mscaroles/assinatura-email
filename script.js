document.getElementById("generate").addEventListener("click", generateSignature);
document.getElementById("copy").addEventListener("click", copySignature);
document.getElementById("download-html").addEventListener("click", downloadHTML);
document.getElementById("download-png").addEventListener("click", downloadPNG);

function generateSignature() {
  const nome = document.getElementById("nome").value;
  const funcao = document.getElementById("funcao").value;
  const email = document.getElementById("email").value;
  const celular = document.getElementById("celular").value;

  const signature = `
  <table style="font-family:'Nunito Sans', sans-serif; font-size:14px;">
    <tr>
      <td style="padding-right:20px; border-right:1px solid #ccc;">
        <img src="logopvt.jpeg" alt="Logo PVT" style="width:80px;">
      </td>
      <td style="padding:0 20px;">
        <p style="margin:0; font-size:16px; font-weight:bold; color:#00b5ff;">${nome}</p>
        <p style="margin:0; color:#00b5ff;">${funcao}</p>
        <p style="margin:6px 0;"><a href="mailto:${email}" style="color:#000;">${email}</a></p>
        <p style="margin:0;">Cel: ${celular}</p>
      </td>
      <td style="padding-left:20px; border-left:1px solid #ccc;">
        <img src="selopvt.png" alt="Selo PVT" style="width:100px;"><br><br>
        <p style="margin:0;">Site: <a href="https://pvtsoftware.com.br">pvtsoftware.com.br</a></p>
        <p style="margin:0;">Instagram: <a href="https://instagram.com/pvtsoftware">@pvtsoftware</a></p>
        <p style="margin:0;">LinkedIn: <a href="https://linkedin.com/company/pvtsoftware">/pvtsoftware</a></p>
      </td>
    </tr>
  </table>
  `;

  document.getElementById("preview").innerHTML = signature;
}

function copySignature() {
  const el = document.createElement("textarea");
  el.value = document.getElementById("preview").innerHTML;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  alert("Assinatura copiada com sucesso! Agora, vá até o Outlook ;)");
}

function downloadHTML() {
  const htmlContent = document.getElementById("preview").innerHTML;
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "assinatura_pvt.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadPNG() {
  const node = document.getElementById("preview");
  html2canvas(node).then(canvas => {
    const link = document.createElement("a");
    link.download = "assinatura_pvt.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
