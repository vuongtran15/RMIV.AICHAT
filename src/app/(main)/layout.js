import './layout.scss'

export default function LayoutMain({ children }) {
    return (
        <div className="main-layout">
            <div className="main-menu">
                <div className='logo'>
                    <img src="/images/logo.png" alt="Logo" />
                </div>

            </div>
            <div className="main-body">
                {children}
            </div>
        </div>
    );
}