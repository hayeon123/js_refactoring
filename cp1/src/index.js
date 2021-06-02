import inovices from "./inovices.js";
import plays from "./plays.js";

function statement(inovice, plays) {
  let totalAmount = 0;
  let result = `청구 내역 (고객명: ${inovice.customer})\n`;

  for (let perf of inovice.performances) {
    //청구 내역을 출력한다.
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`;
    totalAmount += amountFor(perf);
  }

  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of inovice.performances) {
      volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    //포인트 적립
    result += Math.max(aPerformance.audience - 30, 0);
    //희극 관객 5명마다 추가 포인트 제공
    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return result;
  }
}

console.log(statement(inovices, plays));
