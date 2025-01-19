export default function Footer() {
  return (
    <footer className="bg-primary text-white p-4">
      <div className="grid grid-cols-3 ">
        <div></div>
        <p className="justify-self-center">
          © 2025 SN8KRS. All rights reserved.
        </p>
        <div className="px-4 justify-self-end flex gap-4">
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
