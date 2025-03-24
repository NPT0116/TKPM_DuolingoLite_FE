import { useState, useRef, useEffect } from "react";
import ic_bell from "../../../../assets/icons/ic_bell.png";
import PaymentNotify from "./NotifyType/PaymentNotify";
import LessonFinishNotify from "./NotifyType/LessonFinishNotify";
import ReviewLessonNotify from "./NotifyType/ReviewLessonNotify";
import AchievementNotify from "./NotifyType/AchievementNotify";
import StreakNotify from "./NotifyType/StreakNotify";
import DailyGoalNotify from "./NotifyType/DailyGoalNotify";
import { startSignalRConnection } from "../../../../services/RealTime/NotifyService";
import { INotify } from "../../../../interfaces/INotify";

const Notify: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const authToken = localStorage.getItem("authToken") || "";

  const [realtimeNotifies, setRealtimeNotifies] = useState<INotify[]>([]);

  useEffect(() => {
    const setupSignalR = async () => {
      const connection = await startSignalRConnection(authToken);

      connection.on("ReceiveNotification", (data: any) => {
        console.log("📩 Notification Received:", data);

        setRealtimeNotifies((prev) => [...prev, data]);
      });
    };

    setupSignalR();
  }, [authToken]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes pulseBounce {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }
          .group:hover .group-hover\\:animate-pulse-bounce {
            animation: pulseBounce 0.6s ease-in-out infinite;
          }
        `}
      </style>

      <div className="relative" ref={dropdownRef}>
        <img
          src={ic_bell}
          alt="notification"
          className="w-auto h-[28px] cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        {realtimeNotifies.length > 1 && (
          <div className="w-[20px] h-[20px] rounded-full bg-red-500 flex items-center justify-center absolute right-[-6px] top-[-6px] text-white text-[12px]">
            <span>{realtimeNotifies.length - 1}</span>
          </div>
        )}

        {isOpen && (
          <div
            className="absolute right-[-20px] mt-2 w-[450px] bg-[#131F23] shadow-lg rounded-lg border border-[#37464F] z-50"
            style={{
              marginTop: "5px",
              padding: "15px",
            }}
          >
            <div
              className="border-b-3 border-[#37464F] font-bold text-[24px] w-fit"
              style={{ marginBottom: "10px" }}
            >
              Notifications
            </div>
            <ul className="max-h-[450px] overflow-y-auto space-y-3">
              {realtimeNotifies.map((n, index) => (
                <div key={index}>
                  {(() => {
                    switch (n.notificationType) {
                      case 0:
                        return (
                          <PaymentNotify title={n.title} message={n.message} />
                        );
                      case 1:
                        return (
                          <LessonFinishNotify
                            title={n.title}
                            message={n.message}
                          />
                        );
                      case 2:
                        return (
                          <ReviewLessonNotify
                            title={n.title}
                            message={n.message}
                          />
                        );
                      case 3:
                        return (
                          <AchievementNotify
                            title={n.title}
                            message={n.message}
                          />
                        );
                      case 4:
                        return (
                          <StreakNotify title={n.title} message={n.message} />
                        );
                      case 5:
                        return (
                          <DailyGoalNotify
                            title={n.title}
                            message={n.message}
                          />
                        );
                      default:
                        return null;
                    }
                  })()}

                  {index < realtimeNotifies.length - 1 && (
                    <hr
                      className="bg-[#37464F] h-2 border-none"
                      style={{ margin: "15px 0" }}
                    />
                  )}
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Notify;
