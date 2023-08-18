import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navber from "./Navber";
import parse from 'html-react-parser'

interface Blog {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  slug: string;
}

interface SingleComponentProps {
  apiUrl: string;
}

const SingleComponent = ({ apiUrl }: SingleComponentProps) => {
  const [blog, setBlog] = useState<Blog | null>(null);

  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    axios
      .get(`${apiUrl}/blog/${slug}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="container p-5">
      <Navber />
      {!blog ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{blog.title}</h1>
          <div className="pt-3">{parse(blog.content)}</div>
          <p className="text-muted">
            ผู้เขียน : {blog.author} , เผยแพร่ :{" "}
            {new Date(blog.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleComponent;
