/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const WelcomeOwl: React.FC = () => {
  const triangleCSS = css`
    position: absolute;

    left: -15px;
    top: 50%;
    transform: translateY(-50%);

    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-right: 15px solid #37464f;

    &::before {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 3px;
      content: "";

      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      border-right: 12px solid #131f23;
    }
  `;
  return (
    <div className=" absolute bottom-0 h-1/3 w-full flex justify-center items-center flex-row text-white transition-all duration-300">
      <img
        src="https://d35aaqx5ub95lt.cloudfront.net/images/owls/768eb19f6bd297633bd858b2bff0c4ed.svg"
        alt="Duolingo Owl"
        className="translate-y-[45px]"
        width="285"
        height="285"
      />
      <div
        className="relative border-2 border-[#37464F] rounded-2xl w-[400px]"
        style={{ padding: "10px 15px" }}
      >
        Hãy xem hôm nay chúng mình sẽ học những từ vựng nào nhé!
        <div css={triangleCSS}></div>
      </div>
    </div>
  );
};
export default WelcomeOwl;
