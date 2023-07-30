import Loading from "@/components/common/Loading";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button = ({ children, isLoading, ...rest }: Props) => {
  return (
    <button {...rest} type="button" disabled={isLoading}>
      <div className="flex items-center">
        {isLoading && <Loading className="mr-2 w-4 h-4" />} {children}
      </div>
    </button>
  );
};

export default Button;
