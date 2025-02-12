import { useFormContext } from 'react-hook-form';
import { formFields } from '../../common/initialFormValues';
import ControlInput from './ControlInput';
import { VariantsDelivery } from '../../formOrder.t';

const AddressInput = () => {
  const { watch } = useFormContext();

  if (!formFields.address) return;
  const { name, placeholder } = formFields.address;

  const variantsDelivery = watch('variantsDelivery');

  if (variantsDelivery !== VariantsDelivery.home) return null;

  return (
    <ControlInput
      autoComplete="on"
      name={name}
      placeholder={placeholder}
      pb={0}
    />
  );
};

export default AddressInput;
