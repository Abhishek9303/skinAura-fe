import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "../../store/user/userProfile";
const withAuth = (WrappedComponent) => {
    return (props) => {
    const { user, setUser, clearUser } = useUserStore();
    const [token, setToken] = useState(null);
    const router = useRouter();
    const validateUser = (token) => {
      const axios = require("axios");

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.BACKEND_URL}api/v1/common/user/validate`,
        headers: {
          "auth-token": token,
        },
      };
      axios.request(config).then((response) => {
          setUser({
            name: response.data.data.name,
            emailId: response.data.data.emailId,
            mobileNo : response.data.data.mobileNo,
            role : response.data.data.role
          })
        })
        .catch((error) => {
          console.log(error);
        });
    };
    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if (storedToken) {
        validateUser(storedToken);
      }
      if (!storedToken) {
        clearUser();
        router.push("/signin");
      }
    }, [router]);

    // Only render the WrappedComponent if the token exists
    return token ? <WrappedComponent {...user} /> : null;
  };
};

export default withAuth;
