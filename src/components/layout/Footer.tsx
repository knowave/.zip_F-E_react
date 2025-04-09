export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        © {new Date().getFullYear()} Dotzip. 모든 권리 보유.
      </div>
    </footer>
  );
}
