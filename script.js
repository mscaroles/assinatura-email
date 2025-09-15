function gerarAssinatura() {
  const nome = document.getElementById("nome").value;
  const cargo = document.getElementById("cargo").value;
  const email = document.getElementById("email").value;

  const assinatura = `
    <table style="font-family:'Nunito Sans', sans-serif; font-size:14px; color:#000000;">
      <tr>
        <td style="padding-right:15px; vertical-align:top;">
          <img src="https://github.com/mscaroles/assinatura-email/blob/main/logopvt.jpeg?raw=true" width="100" alt="Logo PVT">
        </td>
        <td>
          <div style="font-size:16px; font-weight:700; color:#00b5ff;">${nome}</div>
          <div style="font-size:14px; font-weight:700; color:#00b5ff;">${cargo}</div>
          <div style="font-size:14px; font-weight:400; margin-top:4px;">
            <a href="mailto:${email}" style="color:#000000; text-decoration:none;">${email}</a>
          </div>
          <div style="margin-top:8px;">
            <img src="https://github.com/mscaroles/assinatura-email/blob/main/selopvt.png?raw=true" width="90" alt="Selo PVT">
          </div>
        </td>
      </tr>
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
