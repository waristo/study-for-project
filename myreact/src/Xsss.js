import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Xsss = () => {
  const [xsss, setXsss] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchXsss = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setXsss(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          'http://localhost:8000/xss/'
        );
        setXsss(response.data); // 데이터는 response.data 안에 들어있습니다.
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