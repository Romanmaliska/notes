import styleUtils from "../../styles/utils.module.css";
import { User, LoginCredentials } from "../../types";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as UsersApi from "../../network/usersApi";

import TextInputField from "./TextInputField";

type LoginModalProps = {
  onClose: () => void;
  onLoginSuccessful: (user: User) => void;
};

export default function LoginModal({
  onClose,
  onLoginSuccessful,
}: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const onSubmit = async (credentials: LoginCredentials) => {
    try {
      const newUser = await UsersApi.login(credentials);
      onLoginSuccessful(newUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login Form</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            label="Name"
            name="name"
            type="text"
            placeholder="Name"
            registerOptions={{ required: "Required" }}
            register={register}
            error={errors.name}
          />
          <TextInputField
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
