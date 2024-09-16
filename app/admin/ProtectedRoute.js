import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import adminStore from "../../store/admin/adminProfile";
const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const { admin, setAdmin, clearAdmin } = adminStore();
    const [token, setToken] = useState(null);
    const router = useRouter();

    const validateUser = (token) => {
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
          const userData = response.data.data;
          if (allowedRoles.includes(userData.role)) {
            setAdmin({
              name: userData.name,
              emailId: userData.emailId,
              mobileNo: userData.mobileNo,
              role: userData.role,
              isAuthorized: true,
              token: token,
            });
          } else {
            clearAdmin();
            localStorage.clear();
            toast.error("You are not authorized to access this page");
            router.push("/"); // Redirect to unauthorized page
          }
        })
        .catch((error) => {
          console.log(error);
          localStorage.clear();
          clearAdmin();
          router.push("/adminLogin"); // Redirect to sign-in if validation fails
        });
    };

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if (storedToken) {
        validateUser(storedToken);
      } else {
        clearAdmin();
        localStorage.clear();
        localStorage.setItem("isAuthenticate", false);
        router.push("/adminLogin");
      }
    }, [router]);

    return (
      <>
        {token && admin.isAuthorized ? <WrappedComponent {...props} /> : null}
      </>
    );
  };
};

export default withAuth;

