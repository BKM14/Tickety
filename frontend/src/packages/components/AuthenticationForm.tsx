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
import { upperFirst, useToggle } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
  
  export function AuthenticationForm(props: PaperProps) {
    const [type, ] = useToggle(['login', 'register']);
    const form = useForm({
      initialValues: {
        username: '',
        password: '',
      },
    });

    const navigate = useNavigate();

    const handleLogin = async ({username, password}: {username: string, password: string}) => {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/token/`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({username, password})
      })

      if (!response.ok) {
        alert("Error logging in to your account. Please check logs.");
        throw new Error("Error during login: " + response.status);
      }

      const { access } : {access: string} = await response.json();
      if (!access) throw new Error("Error getting token: " + response.status);

      localStorage.setItem("authToken", access);

      navigate("/user");
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

  
        <form onSubmit={form.onSubmit(({username, password}) => {handleLogin({username, password})})}>
          <Stack>
  
            <TextInput
              required
              label="Username"
              placeholder="john.doe"
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              error={form.errors.username && 'Invalid username'}
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
            <Button type="submit" radius="xl" fullWidth>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    );
  }