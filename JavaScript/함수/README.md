# 함수

- 자바스크립트의 함수는 매개변수를 갖는다. 매개변수는 함수 몸체 내에서 지역 변수처럼 취급된다.
- 함수 호출 시에는 함수의 매개변수에 실인자를 넣어 전달하며, 이때 호출 컨텍스트 (this 키워드)도 포함된다.
- 자바스크립트에서 함수는 객체이다. 그렇기 때문에, 함수를 변수에 할당할 수 있고, 다른 함수에 인자로 전달할 수도 있다.
- 함수는 객체이기 때문에, 프로퍼티를 지정할 수 있고 또한 함수의 메서드를 호출할 수도 있다.
- 자바스크립트 함수는 중첩되어 사용될 수 있다. 이때 중첩된 함수는 해당 함수가 정의된 유효범위 안의 어떤 변수에도 접근이 가능하다. -> 클로저를 가능하게 한다.

## 1. 함수 정의하기

- function 키워드에 의해 함수가 정의된다.
- 함수 정의 표현식 또는 함수 선언문에서 사용된다.
  - 함수 선언문은 일반적으로 우리가 알고 있는 함수 정의 형태
  - 함수 표현식은 변수에 함수를 할당하는 형태

```javascript
// 함수 선언문
function sum (a, b) {
    return a + b;
}
sum(1, 2) => 3
```

```javascript
// 함수 표현식
let sum = function (a, b) {
  return a + b;
};
sum(1, 2); // => 3
```

<h3>함수 선언문과 함수 표현식의 차이점</h3> 
  
> - 함수 선언식은 호이스팅에 영향을 받지만, 함수 표현식은 영향을 받지 않는다. 
> - 함수 선언문은 전역 코드 혹은 다른 함수 안에는 등장할 수 있지만, 반복문 내부, 조건문, try/catch/finally 또는 with문 안에는 들어갈 수 없다.
> - 함수 정의 표현식은 어디에서나 사용이 가능하다.

```javascript
// 실행 전
sum(1, 2);
multiply(3, 5);

function sum(a, b) {
  return a + b;
}

let multiply = function (a, b) {
  return a * b;
};
```

```javascript
// 실행 후 호이스팅에 의해 자바스크립트 인터프리터가 인식한 코드의 모습
function sum(a, b) {
  return a + b;
}

let multiply;

sum(1, 2); // -> 3
multiply(3, 5); // -> Uncaught ReferenceError: multiply is not defined

multiply = function (a, b) {
  return a * b;
};
```

- 함수 표현식은 정의되는 즉시 호출이 가능하다.

```javascript
let sum = (function (a, b) {
  return a + b;
})(3, 5); // -> undefined

console.log(sum); // -> 8
```

### 1-1. 중첩 함수

- 중첩된 함수는 해당 함수가 속한 함수(들)의 매개변수와 변수에 접근할 수 있다.

```javascript
function hypotenuse(a, b) {
  function square(x) {
    return x * x;
  }
  return Math.sqrt(square(a) + sqaure(b));
}
```

> square 함수는 바깥쪽 함수에 정의된 매개변수 a와 b를 읽고 쓸 수 있다.

## 2. 함수 호출하기

- 함수를 호출하는 다양한 방법
  1. 일반적인 함수 형태
  2. 메서드 형태
  3. 생성자
  4. call( )과 apply( ) 메서드를 통한 간접 호출

### 2-1. 함수 호출

- 함수 호출에서 호출 컨텍스트, 즉 this값은 global 객체이다. 그러나 strict 모드에서는 undefined이다.

### 2-2. 메서드 호출

- 메서드는 객체의 속성으로 저장된 자바스크립트 함수이다.
- 메서드 호출 표현식에서는 해당 메서드를 가지고 있는 객체가 호출 컨텍스트가 되며, 함수 내에서 this 키워드를 사용해 객체를 참조할 수 있다.

```javascript
let calculator = {
  operand1: 1,
  operand2: 1,
  add: function () {
    // this를 통해 calculator 참조
    this.result = this.operand1 + this.operand2;
  },
};

calculator.add(); // 메서드 호출 방법 1
calculator["add"](); // 메서드 호출 방법 2
calculator.result; // -> 2
```

> 메서드 체이닝
>
> - 메서드의 리턴 값으로 객체를 전달하면, 메서드 체이닝이 가능하다.
> - 객체 이름은 한 번만 사용하고 메서드는 여러 번 호출할 수 있는 방식이다.

- this 키워드에는 값 할당이 불가능하며, 유효 범위가 없고 중첩 함수는 호출자의 this 값을 상속하지 않는다. 그렇기 때문에 중첩 함수 외부에서 this 값을 변수에 할당해서 사용이 가능하다.

```javascript
let o = {
  m: function () {
    let self = this;
    function f() {
      console.log(this === o); // false, this는 global 객체 혹은 undefined (strict 모드)
      console.log(self === o);
    }
  },
};
```

### 2-3. 생성자 호출

- new 키워드를 통해 생성자를 호출한다.
- 생성자 호출은 일반 함수와 메서드 호출과 비교하면 매개변수, 호출 컨텍스트와 반환 값을 다루는 방식이 다르다.
  - 생성자 호출에서는 전달할 인자가 없다면 괄호를 생략해도 된다.
- 생성자를 호출하면 생성자의 prototype 프로퍼티를 상속받은 새로운 빈 객체가 생성된다.
- 생성자 함수는 객체를 초기화하고, 새로 생성된 이 객체는 생성자 함수의 호출 컨텍스트로 사용된다.
  - 메서드가 속한 객체가 아닌 새로 생성된 객체가 호출 컨텍스트로 사용된다.
- 생성자에서는 따로 return을 해주는 것이 없고, 함수 몸체 마지막 부분에서 암시적으로 그 객체를 반환한다.
  - 만약 생성자가 반환 값 없이 return문만 사용하거나, 기본 자료형 값을 반환한다면, 그 반환 값은 무시되고 새로 생성된 객체가 리턴된다.

### 2-4. 간접 호출

- call( )과 apply( )를 통해서 함수를 간접적으로 호출한다.

## 3. 함수 전달인자와 매개변수

### 3-1. 생략 가능한 매개변수

- 정의되어 있는 것보다 적은 수의 전달인자로 함수가 호출되면, 나머지 매개변수는 undefined가 된다.

### 3-2. 가변길이 전달인자 목록: Arguments 객체

- 함수 내에서 전달인자에 대해 참조하고 싶을때 사용한다.
- 예를 들어, 첫 번째 매개변수를 참조하고 싶다면 arguments[0]을 통해 접근이 가능하다.
- arguments[0] = 1 이런식으로 매개변수의 값을 변경할 수 있다.
- callee 속성
  - 프로퍼티가 현재 실행되고 있는 함수를 참조한다.
  - 익명 재귀함수에서 사용됨
- caller 속성
  - 비표준
  - 해당 함수를 호출한 함수를 참조한다.

```javascript
// callee를 통한 익명 재귀함수
// 잘 사용되지 않는다.
function factorial(x) {
  if (x <= 1) return 1;
  return x * arguments.callee(x - 1);
}
```

## 4. 클로저

- 자바스크립트는 어휘적 유효범위 (lexical scoping)을 사용한다.
  - 스코프는 함수를 호출할 때가 아니라, 선언할 때 생긴다.

### 4-1. 전역 변수와 지역 변수

```javascript
let x = "global"; // window 객체에 생성되는 전역변수이다.
function hi() {
  let x = "local"; // hi안에 생성되는 지역변수이다.
  x = "change";
}
hi();
console.log(x); // -> global
```

### 4-2. 스코프

- 함수 스코프가 적용 되었기 때문에, 위의 hi안에서 전역 x에 접근할 수 없다.

```javascript
let x = "global";
function hi() {
  x = "change"; // 전역 변수 x의 값을 변경한다.
}
hi();
console.log(x); // -> change
```

> 자바스크립트는 변수의 범위를 호출한 함수의 지역 스코프부터 전역 변수들이 있는 전역 스코프까지 점차 넓혀가면서 찾는다.

### 4-3. 스코프 체인

- 전역 변수와 지역 변수의 관계에서 스코프 체인이라는 개념이 생긴다.
- 내부 함수에서는 외부 함수의 변수에 접근 가능하지만, 외부 함수에서는 내부 함수의 변수에 접근할 수 없다.
- 모든 함수들은 전역 객체에 접근할 수 있다.

```javascript
let a = "babo";
function outer() {
  console.log("외부: ", a);
  function inner() {
    let b = "똥깨";
    console.log("내부: ", a);
  }
  inner();
}
outer();
console.log(b); // -> undefined
```

- inner 함수는 a를 호출하기 위해서 자기 자신의 스코프에서 변수를 찾고, 없다면 한 단계 올라가 outer 스코프에서 찾고, 그래도 없으면 다시 올라가서 전역 스코프에서 변수를 찾는다.
  - 이것이 <italic>스코프 체인</italic>이다.

### 4-4. 렉시컬 스코핑

- 스코프는 함수를 호출할 때가 아니라 선언할 때 생긴다.

```javascript
let name = "babo";
function log() {
  console.log(name);
}

function wrapper() {
  name = "똥깨";
  log();
}

wrapper(); // -> 똥깨
```

```javascript
let name = "babo";
function log() {
  console.log(name);
}

function wrapper() {
  let name = "똥깨";
  log();
}

wrapper(); // -> babo
```

> 스코프는 함수를 선언할 때 생기기 때문에, wrapper에서 log를 호출하면 log는 자기 스코프에 name 변수가 없기 때문에, 전역에 위치한 name = babo를 참조한다.
