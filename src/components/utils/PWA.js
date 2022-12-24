const PWA = ({ native, web }) => {
  return (
    <>
      <div className="md:hidden">{native}</div>
      <div className="hidden md:flex">{web}</div>
    </>
  );
};

export default PWA;
