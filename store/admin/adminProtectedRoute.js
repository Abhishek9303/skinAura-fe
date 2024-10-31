import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAdminStore from "../../store/admin/adminProfile";
import { toast } from "react-toastify";

const ProtectedAdmin = (WrappedComponent) => {
  return (props) => {
    const { admin, setAdmin, clearAdmin } = useAdminStore();
    const [token, setToken] = useState(null);
    const router = useRouter();

    const validateUser = (token) => {
      const axios = require("axios");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.BACKEND_URL}api/v1/common/admin/validate`,
        headers: {
          "auth-token": token,
        },
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.success) {
            setAdmin({
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
          clearAdmin();
          window.localStorage.clear();
          window.localStorage.setItem("isAuthenticate", false);
          router.push("/adminLogin");
          console.log(error);
        })
        .finally(() => {
          setToken(token);
        });
    };

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if (storedToken) {
        validateUser(storedToken);
      } else {
        clearAdmin();
        window.localStorage.clear();
        window.localStorage.setItem("isAuthenticate", false);
        router.push("/adminLogin");
      }
      console.log(admin);
    }, [router]);

    // Only render the WrappedComponent if the token exists, and pass props and admin as separate props
    return token ? <WrappedComponent {...props} {...admin} /> : null;
  };
};

export default ProtectedAdmin;
