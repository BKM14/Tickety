import {
    Button,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useDisclosure, useToggle } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

  
  export function AuthenticationForm(props: PaperProps) {
    const [type, ] = useToggle(['login', 'register']);
    const form = useForm({
      initialValues: {
        email: '',
        password: '',
      },
    });

    const [loading, handlers] = useDisclosure();

    const navigate = useNavigate();

    const handleLogin = async ({email, password}: {email: string, password: string}) => {
      handlers.open();
      try{
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/token/`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({email, password})
        })
        const { access } : {access: string} = await response.json();
        if (!access) throw new Error("Error getting token: " + response.status);

        localStorage.setItem("authToken", access);

        navigate("/user");
      } catch(e) {
        handlers.close();
        alert("Error logging in to your account. Please check logs.");
        throw new Error("Error during login: " + e);
      }
    }
  
    return (
      <Paper radius="md" p="xl" withBorder {...props}>
        <div className='flex justify-center my-3'>
          <img src="Tickety.png" width={64} alt="logo" />
        </div>
        <Text size="xl" fw={700} ta={'center'}>
          Welcome to Tickety
        </Text>
        <Text size="md" fw={600} ta={'center'}>
          {upperFirst(type)} with
        </Text>

  
        <form onSubmit={form.onSubmit(({email, password}) => {handleLogin({email, password})})}>
          <Stack>
  
            <TextInput
              required
              label="Email"
              placeholder="john.doe@gmail.com"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />
  
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />
          </Stack>
  
          <Group justify="space-between" mt="lg">
            <Button type="submit" radius="xl" fullWidth loading={loading} loaderProps={{type: 'dots'}}>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    );
  }