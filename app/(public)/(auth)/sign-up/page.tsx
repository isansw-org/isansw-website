// app/(public)/(auth)/sign-up/page.tsx
export default function SignUpPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Create your account</h1>
      {/* TODO: your real sign-up form here */}
      <form className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="rounded-md border px-3 py-2"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="rounded-md border px-3 py-2"
            placeholder="••••••••"
            required
          />
        </div>
        <button className="mt-2 w-full rounded-md bg-black px-4 py-2 text-white">
          Sign up
        </button>
      </form>
    </main>
  );
}
