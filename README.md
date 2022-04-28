# Todo list 제작하기

## Prettier 설정하기
root폴더에 `.prettierrs`파일을 생성한다.
코드를 작성할 때 코드 스타일을 깜끔하게 정리해줌
```javascript
{
    "arrowParens": "always",
    "semi": true,
    "singleQuote": true,
    "useTabs": false,
    "trailingComma": "all",
    "tabWidth": 2,
    "printWidth": 80
}
```

## Json 파일을 활용하여 import 설정하기
root폴더에 `jsconfig.json`파일을 생성한다.
컴포넌트를 import로 연결시켜줄 때 절대경로로 연결시켜주기 위함
```javascript
{
    "compilerOptions": {
        "target": "ES6",
        "baseUrl": "src"  //기본 url을 src폴더로 맞춰줌
    },
    "include": ["src"]
}
```

### 추가 라이브러리 설치
1. styled-components와 react-icons를 사용하기 위해 라이브러리 설치
yarn add styled-components react-icons
가운데 한칸 띄어쓰고 같이 입력하면 병렬로 한번에 설치됨

2. classname을 줄 때 명확하게 주기위한 라이브러리 설치
yarn add classnames


### src폴더 내에 'index.css'에서 폰트 설정 및 여백 설정을 한다.
```css
body{
  margin: 0;
  padding: 0;
  background: #e9ecef;
}
```

## todo list 구성

1) TodoTemplate -> 전체적인 가로너비(고정px), title, 내용 넣어줄 상자
하위 메뉴가 있을때는 children으로 내부 JSX를 props로 받아서 렌더링해줌

2) TodoInsert -> 할일을 입력하는 부분 input 상자
state 이용해서 input의 상태를 관리해줌

3) TodoListItem -> 기본적으로 보여지는 할일 + 각 할 일 항목에 ㅐ한 정보를 보여주는 컴포넌트
체크박스 / 문자/ (삭제)아이콘 등

4) TodoList -> todos 배열을 props로 받아 온 후, 이를 map함수를 이용해서 여러개의 todoListItem 컴포넌트로 변환하여 리스트를 뿌려줌


## TodoTemplate 만들기
1. scr 디렉터리의 components 디렉터리 안에 TodoTemplate.js 파일을 생성한다.
```javascript
import React from 'react';
import styled from "styled-components";

const TodoTemplate = ({children}) => {
    return (
        <div className='TodoTemplate'>
            <div className='app-title'>일정 관리</div>
            <div className='content'>{children}</div>

        </div>
    );
};

export default TodoTemplate;
```

2. 이 컴포넌트를 App.js에서 불러와 렌더링 한다.
```javascript
import React from 'react';
import TodoTemplate from './components/TodoTemplate';

const App = () => {
  return (
      <TodoTemplate>Todo App 만들기</TodoTemplate>
  );
};

export default App;
```

3. TodoTemplate CSS
익명함수 형식으로 styled-components를 이용하여 css를 설정한다.

```javascript
const TodoWrapper = styled.div`
    width: 512px;
    //좌우 중앙 정렬
    margin: 6rem auto 0;
    border-radius: 4px;
    overflow: hidden;
`;

const AppTile = styled.div`
    background: #22b8cf;
    color: #fff;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    background: #ffffff;
`;
```

```javascript
    return (
        <TodoWrapper>
            <AppTile>일정 관리</AppTile>
            <Content>{children}</Content>
        </TodoWrapper>
    );
```

## TodoInsert 만들기
1. components 디렉터리에 TodoInsert.js 파일 생성해준다.

> react-icons 사용 방법

>>[react-icons 이동](https://react-icons.github.io/react-icons/icons?name=ai)
react-icons 사이트에서 사용하고 싶은 아이콘을 골라, import 구문을 사용하여 불러온 후 컴포넌트처럼 사용하기
react-icons의 아이콘을 사용하기위해 import해줌
import { 아이콘 이름 } from "react-icons/md";

```javascript
import React from 'react';
import {MdAdd} from "react-icons/md";
import styled from "styled-components";

const TodoInsert = () => {
    return (
        <form className='Tod{/* 할 일 입력하는 란 */}oInsert'>
        
            <input placeholder='할 일을 입력하세요' />
            {/* input상자같이 단독으로 사용하는 것은 샐프 클로징 함 */}

        {/* 전송관련 : submit */}
            <button type='submit'>
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;
```
2. 이 컴포넌트를 App.js에서 불러와 렌더링 한다.

3. TodoInsert CSS
익명함수 형식으로 styled-components를 이용하여 css를 설정


## TodoListltem 만들기
react-icons에서 다양한 아이콘을 불러와 사용.

```javascript
import React from 'react';
import styled from 'styled-components';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from 'react-icons/md';

const TodoListItem = () => {
    return (
           <div className='TodoListItem">
           
              {/* 추가 버튼 */}
              <div className='checkbox'>
                   <MdCheckBoxOutlineBank />
              </div>
              
              {/* 삭제 버튼 */}
              <div className='remove'>
                   <MdRemoveCircleOutLine />
              </div>
           </div>
    );
};
```

2. 이 컴포넌트를 App.js에서 불러와 렌더링 한다.

3. TodoInsert CSS
익명함수 형식으로 styled-components를 이용하여 css를 설정

```javascript
const TodoItemWrapper = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;

  /* 할일에서 짝수 부분만 뒷 배경 지정해줌 */
  &:nth-child(even) {
    background: #f8f9fa;
  }
  /* 할 일에서 하단부분에 라인 만들어줌 */
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const CheckBox = styled.div`
  cursor: pointer;
  flex: 1; /* 차지할 수 있는 영역 모두 차지 */
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  /* 체크박스 버튼에 접근할 때 svg로 다가감 */
  svg {
    font-size: 1.5rem;
  }
  .text {
    margin-left: 0.5rem;
    flex: 1; /* 차지할 수 있는 영역 모두 차지 */
  }
  /* 체크 됐을 때 변화 지정-> 글자 색상ㅡ체크박스 배경 변경 */
  &.checked {
    svg {
      color: #22b8cf;
    }
    .text {
      color: #adb5bd;
      text-decoration: line-through;
    }
  }
`;

const Remove = styled.div`
  /* 삭제버튼 */
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;
```

## TodoList 만들기

``` javascript
import React from 'react';
import TodoListItem from './components/TodoListItem';
import styled from 'styled-components';

const TodoList = () => {
  return (
    <div className='TodoList>
     <TodoListItem />
     <TodoListItem />
     <TodoListItem />
    </TodoListWrapper>
  );
};

```


## 기능 구현하기
1. App.js에서 todos 상태 사용하기
App.js에서 useState를 사용해서 todos 상태 정의해준 후, todos를 TodoList의 props로 전달해준다.

>App.js
``` javascript
const App = () => {
  const[todos, setTodos] = useState([
    {
      id : 1,
      text : '할일1',
      checked : true,      
    },
    {
      id : 2,
      text : '할일2',
      checked : true,      
    },
    {
      id : 3,
      text : '할일3',
      checked : false,      
    }
  ]);
  
    return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/> 
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};
  ```

2.props에서 TodoList.js로 전달된 배열 값을 TodoItem으로 변환하여 헨더링하도록 설정

props로 받아온 todos배열을 map(배열 내장 함수)를 통해 TodoListItems으로 이루어진 배열로 변환하여 렌더링

>TodoList.js
``` javascript
const TodoList = ({todos, onRemove, onToggle}) => {
    
  return (
    <TodoListWrapper>
     {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
     ))}
    </TodoListWrapper>
  );
};
```

3. TodoListItems 컴포넌트에서 받아 온 todo 값을 정해진 UI로 보여지게 수정해줌

>import cn from 'classnames';
>>classnames를 활용해서 조건부 스타일링.

>TodoListItems.js
```javascript
import React from 'react';
import styled from 'styled-components';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';

const TodoListItem = ({todo, onRemove, onToggle}) => {
    const {id, text, checked} = todo;
  return (
    <TodoItemWrapper>
    
      {/* 추가 버튼 */}
      <CheckBox className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </CheckBox>

      {/* 삭제 버튼 */}
      <Remove onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </Remove>
    </TodoItemWrapper>
  );
};
```

4. 항목 추가 기능 구현
TodoInsert 컴포넌트에서 인풋 상태를 관리하고 App 컴포넌트에는 todos 배열에 새로운 객체를 추가하는 함수를 만들어 줌

>TodoInsert.js
>useState를 사용하여 value라는 상태를 정의-> 컴포넌트에서 인풋에 입력하는 값을 관리함
>onChange, useCallback-> 컴포넌트가 리렌더링 될 때마다 함수를 재사용 할 수 있도록 함

```javascript
import React, {useCallback, useState} from 'react';
import {MdAdd} from "react-icons/md";
import styled from "styled-components";

const Todoinsert = ({onInsert}) => {
    const[value, setValue] = useState ("");

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    return (
        <TodoInsertWrapper onSubmit={onSubmit}>
        {/* 할 일 입력하는 란 */}
            <input 
                value={value} 
                type="text" 
                placeholder='할 일을 입력하세요' onChange={onChange} 
            />
            {/* input상자같이 단독으로 사용하는 것은 샐프 클로징 / <- 함! */}
            <button type='submit'>
                <MdAdd />
            </button>
            {/* 전송관련 : submit */}
        </TodoInsertWrapper>
    );
};
```

5. todos배열에 새 객체를 추가, id로 항목 지우기

>새로운 객체를 만들 때마다 id 값에 1씩 더해줌
>>id값은 렌더링 되는 정보가 아니기 때문에 useRef를 사용하여 변수를 담아줌
```javascript
 //고윳값을 가질 id생성
  const nextId = useRef(4);
  //ref를 이용하여 변수 담아줌

  //onInsert함수
  const onInsert = useCallback(
  text => {
    const todo = {
      id : nextId.current,
      text,
      checked : false
    };
    setTodos(todos.concat(todo));
    nextId.current += 1; //nextId를 1씩 더해줌
  }, [todos]);

```

>id로 항목 지우기
>>fiter 함수 : 기존의 배열은 그대로 둔 상태에서 특정 조건을 만족하는 원소들을 따로 추출하여 새로운 배열을 만들어 줌
```javascript
  //항목 지우기
  const onRemove = useCallback(id => {
    setTodos(todos.filter(todo => todo.id !==id));
  }, [todos]);
```


6. 버튼 클릭시 발생할 이벤트 설정
 
>Todolist.js
```javascript
const Todoinsert = ({onInsert}) => {
    const[value, setValue] = useState ("");

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    //onSubmit 이벤트 설정
    const onSubmit = useCallback(e => {
        onInsert(value);
        setValue('');
        e.preventDefault();
    }, [onInsert, value]);
    
    return (
        <TodoInsertWrapper onSubmit={onSubmit}>
        {/* 할 일 입력하는 란 */}
            <input 
                value={value} 
                type="text" 
                placeholder='할 일을 입력하세요' onChange={onChange} 
            />
            {/* input상자같이 단독으로 사용하는 것은 샐프 클로징 / <- 함! */}
            <button type='submit'>
                <MdAdd />
            </button>
            {/* 전송관련 : submit */}
        </TodoInsertWrapper>
    );
};

```


7. TodoListltem.js에서 삭제 함수 호출
>App.js에서 props로 받아온 onRemove함수를 TodoListltem에 그대로 전달해준다.
>>TodoList.js
```javascript
const TodoList = ({todos, onRemove}) => {
    
  return (
    <TodoListWrapper>
     {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} />
     ))}
    </TodoListWrapper>
  );
};
```

>삭제 버튼을 누르면 TodoKistItem에서 onRemove 함수에 현재 자신이 가진 id를 넣어서 삭제할 함수를 호출하도록 설정
>>TodoListItem.js
```javascript
const TodoListItem = ({todo, onRemove}) => {
    const {id, text, checked} = todo;
  return (
    <TodoItemWrapper>
    
      {/* 추가 버튼 */}
      <CheckBox className={cn('checkbox', {checked})}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </CheckBox>

      {/* 삭제 버튼 */}
      <Remove onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </Remove>
    </TodoItemWrapper>
  );
};
```

9. onToggle구현하기

>App.js
```javascript
  //onToggle 버튼
  const onToggle = useCallback(id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo))
  }, [todos]);
```

>TodoListItem에서 토글 함수 호출
>onToggle함수를 TodoKistItem에서도 호출 할 수 있도록 TodoList를 거쳐 TodoListItem에게 전달해줌
>>TodoList.js
```javascript
const TodoList = ({todos, onRemove, onToggle}) => {
    
  return (
    <TodoListWrapper>
     {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
     ))}
    </TodoListWrapper>
  );
};
```

>TodoListItems에서도 토글 함수 호출
>>TodoListItems.js
```javascript
const TodoListItem = ({todo, onRemove, onToggle}) => {
    const {id, text, checked} = todo;
  return (
    <TodoItemWrapper>
    
      {/* 추가 버튼 */}
      <CheckBox className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </CheckBox>

      {/* 삭제 버튼 */}
      <Remove onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </Remove>
    </TodoItemWrapper>
  );
};
```
