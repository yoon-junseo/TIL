# useDebounce

> 특정 시간이 지난 후에, 한번만 이벤트가 발생하도록 하는 hook

## 문제

- 사용자가 인풋의 상태값을 계속 변경하는 경우, 값의 변경이 계속 이루어진다. -> 값 입력이 완료되면 값을 변경하고자 한다.
- 검색 인풋에서 값의 입력이 끝나지 않은 상태에서 검색 API를 호출하면 낭비가 발생한다.

## 구현 방법

- useState와 useEffect를 이용해서 구현한다.
- 딜레이 이후에 useState를 통해서 값을 갱신한다.
- 딜레이 기간 중, 값이 업데이트 되었다면 timer를 clear 해준다.

## 코드

```javascript
// useDebounce.ts
import { useState, useEffect } from "react";

interface Props<T> {
  value: T;
  delay: number;
}

const useDebounce = <T>({ value, delay }: Props<T>): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
```

## 적용

```javascript
// TodoInsert.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import useDebounce from "../../hooks/useDebounce";

interface TodoInsertProps {
  onInsert: (text: string) => void;
}

const TodoInsert = ({ onInsert }: TodoInsertProps) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce({ value, delay: 500 });

  useEffect(() => {
    if (debouncedValue) {
      // input event가 계속있다면, 마지막 event가 끝난 이후에 debouncing이 콘솔에 찍힌다.
      console.log("debouncing");
    }
  }, [debouncedValue]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onInsert(value);
    setValue("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">등록</button>
    </form>
  );
};

export default TodoInsert;
```
