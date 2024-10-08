const UnresolvedStatus = () => {
  return (
    <div
      className="absolute -right-4 top-12 z-10 h-8 w-40 rotate-45 bg-red-600 text-center text-white"
      style={{
        clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0% 100%)",
        lineHeight: "30px",
        marginTop: "-3px",
        marginRight: "-2px",
      }}
    >
      未 解 決
    </div>
  );
};

export default UnresolvedStatus;
