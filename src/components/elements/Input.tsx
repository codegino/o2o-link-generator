import React, {FC} from 'react';

const Button: FC<JSX.IntrinsicElements['input']> = props => {
  return <input className="border-2 mb-2 px-2 py-1 rounded-md" {...props} />;
};

export default Button;
