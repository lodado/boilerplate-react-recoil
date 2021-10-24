
import * as React from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  RecoilState,
} from 'recoil';

import {textState} from '@Atom/main';

function CharacterCounter() : JSX.Element {
    return (
      <div>
        <TextInput />
      </div>
    );
  }
  
  function TextInput() {
    const [text, setText] = useRecoilState<string>(textState);
  
    const onChange = ({target} : React.ChangeEvent<HTMLInputElement>) => {
      setText(target.value);
    };
  
    return (
      <div>
        <input type="text" value={text} onChange={onChange} />
        <br />
        Echo: {text}
      </div>
    );
  }

export {CharacterCounter}