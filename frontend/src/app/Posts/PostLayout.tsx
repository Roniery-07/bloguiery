import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

export const PostLayout = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`http://localhost:3333/post/${slug}`);
      const dataJson = await data.json();
      setContent(dataJson.body);
      setTitle(dataJson.title);
    }

    fetchData();
  }, [slug]);

  return (
    <div className="page">
      <h1>{title}</h1>
      <div className="content">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
};
