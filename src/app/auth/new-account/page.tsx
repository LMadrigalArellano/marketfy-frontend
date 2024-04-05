import { RegisterForm } from './ui/RegisterForm';
import { Title } from '@/components';

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Title text='Create a new account'/>
      <div className="flex w-full px-10 justify-center mt-10">
        <div className="flex justify-center w-[450px]">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}