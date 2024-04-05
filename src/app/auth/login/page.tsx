
import { Title } from '@/components';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Title text='Login'/>

      <div className="flex w-full px-10 justify-center mt-10">
        <div className="flex justify-center w-[450px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}