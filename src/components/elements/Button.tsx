import React, {FC} from 'react';

const Button: FC<JSX.IntrinsicElements['button']> = props => {
  return (
    <button
      className="flex-1 border-2 p-1 bg-blue-900 text-white rounded-md disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed "
      type="button"
      {...props}
    />
  );
};

export default Button;
