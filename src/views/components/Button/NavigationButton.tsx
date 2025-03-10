/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
interface INavigationButton {
  iconLink: string;
  content: string;
  path: string;
  isAvatar: boolean | null;
}
const avatarCSS = css`
  border-radius: 100%;
`;
const NavigationButton: React.FC<INavigationButton> = ({
  iconLink,
  content,
  path,
  isAvatar,
}) => {
  return (
    <div className="rounded-xl">
      <Link
        to={path}
        className="flex font-bold  rounded-xl hover:bg-[#37464F] focus:outline-3 focus:outline-[#50D3FF] focus:bg-[#37464F]"
        style={{
          padding: "8px 4px 8px 4px",
        }}
      >
        <span className="flex flex-row">
          <div>
            <img
              css={isAvatar ? avatarCSS : undefined}
              src={iconLink}
              alt="Logo navigation button"
              width="32px"
              style={{
                margin: "0px 20px 0px 10px",
              }}
            />
          </div>
          <span className=" flex justify-center items-center">{content}</span>
        </span>
      </Link>
    </div>
  );
};
export default NavigationButton;
