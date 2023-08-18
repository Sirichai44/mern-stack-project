import { useState, useEffect } from "react";
import Navber from "./Navber";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { getUser } from "../services/authorize";
import { useNavigate } from "react-router-dom";

interface FormComponentProps {
  apiUrl: string;
}

const EditComponent = ({ apiUrl }: FormComponentProps) => {
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  });

  const [content, setContent] = useState('')
  const { slug } = useParams<{ slug: string }>();
  const { title, author } = state;

  const navigate = useNavigate()

  const submitContent = (event:string)=>{
    setContent(event)
  }

  useEffect(() => {
    axios
      .get(`${apiUrl}/blog/${slug}`)
      .then((response) => {
        const { title, content, author, slug } = response.data;
        setState({ ...state, title, author, slug });
        setContent(content)
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(()=>{
    !getUser() && navigate('/')
  },[])

  const showUpdateForm = () => (
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
        <input type="submit" value="อัพเดท" className="btn btn-primary" />
      </form>
  );

  const inputValue =
    (name: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value: string = event.target.value;
      // console.log(name,"=",value);
      setState({ ...state, [name]: value });
    };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.table({ title, content, author });
    axios
      .put(`${apiUrl}/blog/${state.slug}`, { title, content, author })
      .then((response) => {
        Swal.fire("แจ้งเตือน", "อัพเดทบทความเรียบร้อย", "success");
        const { title, content, author, slug} = response.data
        setState({ ...state, title, author, slug});
        setContent(content)
      })
      .catch((err) => {
        Swal.fire("แจ้งเตือน", err.response.data.error, "error");
      });
  };

  return (
    <div className="container p-5">
      <Navber />
      <h1>แก้ไขบทความ</h1>
      {showUpdateForm()}
    </div>
  );
};

export default EditComponent;
