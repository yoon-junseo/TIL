# 이벤트

### 1. 이벤트 버블링

- 특정 요소에서 이벤트가 발생한 경우, 이벤트가 상위 요소로 전달된다.

```html
<body>
  <div class="1">
    1
    <div class="2">
      2
      <div class="3">3</div>
    </div>
  </div>
</body>
```

```javascript
const Elem = document.querySelectorAll("div");
const onClick = (e) => {
  console.log(e.currentTarget.className);
};
Elem.forEach(function (div) {
  div.addEventListener("click", onClick);
});
```

- 3을 클릭하면, 콘솔에 3 -> 2 -> 1 순으로 출력된다. <br />
  2를 클릭하면, 콘솔에 2 -> 1 순으로 출력된다. <br />
  1을 클릭하면, 콘솔에 1만 출력된다.

### 2. 이벤트 캡처

- 특정 요소에 이벤트가 발생하면, 하위 요소로 이벤트를 전달한다. (이벤트 버블링과 반대)

```html
<body>
  <div class="1">
    1
    <div class="2">
      2
      <div class="3">3</div>
    </div>
  </div>
</body>
```

```javascript
const Elem = document.querySelectorAll("div");
const onClick = (e) => {
  console.log(e.currentTarget.className);
};
Elem.forEach(function (div) {
  div.addEventListener("click", onClick, { capture: true });
});
```

- 3을 클릭하면, 콘솔에 1 -> 2 -> 3 순으로 출력된다. <br />
  2를 클릭하면, 콘솔에 1 -> 2 순으로 출력된다. <br />
  1을 클릭하면, 콘솔에 1만 출력된다.

### 3. e.stopPropagation()

- 이벤트가 전파 되는 것을 막을 수 있는 함수이다.
- 위 코드를 기준으로, 콘솔에 각각 3과 1이 출력된다.

### 4. 이벤트 위임

- 상위 태그에만 이벤트를 등록해두고, 하위 태그에서 이벤트가 발생하면 상위 요소로 찾아가면서 이벤트 핸들러를 작동시키는 방식
- 이벤트 버블링이 적용된다.
