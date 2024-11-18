export default function Validation({ values }) {
  const errors = {};

  if (values.name === "") {
    errors.name = "Name is Required";
  }
  if (values.email === "") {
    errors.email = "Email is Required";
  }
  if (values.message === "") {
    errors.message = "Message is Required";
  }

  return errors;
}
