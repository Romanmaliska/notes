import styleUtils from "../../styles/utils.module.css";
import * as UsersApi from "../../network/usersApi";
import { useForm } from "react-hook-form";
import { User, SignUpCredentials } from "../../types";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./TextInputField";

type SignUpModalProps = {
  onClose: () => void;
  onSignUpSuccessful: (user: User) => void;
};

export default function SignUpModal({
  onClose,
  onSignUpSuccessful,
}: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  const onSubmit = async (credentials: SignUpCredentials) => {
    try {
      const newUser = await UsersApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up Form</Modal.Title>
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
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
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
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
