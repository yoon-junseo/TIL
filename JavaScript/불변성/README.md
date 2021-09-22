# 객체의 불변성

- 불변성: 어떤 값을 직접적으로 변경하지 않고, 새로운 값을 만들어내는 것.

## 자바스크립트에서의 불변성

### 1. Immutable Type

불변성은 말 그대로 변하지 않는 것을 의미한다. 불변 데이터는 한번 생성되고나면 그 뒤에는 변할 수 없다.

- Boolean
- String
- Number
- Null
- undefined
- Symbol

> 위의 타입들은 원시 타입으로 불변한다. 이 값은 메모리영역 안에서 변경이 불가능하며 변수에 할당할 때 완전히 새로운 값이 만들어져 다시 할당된다.

```javascript
let name = "foo";
let newName = name;
name = "bar";
// 첫 문장의 'foo'는 string 타입의 값이 메모리에 생성되고, name은 'foo'의 메모리 값을 그리킨다.
// 두 번째 문장은 newName은 name이 가리키고 있는 'foo'의 메모리 값을 가리킨다.
// 세 번째 문장에서 'bar'라는 string 타입의 값이 메모리에 생성되고, name은 'bar'의 메모리 값을 가리킨다.
```

### 2. Mutable Type

JS에서는 위의 immutable type을 제외하고 모든 값은 객체(Object)타입이며, 변할 수 있는 값이다. 객체는 새로운 값이 만들어지지 않고 기존의 것을 변경할 수 있다.

```javascript
let obj1 = { a: 1 };
let obj2 = { a: 2 };

obj1 === obj2; // false -> 참조하는 메모리 영역이 다르기 때문에

let obj3 = obj2;
obj3 === obj2; // true -> 같은 객체를 가르킴 (동일 메모리 영역을 가르킨다.)

obj2.a = 2;
console.log(obj3.a); // 2

// 위와 같이 불변성을 지키지 않으면 의도치 않은 값의 변경이 발생한다.
```

- 위의 예시처럼 의도하지 않은 객체의 변경이 발생하는 원인은 대부분, 레퍼런스를 참조한 다른 객체에서 객체를 변경하기 때문이다.

```javascript
let x = ['foo'];
let y = x;

x.push('bar');
console.log(y); // ['foo', 'bar']
console.log(x === y) // true
------------------------------------
let x = ['foo'];
let y = x;
console.log(x === y); // true

x = [...x, 'bar'];

console.log(x); // ['foo', 'bar']
console.log(y); // ['foo']
console.log(x === y); // false
```

- 위와 같은 경우에는 전개 연산자를 통해 불변성을 지켰다.

### 3. 불변성을 지킬 수 있는 방법

> 1. 객체의 방어적 복사 <br />
>    Object.assign <br />
>    - Object.assign(target, ...sources);
>    - source들을 target에 복사하고, target을 반환한다.
> 2. 불변 객체화를 통한 객체 변경 감지 <br />
>    Object.freeze <br />
>    - Object.freeze(obj);
>    - 객체를 동결시키고, 동결된 객체는 더 이상 변경될 수 없다. 동결 객체는 그 프로토타입이 변경되는 것도 방지한다.
>    - freeze()는 전달된 동일한 객체를 반환한다.

1. Object.assign()

```javascript
const obj1 = { a: 1 };
const obj2 = { b: 2 };

const obj = Object.assign({}, obj1, obj2);
console.log(obj); // { a: 1, b: 2}
console.log(obj1); // { a: 1 }
------------------------------------------
const obj3 = { a: 1 };
const obj4 = { b: 2 };
const obj5 = { c: 3 };

const copyObj = Object.assign(o3, o4, o5);
console.log(copyObj); // { a: 1, b: 2, c: 3 }
console.log(obj3) // { a: 1, b: 2, c: 3 } 타겟 객체 자체가 변경된다.
console.log(obj3 === copyObj) // true
```

> Object.assign은 객체 내부에 객체가 있다면 완전한 복사는 하지 못한다. (아래 코드)

```javascript
const user = {
  name: "junseo",
  body: {
    weight: 100,
  },
};
const copyUser = Object.assign({}, user);
console.log(user === copyUser); // false - user와 copyUser의 참조는 다르다.
console.log(user.body === copyUser.body); // true - 객체 내부에 있는 객체의 참조는 같다.
```

2. Object.freeze()

```javascript
let user = { name: "junseo" };

const copyUser = user.freeze(user);

user.name = "babo"; // 할당 X

console.log(user === copyUser); // true
```

> Object.assign과 마찬가지로 객체 내부의 객체에는 대응하지 못한다. (아래 코드)

```javascript
const user = {
  name: "junseo",
  body: {
    weight: 100,
  },
};

const copyUser = Object.freeze(user);

user.body.weight = 200; // 재할당 O
console.log(user === copyUser); // true
console.log(user, copyUser); // 모두 {name: 'junseo', body: {weight: 200}}
```

### 4. 불변성을 지키는 것이 중요한 이유

- 불변성이 지켜지지 않는다면 프로젝트가 커지는 경우에, 데이터의 흐름을 따라가기가 어렵다. 이는 곧 side effects로 이어질 수 있다.

- 객체는 참조로 형태를 전달 받고, 그 객체가 참조를 통해 공유되어 있다면 그 상태가 언제든지 변결될 수 있는 문제가 있다.
  <br /> -> 리액트에서 상태를 변경하는 경우에 직접 객체에 값을 추가하는 방식으로 접근해서는 안된다.

```javascript
state = {
  users: [
    {
      id: 1,
      name: "babo",
    },
  ],
};

// X
this.state.users.push({
  id: 2,
  name: "babo2",
});

// X
this.state.users[0].username = "junseo";

// 위와 같은 경우에서 동일한 state를 참조하는 경우에, 원치 않는 값의 변경이 생길 수 있다.
```

> Reference
>
> - https://jinminkim-50502.medium.com/immutability-%EB%B6%88%EB%B3%80%EC%84%B1-fdf379f6a35c
> - https://blog.naver.com/backsajang420/221358585106
> - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
> - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

## React에서의 불변성

- React의 컴포넌트는 state 또는 props의 값이 변할 때 리렌더링 된다. 만약에 참조하고 있는 객체나 배열의 내부 값을 직접 수정한다면 레퍼런스가 가리키는 곳이 같기 때문에 똑같은 값으로 인식한다.
  > -> 전개연산자나 assign 함수를 이용해 새로운 객체나 배열을 생성할 수 있다.
- 불변성의 원칙을 지키면서 배열이나 객체를 업데이트 하는 경우
  1. 배열이나 객체의 사본을 만든다.
  2. 사본에 값을 업데이트 한다.
  3. 해당 사본의 상태를 setState 혹은 세터 함수를 통해 업데이트 한다.

```javascript
function Immutable = () => {
    const [todoList, setTodoList] = useState([
        {
            key: 1,
            todo: "밥 먹기",
        },
        {
            key: 2,
            todo: "똥 싸기",
        },
    ]);

    const onClick = () => {
        let newArray = todoList.concat({
            key: 3,
            todo: "씻기",
        });
        setTodoList(todoList);
    };

    return (
        <div>
            {todoList.map(item => (
                <div key={item.key}>{item.todo}</div>
            ))}
            <div onClick={onClick}>눌러</div>
        </div>
    )
}
// onClick 내부에서 todoList.push({key: 3, todo: '씻기'}); 의 경우에는 리렌더링이 되지 않는다.
```

> React 에서는 이 문제를 setState() 를 통해 처리한다. 이를 통해 state를 변경하지 않으면 컴포넌트가 리렌더링 되지 않는다. (위 코드의 주석)

### 리렌더링 방지하기

- 리액트에서 불변성을 유지하는 가장 큰 이유는 불 필요한 리렌더링을 방지하기 위함이다.

`Main.jsx`

```javascript
import React, { Component } from "react";
import UserList from "./UserList";

class Main extends Component {
  id = 3;
  state = {
    input: "",
    users: [
      {
        id: 1,
        username: "jeromebaek",
      },
      {
        id: 2,
        username: "seubgyeob",
      },
    ],
  };

  onChange = (e) => {
    const { value } = e.target;
    this.setState({
      input: value,
    });
  };

  onButtonClick = (e) => {
    this.setState(({ users, input }) => ({
      input: "",
      users: users.concat({
        id: this.id++,
        username: input,
      }),
    }));
  };

  render() {
    const { onChange, onButtonClick } = this;
    const { input, users } = this.state;

    return (
      <div>
        <div>
          <input onChange={onChange} value={input} />
          <button onClick={onButtonClick}>추가</button>
        </div>
        <h1>사용자 목록</h1>
        <div>
          <UserList users={users} />
        </div>
      </div>
    );
  }
}

export default Main;
```

`UserList.jsx`

```javascript
import React from "react";
import User from "./User";

const UserList = React.memo(({ users }) => {
  console.log("UserList rendering");
  return users.map((user) => <User key={user.id} user={user} />);
});

export default UserList;
```

`User.jsx`

```javascript
import React from "react";

const User = React.memo(({ user }) => {
  console.log(user.username + "rerendering");
  return <div>{user.username}</div>;
});

export default User;
```

> 상기 코드에서 함수형의 경우 React.memo를 사용하면 리렌더링이 방지되고, React.memo를 제거하면 input 값이 변하는 경우에 계속 리렌더링이 발생한다. <br />
> 만약 클래스형으로 구현하는 경우에는 React.memo 대신에 shouldComponentUpdate를 사용하면 된다,

> Reference
>
> - https://blog.naver.com/backsajang420/221358585106
> - https://salgum1114.github.io/reactjs/2019-11-28-react-class-equivalents/
