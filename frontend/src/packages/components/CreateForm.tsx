import { Button, Checkbox, Group, Textarea, TextInput, NativeSelect } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Issue } from './CreateTable';

export interface FormProps {
  inputs: {
    label: string,
    placeholder: string,
    key: string
  }[],
  textareas: {
    label: string,
    placeholder: string,
    key: string
  }[],
  selects: {
    label: string,
    description: string,
    data: string[],
    key: string
  }[],
  checkbox: boolean,
  submitLabel: string,
  closeOnSubmit?: () => void;
}

function CreateForm({props, addTableElements} : {props: FormProps, addTableElements: (newValue: Issue) => void}) {
  const form = useForm({
    mode: 'uncontrolled',
  });

  return (
    <form onSubmit={form.onSubmit((values) => {
      addTableElements(values as Issue);
      if (props.closeOnSubmit) props.closeOnSubmit();
    })}>
      {props.inputs.map((input) => (
        <TextInput
          variant='filled'  
          withAsterisk
          label={input.label}
          placeholder={input.placeholder}
          key={form.key(input.key)}
          {...form.getInputProps(input.key)}
        />
      ))}

      {props.textareas.map((textarea) => (
        <Textarea 
          variant='filled'
          withAsterisk
          label={textarea.label}
          placeholder={textarea.placeholder}
          key={form.key(textarea.key)}
          {...form.getInputProps(textarea.key)}
        />
      ))}

      {props.selects.map((select) => (
         <NativeSelect
          withAsterisk
          key={select.key}
          label={select.label} 
          description = {select.description} 
          variant='filled' 
          data={select.data}
          {...form.getInputProps(select.key)}
        />
      ))}

      {props.checkbox && <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        key={form.key('termsOfService')}
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />}

      <Group justify="center" mt="md">
        <Button type="submit">{props.submitLabel}</Button>
      </Group>
    </form>
  );
}

export default CreateForm;