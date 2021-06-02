import inovices from "./inovices.js";
import plays from "./plays.js";
import createStatementData from "./createStatementData.js";

function statement(inovices, plays) {
  return renderPlainText(createStatementData(inovices, plays));
}

function renderPlainText(data, plays) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    //청구 내역을 출력한다.
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;
}
function htmlStatement(inovices, play) {
  return renderHtml(createStatementData(inovices, play));
}
function renderHtml(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석수</th><th>금액</th></tr>";
  for (let perf of data.performances) {
    //청구 내역을 출력한다.
    result += ` <tr><td>${perf.play.name}</td><td>(${
      perf.audience
    }석) </td><td>${usd(perf.amount)}</td>\n`;
  }
  result += "</table>\n";
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트:<em> ${data.totalVolumeCredits}점</em></p>\n`;
  return result;
}
function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}
function appendElement() {
  let div = document.createElement("div");
  div.innerHTML = htmlStatement(inovices, plays);
  document.body.append(div);
}
statement(inovices, plays);
appendElement();
