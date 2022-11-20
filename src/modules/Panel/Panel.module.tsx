const Panel: React.FC = () => {
  return (
    <div className="m-2">
      <div className="d-flex flex-row align-items-center ">
        <div className="m-3">
          <h4>image</h4>
        </div>
        <div>
          <h5>my name</h5>
          <p>type user</p>
        </div>
        <div>
          <button>logout</button>
        </div>
      </div>

      <div className="d-flex  flex-column  ">
        <div>
          <h4>Deshboard</h4>
        </div>
        <div>
          <ul>
            <li>Home</li>
            <li>Projetcs</li>
            <li>Thecnologys</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Panel;
