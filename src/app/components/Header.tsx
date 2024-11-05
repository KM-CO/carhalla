export default function Header() {
    return (
        <header className="flex flex-row justify-between p-4 drop-shadow-[0_0_3px_rgb(0,0,0,.5)] bg-blue-700">
            <p>Logo</p>
            <div className="flex">
                <p>Log In</p>
                <p>Sign Up</p>
            </div>
        </header>
    );
}