type InputProps = {
  className: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  id?: string;
  pattern?: string;
  title?: string;
  onChange: (evt: { target: { value: string } }) => void;
}

const MyInput = (props: InputProps): JSX.Element => (
  <input {...props} />
);

export default MyInput;
