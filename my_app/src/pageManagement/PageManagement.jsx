import React from 'react';
import PageRenderer from './PageRenderer';
import config from './pageConfig';

export default function PageManagement() {
  return (
    <div className="container">
      <h1 className="title">{config.title}</h1>
      <PageRenderer config={config} />
    </div>
  );
}