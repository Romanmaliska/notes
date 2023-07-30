import stylesUtils from "../styles/utils.module.css";

export default function LogoutPage() {
  return (
<section className={stylesUtils.center}>
      <h2 className="mb-4">Welcome to the Notes App!</h2>
      <h3 className="mb-4">Please login or sign up to continue.</h3>
    </section>
  );
}
