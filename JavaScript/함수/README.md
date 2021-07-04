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
