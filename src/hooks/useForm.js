import { useCallback, useState } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  };
  const resetForm = useCallback(
    (nextValues = initialValues) => setValues(nextValues),
    [initialValues]
  );
  return { values, handleChange, resetForm };
}

