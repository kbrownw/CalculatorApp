import { useAppContext } from "../context/AppContext";
import { Theme } from "../shared/types";

interface Props {
  textColor: string;
  theme: Theme;
}

const Screen = ({ textColor, theme }: Props) => {
  const { screenData } = useAppContext();

  return (
    <div
      className={`flex justify-end p-4 rounded-xl ${theme.backgrounds.screen} ${textColor}`}
    >
      <p>{screenData}</p>
    </div>
  );
};

export default Screen;
