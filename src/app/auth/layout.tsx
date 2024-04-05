import { Title } from "@/components";

export default async function AuthLayout( { children }: {
  children: React.ReactNode;
} ) {

  return (
    <main className="flex justify-center">
      <div className="w-full">
        { children }
      </div>
    </main>
  );
}