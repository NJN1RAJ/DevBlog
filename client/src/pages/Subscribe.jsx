import CallToAction from "../components/CallToAction";

export default function Subscribe() {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-6">
      <h1 className="text-md font-semibold text-4xl dark:text-gray-300 text-gray-500">
        Subscribe to our newsletter
      </h1>
      <div className="mx-5 p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
    </div>
  );
}
