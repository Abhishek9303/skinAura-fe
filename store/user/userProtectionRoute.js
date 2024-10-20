import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "../../store/user/userProfile";
import { toast } from "react-toastify";
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
          if(response.data.success){
             setUser({
               name: response.data.data.name,
               emailId: response.data.data.emailId,
               mobileNo: response.data.data.mobileNo,
               role: response.data.data.role,
               token: token,
               currentCart: response.data.data.currentCart,
               isAuthorized: true,
             });
             window.localStorage.setItem("isAuthenticate", true);
             window.localStorage.setItem("token", token);
          }
        })
        .catch((error) => {
          clearUser();
          window.localStorage.clear();
          window.localStorage.setItem("isAuthenticate", false);
          router.push("/signin");
          console.log(error);
        }).finally(() => {
          setToken(token);
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
        window.localStorage.clear();
        window.localStorage.setItem("isAuthenticate", false);
        router.push("/signin");
      }
    }, [router]);

    // Only render the WrappedComponent if the token exists
    return token ? <WrappedComponent {...user} /> : null;
  };
};

export default withAuth;
