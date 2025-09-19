import Heading from "../ui/Heading";
import Row from "../ui/Row.jsx";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm.jsx";
import { useSettings } from "../features/settings/useSettings.js";
import Spinner from "../ui/Spinner.jsx";

function Settings() {
  const { isLoading } = useSettings();

  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
