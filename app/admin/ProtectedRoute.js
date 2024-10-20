const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const { admin, setAdmin, clearAdmin } = adminStore();
    const [token, setToken] = useState(null);
    const router = useRouter();

    const validateUser = (token) => {
      // ... (existing validation logic)
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
        {token && admin.isAuthorized ? (
          <WrappedComponent {...props} isAuthorized={admin.isAuthorized} />
        ) : null}
      </>
    );
  };
};
