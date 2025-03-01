import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import utils from "../../../common/lib/utils";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import Input from "../../components/Form/Input";

function Unlock() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const from = location.state?.from?.pathname || "/";

  function handlePasswordChange(event) {
    setError(null);
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    unlock();
    event.preventDefault();
  }

  function reset() {
    utils.openPage("welcome.html");
  }

  function unlock() {
    auth
      .unlock(password, () => {
        navigate(from, { replace: true });
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <div className="p-8 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex space-x-2 justify-center pt-5">
        <img src="assets/icons/alby_icon_transp.svg" alt="logo" />
      </div>
      <p className="text-center text-xl font-normal font-serif mt-8 mb-5 dark:text-white">
        Unlock to continue
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <Input
            placeholder="Password"
            size="small"
            type="password"
            autoFocus
            value={password}
            onChange={handlePasswordChange}
          />
          {error && (
            <p className="mt-1 text-red-500">
              {error} (
              <span
                onClick={(event) => {
                  reset();
                }}
              >
                config
              </span>
              )
            </p>
          )}
        </div>
        <Button
          type="submit"
          label="Unlock"
          fullWidth
          primary
          disabled={password === ""}
        />

        <div className="flex justify-center space-x-1 mt-5">
          <span className="text-gray-500">Need help? Contact </span>
          <a
            className="text-orange-bitcoin font-semibold"
            href="mailto:support@getalby.com"
          >
            Alby Support
          </a>
        </div>
      </form>
    </div>
  );
}

export default Unlock;
