import "./App.css";
import Navber from "./components/Navber";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from "html-react-parser"; //render HTML
import { getUser } from "./services/authorize";

interface Blog {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  slug: string;
}

interface AppProps {
  apiUrl: string;
}

function App({ apiUrl }: AppProps) {
  // console.log("API URL:", apiUrl);

  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDel = (slug: string) => {
    Swal.fire({
      title: "คุณต้องการลบบทความหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug: string) => {
    axios
      .delete(`${apiUrl}/blog/${slug}`)
      .then((response) => {
        Swal.fire("Deleted !", response.data.message, "success");
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container p-5">
        <Navber />
        {blogs.map((blog, index) => (
          <div
            className="row"
            key={index}
            style={{ borderBottom: "1px solid silver" }}
          >
            <div className="col pt-3 pb-2">
              <Link to={`/blog/${blog.slug}`}>
                <h2>{blog.title}</h2>
              </Link>
              <div className="pt-3">
                {parse(blog.content.substring(0, 180))}
              </div>
              <p className="text-muted">
                ผู้เขียน : {blog.author} , เผยแพร่ :{" "}
                {new Date(blog.createdAt).toLocaleString()}
              </p>

              {getUser() && (
                <div>
                  <Link
                    to={`/blog/edit/${blog.slug}`}
                    className="btn btn-outline-success"
                  >
                    แก้ไขบทความ
                  </Link>
                  &nbsp;
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => confirmDel(blog.slug)}
                  >
                    ลบบทความ
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
