### refactoring

- 객체 복사 이유: 가변 데이터(mutable data)는 금방 상하기 때문에 최대한 불변(immutable data)처럼 취급한다.

#### 다형성으로 바꾸기

-- 타입코드를 서브클래스로 바꾸기
-- createStatementData에서 그중 적합한 서브클래스를 사용하게 만들어야 한다.  
-- 딱 맞는 서브클래스를 사용하려면 생성자 대신 함수를 호출하도록 바꿔야 한다.
-- 자바스크립트에서는 생성자가 서브클래스의 인스턴스를 반환할 수 없기 때문이다.
-- 그래서 생성자를 팩터리 함수로 바꾸기를 적용한다.

### javascript

#### Intl.NumberFormat()

- Intl : 각 언어에 맞는 문자비교, 숫자, 시간, 날짜비료를 제공하는 ECMAScript 국제화 API를 위한 이름 공간.
- Intl.Collator : 콜레이터 객체는 각 언어에 맞는 문자열 비교를 가능하게 한다.
- Intl.DateTimeFormat : 각 언어에 맞는 시간과 날짜 서식을 적용할 수 있는 객체의 생성자.
- Intl.NumberFormat : 각 언어에 맞는 숫자 서식을 적용
  -- // 한국 원화는 보조 통화 단위를 사용하지 않음
  console.log(new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number));
  // → ₩123,457

#### Object.assign()

- Object.assign() 메소드는 열거할 수 있는 하나의 출처 객체로부터 대상 객체로 속성을 복사할 때 사용합니다. 대상 객체를 반환합니다.
- 구문 : Object.assgin(target, ...sources)
  -- target 대상 객체
  -- ...sources 하나 이상의 출처 객체

#### Array.prototype.reduce()

- 배열의 각 요소에 대해 주어진 리듀서 함수를 실행하고, 하나의 결과값을 반환
- arr.reduce(callback[, initalValue])

### 팩토리 함수

- 모든 함수는 새로운 객체를 반환할 수 있고, 그중에서 생성자함수(Constructor)를 통해 만든 함수가 아닌 것을 '팩토리함수'라고 부른다.
