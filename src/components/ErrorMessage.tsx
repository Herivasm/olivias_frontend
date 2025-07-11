export default function ErrorMessage({ children }: { children: React.ReactNode }) {
    return <p className="text-red-600 text-xs font-bold mt-1">{children}</p>
}