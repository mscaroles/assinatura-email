// script.js
function gerarAssinatura() {
  const nome = document.getElementById("nome").value;
  const cargo = document.getElementById("cargo").value;
  const email = document.getElementById("email").value;

  const assinatura = `
    <table style="font-family:Arial,sans-serif;font-size:14px;">
      <tr><td><strong>${nome}</strong></td></tr>
      <tr><td>${cargo}</td></tr>
      <tr><td>Email: <a href="mailto:${email}">${email}</a></td></tr>
    </table>
  `;

  document.getElementById("resultado").innerHTML = assinatura;
}

function copiar() {
  const temp = document.createElement("textarea");
  temp.value = document.getElementById("resultado").innerHTML;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Assinatura copiada!");
}
