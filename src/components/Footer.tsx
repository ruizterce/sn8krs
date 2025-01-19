export default function Footer() {
  return (
    <footer className="bg-background text-secondary border-t-[1px] border-secondary border-dashed px-4 py-2">
      <div className="grid grid-cols-3 ">
        <div></div>
        <p className="justify-self-center text-xs">
          © 2025 SN8KRS. All rights reserved.
        </p>
        <div className="px-4 justify-self-end flex gap-4 text-xs">
          <a href="/privacy-policy" className="underline">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
