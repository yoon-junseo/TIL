# 객체

- 자바스크립트의 기본 데이터 타입은 객체이다.
- 객체는 이름과 값으로 구성된 프로퍼티들의 정렬되지 않은 집합이다.
- 객체는 문자열에 값을 대응시키는 구조를 갖는데, 이는 해시, 해시 테이블, 사전, 연관배열에서도 제공한다.
- 프로토타입을 통해 다른 객체의 프로퍼티를 상속 받는다.
- 객체의 메서드들은 일반적으로 상속받은 프로퍼티 이고, 이를 <strong>프로토타입 상속</strong> 이라고 부른다.
- 객체로 많이 하는 작업 <br />
  1. 프로퍼티 추가
  2. 프로퍼티 검색
  3. 프로퍼티 삭제
  4. 프로퍼티 테스트
  5. 프로퍼티 열거
- 객체의 3가지 속성 <br />
  1. prototype은 상속받은 프로퍼티들을 가진 객체를 참조한다.
  2. class는 개개체의 자료형을 특정짓는 문자열이다.
  3. extensible 속성은 객체에 새 프로퍼티를 추가할 수 있는지를 결정한다.

### 프로토타입

- 자바스크립트에서 객체를 상속하기 위하여 사용하는 방식
- 모든 객체들이 메서드와 프로퍼티를 상속 받기 위한 템플릿으로써 *프로토타입 객체*를 갖는다.
- 프로토타입 객체가 또 다시 상위 프로토타입 객체로부터 상속 받을 수도 있다 이를 _프로토타입 체인_ 이라고 부른다.

```javascript
function Person(first, last) {
  this.name = {
    first: first,
    last: last,
  };
}
```

```javascript
let p1 = new Person("babo", "meongcheong");
```

- p1. 을 입력하면 해당 객체의 멤버들 + Person()의 프로토타입 객체인 Object에 정의된 것들도 사용 가능하다. 이것이 프로토타입 체인이 동작한다는 것을 의미한다.
  > p1 -> Person -> Object (순으로 상속)

### 자바스크립트의 객체

|       용어       | 설명                                                                                                                                                                        |
| :--------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  네이티브 객체   | ECMAScript 명세에 정의된 객체 또는 그 객체의 클래스 (Array,Function, Data, 정규표현식 ...) <br />환경에 관계없이 언제나 사용 가능                                           |
|   호스트 객체    | 자바스크립트 인터프리터가 내장된 호스트 환경에 정의된 객체, 네이티브 객체가 아닌 객체는 모두 호스트 객체이다. <br/> (window, XmlHttpRequest, HTMLElement 등의 DOM, BOM ...) |
| 사용자 정의 객체 | 자바스크립트 코드의 실행으로 생성된 객체 (사용자가 만든 객체)                                                                                                               |

### 자바스크립트의 프로퍼티

|       용어        | 설명                                                        |
| :---------------: | :---------------------------------------------------------- |
|   고유 프로퍼티   | 자바스크립트 코드의 실행으로 생성된 객체 (사용자가 만든 것) |
| 상속받은 프로퍼티 | 객체의 프로토타입 객체가 정의한 프로퍼티                    |

### 객체 생성 방법

1. 객체 리터럴
   - key : value 형태로 생성 <br/>
   - key에는 자바스크립트 식별자 또는 문자열 사용 가능
   - 객체 리터럴은 평가될 때마다 새로운 객체를 생성하고 초기화하는 표현식이다.
   ```javascript
   let point = {
     x: 0,
     y: 0,
   };
   ```
   > 객체 리터럴 vs JSON <br/>
   >
   > 1. JSON은 "property" : value만 허용
   > 2. value에는 오직 문자열, 숫자, 배열, true, false, null 혹은 다른 객체만 가능하다.
   > 3. JSON에 메서드를 할당할 수 없다.
2. new 연산자 사용
   - 생성자를 호출해서 생성한다.
   ```javascript
   let o = new Object();
   let a = new Array();
   let p = new Person(); // 사용자 정의 객체
   ```
3. Object.create()
   - 정적 함수로, 단순히 프로토타입 객체를 넘겨서 사용한다.
   - 프로토타입을 갖지 않는 새로운 객체를 만드는 경우, 함수에 null을 전달하면 된다. 이 경우, 기본적인 메서드도 사용이 불가능하다. (toString...)
   ```javascript
   let o = Object.create({ x: 1, y: 2 });
   ```

### 연관 배열로서의 객체

- 객체의 접근에는 마침표(.) 연산자와 식별자를 사용한다.([ ])
- 연산자와 식별자를 사용하는 경우 배열에 접근하는 형태와 유사한데, 이를 <strong>연관 배열</strong>이라고 한다. (숫자가 아닌 문자열을 인덱스로 갖는 배열에 접근하는 것과 유사함)
- 마침표 연산자의 경우, 프로그램이 실행되는 도중에 변경이 불가능하다.
- [ ] 연산자의 경우, 프로그램 실행중에 생성하고 조작할 수 있다. (문자열로 접근하기 때문에)

### 프로퍼티에 값 할당하기

- 객체의 프로퍼티에 값을 설정하는 경우, 해당 프로퍼티에 값을 설정할 수 있는지 알아보기 위해 <strong>프로토타입 체인</strong>을 검사한다.

### 프로퍼티 검사하기

1. in 연산자
   - 좌항에는 프로퍼티 이름이 문자열로 오고, 오른쪽에는 객체가 온다. 해당 프로퍼티가 존재하면 true를 반환한다.
   ```javascript
   let o = { x: 1 };
   "x" in o; // true
   "y" in o; // false
   "toString" in o; // true
   ```
2. hasOwnProperty()
   - 주어진 이름의 프로퍼티가 객체에 존재하는지 검사한다. 상속받은 프로퍼티의 경우 false를 반환한다.
   ```javascript
   let o = { x: 1 };
   o.hasOwnProperty("x"); // true
   o.hasOwnProperty("y"); // false
   o.hasOwnProperty("toString"); // false
   ```
3. propertyIsEnumerable()
   - hasOwnProperty보다 상세한 검사를 한다.
   - 객체에 주어진 이름의 *고유 프로퍼티*가 존재하고, *열거할 수 있는 경우*에만 true를 반환한다.
   - 일부 내장 프로퍼티들은 열거 불가
   ```javascript
   let o = inherit({ y: 2 }); // inherit은 상속받는 함수
   o.x = 1;
   o.propertyIsEnumerable("x"); // true
   o.propertyIsEnumerable("y"); // false
   o.propertyIsEnumerable("toString"); // false
   ```

### 프로퍼티 열거하기

- 객체가 가진 모든 프로퍼티를 순회하고 싶은 경우, for/in 루프로 해결
- 상속받은 내장 메서드는 열거할 수 없지만, 사용자가 임의로 추가한 프로퍼티들은 열거할 수 있다.

```javascript
let o = {
  x: 1,
  y: 2,
  z: 3,
};
o.propertyIsEnumerable("toString"); // false
for (p in o) console.log(p); // x, y, z 출력
```

- Object.keys( )
  - 객체가 가진 고유 프로퍼티 중에 _열거할 수 있는_ 프로퍼티 이름을 배열에 담아 반환한다.
- Object.getOwnPropertyNames( )
  - 해당 객체가 가진 *모든 고유 프로퍼티*의 이름을 배열로 반환한다.

### 프로퍼티 Getter & Setter

- 객체의 접근자 프로퍼티의 값에 접근하면, 자바스크립트 엔진은 getter 메서드를 아무런 인자 없이 호출한다. 이때, getter 메서드의 반환 값이 프로퍼티 접근 표현식의 값이 된다.
- 프로퍼티의 값을 변경하는 경우, 자바스크립트 엔진은 setter 메서드를 호출한다. 이때 할당자(=)의 우항에 있는 값을 setter 메서드의 인자로 전달한다. 그리고 반환 값은 무시된다.
- 접근자 프로퍼티를 정의하는 방법은 _확장된 객체 리터럴_ 문법을 사용하는 것이다.
  > function 키워드 대신 get, set 사용

```javascript
let o = {
    dataProperty: value,
    get accessorProperty() { ... },
    set accessorProperty() { ... }
};
```

### 프로퍼티 속성

- 프로퍼티의 3가지 속성
  1. writable - 프로퍼티 값의 변경 가능 여부를 결정
  2. enumerable - 프로퍼티가 열거될 수 있는지 여부를 결정
  3. configurable - configurable 속성 + writable 속성 + enumerable 속성 값의 변경 가능 여부를 결정 <br /> -> 객체를 고정시킬 수 있다. (lock down)
     > - 데이터 프로퍼티의 4가지 속성 - value, writable, enumerable, configurable
     > - 접근자 프로퍼티의 4가지 속성 - get, set, enumerable, configurable
     >   <br /> 해당 프로퍼티 속성들을 표현하기 위해 _property descriptor_ 사용
     > - 프로퍼티 3대 속성의 경우 boolean 값을 갖고, get과 set은 함수를 갖는다.

```javascript
// {value: 1, writable: true, enumerable: true, configurable: true}를 반환
Object.getOwnPropertyDescriptor({ x: 1 }, "x"); // 객체의 고유 프로퍼티에서만 동작한다.

// undefined를 반환
Object.getOwnPropertyDescriptor({}, "toString");
```

- Object.defineProperty( ) : 프로퍼티의 속성을 설정하거나 임의의 속성으로 새 프로퍼티를 만들기 위해서 사용

```javascript
let o = {}; // 빈 객체

// 데이터 프로퍼티 x를 설정한다. 값은 1이고, 열거가 불가능하다.
Object.defineProperty(o, "x", {
  value: 1,
  writable: true,
  enumerable: false,
  configurable: true,
});

o.x; // => 1
Object.keys(o); // => [] 열거가 불가능하기 때문에 빈 배열을 반환한다.
```

> - defineProperty( ) 의 인자에 4가지 프로퍼티가 있을 필요는 없다. 생략된 속성은 false 나 undefined 로 처리된다.
> - 기존 프로퍼티의 속성을 수정할 경우, 생략한 속성은 기존 값 그대로 유지한다.
> - 기존 프로퍼티나 새로 만든 고유 프로퍼티의 속성은 변경하지만, 상속받은 속성은 바꾸지 않는다.
> - object.defineProperties를 통해 동시에 여러 개의 프로퍼티를 만들거나 수정한다.

- object.defineProperties 호출 시 유의 사항

  1. extensible 하지 않은 객체는, 기존의 고유 프로퍼티를 수정할 수는 있지만, 새 프로퍼티를 추가할 수 없다.
  2. 프로퍼티의 configurable 속성 값이 false라면, configurable 속성 값뿐 아니라 enumerable 속성 값도 바꿀 수 없다.
  3. 접근자 프로퍼티의 configurable 속성 값이 false라면, getter/setter 메서드를 변경할 수도 없고, 데이터 프로퍼티도 바꿀 수 없다.
  4. 데이터 프로퍼티의 configurable 속성 값이 false라면, 데이터 프로퍼티를 접근자 프로퍼티로 바꿀 수 없다.
  5. 데이터 프로퍼티의 configurable 속성 값이 false라면, 기존의 writable 속성을 false에서 true로 바꿀 수 없다. 하지만 true에서 false로는 가능하다.
  6. 데이터 프로퍼티의 configurable 속성 값과 writable 속성 값이 false라면, 프로퍼티 값을 바꿀 수 없다. 하지만 프로퍼티의 configurable 속성 값이 true고, writable 속성 값이 false인 경우에는 프로퍼티의 값을 바꿀 수 있다. (writable을 true로 만들고 값을 수정하고 writable을 다시 false로 바꾸면 된다.)

- extensible 속성 : 객체에 새 프로퍼티를 추가할 수 이쓴지 여부를 결정한다.
  > - object.isExtensible(Object o) : 확장할 수 있는 객체인지 알아보는 메서드
  > - object.preventExtensions(Object o) : 객체의 확장을 막는 메서드 -> 객체를 확장할 수 없도록 설정하면, 다시 이전 상태로 돌아갈 수 없다.
  > - extensible 의 목적 : _잠겨있는_ 객체의 상태를 고정하고, 외부에서 변경하는 것을 막는 것이다.
  > - Object.seal(Object o) : 객체를 확장할 수 없게 만들기 + 객체가 가진 모든 고유 프로퍼티를 설정 불가능하게 만들기 (객체에 새로운 프로퍼티 추가 불가능, 기존 프로퍼티의 설정 수정 및 삭제 불가능 // writable 속성이 true인 기존 프로퍼티의 값은 변경 가능)
  > - Object.freeze(Object o) : 객체가 가진 고유 프로퍼티를 전부 읽기 전용으로 만든다. (객체가 접근자 프로퍼티로 setter 메서드를 갖는 경우, 이를 통해 프로퍼티 값 변경 가능)
  > - seal & freeze는 주어진 객체의 고유 프로퍼티에만 영향을 미치고, 객체가 가진 프로토타입 객체에는 영향을 미치지 않는다.
