import React, { useEffect, useState } from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';

function HtmlMarkdown({ class_name, raw_content }) {
  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });
  const [markdownContent, setMarkdownContent] = useState('预览内容');

  useEffect(() => {
    raw_content ? setMarkdownContent(marked(raw_content)) : setMarkdownContent('预览内容');
  }, [raw_content]);

  return <div className={class_name} dangerouslySetInnerHTML={{ __html: markdownContent }}></div>;
}

HtmlMarkdown.propTypes = {
  class_name: PropTypes.string,
  raw_content: PropTypes.string,
};

export default HtmlMarkdown;
