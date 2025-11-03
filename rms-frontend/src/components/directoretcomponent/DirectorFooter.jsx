export default function DirectorFooter() {
  return (
    <footer className="p-4 text-center bg-white dark:bg-gray-900 shadow-inner mt-auto">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Director Panel
      </p>
    </footer>
  );
}
