import { useState, useEffect } from "react";
import Navber from "./Navber";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser } from "../services/authorize";
import { useNavigate } from "react-router-dom";

interface FormComponentProps {
  apiUrl: string;
}
const FormComponent = ({ apiUrl }: FormComponentProps) => {
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  });
  const { title, author } = state;

  const navigate = useNavigate()

  const [content, setContent] = useState("");

  const inputValue =
    (name: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value: string = event.target.value;
      // console.log(name,"=",value);
      setState({ ...state, [name]: value });
    };

  const submitContent = (event: string) => {
    setContent(event);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.table({ title, content, author });

    axios
      .post(`${apiUrl}/create`, { title, content, author })
      .then((response) => {
        console.table(response.data);
        Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
        setState({ ...state, title: "", author: "" });
        setContent("");
      })
      .catch((err) => {
        Swal.fire("แจ้งเตือน", err.response.data.error, "error");
      });
  };

  useEffect(()=>{
    !getUser() && navigate('/')
  },[])

  return (
    <div className="container p-5">
      <Navber />
      <h1>เขียนบทความ</h1>
      {/* {JSON.stringify(state)} */}

      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>ชื่อบทความ</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>

        <div className="form-group">
          <label>รายละเอียด</label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme="snow"
            className="pb-5 mb-3"
            placeholder="เขียนรายละเอียดของคุณ"
            style={{ border: "1px solid #666" }}
          />
        </div>

        <div className="form-group">
          <label>ผู้แต่ง</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={inputValue("author")}
          />
        </div>
        <br />
        <input type="submit" value="บันทึก" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default FormComponent;
