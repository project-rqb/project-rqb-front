import { Asides, Footers } from "@/components/layouts";

export default function AuthRoot({ children }) {
  return (
    <>
      <div className="container my-4 flex w-full grow">
        <div className="flex w-full">
          <Asides />
          <main className="grow">{children}</main>
        </div>
      </div>
      <div className="w-full bg-[#AAB1BC] pb-14 md:pb-0">
        <footer>
          <Footers />
        </footer>
      </div>
    </>
  );
}
