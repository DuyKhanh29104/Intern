import React, { useState } from 'react';

export default function ConfigEditor() {
  const [config, setConfig] = useState(() => {
    return JSON.parse(localStorage.getItem('page_config')) || {
      title: '',
      apiBase: '',
      fields: [],
      permissions: []
    };
  });

  const saveConfig = () => {
    localStorage.setItem('page_config', JSON.stringify(config));
    alert('Saved!');
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Edit Page Config</h2>
      <input
        type="text"
        value={config.title}
        onChange={(e) => setConfig({ ...config, title: e.target.value })}
        placeholder="Page Title"
        className="border p-2 mb-2 block w-full"
      />
      <input
        type="text"
        value={config.apiBase}
        onChange={(e) => setConfig({ ...config, apiBase: e.target.value })}
        placeholder="API Endpoint"
        className="border p-2 mb-2 block w-full"
      />
      <button onClick={saveConfig} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Config
      </button>
    </div>
  );
}
