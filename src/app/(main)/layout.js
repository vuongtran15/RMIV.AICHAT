import './layout.scss'

export default function LayoutMain({ children }) {
    return (
        <div className="main-layout">
            <div className="main-menu"></div>
            <div className="main-body">
                {children}
            </div>
        </div>
    );
}