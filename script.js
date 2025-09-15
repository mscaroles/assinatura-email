function generateSignature() {
  const name = document.getElementById("name").value.trim();
  const role = document.getElementById("role").value.trim();
  const email = document.getElementById("email").value.trim();
  const cell = document.getElementById("cell").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !role || !email || !cell) {
    document.getElementById("preview").innerHTML = "<p style='color:red;'>Preencha todos os campos obrigatórios.</p>";
    return;
  }

  const html = `
  <table style="font-family:'Nunito Sans', sans-serif; font-size:14px; color:#000;">
    <tr>
      <td style="padding-right:20px;">
        <img src="logopvt.jpeg" alt="Logo PVT" width="100">
      </td>
      <td style="border-left:1px solid #ccc; padding-left:20px;">
        <strong style="color:#00b5ff; font-size:16px;">${name}</strong><br>
        <span style="color:#00b5ff;">${role}</span><br><br>
        <a href="mailto:${email}" style="color:black; text-decoration:underline;">${email}</a><br>
        Cel: ${cell} ${phone ? `<br>Tel: ${phone}` : ""}
      </td>
      <td style="padding-left:20px; border-left:1px solid #ccc;">
        <img src="selopvt.png" alt="Selo PVT" width="120"><br>
        <div style="margin-top:8px;">
          Site: <a href="https://pvtsoftware.com.br" target="_blank">pvtsoftware.com.br</a><br>
          Instagram: <a href="https://instagram.com/pvtsoftware" target="_blank">@pvtsoftware</a><br>
          LinkedIn: <a href="https://linkedin.com/company/pvtsoftware" target="_blank">/pvtsoftware</a>
        </div>
      </td>
    </tr>
  </table>
  `;

  document.getElementById("preview").innerHTML = html;
}

function copySignature() {
  const temp = document.createElement("textarea");
  temp.value = document.getElementById("preview").innerHTML;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Assinatura copiada com sucesso!");
}

function downloadHTML() {
  const content = document.getElementById("preview").innerHTML;
  const blob = new Blob([content], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "assinatura.html";
  link.click();
}

function downloadImage() {
  html2canvas(document.querySelector("#preview")).then(canvas => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "assinatura.png";
    link.click();
  });
}

document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", generateSignature);
});
