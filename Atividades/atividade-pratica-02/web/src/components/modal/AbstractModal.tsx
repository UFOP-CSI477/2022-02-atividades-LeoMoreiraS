import { useState } from "react";
import styled from "styled-components";

type FormInputProps = {
  htmlFor: string;
};

const FormInput = styled.input<FormInputProps>`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #242424;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 400px;
  max-width: 90%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
`;

type AbstractModalProps<T extends Record<string, unknown>> = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  data: T;
  setter: React.Dispatch<React.SetStateAction<T>>;
};

function AbstractModal<T extends Record<string, unknown>>({
  isOpen,
  onClose,
  onSubmit,
  data,
  setter
}: AbstractModalProps<T>) {
  const [formData, setFormData] = useState<T>(data);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
    onClose();
  };
  console.log("a", formData);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setter((prevData) => ({ ...prevData, [name]: value }));
  };

  if (!isOpen) {
    return null;
  }

  const inputElements = Object.keys(data).map((key) => {
    return (
      <div key={key}>
        <label htmlFor={key}>{key}</label>
        <FormInput
          htmlFor={key}
          type="text"
          name={key}
          id={key}
          value={data[key as keyof T] as string}
          onChange={handleChange}
        />
      </div>
    );
  });

  return (
    <ModalContainer>
      <ModalOverlay>
        <form id="ModalForm">
          {inputElements}
          <button onClick={(e)=>{
            e.preventDefault()
            onSubmit()
            onClose()
            }}>
            Alterar
          </button>
        </form>
      </ModalOverlay>
    </ModalContainer>
  );
}

export default AbstractModal;