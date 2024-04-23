import ReactDOM from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
};

const Portal = ({ children }: PortalProps) => {
  const el: any = document.getElementById('modal-root');
  return ReactDOM.createPortal(children, el);
};

export default Portal;
