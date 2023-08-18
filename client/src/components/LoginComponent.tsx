import Navber from "./Navber";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate } from "../services/authorize";
import { useNavigate } from 'react-router-dom';
import { getUser } from "../services/authorize";

interface LoginComponentProps {
  apiUrl: string;
}
const LoginComponent = ({ apiUrl }: LoginComponentProps) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;

  const navigate = useNavigate();

  const inputValue =
    (name: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value: string = event.target.value;
      // console.log(name,"=",value);
      setState({ ...state, [name]: value });
    };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.table({ username, password });
    axios
      .post(`${apiUrl}/login`, { username, password })
      .then((response) => {
        authenticate(response,() => {
          navigate('/create')
        })
        // console.log(response);
      })
      .catch((err) => {
        Swal.fire("แจ้งเตือน", err.response.data.error, "error");
      });
  };

  useEffect(()=>{
    getUser() && navigate('/')
  },[])

  return (
    <div className="container p-5">
      <Navber />
      <h1>เข้าสู่ระบบ | Admin</h1>

      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <br />
        <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default LoginComponent;
