import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Xsss = () => {
  const [xsss, setXsss] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchXsss = async () => {
      try {
        setError(null);
        setXsss(null);
        setLoading(true);
        const response = await axios.get(
          'http://localhost:8000/xss/'
        );
        setXsss(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchXsss();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!xsss) return null;
  return (
    <ul>
      {xsss.map(xss => (
        <li>
          {xss.url} ({xss.vulnerable.toString()})
        </li>
      ))}
    </ul>
  );
};

export default Xsss;