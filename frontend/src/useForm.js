import { useState } from "react";

const useForm = (defaultValues = {}) => {
  const [values, setValues] = useState(defaultValues);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    handleOnChange,
    values,
  };
};

export default useForm;
