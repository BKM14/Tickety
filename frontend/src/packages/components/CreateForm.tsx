import { Button, Group, Textarea, TextInput, NativeSelect, FileInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
  fileInputs?: {
    label: string,
    description: string,
    placeholder:string,
    multiple: boolean,
    accept: string,
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

  const [loading, {toggle}] = useDisclosure();

  return (
    <form onSubmit={form.onSubmit(async (values) => {
      
      toggle();
      const screenshot_links: string[] = [];

      if (values.screenshot_links) {
        try {
          const uploadPromises = values.screenshot_links.map(async (screenshot: string) => {

            const formData = new FormData();
            formData.append("upload_preset", "tickety")
            formData.append("file", screenshot)

            const response = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_API, {
              method: "POST",
              body: formData
            })

            const { url } = await response.json();
            screenshot_links.push(url);
        })

        await Promise.all(uploadPromises);

        } catch (e) {
          throw new Error("Error uploading screenshots: " + e)
        }
      }
      const newIssue = values as Issue;
      newIssue.screenshot_links = screenshot_links

      addTableElements(newIssue);
      toggle();

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

      {props.fileInputs && props.fileInputs.map((fileInput) => (
        <FileInput
        key={fileInput.key}
        label={fileInput.label}
        description={fileInput.description}
        placeholder={fileInput.placeholder}
        accept={fileInput.accept}
        multiple={fileInput.multiple}
        {...form.getInputProps(fileInput.key)}
        />
      ))}

      <Group justify="center" mt="md">
        <Button type="submit" loading={loading} loaderProps={{type: 'dots'}}>{props.submitLabel}</Button>
      </Group>
    </form>
  );
}

export default CreateForm;