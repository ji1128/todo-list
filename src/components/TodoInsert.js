import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  //onSubmit 이벤트 설정
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(''); //value값 초기화
      e.preventDefault(); //새로고침을 발생하므로 이 함수를 호출
    },
    [onInsert, value],
  );

  return (
    <TodoInsertWrapper onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </TodoInsertWrapper>
  );
};

const TodoInsertWrapper = styled.form`
  display: flex;
  background: #495057;
  input {
    background: none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: #fff;
    &::placeholder {
      color: #dee2e6;
    }
    flex: 1;
  }
  button {
    background: #868296;
    outline: none;
    border: none;
    color: #fff;
    padding: 0 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.1s background ease-in;
    &:hover {
      background: #adb5bd;
    }
  }
`;

export default TodoInsert;
