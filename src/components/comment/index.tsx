import React from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { CommentProps } from '../../templates/blog-post';
import Utterances from './Utterances';
import './index.scss';

const Comment = ({ service, disqusProps, utterancesProps }: CommentProps) => (
  <section className="comment-area">
    {service === 'disqus' && <DiscussionEmbed {...disqusProps} />}
    {service === 'utterances' && <Utterances repo={utterancesProps} />}
  </section>
);

export default Comment;
