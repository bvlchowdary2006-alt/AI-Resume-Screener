const Badge = ({ variant = "default", className = "", children }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    brand: "bg-blue-50 text-blue-700 border border-blue-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-orange-50 text-orange-700 border border-orange-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-lg ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
