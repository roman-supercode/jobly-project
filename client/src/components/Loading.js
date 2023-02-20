const Loading = ({ center }) => {
  return (
    <div className="loading">
      {center ? "loading loading-center" : "loading"}
    </div>
  );
};

export default Loading;
