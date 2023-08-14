

type InputProps = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: () => void;
}

const MyInput = (props: InputProps): JSX.Element => (
  <input className="login__input form__input" {...props}/>
);

export default MyInput;
