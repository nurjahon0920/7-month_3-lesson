import StyledButton from "../components/shared/StyledButton";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();
  return (
    <div className="container py-5">
      <h1>Username: {user?.username || "N/A"}</h1>
      <StyledButton variant="outline" onClick={logout}>
        Logout
      </StyledButton>
    </div>
  );
};

export default Profile;
