# Webpack

### 웹팩이란?

> 여러 js 파일들을 하나의 js 파일로 합쳐주는 모듈 번들러이다. js 파일뿐 아니라 웹을 구성하는 자원들을 조합해서 하나의 결과물로 만들어주는 도구이다.

<br />

## 웹팩 설치하기

<hr />

1. npm init

2. npm i react react-dom

3. npm i -D webpack webpack-cli ( 개발용에서만 쓰기 위해서 -D 옵션 추가 )
4. webpack.config.js 파일 생성

++ babel도 추가해주자. (js 문법을 jsx로 변한하기 위함)

> - @babel/core : 기본적인 바벨, 최신 문법으로 바꿔준다. <br />
> - @babel/preset-env : 사용환경에 맞게 알아서 바꿔준다. <br />
> - @babel/preset-react : jsx로 바꿔주는것 <br/>
> - babel-loader : 바벨이랑 웹팩 연결해주는것 <br/>
>   <br />

## 웹팩의 기본 틀

<hr />

```javascript
const path = require("path");

module.exports = {
  entry: {
    // 번들링할 js 파일들
  },
  modules: {
    rules: [
      {
        // entry 파일들을 번들링하는 규칙들
      },
    ],
  },
  output: {
    // 번들링이 완료될 파일 이름, 경로 등...
  },
};
```

- 해당 틀은 매우 기본적인 틀이다.

<br />

## 구성 요소

<hr />

### 1. <strong>Entry</strong>

_entry_ 속성은 번들링을 하려고 하는 js 파일들의 시작 경로를 나타낸다.

```javascript
// webpack.config.js
module.exports = {
  entry: "./client.js", // 1번
};
```

->
client.js 에서 번들링할 다른 js 파일들을 import해서 실행하는 구조라면 client.js 에서 알아서 나머지 js들도 빌드를 해준다.

```javascript
module.exports = {
  entry: {
    login: "./login.js",
    register: "./register.js",
  },
};
```

->
엔트리 포인트를 분리하는 경우이다. 이는 SPA 보다는 MPA 형태에 적합하다.

### <strong>2. Output</strong>

_output_ 속성은 번들링의 결과물을 어디 경로에 어떤 파일 이름으로 생성할 것인지를 결정한다.

```javascript
const path = require("path");

module.exports = {
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  },
};
```

-> filename 속성은 웹팩으로 빌드한 파일의 이름을 의미한다. path 속성은 해당 파일의 경로를 의미한다.

### <strong>3. Loader</strong>

_Loader_ 는 웹팩이 js 파일이 아닌 다른 웹 자원들을 변환할 수 있도록 도와주는 속성이다.

```javascript
module.exports = {
  module: {
    // Loader의 역할
    rules: [
      // 로더 옵션 추가
      { test: /\.css$/, use: "css-loader" },
      { test: /\.ts$/, use: "ts-loader" },
    ],
  },
};
```

- test : 로더를 적용할 파일 유형 (정규 표현식 사용)
- use : 해당 파일에 적용할 로더의 이름
  (loader도 사용 가능)

-> 로더 적용 순서: 배열 요소의 <strong> 오른쪽에서 왼쪽</strong>으로 적용 된다.

### <strong>4. Plugin </strong>

_Plugin_ 은 웹팩의 기본적인 동작에 추가 기능을 제공하는 속성이다.

> ### Loader와의 비교 <br>
>
> - _Loader_ 는 파일을 해석하고 변환하는 과정에 관여한다.
> - _Plugin_ 은 해당 결과물의 형태를 바꾸는 역할 -> 번들링된 파일을 처리한다.

```javascript
module.exports = {
  plugins: [],
};
```

### <strong>5. 그 외 </strong>

- resolve : 파일명 작성시, 확장자명을 쓰지 않을 수 있게 도와준다.

```javascript
module.exports = {
    resolve: {
        extensions: [".js", ".jsx", ...]
    }
}
```
