import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { CodeBlock } from '../../components/CodeBlock';
import remarkGfm from 'remark-gfm';
import { type PostDto } from '@bloguiery/shared';

export const PostLayout = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`http://localhost:3333/post/${slug}`);
      const dataJson = (await data.json()) as PostDto;
      setContent(dataJson.body);
      setTitle(dataJson.title);
    }

    fetchData();
  }, [slug]);

  return (
    <div className="page">
      <div className="content">
        <Markdown
          components={{
            code: CodeBlock,
          }}
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};
