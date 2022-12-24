import "@popperjs/core/dist/umd/popper";
import { TempusDominus } from "@eonasdan/tempus-dominus/dist/js/tempus-dominus";
import "@eonasdan/tempus-dominus/dist/css/tempus-dominus.css";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import moment from "moment/moment";

/**
 *
 * @returns https://getdatepicker.com/6/
 */

const DatepickerNativeField = ({ label, id }) => {
  const [state, setState] = useState({});
  const [datepickerCtrl, setDatepickerCtrl] = useState();
  const { touched, setFieldValue, values, ...formik } = useFormikContext();
  const errors = { ...formik.errors, ...state?.errors };
  const handleSelectDate = () => {
    try {
      setFieldValue(id, state.date);
    } catch (e) {
      console.log("---== datepickerCtrl ::: e ", state, e);
    }
  };
  useEffect(() => {
    if (
      !document.getElementById("datetimepicker1").getElementsByTagName("div")[0]
    ) {
      const element = document.getElementById("datetimepicker1");
      setDatepickerCtrl(
        new TempusDominus(element, {
          restrictions: {
            maxDate: new Date(),
          },
          useCurrent: true,
          defaultDate: values[id] || undefined,
          display: {
            icons: {
              type: "icons",
              time: "fa-solid fa-clock",
              date: "fa-solid fa-calendar",
              up: "fa-solid fa-arrow-up",
              down: "fa-solid fa-arrow-down",
              previous: "fa-solid fa-chevron-left",
              next: "fa-solid fa-chevron-right",
              today: "fa-solid fa-calendar-check",
              clear: "fa-solid fa-trash",
              close: "fa-solid fa-xmark",
            },
            sideBySide: false,
            calendarWeeks: false,
            viewMode: "calendar",
            toolbarPlacement: "bottom",
            keepOpen: false,
            buttons: {
              today: true,
              clear: false,
              close: false,
            },
            components: {
              calendar: true,
              date: true,
              month: true,
              year: true,
              decades: true,
              clock: true,
              hours: true,
              minutes: true,
              seconds: false,
              useTwentyfourHour: undefined,
            },
            inline: true,
            theme: "auto",
          },
        })
      );

      element.addEventListener("change.td", (e) => {
        setState((prevState) => {
          return {
            ...prevState,
            ...e.detail,
          };
        });
      });
    }
  }, []);

  return (
    <>
      <label htmlFor="my-modal-6" className="btn btn-md btn-warning w-full">
        <span className="text-gray-200">{label}</span>
        <span className="font-specimen-oswald-wght-300">
          {values[id] && values[id] !== ""
            ? `: ${moment(values[id]).format("MMM DD YYYY")} : (${moment().diff(values[id], "years")})`
            : ""}
        </span>
      </label>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="my-modal-6"
            className="btn btn-sm btn-circle absolute right-2 top-2 mb-2"
          >
            ✕
          </label>
          <div className="container mt-4">
            <div className=" grid grid-rows-1 gap-1 justify-center align-center">
              <div id="datetimepicker1"></div>
              <div className="modal-action">
                <label
                  htmlFor="my-modal-6"
                  className="btn btn-md btn-primary w-full"
                  onClick={handleSelectDate}
                >
                  Select
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {errors && errors[id] && (
        <label className="label">
          <span className="label-text-alt text-red-600">{errors[id]}</span>
        </label>
      )}
    </>
  );
};

export default DatepickerNativeField;
