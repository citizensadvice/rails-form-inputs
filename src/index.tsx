import React, { memo } from "react";

import { Inputs } from "./inputs.js";
import { Data, Transform } from "./types";

interface RailsFormInputsProps {
  value: Data;
  transform?: Transform;
  snakeCase?: boolean;
}

const RailsFormInputs: React.FC<RailsFormInputsProps> = memo(
  ({ value, transform, snakeCase = true }: RailsFormInputsProps) => (
    <Inputs value={value} transform={transform} snakeCase={snakeCase} />
  ),
);

RailsFormInputs.displayName = "RailsFormInputs";

export default RailsFormInputs;
export { toRailsFormData } from "./to_rails_form_data.js";
