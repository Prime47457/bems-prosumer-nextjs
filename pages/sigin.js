import { useAuth } from "../assets/auth";
import { useRouter } from "next/router";

export default () => {
  const auth = useAuth();
  const router = useRouter();

  const signIn = ({ email, pass }) => {
    auth.signin(email, pass).then(() => {
      router.push("/pages/prosumers/admin-prosumer");
    });
  };

  return <div>Put log in page here</div>;
};
