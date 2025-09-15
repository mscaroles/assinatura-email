document.getElementById("signatureForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const cargo = document.getElementById("cargo").value;
  const telefone = document.getElementById("telefone").value;
  const fixo = document.getElementById("fixo").value;

  const assinaturaHTML = `
    <table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size:14px; color:#000;">
      <tr>
        <td style="padding-right:15px; vertical-align:top;">
          <img src="https://i.imgur.com/0VgtJPU.png" alt="Logo PVT" style="height:60px;" />
        </td>
        <td style="border-left: 2px solid #0078d4; padding-left:15px; vertical-align:top;">
          <strong style="font-size:16px;">${nome}</strong><br/>
          ${cargo}<br/><br/>
          <strong>Cel.:</strong> ${telefone}<br/>
          ${fixo ? `<strong>Fixo:</strong> ${fixo}<br/>` : ""}
          <br/>
          <strong>Site:</strong> pvtsoftware.com.br<br/>
          <strong>Instagram:</strong> @pvtsoftware<br/>
          <strong>LinkedIn:</strong> /pvtsoftware<br/>
        </td>
        <td style="padding-left:15px;">
          <img src="https://i.imgur.com/Z8u5xLk.png" alt="Selo" style="height:60px;" />
        </td>
      </tr>
    </table>
  `;

  const div = document.getElementById("assinatura");
  div.innerHTML = assinaturaHTML;
});

document.getElementById("copiarAssinatura").addEventListener("click", function () {
  const temp = document.createElement("textarea");
  temp.value = document.getElementById("assinatura").innerHTML;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Assinatura copiada para a área de transferência!");
});

document.getElementById("baixarAssinatura").addEventListener("click", function () {
  const blob = new Blob([document.getElementById("assinatura").innerHTML], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "assinatura.html";
  link.click();
});

document.getElementById("baixarHTML").addEventListener("click", function () {
  const blob = new Blob([document.getElementById("assinatura").innerHTML], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "assinatura.html";
  link.click();
});
