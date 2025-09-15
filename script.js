document.getElementById("signatureForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const funcao = document.getElementById("funcao").value;
  const email = document.getElementById("email").value;
  const celular = document.getElementById("celular").value;
  const telefone = document.getElementById("telefone").value;

  const html = `
    <table cellpadding="0" cellspacing="0" style="font-family:'Nunito Sans', sans-serif;">
      <tr>
        <td style="vertical-align:top; padding-right:20px;">
          <img src="logopvt.jpeg" alt="PVT Logo" style="height:90px;" />
        </td>
        <td style="border-left:1px solid #ccc; padding-left:20px;">
          <div style="color:#00b5ff; font-weight:bold; font-size:16px;">${nome}</div>
          <div style="color:#00b5ff; font-size:14px; margin-bottom:8px;">${funcao}</div>
          <div style="color:#000; font-size:13px;">
            <a href="mailto:${email}" style="color:#000; text-decoration:underline;">${email}</a><br />
            Cel: ${celular}${telefone ? `<br />Tel: ${telefone}` : ""}
          </div>
        </td>
        <td style="padding-left:20px;">
          <img src="selopvt.png" alt="Selo PVT" style="height:90px;" /><br />
          <div style="font-size:12px; color:#000; margin-top:6px;">
            Site: <a href="https://pvtsoftware.com.br" target="_blank" style="color:#000; text-decoration:underline;">pvtsoftware.com.br</a><br />
            Instagram: <a href="https://instagram.com/pvtsoftware" target="_blank" style="color:#000; text-decoration:underline;">@pvtsoftware</a><br />
            LinkedIn: <a href="https://linkedin.com/company/pvtsoftware" target="_blank" style="color:#000; text-decoration:underline;">/pvtsoftware</a>
          </div>
        </td>
      </tr>
    </table>
  `;

  document.getElementById("signature-preview").innerHTML = html;
  document.getElementById("preview-container").classList.remove("hidden");

  // Copy button
  document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(html);
    alert("Assinatura copiada para a área de transferência!");
  };

  // PNG button
  document.getElementById("downloadPngBtn").onclick = () => {
    html2canvas(document.querySelector("#signature-preview")).then(canvas => {
      const link = document.createElement("a");
      link.download = "assinatura-pvt.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // HTML button
  document.getElementById("downloadHtmlBtn").onclick = () => {
    const blob = new Blob([html], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "assinatura-pvt.html";
    link.click();
  };
});
