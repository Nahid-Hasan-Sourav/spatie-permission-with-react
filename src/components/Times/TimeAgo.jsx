import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ createdAt }) => {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
