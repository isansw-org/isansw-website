export default function Loading() {
  return (
    <div>
      <div className="text-primary text-4xl font-bold flex items-center justify-center">
        ISANSW
      </div>
      <div className="flex justify-center">
        <div
          className="my-10 inline-block h-12 w-12 animate-spin rounded-full border-[6px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-primary"
          role="status"
        />
      </div>
    </div>
  );
}
