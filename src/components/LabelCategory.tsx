interface TitleProps {
  title: string;
}

export default function LabelCategory({ title }: TitleProps) {
  let color = "";
  switch (title) {
    case "important":
      color = "green";
      break;
    case "urgent":
      color = "blue";
      break;
    case "help":
      color = "red";
      break;
    default:
      break;
  }
  return (
    <>
      <label
        className={`bg-${color}-100 px-3 py-1 rounded-full font-medium text-${color}-500 text-sm`}
      >
        {title}
      </label>
    </>
  );
}
