const Card = ({ className = "", children, hover = false, glass = false }) => {
  const base = "bg-white rounded-xl border border-gray-200";
  const hoverClass = hover ? "hover:border-gray-300 hover:shadow-sm transition-all" : "";
  const glassClass = glass ? "bg-white/80 backdrop-blur-sm" : "";

  return (
    <div className={`${base} ${hoverClass} ${glassClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
