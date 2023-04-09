export default function CalcData(created) {
  const currentDate = Date.now();
  const createdAt = new Date(`${created}`);

  const calc = Math.floor((currentDate - createdAt.getTime()) / 1000);

  const units = [
    [31104000, "ANO", "ANOS"],
    [2592000, "MÊS", "MESES"],
    [604800, "SEMANA", "SEMANAS"],
    [86400, "DIA", "DIAS"],
    [3600, "HORA", "HORAS"],
    [60, "MINUTO", "MINUTOS"],
    [1, "SEGUNDO", "SEGUNDOS"],
  ];

  for (const [seconds, singular, plural] of units) {
    if (calc >= seconds) {
      return `${Math.floor(calc / seconds)} ${
        calc >= seconds * 2 ? plural : singular
      }`;
    }
  }
}
