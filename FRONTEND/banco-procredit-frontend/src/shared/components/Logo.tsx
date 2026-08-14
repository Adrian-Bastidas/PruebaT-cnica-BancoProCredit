import logo from "../../assets/procredit-logo.png";

interface Props {
  compact?: boolean;
  size?: "sm" | "md" | "lg" | "nd";
}

export function Logo({ compact = false, size = "nd" }: Props) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-24 w-auto",
    nd: "",
  };
  return (
    <div className="flex items-center" aria-label="Banco ProCredit">
      <img
        src={logo}
        alt="Banco ProCredit"
        className={
          compact
            ? "h-10 w-auto object-contain"
            : `${sizes[size]} w-auto object-contain`
        }
      />
    </div>
  );
}
