import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings.js";
import { useUpdateSettings } from "./useUpdateSettings.js";
import Spinner from "../../ui/Spinner.jsx";

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      minimumBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const {
    isSettingsUpdating,
    error: updateError,
    applySettings,
  } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  function handleUpdate(evt, fieldName) {
    const { value } = evt.target;
    console.log(value);

    if (!value) return;

    applySettings({ [fieldName]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isSettingsUpdating}
          defaultValue={minimumBookingLength}
          onBlur={(evt) => handleUpdate(evt, "minimumBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isSettingsUpdating}
          defaultValue={maxBookingLength}
          onBlur={(evt) => handleUpdate(evt, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isSettingsUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(evt) => handleUpdate(evt, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isSettingsUpdating}
          defaultValue={breakfastPrice}
          onBlur={(evt) => handleUpdate(evt, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
