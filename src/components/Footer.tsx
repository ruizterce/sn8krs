export default function Footer() {
  return (
    <footer className="bg-background text-secondary border-t-[1px] border-secondary border-dashed px-2 sm:px-4 py-2 max-h-12 overflow-hidden">
      <div className="grid grid-cols-3">
        <p className="text-xs text-center">
          Crafted with love |{" "}
          <a href="https://github.com/ruizterce" className="underline">
            ruizterce
          </a>
        </p>
        <p className="justify-self-center text-xs text-center">
          © 2025 SN8KRS. All rights reserved.
        </p>
        <div className="px-4 justify-self-end flex gap-4 text-xs">
          <a href="/privacy-policy" className="underline text-center">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="underline text-center">
            Service Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
