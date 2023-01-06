import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../services/service.slice";

const NotifyElement = () => {
  const dispatch = useDispatch();
  const notifyService = useSelector((state) => state.service.notify);
  console.log("--== notifyService ", notifyService);
  useEffect(() => {
    if (notifyService.kickStartTime) {
      setTimeout(() => {
        dispatch(
          notify({
            ...notifyService,
            status: "close",
            kickStartTime: 0,
          })
        );
      }, notifyService.kickStartTime);
    }
  }, [notifyService]);
  return (
    <>
      {notifyService && notifyService.status === "show" && (
        <div className="max-w-20 m-4">
          <div
            class={`alert ${
              notifyService.className
                ? notifyService.className
                : "alert-success"
            } shadow-lg`}
          >
            <div>
              {notifyService.icon ? (
                <>
                  <FontAwesomeIcon
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    icon={notifyService.icon}
                  />
                </>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}

              <span>{notifyService.message}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotifyElement;
