import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Admin dashboard</h1>
      <p>this is a protected route</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
