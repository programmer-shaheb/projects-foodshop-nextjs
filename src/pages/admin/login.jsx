import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";
import { notify } from "../../util/notify";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const router = useRouter();

  const handleClick = async () => {
    try {
      const res = await axios.post(
        "https://elegant-wright-06721d.netlify.app/api/login",
        {
          username,
          password,
        }
      );

      if (res.status === 200) {
        notify("Admin Logged In!", "success");
        router.push("/admin");
      }
    } catch (err) {
      notify("Wrong Credentials", "error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="Username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
