export default function Modal({ children, show = false, maxWidth = '2xl', closeable = true, onClose = () => {} }: any) {
    return show ? <div className="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50">{children}</div> : null;
}