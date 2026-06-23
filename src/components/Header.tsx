import "./Header.css";

export const Header = (): JSX.Element => {
  return (
    <header className="header">
      <div className="brand-block">
        <div className="brand-mark" aria-hidden="true">
          <span>J</span>
        </div>
        <h1 className="logo">Junder</h1>
      </div>
    </header>
  );
};