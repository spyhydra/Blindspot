export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-10 px-6 text-center text-sm text-gray-500">
            <p>
                © {new Date().getFullYear()}{" "}
                <span className="text-violet-400 font-semibold">Blindspot</span>. Built
                with Next.js & Tailwind CSS.
            </p>
        </footer>
    );
}
