import { useEffect, useRef } from 'react';

const TurnstileComponent = ({ sitekey, onSuccess }) => {
  const turnstileRef = useRef(null);

  useEffect(() => {
    window.turnstile.render(turnstileRef.current, {
      sitekey: sitekey,
      callback: (token) => onSuccess(token),
    });
  }, [sitekey, onSuccess]);

  return <div ref={turnstileRef}></div>;
};

export default TurnstileComponent;