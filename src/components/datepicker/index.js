import DatepickerNativeField from "./nativeField";
import DatepickerWebField from "./webField";

/**
 *
 * @returns https://getdatepicker.com/6/
 */

const DatepickerField = (props) => {
  return (
    <>
      <div className="flex flex-col w-full mt-3 md:hidden">
        <DatepickerNativeField {...props} />
      </div>
      <div className="hidden md:flex">
        <DatepickerWebField {...props} />
      </div>
    </>
  );
};

export default DatepickerField;
