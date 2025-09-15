document.getElementById("signatureForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const cargo = document.getElementById("cargo").value;
  const telefone = document.getElementById("telefone").value;
  const celular = document.getElementById("celular").value;
  const email = document.getElementById("email").value;
  const estado = document.getElementById("estado").value;
  const cidade = document.getElementById("cidade").value;

  const assinatura = `
  <table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;">
    <tr>
      <td>
        <strong style="font-size: 16px; color: #00b5ff;">${nome}</strong><br />
        <span style="font-size: 14px;">${cargo}</span><br /><br />
        <span style="font-size: 14px;">📞 ${telefone ? telefone + " | " : ""}${celular}</span><br />
        <span style="font-size: 14px;">📧 ${email}</span><br />
        <span style="font-size: 14px;">📍 ${cidade} - ${estado}</span>
      </td>
      <td style="padding: 0 20px;">|</td>
      <td align="center">
        <img src="https://i.imgur.com/TPlbR1E.png" alt="Logo PVT" width="100"><br /><br />
        <img src="https://i.imgur.com/qE1vT7a.png" alt="Selo" width="90"/><br />
        <span style="font-size: 13px;">
          Site: pvtsoftware.com.br<br />
          Instagram: @pvtsoftware<br />
          LinkedIn: /pvtsoftware
        </span>
      </td>
    </tr>
  </table>`;

  const preview = document.getElementById("assinaturaPreview");
  preview.innerHTML = assinatura;
});

function copiarAssinatura() {
  const preview = document.getElementById("assinaturaPreview");
  const range = document.createRange();
  range.selectNode(preview);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  try {
    document.execCommand("copy");
    alert("Assinatura copiada com sucesso!");
  } catch (err) {
    alert("Erro ao copiar a assinatura.");
  }
  window.getSelection().removeAllRanges();
}

function baixarAssinatura() {
  const node = document.getElementById("assinaturaPreview");
  html2canvas(node).then((canvas) => {
    const link = document.createElement("a");
    link.download = "assinatura.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

function baixarHTML() {
  const assinatura = document.getElementById("assinaturaPreview").innerHTML;
  const blob = new Blob([assinatura], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "assinatura.html";
  link.href = url;
  link.click();
}
